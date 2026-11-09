import React, { useState } from 'react';
import { EnterpriseUser, signInWithGoogle } from '../services/firebaseAuth';

interface EnterpriseAuthModalProps {
  isOpen: boolean;
  onSuccess: (user: EnterpriseUser) => void;
}

export const EnterpriseAuthModal: React.FC<EnterpriseAuthModalProps> = ({
  isOpen,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await signInWithGoogle();
      onSuccess(user);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Heavy enterprise backdrop blur over the workspace */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl transition-all" />

      {/* Corporate Login Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-center text-slate-100">
        
        {/* Subtle architectural ambient light */}
        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Security / Corporate Badge */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-inner">
          <i className="fa-solid fa-shield-halved text-2xl text-cyan-400"></i>
        </div>

        {/* App Title & Slogan */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-[11px] font-semibold text-slate-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>B2B ENTERPRISE ACCESS PORTAL</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white">
          EstateCopy<span className="text-cyan-400">AI</span> <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded ml-1">Enterprise</span>
        </h2>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
          Authorized access point for licensed real estate agencies, multi-tenant brokers, and marketing desks in Mantova and Suzzara.
        </p>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* Google Authentication Trigger */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-md hover:bg-slate-100 hover:border-slate-500 transition-all active:scale-[0.98] cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-notch fa-spin text-slate-700 text-base"></i>
                <span>Verifying Corporate Credentials...</span>
              </div>
            ) : (
              <>
                {/* Official Google G SVG Icon */}
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google Workspace</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <i className="fa-solid fa-server text-[10px] text-emerald-400"></i>
            <span>Firebase: <strong className="text-slate-300">estatecopy-enterprise</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">Live Project Connected</span>
          </div>

          <p className="text-[10.5px] text-slate-500">
            Client-side Firebase Google SSO • OAuth 2.0 Enterprise Protocol
          </p>
        </div>

        {/* Security Compliance Badges */}
        <div className="mt-8 pt-5 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400">
          <div className="flex flex-col items-center gap-1">
            <i className="fa-solid fa-lock text-slate-500"></i>
            <span>SOC2 Type II</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <i className="fa-solid fa-fingerprint text-slate-500"></i>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <i className="fa-solid fa-server text-slate-500"></i>
            <span>256-bit AES</span>
          </div>
        </div>

      </div>
    </div>
  );
};
