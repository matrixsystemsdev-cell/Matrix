import React, { useState, useEffect, useCallback } from 'react';
import { EnterpriseHeader } from './components/EnterpriseHeader';
import { EnterprisePropertyForm } from './components/EnterprisePropertyForm';
import { EnterpriseOutputWorkspace } from './components/EnterpriseOutputWorkspace';
import { EnterpriseAuthModal } from './components/EnterpriseAuthModal';
import { PropertyDetails, GeneratedSocialPosts, WorkspaceTenant } from './types';
import { WORKSPACE_TENANTS, REGIONAL_PRESETS } from './data/sampleListings';
import { generatePostsWithGemini, generateLocalCopy } from './services/geminiService';
import { EnterpriseUser, subscribeAuth, getStoredUser } from './services/firebaseAuth';

const LOCAL_STORAGE_KEY = 'estatecopy_gemini_api_key';
const LOCAL_STORAGE_HISTORY = 'estatecopy_enterprise_history';

export default function App() {
  // 1. Authentication State
  const [user, setUser] = useState<EnterpriseUser | null>(() => getStoredUser());
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Subscribe to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = subscribeAuth((authUser) => {
      setUser(authUser);
      if (!authUser) {
        setShowAuthModal(true);
      } else {
        setShowAuthModal(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Multi-tenant Workspace State
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTenant>(WORKSPACE_TENANTS[0]);
  const [sessionGenerations, setSessionGenerations] = useState<number>(0);

  // 3. Gemini API Key
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
  });

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem(LOCAL_STORAGE_KEY, key);
  };

  // 4. Property Form State (Default: Suzzara Centro)
  const [property, setProperty] = useState<PropertyDetails>(() => {
    const defaultPreset = REGIONAL_PRESETS[0];
    return {
      language: 'IT',
      address: defaultPreset.data.address || 'Piazza Garibaldi 14, 46029 Suzzara (MN)',
      city: defaultPreset.city,
      price: defaultPreset.data.price || '€ 185.000',
      propertyType: defaultPreset.data.propertyType || 'Appartamento Signorile',
      bedrooms: defaultPreset.data.bedrooms || 3,
      bathrooms: defaultPreset.data.bathrooms || 2,
      sqft: defaultPreset.data.sqft || '135 mq',
      energyClass: defaultPreset.data.energyClass || 'Classe A2',
      features: defaultPreset.data.features || [
        'Terrazzo coperto abitabile vista piazza',
        'Autorimessa doppia motorizzata e cantina',
        'Riscaldamento autonomo a pavimento con pompa di calore',
        'Palazzina servita da ascensore di recente costruzione'
      ],
      customFeatureInput: '',
      tone: defaultPreset.data.tone || 'corporate',
      targetAudience: defaultPreset.data.targetAudience || 'Famiglie / Residenti Locali',
      callToAction: defaultPreset.data.callToAction || 'Prenota una Visita Dedicata',
      agencyRef: defaultPreset.data.agencyRef || 'RIF-SUZ-2026'
    };
  });

  // 5. Output Posts & History
  const [posts, setPosts] = useState<GeneratedSocialPosts | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Initial demo generation so workspace is populated
  useEffect(() => {
    if (!posts) {
      const initial = generateLocalCopy(property);
      setPosts(initial);
    }
  }, []);

  // Primary Generation Handler
  const handleGenerate = useCallback(async () => {
    if (!property.address.trim()) {
      showToast('Inserisci un indirizzo per l\'immobile.', 'error');
      return;
    }

    setIsGenerating(true);

    try {
      let result: GeneratedSocialPosts;

      if (apiKey.trim()) {
        try {
          result = await generatePostsWithGemini(property, apiKey);
          showToast('Campagna generata con successo tramite Gemini Enterprise AI!', 'success');
        } catch (apiError: any) {
          console.warn('Gemini fallback to corporate engine:', apiError);
          showToast(`Avviso Gemini API: ${apiError.message}. Utilizzo motore B2B integrato.`, 'info');
          result = generateLocalCopy(property);
        }
      } else {
        await new Promise((r) => setTimeout(r, 700));
        result = generateLocalCopy(property);
        showToast('Campagna generata con successo dal Motore Corporate!', 'success');
      }

      setPosts(result);
      setSessionGenerations((prev) => prev + 1);

      // Save to history in localStorage
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY);
        const existing = raw ? JSON.parse(raw) : [];
        const updated = [result, ...existing.filter((item: GeneratedSocialPosts) => item.propertyAddress !== result.propertyAddress)].slice(0, 15);
        localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(updated));
      } catch (e) {
        console.warn('History storage note:', e);
      }
    } catch (err: any) {
      showToast(err.message || 'Errore durante la generazione.', 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [property, apiKey]);

  // Keyboard shortcut (Cmd/Ctrl + Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const handleSignOut = () => {
    setUser(null);
    setShowAuthModal(true);
    showToast('Sessione chiusa con successo.', 'info');
  };

  const handleAuthSuccess = (authenticatedUser: EnterpriseUser) => {
    setUser(authenticatedUser);
    setShowAuthModal(false);
    showToast(`Accesso autorizzato: benvenuto ${authenticatedUser.displayName}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 2 & 3. Enterprise Header: Multi-tenant selector, stats bar & Google Auth widget */}
      <EnterpriseHeader
        user={user}
        onSignOut={handleSignOut}
        onOpenLoginModal={() => setShowAuthModal(true)}
        activeWorkspace={activeWorkspace}
        onSelectWorkspace={(tenant) => {
          setActiveWorkspace(tenant);
          showToast(`Workspace cambiato: ${tenant.name}`, 'info');
        }}
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        generationsCount={sessionGenerations}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' && <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>}
          {toastMessage.type === 'error' && <i className="fa-solid fa-triangle-exclamation text-rose-400 text-sm"></i>}
          {toastMessage.type === 'info' && <i className="fa-solid fa-circle-info text-cyan-400 text-sm"></i>}
          <span className="text-slate-200">{toastMessage.text}</span>
        </div>
      )}

      {/* Main Workspace Container */}
      <main className={`flex-1 mx-auto max-w-7xl w-full px-4 py-5 sm:px-6 sm:py-6 transition-all duration-300 ${!user ? 'blur-md pointer-events-none select-none filter' : ''}`}>
        
        {/* Workspace Breadcrumbs & Territorial Scope */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 sm:px-5">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <i className="fa-solid fa-network-wired text-cyan-400"></i>
              <span>{activeWorkspace.branch}</span>
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 font-bold">
              {property.city} ({property.language === 'IT' ? 'Mercato Lombardia' : 'Lombardy Region'})
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] font-mono text-slate-300">Enterprise Cloud Online</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-[11px] text-slate-400">
              Scorciatoia: <kbd className="rounded bg-slate-800 px-1 py-0.5 text-[10px] text-slate-300 border border-slate-700">Ctrl + Enter</kbd>
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Left inputs (5 cols), Right outputs (7 cols) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          
          {/* Left Column: Localized Enterprise Parameters */}
          <div className="lg:col-span-5">
            <EnterprisePropertyForm
              property={property}
              onChange={setProperty}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              hasApiKey={Boolean(apiKey.trim())}
            />
          </div>

          {/* Right Column: Output Workspace (Card A, Card B, Card C) */}
          <div className="lg:col-span-7">
            <EnterpriseOutputWorkspace
              posts={posts}
              isGenerating={isGenerating}
              onRegenerate={handleGenerate}
            />
          </div>

        </div>

      </main>

      {/* Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-3.5 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-[11px]">
            <i className="fa-solid fa-shield-halved text-cyan-400"></i>
            <span className="font-bold text-slate-300">EstateCopyAI Enterprise</span>
            <span>— Piattaforma B2B per Agenzie Immobiliari (Mantova & Suzzara)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Client-side Firebase Auth</span>
            <span>•</span>
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </footer>

      {/* 2. Authentication Modal (Blurs the workspace when unauthenticated) */}
      <EnterpriseAuthModal
        isOpen={showAuthModal || !user}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
}
