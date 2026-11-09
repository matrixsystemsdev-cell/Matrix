import React, { useState } from 'react';
import { PropertyDetails, WorkspaceLanguage, TargetTone } from '../types';
import { REGIONAL_PRESETS, REGIONAL_FEATURE_TAGS, TONE_DETAILS } from '../data/sampleListings';

interface EnterprisePropertyFormProps {
  property: PropertyDetails;
  onChange: (updated: PropertyDetails) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasApiKey: boolean;
}

export const EnterprisePropertyForm: React.FC<EnterprisePropertyFormProps> = ({
  property,
  onChange,
  onGenerate,
  isGenerating,
  hasApiKey
}) => {
  const [customTagInput, setCustomTagInput] = useState('');
  const isItalian = property.language === 'IT';

  // Toggle Language IT / EN
  const handleLanguageToggle = (lang: WorkspaceLanguage) => {
    onChange({
      ...property,
      language: lang,
      // If switching to EN or IT, adjust default CTA and target if needed
      callToAction: lang === 'IT' ? 'Prenota una Visita Dedicata' : 'Schedule a Private Showing',
      targetAudience: lang === 'IT' ? 'Famiglie / Residenti Locali' : 'Regional & Corporate Buyers'
    });
  };

  // Load Regional Target Preset
  const handleSelectPreset = (presetId: string) => {
    const selected = REGIONAL_PRESETS.find(p => p.id === presetId);
    if (selected && selected.data) {
      onChange({
        ...property,
        ...selected.data,
        language: property.language,
        city: selected.city,
        features: selected.data.features || []
      } as PropertyDetails);
    }
  };

  // Add custom feature
  const handleAddFeature = () => {
    const trimmed = customTagInput.trim();
    if (trimmed && !property.features.includes(trimmed)) {
      onChange({
        ...property,
        features: [...property.features, trimmed]
      });
      setCustomTagInput('');
    }
  };

  const handleKeyDownFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  // Toggle feature tag
  const handleToggleTag = (tag: string) => {
    const clean = tag.replace(/^[^\w\sÀ-ÿ]+\s*/, '');
    const exists = property.features.includes(clean) || property.features.includes(tag);
    if (exists) {
      onChange({
        ...property,
        features: property.features.filter(f => f !== clean && f !== tag)
      });
    } else {
      onChange({
        ...property,
        features: [...property.features, clean]
      });
    }
  };

  const handleRemoveFeature = (feat: string) => {
    onChange({
      ...property,
      features: property.features.filter(f => f !== feat)
    });
  };

  const currentFeatureTags = isItalian ? REGIONAL_FEATURE_TAGS.IT : REGIONAL_FEATURE_TAGS.EN;
  const currentTones = isItalian ? TONE_DETAILS.IT : TONE_DETAILS.EN;

  const propertyTypes = isItalian
    ? ['Appartamento Signorile', 'Attico Panoramico', 'Villa Singola con Giardino', 'Porzione di Bifamiliare', 'Rustico / Casale Ristrutturato', 'Spazio Commerciale / Ufficio']
    : ['Luxury Apartment', 'Panoramic Penthouse', 'Single Family Villa', 'Duplex / Semi-Detached', 'Historic Restored Farmhouse', 'Commercial Office Space'];

  const energyClasses = ['Classe A4', 'Classe A3', 'Classe A2', 'Classe A1', 'Classe B', 'Classe C', 'Classe D', 'Classe G / In Valutazione'];

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      
      {/* 4. DUAL-LANGUAGE LOCALIZED WORKSPACE TOGGLE & PRESET TARGETS */}
      <div className="flex flex-col gap-3 pb-3 border-b border-slate-800">
        
        {/* Language switch IT / EN */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-earth-europe text-cyan-400 text-sm"></i>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {isItalian ? 'Lingua Workspace' : 'Workspace Language'}
            </span>
          </div>

          {/* Toggle pill */}
          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 p-1">
            <button
              type="button"
              onClick={() => handleLanguageToggle('IT')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                isItalian
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇮🇹</span>
              <span>Italiano (IT)</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageToggle('EN')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                !isItalian
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇬🇧</span>
              <span>English (EN)</span>
            </button>
          </div>
        </div>

        {/* Regional Quick-Load Targets: "Suzzara Centro" & "Mantova Centro" */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <i className="fa-solid fa-crosshairs text-cyan-400 text-xs"></i>
            <span>{isItalian ? 'Preset Territoriali Rapidi:' : 'Regional Targets:'}</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {REGIONAL_PRESETS.map((preset) => {
              const isCurrent = property.address.includes(preset.city);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 shadow-sm'
                      : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:bg-slate-750'
                  }`}
                  title={`Carica scheda ${preset.label}`}
                >
                  <span>{preset.emoji}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Property Parameter Inputs */}
      <div className="space-y-3.5">
        
        {/* Address */}
        <div>
          <label className="mb-1 flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-cyan-400 text-xs"></i>
              <span>{isItalian ? 'Indirizzo Completo Immobile' : 'Property Address'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {property.city} & Provincia
            </span>
          </label>
          <input
            type="text"
            value={property.address}
            onChange={(e) => onChange({ ...property, address: e.target.value })}
            placeholder={isItalian ? "es. Piazza Garibaldi 14, 46029 Suzzara (MN)" : "e.g. Piazza Garibaldi 14, Suzzara (MN)"}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Price & Property Type */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <i className="fa-solid fa-euro-sign text-emerald-400 text-xs"></i>
              <span>{isItalian ? 'Prezzo Richiesto' : 'Asking Price'}</span>
            </label>
            <input
              type="text"
              value={property.price}
              onChange={(e) => onChange({ ...property, price: e.target.value })}
              placeholder={isItalian ? "es. € 185.000 o Trattativa Riservata" : "e.g. € 185,000"}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <i className="fa-solid fa-building text-indigo-400 text-xs"></i>
              <span>{isItalian ? 'Tipologia Immobile' : 'Property Type'}</span>
            </label>
            <select
              value={property.propertyType}
              onChange={(e) => onChange({ ...property, propertyType: e.target.value })}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {propertyTypes.map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-slate-100">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms, Bathrooms & Energy Class */}
        <div className="grid grid-cols-3 gap-2">
          {/* Bedrooms */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1">
              <i className="fa-solid fa-bed text-cyan-400 mr-1"></i>
              {isItalian ? 'Camere' : 'Beds'}
            </span>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...property, bedrooms: n })}
                  className={`h-6 w-6 rounded-md text-xs font-bold transition-all ${
                    property.bedrooms === n
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {n === 5 ? '5+' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1">
              <i className="fa-solid fa-bath text-indigo-400 mr-1"></i>
              {isItalian ? 'Bagni' : 'Baths'}
            </span>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...property, bathrooms: n })}
                  className={`h-6 w-6 rounded-md text-xs font-bold transition-all ${
                    property.bathrooms === n
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {n === 4 ? '4+' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Class */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2 text-center">
            <span className="text-[10px] font-bold text-slate-400 block mb-1">
              <i className="fa-solid fa-bolt text-emerald-400 mr-1"></i>
              {isItalian ? 'Classe En.' : 'Energy'}
            </span>
            <select
              value={property.energyClass || 'Classe A4'}
              onChange={(e) => onChange({ ...property, energyClass: e.target.value })}
              className="w-full rounded-md border border-slate-700 bg-slate-900 py-1 text-[11px] font-bold text-emerald-400 focus:outline-none"
            >
              {energyClasses.map((cls) => (
                <option key={cls} value={cls} className="bg-slate-900 text-slate-200">
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Standout Features & Regional Tags */}
        <div>
          <label className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-sparkles text-amber-400 text-xs"></i>
              <span>{isItalian ? 'Caratteristiche Tecniche & Dotazioni' : 'Key Property Highlights'}</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {property.features.length} {isItalian ? 'attive' : 'selected'}
            </span>
          </label>

          {/* Tag cloud */}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {currentFeatureTags.map((tag) => {
              const clean = tag.replace(/^[^\w\sÀ-ÿ]+\s*/, '');
              const isSelected = property.features.includes(clean) || property.features.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleTag(tag)}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/60 hover:text-slate-200 hover:bg-slate-750'
                  }`}
                >
                  {isSelected && <i className="fa-solid fa-check text-[10px] text-cyan-400"></i>}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Features list with delete */}
          {property.features.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1 rounded-xl border border-slate-800 bg-slate-950/60 p-2">
              {property.features.map((feat) => (
                <span
                  key={feat}
                  className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200 border border-slate-700"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feat)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add custom feature */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              onKeyDown={handleKeyDownFeature}
              placeholder={isItalian ? "Aggiungi specifica (es. Ristrutturato 2025, Cantina)..." : "Add custom amenity..."}
              className="flex-1 rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              + {isItalian ? 'Aggiungi' : 'Add'}
            </button>
          </div>
        </div>

        {/* Corporate Tone Selector */}
        <div>
          <label className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-bullhorn text-indigo-400 text-xs"></i>
              <span>{isItalian ? 'Tono di Voce Comunicazione' : 'Corporate Voice Tone'}</span>
            </span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {currentTones.map((t) => {
              const isSelected = property.tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChange({ ...property, tone: t.id })}
                  className={`flex flex-col items-start rounded-xl p-2.5 text-left transition-all ${
                    isSelected
                      ? 'border-2 border-cyan-500 bg-cyan-500/10 shadow-sm shadow-cyan-500/10'
                      : 'border border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <i className={`fa-solid ${t.icon} ${isSelected ? 'text-cyan-400' : 'text-slate-400'} text-xs`}></i>
                    <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-800/80 px-1 rounded">
                      {t.badge.split(' ')[0]}
                    </span>
                  </div>
                  <span className={`mt-1 text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {t.name}
                  </span>
                  <p className="mt-0.5 line-clamp-2 text-[10px] text-slate-400 leading-snug">
                    {t.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !property.address.trim()}
          className={`group relative flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold text-slate-950 shadow-lg transition-all ${
            !property.address.trim()
              ? 'cursor-not-allowed bg-slate-800 text-slate-500 border border-slate-700'
              : isGenerating
              ? 'bg-cyan-400 cursor-wait'
              : 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 hover:scale-[1.01] hover:shadow-cyan-500/25 active:scale-[0.99] cursor-pointer'
          }`}
        >
          {isGenerating ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin text-slate-950 text-base"></i>
              <span>{isItalian ? 'Generazione Campagna in Corso...' : 'Generating Enterprise Copy...'}</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles text-slate-950"></i>
              <span>{isItalian ? 'Genera Contenuti Social (Card A, B, C)' : 'Generate 3-Card Copy Package'}</span>
              <span className="ml-1 rounded bg-slate-950/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-900">
                {hasApiKey ? 'Gemini AI' : 'B2B Engine'}
              </span>
            </>
          )}
        </button>

        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>{isItalian ? 'Instagram • Facebook • TikTok / Reel' : 'Instagram • Facebook • TikTok / Reel'}</span>
          <span>{isItalian ? 'Target: Suzzara & Mantova' : 'Target: Suzzara & Mantova'}</span>
        </div>
      </div>

    </div>
  );
};
