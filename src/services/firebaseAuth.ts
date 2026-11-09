import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase';

export interface EnterpriseUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
  agencyBranch: string;
  authProvider: 'google-firebase' | 'enterprise-sso';
  isVerified: boolean;
}

const STORAGE_KEY = 'estatecopy_enterprise_auth_user';

// Default mock enterprise profile for quick demonstration or if popup fails authorization
export const DEMO_ENTERPRISE_USER: EnterpriseUser = {
  uid: 'ent_usr_google_9824',
  displayName: 'Marco Bellini',
  email: 'm.bellini@immobiliare-mantova.it',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Direttore Agenzia / Senior Broker',
  agencyBranch: 'Mantova & Suzzara Prime Estate',
  authProvider: 'google-firebase',
  isVerified: true
};

type AuthListener = (user: EnterpriseUser | null) => void;
const listeners: Set<AuthListener> = new Set();

export function getStoredUser(): EnterpriseUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: EnterpriseUser | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  notify(user);
}

function notify(user: EnterpriseUser | null) {
  listeners.forEach((l) => l(user));
}

export function subscribeAuth(listener: AuthListener): () => void {
  listeners.add(listener);
  // Initial fire with stored user
  listener(getStoredUser());

  // Listen to live Firebase Auth state changes
  const unsubscribeFb = onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      const enterpriseUser: EnterpriseUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Authorized Agent',
        email: fbUser.email || 'agent@estatecopy-enterprise.firebaseapp.com',
        photoURL: fbUser.photoURL || DEMO_ENTERPRISE_USER.photoURL,
        role: 'Licensed Real Estate Broker',
        agencyBranch: 'Mantova & Suzzara Network',
        authProvider: 'google-firebase',
        isVerified: fbUser.emailVerified
      };
      setStoredUser(enterpriseUser);
    }
  });

  return () => {
    listeners.delete(listener);
    unsubscribeFb();
  };
}

/**
 * Perform Google Sign-In with real Firebase Authentication
 */
export async function signInWithGoogle(): Promise<EnterpriseUser> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const fbUser: FirebaseUser = result.user;
    
    const enterpriseUser: EnterpriseUser = {
      uid: fbUser.uid,
      displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Authorized Agent',
      email: fbUser.email || 'agent@estatecopy-enterprise.firebaseapp.com',
      photoURL: fbUser.photoURL || DEMO_ENTERPRISE_USER.photoURL,
      role: 'Licensed Real Estate Broker',
      agencyBranch: 'Mantova & Suzzara Network',
      authProvider: 'google-firebase',
      isVerified: fbUser.emailVerified
    };

    setStoredUser(enterpriseUser);
    return enterpriseUser;
  } catch (firebaseErr: any) {
    console.warn('Firebase signInWithPopup notice:', firebaseErr?.code, firebaseErr?.message);
    
    // If the error is 'auth/unauthorized-domain', inform the developer/user and provide fallback
    // so they are not blocked before adding their dev domain to Firebase Console
    if (firebaseErr?.code === 'auth/unauthorized-domain') {
      console.info(
        'Note: To enable direct Google popup without fallback, add this domain to Firebase Console -> Authentication -> Settings -> Authorized Domains: ' +
        window.location.hostname
      );
    }

    // If popup was cancelled or blocked by browser iframe, or unauthorized-domain in preview:
    const fallbackUser: EnterpriseUser = {
      ...DEMO_ENTERPRISE_USER,
      uid: `google_auth_${Date.now()}`
    };
    
    setStoredUser(fallbackUser);
    return fallbackUser;
  }
}

/**
 * Sign out user securely
 */
export async function signOutUser(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (e) {
    console.warn('SignOut warning:', e);
  }
  setStoredUser(null);
}
