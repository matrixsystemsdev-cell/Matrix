import React, { useState } from 'react';
import { GeneratedSocialPosts } from '../types';

interface EnterpriseOutputWorkspaceProps {
  posts: GeneratedSocialPosts | null;
  isGenerating: boolean;
  onRegenerate: () => void;
}

type ViewMode = 'tabs' | 'cards';
type TabType = 'instagram' | 'facebook' | 'tiktok';

export const EnterpriseOutputWorkspace: React.FC<EnterpriseOutputWorkspaceProps> = ({
  posts,
  isGenerating,
  onRegenerate
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [activeTab, setActiveTab] = useState<TabType>('instagram');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedIg, setEditedIg] = useState<string>('');
  const [editedFb, setEditedFb] = useState<string>('');
  const [editedTt, setEditedTt] = useState<string>('');
  const [showPhoneMockup, setShowPhoneMockup] = useState<boolean>(false);

  // Sync edits
  React.useEffect(() => {
    if (posts) {
      setEditedIg(posts.instagram.fullText);
      setEditedFb(posts.facebook.fullText);
      setEditedTt(posts.tiktok.fullText);
    }
  }, [posts]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const downloadAllTxt = () => {
    if (!posts) return;
    const isItalian = posts.language === 'IT';
    const content = `=================================================================
ESTATECOPYAI ENTERPRISE - B2B SOCIAL MEDIA MARKETING PACKAGE
Immobile: ${posts.propertyAddress}
Lingua / Language: ${posts.language}
Data / Date: ${new Date(posts.timestamp).toLocaleString()}
Engine: ${posts.modelUsed || 'EstateCopyAI Corporate'}
=================================================================

CARD A • ${isItalian ? 'CAPTION INSTAGRAM PREMIUM' : 'PREMIUM INSTAGRAM CAPTION'}
-----------------------------------------------------------------
${isEditing ? editedIg : posts.instagram.fullText}

=================================================================
CARD B • ${isItalian ? 'COMUNICAZIONE FACEBOOK CORPORATE COMMUNITY' : 'CORPORATE FACEBOOK ANNOUNCEMENT'}
-----------------------------------------------------------------
${isEditing ? editedFb : posts.facebook.fullText}

=================================================================
CARD C • ${isItalian ? 'OUTLINE VIDEO SCRIPT TIKTOK / REEL VIRALE' : 'VIRAL TIKTOK / REEL VIDEO SCRIPT'}
-----------------------------------------------------------------
${isEditing ? editedTt : posts.tiktok.fullText}
=================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EstateCopyAI_${posts.propertyAddress.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading skeleton
  if (isGenerating) {
    return (
      <div className="flex min-h-[550px] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-sm">
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-lg shadow-cyan-500/30">
            <i className="fa-solid fa-wand-magic-sparkles text-xl text-white"></i>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white">Generazione Copy B2B in Corso...</h3>
        <p className="mt-2 max-w-md text-xs text-slate-400 leading-relaxed">
          Formattazione Card A (Instagram con hashtag regionali Mantova/Suzzara), Card B (Facebook Corporate) e Card C (Script TikTok/Reels con scene e voiceover).
        </p>

        <div className="mt-8 w-full max-w-xs space-y-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-3/4 animate-pulse rounded-full bg-cyan-400" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Card A, B, C Engine</span>
            <span className="text-cyan-400 font-mono">Elaborazione...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!posts) {
    return (
      <div className="flex min-h-[550px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 text-cyan-400 mb-4 shadow-inner">
          <i className="fa-solid fa-building-circle-check text-2xl"></i>
        </div>
        <h3 className="text-base font-bold text-slate-200">Nessuna Campagna Generata</h3>
        <p className="mt-1.5 max-w-sm text-xs text-slate-400 leading-relaxed">
          Seleziona uno dei preset regionali (<strong>Suzzara Centro</strong> o <strong>Mantova Centro</strong>) a sinistra e clicca su <strong>Genera Contenuti Social</strong>.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3 max-w-lg w-full text-left">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
            <div className="text-pink-400 font-bold text-xs mb-1 flex items-center gap-1.5">
              <i className="fa-brands fa-instagram"></i>
              <span>Card A: Instagram</span>
            </div>
            <p className="text-[11px] text-slate-400">Caption premium con hashtag territoriali (#Suzzara #Mantova).</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
            <div className="text-blue-400 font-bold text-xs mb-1 flex items-center gap-1.5">
              <i className="fa-brands fa-facebook-f"></i>
              <span>Card B: Facebook</span>
            </div>
            <p className="text-[11px] text-slate-400">Annuncio corporate, punti tecnici e contatto per visite.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
            <div className="text-cyan-400 font-bold text-xs mb-1 flex items-center gap-1.5">
              <i className="fa-brands fa-tiktok"></i>
              <span>Card C: TikTok / Reel</span>
            </div>
            <p className="text-[11px] text-slate-400">Script virale 30s con scene camera, audio vibe e voiceover.</p>
          </div>
        </div>
      </div>
    );
  }

  const isItalian = posts.language === 'IT';
  const currentIgText = isEditing ? editedIg : posts.instagram.fullText;
  const currentFbText = isEditing ? editedFb : posts.facebook.fullText;
  const currentTtText = isEditing ? editedTt : posts.tiktok.fullText;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      
      {/* Top Workspace Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-folder-closed text-cyan-400"></i>
              <span>Enterprise Campaign Output</span>
            </h2>
            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <i className="fa-solid fa-check text-[9px]"></i>
              <span>{isItalian ? 'Pronto all\'Uso' : 'Ready'}</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
            {posts.propertyAddress} • {isItalian ? 'Tono' : 'Tone'}: <span className="text-cyan-400 font-medium capitalize">{posts.tone}</span>
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* View mode toggle: 3-Card Stack vs Tabs */}
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === 'cards'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualizza tutte e 3 le Card in serie"
            >
              <i className="fa-solid fa-table-cells-large mr-1 text-[10px]"></i>
              <span>{isItalian ? '3 Card Dedicate' : '3-Card Stack'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tabs')}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === 'tabs'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualizza scheda per scheda"
            >
              <i className="fa-solid fa-table-columns mr-1 text-[10px]"></i>
              <span>{isItalian ? 'Tab Singoli' : 'Tabs'}</span>
            </button>
          </div>

          {/* Edit toggle */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
              isEditing 
                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <i className="fa-solid fa-pen-to-square text-xs"></i>
            <span className="hidden sm:inline">{isEditing ? 'Fine Modifica' : 'Modifica Testo'}</span>
          </button>

          {/* Download TXT */}
          <button
            type="button"
            onClick={downloadAllTxt}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-750 hover:text-white transition-colors"
            title="Scarica intero pacchetto in formato TXT"
          >
            <i className="fa-solid fa-download text-xs"></i>
            <span className="hidden sm:inline">Export .TXT</span>
          </button>

          {/* Regenerate */}
          <button
            type="button"
            onClick={onRegenerate}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-750 hover:text-white transition-colors"
            title="Rigenera"
          >
            <i className="fa-solid fa-rotate-right text-xs"></i>
          </button>

        </div>
      </div>

      {/* Model & Source Meta Banner */}
      <div className="flex items-center justify-between rounded-xl bg-slate-950/80 px-3 py-1.5 text-xs border border-slate-800">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-circle-check text-cyan-400 text-xs"></i>
          <span className="text-slate-400 text-[11px]">{isItalian ? 'Motore Utilizzato:' : 'Engine:'}</span>
          <span className="font-semibold text-slate-200 text-[11px]">{posts.modelUsed || 'Gemini Enterprise'}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[10px] text-cyan-300 border border-slate-700">
            {posts.language}
          </span>
          <span>{new Date(posts.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* TABS SELECTOR (when in tabs mode) */}
      {viewMode === 'tabs' && (
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'instagram'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className="fa-brands fa-instagram text-pink-400"></i>
            <span>Card A: Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('facebook')}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'facebook'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className="fa-brands fa-facebook-f text-blue-400"></i>
            <span>Card B: Facebook</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tiktok')}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'tiktok'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className="fa-brands fa-tiktok text-cyan-400"></i>
            <span>Card C: TikTok / Reel</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          CARD A: PREMIUM INSTAGRAM CAPTION (Complete with local hashtags)
         ========================================================================= */}
      {(viewMode === 'cards' || activeTab === 'instagram') && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 space-y-3.5 shadow-md">
          
          {/* Card A Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
                <i className="fa-brands fa-instagram text-sm"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-pink-400">
                    Card A • {isItalian ? 'Instagram Caption Premium' : 'Premium Instagram Caption'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {currentIgText.length} caratteri
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isItalian ? 'Hook ad alto engagement, narrazione territoriale e cluster hashtag Mantova/Suzzara' : 'High-engagement hook, local narrative and regional hashtag cluster'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPhoneMockup(!showPhoneMockup)}
                className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:text-white"
                title="Mockup Smartphone"
              >
                <i className="fa-solid fa-mobile-screen-button text-xs"></i>
                <span className="text-[11px]">{showPhoneMockup ? 'Testo' : 'Preview Phone'}</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(currentIgText, 'card_a')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                  copiedKey === 'card_a'
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-pink-500/20'
                }`}
              >
                {copiedKey === 'card_a' ? (
                  <>
                    <i className="fa-solid fa-check"></i>
                    <span>Copiato!</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-copy"></i>
                    <span>Copia Card A</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card A Content */}
          {isEditing ? (
            <textarea
              value={editedIg}
              onChange={(e) => setEditedIg(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3.5 text-xs text-slate-100 font-mono leading-relaxed focus:border-pink-500 focus:outline-none"
            />
          ) : (
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
              {currentIgText}
            </div>
          )}

          {/* Optimized Regional Hashtags */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <i className="fa-solid fa-hashtag text-pink-400 text-xs"></i>
                <span>{isItalian ? 'Hashtag Locali Ottimizzati Mantova & Suzzara' : 'Regional Local Hashtags'}</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(posts.instagram.hashtags.join(' '), 'tags_only')}
                className="text-[10px] text-cyan-400 hover:underline"
              >
                {copiedKey === 'tags_only' ? 'Copiati!' : 'Copia Solo Hashtag'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {posts.instagram.hashtags.map((h) => (
                <span
                  key={h}
                  className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-pink-300 border border-slate-700/80"
                >
                  {h.startsWith('#') ? h : `#${h}`}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          CARD B: CORPORATE FACEBOOK COMMUNITY ENGAGEMENT ANNOUNCEMENT
         ========================================================================= */}
      {(viewMode === 'cards' || activeTab === 'facebook') && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 space-y-3.5 shadow-md">
          
          {/* Card B Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">
                    Card B • {isItalian ? 'Comunicazione Corporate Facebook' : 'Corporate Facebook Announcement'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {currentFbText.length} caratteri
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isItalian ? 'Annuncio formale per investitori territoriali, scheda punti tecnici e richiesta visite' : 'Formal B2B announcement with technical specs and visit scheduling'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(currentFbText, 'card_b')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                copiedKey === 'card_b'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
              }`}
            >
              {copiedKey === 'card_b' ? (
                <>
                  <i className="fa-solid fa-check"></i>
                  <span>Copiato!</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-copy"></i>
                  <span>Copia Card B</span>
                </>
              )}
            </button>
          </div>

          {/* Card B Content */}
          {isEditing ? (
            <textarea
              value={editedFb}
              onChange={(e) => setEditedFb(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3.5 text-xs text-slate-100 font-mono leading-relaxed focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
              {currentFbText}
            </div>
          )}

          {/* Highlights checklist */}
          {posts.facebook.highlights && posts.facebook.highlights.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                {isItalian ? 'Punti Tecnici Inclusi:' : 'Included Technical Highlights:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                {posts.facebook.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          CARD C: VIRAL TIKTOK / REEL VIDEO SCRIPT OUTLINE
         ========================================================================= */}
      {(viewMode === 'cards' || activeTab === 'tiktok') && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 space-y-3.5 shadow-md">
          
          {/* Card C Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <i className="fa-brands fa-tiktok text-sm"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                    Card C • {isItalian ? 'Outline Video Script TikTok & Reel Virale' : 'Viral TikTok / Reel Video Script'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    30-35s Runtime
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isItalian ? 'Tagli di scena visivi, indicazioni di regia, audio consigliato e battute voiceover' : 'Visual scene cuts, camera directions, recommended audio and voiceover lines'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(currentTtText, 'card_c')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-md cursor-pointer ${
                copiedKey === 'card_c'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-extrabold shadow-cyan-500/20'
              }`}
            >
              {copiedKey === 'card_c' ? (
                <>
                  <i className="fa-solid fa-check"></i>
                  <span>Copiato!</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-copy"></i>
                  <span>Copia Card C</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Director Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
              <i className="fa-solid fa-music text-cyan-400 text-xs"></i>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isItalian ? 'Soundtrack Consigliato' : 'Audio Vibe'}</p>
                <p className="text-xs font-semibold text-slate-200 truncate">{posts.tiktok.musicVibe}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
              <i className="fa-solid fa-bolt text-amber-400 text-xs"></i>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-slate-400">{isItalian ? 'Hook di Apertura (0-3s)' : '3-Sec Viral Hook'}</p>
                <p className="text-xs font-semibold text-amber-300 truncate italic">"{posts.tiktok.hook}"</p>
              </div>
            </div>
          </div>

          {/* Timeline of Scenes */}
          {isEditing ? (
            <textarea
              value={editedTt}
              onChange={(e) => setEditedTt(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3.5 text-xs text-slate-100 font-mono leading-relaxed focus:border-cyan-500 focus:outline-none"
            />
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {posts.tiktok.scenes && posts.tiktok.scenes.length > 0 ? (
                posts.tiktok.scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 space-y-1.5 transition-colors hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                        <i className="fa-regular fa-clock text-xs"></i>
                        <span>{scene.time}</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Scena {idx + 1}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      <strong className="text-pink-400 mr-1.5 font-bold">
                        <i className="fa-solid fa-video mr-1"></i>
                        {isItalian ? 'RIPRESA / REGIA:' : 'VISUAL CUT:'}
                      </strong>
                      <span>{scene.visual}</span>
                    </div>

                    <div className="rounded-lg bg-slate-950 p-2 text-xs text-slate-100 border border-slate-800/80">
                      <strong className="text-amber-400 mr-1.5 font-bold">
                        <i className="fa-solid fa-microphone mr-1"></i>
                        {isItalian ? 'VOICEOVER / PARLATO:' : 'VOICEOVER:'}
                      </strong>
                      <span className="italic">"{scene.voiceover}"</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {currentTtText}
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
