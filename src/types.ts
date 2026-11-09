export type WorkspaceLanguage = 'IT' | 'EN';

export type WorkspaceTenant = {
  id: string;
  name: string;
  icon: string;
  seats: number;
  monthlyLimit: number;
  usedThisMonth: number;
  branch: string;
};

export type TargetTone = 
  | 'luxury'
  | 'corporate'
  | 'enthusiastic'
  | 'family'
  | 'minimalist'
  | 'urgent';

export type PropertyType = 
  | 'Appartamento Signorile'
  | 'Villa Singola con Giardino'
  | 'Attico Panoramico'
  | 'Porzione di Bifamiliare'
  | 'Palazzina d’Epoca'
  | 'Ufficio / Spazio Commerciale';

export type TargetAudience = 
  | 'Famiglie / Residenti Locali'
  | 'Investitori Immobiliari'
  | 'Manager / Professionisti'
  | 'Giovani Coppie / Prima Casa'
  | 'Clientela di Pregio';

export type CallToActionType = 
  | 'Prenota una Visita Dedicata'
  | 'Open House con i Nostri Consulenti'
  | 'Richiedi la Brochure & Planimetrie'
  | 'Contatta la Nostra Sede di Mantova/Suzzara';

export interface PropertyDetails {
  language: WorkspaceLanguage;
  address: string;
  city: 'Suzzara' | 'Mantova' | 'Provincia';
  price: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: string;
  energyClass?: string;
  features: string[];
  customFeatureInput: string;
  tone: TargetTone;
  targetAudience: string;
  callToAction: string;
  agencyRef?: string;
}

export interface GeneratedSocialPosts {
  id: string;
  timestamp: number;
  propertyAddress: string;
  language: WorkspaceLanguage;
  tone: TargetTone;
  isAiGenerated: boolean;
  modelUsed?: string;
  instagram: {
    hook: string;
    body: string;
    callToAction: string;
    hashtags: string[];
    fullText: string;
  };
  facebook: {
    headline: string;
    body: string;
    highlights: string[];
    callToAction: string;
    fullText: string;
  };
  tiktok: {
    hook: string;
    musicVibe: string;
    scenes: Array<{
      time: string;
      visual: string;
      voiceover: string;
    }>;
    fullText: string;
  };
}

export interface PresetProperty {
  id: string;
  label: string;
  badge: string;
  emoji: string;
  city: 'Suzzara' | 'Mantova';
  data: Partial<PropertyDetails>;
}
