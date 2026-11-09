import { PresetProperty, WorkspaceTenant } from '../types';

export const WORKSPACE_TENANTS: WorkspaceTenant[] = [
  {
    id: 'main_office',
    name: '🏢 Main Office Workspace',
    icon: 'fa-building',
    seats: 8,
    monthlyLimit: 500,
    usedThisMonth: 42,
    branch: 'Mantova HQ & Direzione'
  },
  {
    id: 'suzzara_branch',
    name: '📍 Filiale Suzzara Centro',
    icon: 'fa-map-pin',
    seats: 4,
    monthlyLimit: 250,
    usedThisMonth: 18,
    branch: 'Piazza Garibaldi, Suzzara'
  },
  {
    id: 'personal_desk',
    name: '💼 Personal Broker Desk',
    icon: 'fa-user-tie',
    seats: 1,
    monthlyLimit: 100,
    usedThisMonth: 9,
    branch: 'Agente Indipendente'
  }
];

export const REGIONAL_PRESETS: PresetProperty[] = [
  {
    id: 'suzzara_centro',
    label: 'Suzzara Centro',
    badge: 'Zona Piazza Garibaldi',
    emoji: '📍',
    city: 'Suzzara',
    data: {
      address: 'Piazza Garibaldi 14, 46029 Suzzara (MN)',
      city: 'Suzzara',
      price: '€ 185.000',
      propertyType: 'Appartamento Signorile',
      bedrooms: 3,
      bathrooms: 2,
      sqft: '135 mq',
      energyClass: 'Classe A2',
      features: [
        'Terrazzo coperto abitabile vista piazza',
        'Autorimessa doppia motorizzata e cantina',
        'Riscaldamento autonomo a pavimento con pompa di calore',
        'Palazzina servita da ascensore di recente costruzione',
        'Comodo a tutti i servizi: stazione FS, scuole e ospedale'
      ],
      tone: 'corporate',
      targetAudience: 'Famiglie / Residenti Locali',
      callToAction: 'Prenota una Visita Dedicata',
      agencyRef: 'RIF-SUZ-2026'
    }
  },
  {
    id: 'mantova_centro',
    label: 'Mantova Centro',
    badge: 'Vista Centro Storico & Laghi',
    emoji: '🏛️',
    city: 'Mantova',
    data: {
      address: 'Corso Vittorio Emanuele II, 46100 Mantova (MN)',
      city: 'Mantova',
      price: '€ 490.000',
      propertyType: 'Attico Panoramico',
      bedrooms: 4,
      bathrooms: 3,
      sqft: '220 mq',
      energyClass: 'Classe A4',
      features: [
        'Attico ultimo piano con spettacolare vista aperta sui laghi e campanili',
        'Soggiorno triplo con soffitti alti a cassettoni restaurati',
        'Suite padronale con bagno in marmo e cabina armadio',
        'Finiture di assoluto pregio, parquet in rovere massello spazzolato',
        'Doppio posto auto riservato in corte interna videosorvegliata'
      ],
      tone: 'luxury',
      targetAudience: 'Clientela di Pregio',
      callToAction: 'Richiedi la Brochure & Planimetrie',
      agencyRef: 'RIF-MN-ATTICO'
    }
  }
];

export const REGIONAL_FEATURE_TAGS = {
  IT: [
    '🌿 Terrazzo Abitabile',
    '🚗 Garage Doppio',
    '⚡ Classe Energetica A4',
    '🛗 Ascensore al Piano',
    '🔥 Riscaldamento a Pavimento',
    '🏛️ Centro Storico',
    '🌊 Vista Laghi di Mantova',
    '❄️ Climatizzazione Idronica',
    '🪵 Parquet Pregiato',
    '☀️ Pannelli Fotovoltaici',
    '🔒 Allarme & Domotica',
    '🏡 Giardino Esclusivo'
  ],
  EN: [
    '🌿 Covered Terrace',
    '🚗 Double Garage',
    '⚡ A4 Energy Class',
    '🛗 Direct Elevator',
    '🔥 Underfloor Heating',
    '🏛️ Historic Center',
    '🌊 Mantua Lake Views',
    '❄️ Ducted AC System',
    '🪵 Oak Hardwood Floors',
    '☀️ Solar Panel Array',
    '🔒 Smart Home Automation',
    '🏡 Private Garden'
  ]
};

export const TONE_DETAILS = {
  IT: [
    {
      id: 'corporate' as const,
      name: 'Istituzionale & Corporate',
      badge: 'Professionale B2B',
      description: 'Linguaggio curato per agenzie immobiliari strutturate, affidabile e trasparente.',
      icon: 'fa-briefcase'
    },
    {
      id: 'luxury' as const,
      name: 'Prestigio & Luxury',
      badge: 'Alto Livello',
      description: 'Vocabolario ricercato, valorizzazione dei materiali nobili e dell’esclusività.',
      icon: 'fa-gem'
    },
    {
      id: 'enthusiastic' as const,
      name: 'Dinamico & Virale',
      badge: 'Social / Trend',
      description: 'Ritmo veloce, emoji mirate, ideale per catturare attenzione immediata su Reels e TikTok.',
      icon: 'fa-fire'
    },
    {
      id: 'family' as const,
      name: 'Residenziale & Famiglia',
      badge: 'Accogliente',
      description: 'Pone al centro vicinanza a scuole, spazi ampi, comodità e serenità domestica.',
      icon: 'fa-house-user'
    },
    {
      id: 'minimalist' as const,
      name: 'Architettonico & Moderno',
      badge: 'Design Pulito',
      description: 'Focus sulle linee, luminosità naturale e razionalità della pianta.',
      icon: 'fa-ruler-combined'
    },
    {
      id: 'urgent' as const,
      name: 'Nuova Acquisizione / Urgente',
      badge: 'Appena Acquisito',
      description: 'Crea senso di opportunità irripetibile sul mercato di Mantova e Suzzara.',
      icon: 'fa-bolt'
    }
  ],
  EN: [
    {
      id: 'corporate' as const,
      name: 'Institutional & Corporate',
      badge: 'B2B Professional',
      description: 'Structured, trustworthy tone engineered for top-tier brokerage firms.',
      icon: 'fa-briefcase'
    },
    {
      id: 'luxury' as const,
      name: 'Luxury & Prestigious',
      badge: 'High-End',
      description: 'Elevated narrative highlighting rare finishes and architectural pedigree.',
      icon: 'fa-gem'
    },
    {
      id: 'enthusiastic' as const,
      name: 'High-Energy & Viral',
      badge: 'Trending Social',
      description: 'Punchy hooks, engaging cadence, optimized for TikTok and Reels conversions.',
      icon: 'fa-fire'
    },
    {
      id: 'family' as const,
      name: 'Warm & Residential',
      badge: 'Family Focus',
      description: 'Focuses on living convenience, neighborhood amenities, and future memories.',
      icon: 'fa-house-user'
    },
    {
      id: 'minimalist' as const,
      name: 'Modern & Architectural',
      badge: 'Clean Lines',
      description: 'Emphasizes spatial design, daylighting, and contemporary aesthetics.',
      icon: 'fa-ruler-combined'
    },
    {
      id: 'urgent' as const,
      name: 'Just Listed & Exclusive',
      badge: 'Prime Opportunity',
      description: 'Drives immediate inquiry and urgency for newly listed regional inventory.',
      icon: 'fa-bolt'
    }
  ]
};
