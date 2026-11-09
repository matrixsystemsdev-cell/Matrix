import React, { useState } from 'react';
import { EnterpriseUser, signOutUser } from '../services/firebaseAuth';
import { WorkspaceTenant } from '../types';
import { WORKSPACE_TENANTS } from '../data/sampleListings';

interface EnterpriseHeaderProps {
  user: EnterpriseUser | null;
  onSignOut: () => void;
  onOpenLoginModal: () => void;
  activeWorkspace: WorkspaceTenant;
  onSelectWorkspace: (tenant: WorkspaceTenant) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  generationsCount: number;
}

export const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({
  user,
  onSignOut,
  onOpenLoginModal,
  activeWorkspace,
  onSelectWorkspace,
  apiKey,
  onApiKeyChange,
  generationsCount
}) => {
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);

  const handleSignOutClick = async () => {
    setShowProfileDropdown(false);
    await signOutUser();
    onSignOut();
  };

  const currentUsed = activeWorkspace.usedThisMonth + generationsCount;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        
        {/* Left: Brand & Workspace Multi-tenant Selector */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-slate-900 border border-cyan-500/30 shadow-sm shadow-cyan-500/10">
              <i className="fa-solid fa-city text-white text-sm"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base font-extrabold tracking-tight text-white">EstateCopy<span className="text-cyan-400">AI</span></span>
                <span className="rounded bg-slate-800/90 px-1.5 py-0.5 text-[9px] font-bold text-slate-300 border border-slate-700 uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <span className="text-[10px] text-slate-400">B2B Real Estate Copywriter</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* Multi-Tenant Workspace Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:bg-slate-850 transition-colors"
            >
              <i className={`fa-solid ${activeWorkspace.icon} text-cyan-400 text-xs`}></i>
              <span className="max-w-[150px] sm:max-w-[180px] truncate">{activeWorkspace.name}</span>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-1"></i>
            </button>

            {showWorkspaceDropdown && (
              <div className="absolute left-0 top-10 z-50 w-72 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                  Seleziona Workspace / Filiale
                </div>
                {WORKSPACE_TENANTS.map((tenant) => (
                  <button
                    key={tenant.id}
                    type="button"
                    onClick={() => {
                      onSelectWorkspace(tenant);
                      setShowWorkspaceDropdown(false);
                    }}
                    className={`flex w-full items-start gap-2.5 rounded-lg p-2 text-left text-xs transition-colors ${
                      activeWorkspace.id === tenant.id
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <i className={`fa-solid ${tenant.icon} text-cyan-400 mt-0.5`}></i>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{tenant.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{tenant.branch} • {tenant.seats} Postazioni</div>
                    </div>
                    {activeWorkspace.id === tenant.id && (
                      <i className="fa-solid fa-check text-cyan-400 text-xs mt-0.5"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Center: Workspace Stats Bar (Team Monthly Generations & Active Agency Seats) */}
        <div className="hidden lg:flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-1.5 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-slate-400 text-[11px]">Generations Used:</span>
            <span className="font-mono font-bold text-slate-200">
              {currentUsed} <span className="text-slate-500 font-normal">/ Unlimited</span>
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-user-group text-slate-400 text-xs"></i>
            <span className="text-slate-400 text-[11px]">Agency Seats:</span>
            <span className="font-mono font-bold text-cyan-400">
              {activeWorkspace.seats} Attivi
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <i className="fa-solid fa-bolt"></i>
            <span>B2B Enterprise License</span>
          </div>

        </div>

        {/* Right: API Key Toggle & Google Auth Widget */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Gemini API Key Collapsible Bar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                apiKey.trim()
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
              title="Configure Gemini API Key"
            >
              <i className="fa-solid fa-key text-xs"></i>
              <span className="hidden sm:inline">{apiKey.trim() ? 'Gemini API' : 'API Key'}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${apiKey.trim() ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
            </button>

            {showApiKeyInput && (
              <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <i className="fa-solid fa-microchip text-cyan-400"></i>
                    Gemini API Settings
                  </span>
                  <button onClick={() => setShowApiKeyInput(false)} className="text-slate-400 hover:text-white text-xs">
                    ✕
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Runs directly in your browser. Stored securely in client local storage.
                </p>
                <div className="mt-2.5 flex items-center rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5">
                  <input
                    type={showKeyText ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => onApiKeyChange(e.target.value)}
                    placeholder="Incolla chiave API Gemini..."
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyText(!showKeyText)}
                    className="ml-1 text-slate-400 hover:text-white"
                  >
                    <i className={`fa-solid ${showKeyText ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 block text-center text-[10px] text-cyan-400 hover:underline"
                >
                  Ottieni chiave gratuita da Google AI Studio →
                </a>
              </div>
            )}
          </div>

          {/* User Profile Dropdown or Sign In */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 pl-1.5 pr-2.5 py-1 hover:border-slate-700 transition-colors"
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-6 w-6 rounded-lg object-cover border border-slate-700"
                  onError={(e) => {
                    // Fallback to avatar if blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-none text-slate-100 truncate max-w-[110px]">
                    {user.displayName}
                  </div>
                  <div className="text-[10px] text-cyan-400 leading-none mt-0.5 font-medium">
                    Google Verified
                  </div>
                </div>
                <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-0.5"></i>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-10 z-50 w-64 rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-10 w-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{user.displayName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                      <span className="inline-block mt-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 border border-emerald-500/30">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-2 text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Filiale:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[140px]">{user.agencyBranch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autenticazione:</span>
                      <span className="text-cyan-400 font-medium">Firebase Google SSO</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignOutClick}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 py-2 text-xs font-semibold transition-colors"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Sign Out (Disconnetti)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 text-xs font-bold text-white transition-all shadow-sm shadow-cyan-600/30"
            >
              <i className="fa-brands fa-google text-xs"></i>
              <span>Sign in with Google</span>
            </button>
          )}

        </div>

      </div>

      {/* Mobile Stats Bar */}
      <div className="lg:hidden flex items-center justify-between border-t border-slate-800/60 bg-slate-900/40 px-4 py-1.5 text-[11px] text-slate-400">
        <div>
          Generazioni: <strong className="text-slate-200">{currentUsed}</strong> / Unlimited
        </div>
        <div>
          Postazioni: <strong className="text-cyan-400">{activeWorkspace.seats} Attive</strong>
        </div>
      </div>
    </header>
  );
};
