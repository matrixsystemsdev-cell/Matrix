import { PropertyDetails, GeneratedSocialPosts } from '../types';

/**
 * Format full texts cleanly for clipboard and export
 */
function buildFullTexts(data: {
  instagram: { hook: string; body: string; callToAction: string; hashtags: string[] };
  facebook: { headline: string; body: string; highlights: string[]; callToAction: string };
  tiktok: { hook: string; musicVibe: string; scenes: Array<{ time: string; visual: string; voiceover: string }> };
}, isItalian: boolean) {
  const hashtagsFormatted = data.instagram.hashtags
    .map(h => (h.startsWith('#') ? h : `#${h}`))
    .join(' ');

  const instagramFull = `${data.instagram.hook}

${data.instagram.body}

${data.instagram.callToAction}

${hashtagsFormatted}`;

  const fbHighlights = data.facebook.highlights.map(h => `▫️ ${h}`).join('\n');
  const facebookFull = `${data.facebook.headline}

${data.facebook.body}

${isItalian ? 'SCHEDA TECNICA & CARATTERISTICHE DI PREGIO:' : 'KEY PROPERTY HIGHLIGHTS:'}
${fbHighlights}

${data.facebook.callToAction}`;

  const tiktokScenes = data.tiktok.scenes
    .map(s => `[${s.time}]
🎥 ${isItalian ? 'RIPRESA / SCENA' : 'VISUAL'}: ${s.visual}
🎙️ ${isItalian ? 'VOCE / SCRIPT' : 'VOICEOVER'}: "${s.voiceover}"`)
    .join('\n\n');

  const tiktokFull = `🎬 ${isItalian ? 'OUTLINE VIDEO TIKTOK / REEL VIRALE' : 'VIRAL TIKTOK / REEL VIDEO SCRIPT'}
🎵 ${isItalian ? 'SOUNDTRACK / VIBE CONSIGLIATO' : 'RECOMMENDED AUDIO'}: ${data.tiktok.musicVibe}
⚡ ${isItalian ? 'HOOK DIRETTO (0-3s)' : 'OPENING HOOK (0-3s)'}: "${data.tiktok.hook}"

${tiktokScenes}

👉 ${isItalian ? 'CALL TO ACTION FINALE' : 'FINAL CALL TO ACTION'}: ${data.instagram.callToAction}`;

  return {
    instagramFull,
    facebookFull,
    tiktokFull
  };
}

/**
 * Enterprise Local Generator with deep Italian / Regional Mantova & Suzzara nuances
 */
export function generateLocalCopy(property: PropertyDetails): GeneratedSocialPosts {
  const { address, city, price, bedrooms, bathrooms, features, tone, targetAudience, callToAction, propertyType, language, energyClass } = property;
  const isItalian = language === 'IT';
  const featureList = features.length > 0 ? features : (
    isItalian 
      ? ['Finiture di pregio', 'Spazi ampi e luminosi', 'Comodo a tutti i servizi']
      : ['High-end finishes', 'Spacious daylight layout', 'Prime neighborhood location']
  );
  const topFeatures = featureList.slice(0, 4);

  let igHook = '';
  let igBody = '';
  let fbHeadline = '';
  let fbBody = '';
  let ttHook = '';
  let ttMusic = '';

  const cityName = city || (address.toLowerCase().includes('suzzara') ? 'Suzzara' : 'Mantova');
  const isSuzzara = cityName.toLowerCase().includes('suzzara');

  if (isItalian) {
    // ITALIAN CORPORATE REAL ESTATE COPY
    if (tone === 'luxury') {
      igHook = `🏛️ Prestigio immobiliare nel cuore di ${cityName}: un’esclusiva rara presentata da EstateCopyAI Enterprise.`;
      igBody = `Proponiamo in vendita a ${address} un signorile ${propertyType.toLowerCase()} di rara eleganza, proposto a ${price}.\n\nL'immobile vanta ${bedrooms} camere da letto, ${bathrooms} bagni rifiniti e dettagli di altissimo profilo: ${topFeatures.join(', ')}${energyClass ? ` (${energyClass})` : ''}.\nUna residenza pensata per chi cerca privacy assoluta, rappresentanza ed eccellenza abitativa.`;
      fbHeadline = `ESTATECOPYAI ENTERPRISE | NUOVA ACQUISIZIONE DI RAPPRESENTANZA A ${cityName.toUpperCase()}`;
      fbBody = `Siamo lieti di annunciare l'ingresso nel nostro portfolio aziendale di questa prestigiosa residenza situata a ${address}.\n\nCon una metratura generosa di ${bedrooms} vani notte e ${bathrooms} servizi igienici, l'unità abitativa coniuga il fascino del contesto territoriale mantovano con dotazioni tecnologiche all'avanguardia: ${topFeatures.slice(0, 3).join(', ')}.\n\nUn'opportunità ideale sia come dimora principale di prestigio, sia come solido investimento patrimoniale.`;
      ttHook = `Questo è senza dubbio uno degli immobili più esclusivi attualmente disponibili a ${cityName}... 🏛️`;
      ttMusic = `Musica lounge pianistica elegante, beat minimal contemporaneo`;
    } else if (tone === 'corporate') {
      igHook = `📍 Nuova opportunità immobiliare certificata a ${cityName}: ${address}.`;
      igBody = `La nostra divisione brokerage presenta questo ${propertyType.toLowerCase()} (${price}) completo di ${bedrooms} vani letto e ${bathrooms} bagni.\nPunti di forza verificati: ${topFeatures.join(', ')}.\nConsulenza dedicata, documentazione catastale in regola e assistenza notarile integrata.`;
      fbHeadline = `COMUNICAZIONE AGENZIA IMMOBILIARE | DISPONIBILITÀ A ${cityName.toUpperCase()}`;
      fbBody = `Per i nostri clienti e investitori del territorio di ${cityName} e provincia, presentiamo un'opportunità di compravendita accuratamente selezionata presso ${address}.\n\nCaratteristiche principali:\n• Tipologia: ${propertyType}\n• Disposizione: ${bedrooms} camere, ${bathrooms} bagni\n• Plus: ${topFeatures.join('; ')}\n\nOffriamo visite guidate su appuntamento e consulenza per accesso a mutui dedicati.`;
      ttHook = `Cerchi casa a ${cityName}? Ecco l'immobile di cui tutti stanno parlando questa settimana... 👀`;
      ttMusic = `Corporate deep tech house pulito e ritmato`;
    } else if (tone === 'enthusiastic') {
      igHook = `🔥 ATTENZIONE! Questa novità a ${cityName} lascerà tutti senza parole! 🤩`;
      igBody = `Hai presente la casa perfetta che hai sempre cercato a ${address}? È ufficialmente disponibile a ${price}! 🚀\n${bedrooms} camere, ${bathrooms} bagni e una serie di chicche uniche: ${topFeatures.join(', ')}! Chiama subito prima che sia troppo tardi! ⚡`;
      fbHeadline = `🚀 NUOVO SUL MERCATO A ${cityName.toUpperCase()} | NON PERDERE QUESTA OCCASIONE!`;
      fbBody = `Appena acquisito e pronto da abitare! Presentiamo ${address}, una proposta fresca e ad alto valore per ${cityName}.\nSpazi perfetti per chi desidera vivere al massimo: ${bedrooms} camere da letto, ${bathrooms} bagni e dettagli spettacolari come ${topFeatures.join(', ')}!`;
      ttHook = `POV: Hai finalmente trovato l'appartamento dei tuoi sogni a ${cityName}... 😱`;
      ttMusic = `Trend TikTok viral upbeat phonk / house sound`;
    } else {
      // Family / Minimalist default
      igHook = `🏡 La serenità di una casa accogliente e completa a ${cityName}: ${address}.`;
      igBody = `Progettata per il benessere quotidiano della famiglia, questa soluzione a ${address} (${price}) offre ${bedrooms} camere spaziose, ${bathrooms} bagni e ambienti luminosi.\nDotata di: ${topFeatures.join(', ')}.\nPerfetta vicinanza a scuole, parchi e servizi del centro.`;
      fbHeadline = `LA TUA PROSSIMA CASA DI FAMIGLIA A ${cityName.toUpperCase()} | ${address}`;
      fbBody = `Trovare un'abitazione in cui far crescere la propria famiglia con serenità a ${cityName} è una decisione fondamentale. Questa proprietà a ${address} offre la sicurezza e il comfort che desideri:\n${bedrooms} camere, ${bathrooms} bagni e spazi come ${topFeatures.join(', ')}.`;
      ttHook = `Vieni a scoprire questa casa pensata per chi vuole vivere davvero bene a ${cityName}... 🪴`;
      ttMusic = `Acoustic guitar melodica e calda, vibe familiare`;
    }
  } else {
    // ENGLISH CORPORATE REAL ESTATE COPY
    if (tone === 'luxury') {
      igHook = `🏛️ Architectural distinction in ${cityName}: An exclusive listing by EstateCopyAI Enterprise.`;
      igBody = `Introducing ${address}, a remarkable ${propertyType.toLowerCase()} offered at ${price}.\nFeaturing ${bedrooms} bedrooms, ${bathrooms} baths, and bespoke appointments: ${topFeatures.join(', ')}.\nAn address curated for discerning buyers seeking prestige and tranquility.`;
      fbHeadline = `ESTATECOPYAI ENTERPRISE | PREMIER REAL ESTATE ACQUISITION IN ${cityName.toUpperCase()}`;
      fbBody = `We are proud to introduce this distinctive property located at ${address}.\nBoasting ${bedrooms} suites, ${bathrooms} designer baths, and high-performance features: ${topFeatures.join('; ')}.\nInquire today for full prospectus and private tour schedules.`;
      ttHook = `Touring one of the most remarkable properties on the market in ${cityName}... 🏛️`;
      ttMusic = `Elegant cinematic piano with modern ambient bass`;
    } else {
      igHook = `📍 Prime Real Estate Announcement: ${address}, ${cityName}.`;
      igBody = `EstateCopyAI Enterprise presents this superior ${propertyType.toLowerCase()} listed at ${price}.\nFeaturing ${bedrooms} bedrooms, ${bathrooms} baths, and verified amenities: ${topFeatures.join(', ')}.\nFull due-diligence package available.`;
      fbHeadline = `CORPORATE REAL ESTATE ADVISORY | NEW LISTING IN ${cityName.toUpperCase()}`;
      fbBody = `Presenting a premium opportunity at ${address}, ${cityName}.\nKey property metrics: ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${energyClass || 'High efficiency'}.\nHighlights: ${topFeatures.join(', ')}.`;
      ttHook = `Looking for an exceptional home in ${cityName}? Here is our top pick... 👀`;
      ttMusic = `Upbeat corporate deep-house rhythm`;
    }
  }

  // Localized targeted hashtags
  const hashtags = isItalian ? [
    '#Immobiliare',
    `#${cityName.replace(/\s+/g, '')}`,
    ...(isSuzzara ? ['#Suzzara', '#ImmobiliareSuzzara', '#CaseSuzzara'] : ['#Mantova', '#ImmobiliareMantova', '#CentroStoricoMantova']),
    '#CasaInVendita',
    '#AgenziaImmobiliare',
    '#RealEstateItaly',
    '#ImmobiliDiPregio',
    `#${propertyType.replace(/[^a-zA-Z0-9]/g, '')}`,
    '#InvestimentiImmobiliari'
  ] : [
    '#RealEstate',
    `#${cityName.replace(/\s+/g, '')}`,
    '#LuxuryRealEstate',
    '#PropertyInvestment',
    '#HomeForSale',
    '#ItalianRealEstate',
    '#EstateCopyAI'
  ];

  const highlights = [
    isItalian 
      ? `${bedrooms} Camere da letto | ${bathrooms} Bagni | ${property.sqft || 'Ampia Metratura'}`
      : `${bedrooms} Bedrooms | ${bathrooms} Bathrooms | ${property.sqft || 'Spacious Layout'}`,
    isItalian ? `Prezzo Richiesto: ${price}` : `Asking Price: ${price}`,
    ...(energyClass ? [isItalian ? `Efficienza Energetica: ${energyClass}` : `Energy Rating: ${energyClass}`] : []),
    ...featureList.slice(0, 4)
  ];

  const scenes = [
    {
      time: '0:00 - 0:03',
      visual: isItalian 
        ? `Inquadratura dinamica dell'ingresso signorile e della facciata a ${cityName}, con testo in sovraimpressione "${price}".`
        : `Dynamic push-in entrance shot showcasing the prestigious facade in ${cityName} with "${price}" overlay.`,
      voiceover: ttHook
    },
    {
      time: '0:04 - 0:11',
      visual: isItalian 
        ? `Panoramica stabilizzata della zona giorno e della cucina, evidenziando ${topFeatures[0] || 'la luminosità naturale'}.`
        : `Smooth gimbal walkthrough of the open-concept living area spotlighting ${topFeatures[0] || 'natural daylight'}.`,
      voiceover: isItalian 
        ? `Appena varchi la soglia, la prima cosa che colpisce è l'ampiezza degli spazi e la qualità costruttiva.`
        : `From the moment you step inside, the volume and bespoke craftsmanship set the tone.`
    },
    {
      time: '0:12 - 0:19',
      visual: isItalian 
        ? `Dettaglio della suite padronale con bagno privato e ${topFeatures[1] || 'finiture in parquet'}.`
        : `Cut to primary bedroom suite featuring spa bathroom and ${topFeatures[1] || 'hardwood flooring'}.`,
      voiceover: isItalian 
        ? `La zona notte garantisce silenzio, privacy e comfort termico assoluto.`
        : `The private bedroom wing guarantees absolute comfort, quiet and climate efficiency.`
    },
    {
      time: '0:20 - 0:28',
      visual: isItalian 
        ? `Vista panoramica esterna / terrazzo abitabile con scorcio su ${cityName} e ${topFeatures[2] || 'il contesto circostante'}.`
        : `Panoramic outdoor terrace view showing the neighborhood context of ${cityName}.`,
      voiceover: isItalian 
        ? `E questo terrazzo è il vero valore aggiunto per vivere momenti indimenticabili.`
        : `And this private outdoor space is where you will spend your best evenings.`
    },
    {
      time: '0:29 - 0:35',
      visual: isItalian 
        ? `Consulente immobiliare in abito corporate con logo EstateCopyAI, grafica di contatto e invito all'azione.`
        : `Real estate broker on camera with agency branding and call-to-action contact card.`,
      voiceover: isItalian 
        ? `Siamo a ${address}. Clicca sul link o scrivici un messaggio per fissare la tua visita privata!`
        : `Located at ${address}. Tap the link or message our team to arrange your confidential tour!`
    }
  ];

  const ctaFinal = isItalian 
    ? `📲 ${callToAction}. Contattaci via WhatsApp o Direct per ricevere la documentazione completa!`
    : `📲 ${callToAction}. Contact our agency desk via DM or email for private walkthroughs!`;

  const structured = {
    instagram: {
      hook: igHook,
      body: igBody,
      callToAction: ctaFinal,
      hashtags
    },
    facebook: {
      headline: fbHeadline,
      body: fbBody,
      highlights,
      callToAction: isItalian 
        ? `👉 ${callToAction}! I nostri uffici di ${cityName} sono a vostra disposizione per sopralluoghi dedicati.`
        : `👉 ${callToAction}! Our agency team is available for scheduled on-site inspections.`
    },
    tiktok: {
      hook: ttHook,
      musicVibe: ttMusic,
      scenes
    }
  };

  const { instagramFull, facebookFull, tiktokFull } = buildFullTexts(structured, isItalian);

  return {
    id: `post_${Date.now()}`,
    timestamp: Date.now(),
    propertyAddress: address,
    language,
    tone,
    isAiGenerated: false,
    modelUsed: 'EstateCopyAI Corporate Engine',
    instagram: {
      ...structured.instagram,
      fullText: instagramFull
    },
    facebook: {
      ...structured.facebook,
      fullText: facebookFull
    },
    tiktok: {
      ...structured.tiktok,
      fullText: tiktokFull
    }
  };
}

/**
 * Call Gemini API directly from browser with the user's provided API key
 */
export async function generatePostsWithGemini(
  property: PropertyDetails,
  apiKey: string
): Promise<GeneratedSocialPosts> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    throw new Error('Please enter a valid Gemini API key.');
  }

  const isItalian = property.language === 'IT';

  const prompt = `You are an elite, top-producing real estate marketing copywriter for the B2B enterprise platform "EstateCopyAI Enterprise".
Create high-converting corporate social media marketing copy for the following property listing in ${isItalian ? 'ITALIAN (italiano professionale per agenzia immobiliare)' : 'ENGLISH'}:

PROPERTY SPECS:
- Target Region: ${property.city} (Province of Mantova, Lombardy, Italy)
- Exact Address: ${property.address}
- Asking Price: ${property.price || 'Trattativa Riservata'}
- Property Category: ${property.propertyType}
- Rooms: ${property.bedrooms} Bed, ${property.bathrooms} Bath, ${property.sqft || 'Spacious'}
- Energy Rating: ${property.energyClass || 'Classe Energetica Verificata'}
- Key Architectural Highlights: ${property.features.join(', ')}
- Brand Voice Tone: ${property.tone.toUpperCase()}
- Target Buyer Persona: ${property.targetAudience}
- Call to Action: ${property.callToAction}
- Agency Reference: ${property.agencyRef || 'REF-CORP-2026'}

STRICT OUTPUT REQUIREMENTS:
1. INSTAGRAM CAPTION (Card A):
   - Premium corporate hook line with subtle, high-class emojis
   - Professional descriptive paragraphs highlighting lifestyle and local prestige in ${property.city}
   - Clear corporate CTA
   - 10-15 hyper-targeted local hashtags including #Immobiliare, #${property.city.replace(/\s+/g, '')}, #Mantova, #Suzzara, #CaseInVendita

2. FACEBOOK COMMUNITY ANNOUNCEMENT (Card B):
   - Formal, trustworthy corporate headline for agency followers and investors
   - Informative body paragraphs tailored to local residents
   - Bulleted list of verified specs and features
   - Engaging community question
   - Official agency contact CTA

3. TIKTOK / REEL VIDEO SCRIPT (Card C):
   - High-impact 3-second hook for video caption & voiceover
   - Recommended corporate/trending audio vibe
   - Scene-by-scene script breakdown with timestamps (0:00-0:03, 0:04-0:10, 0:11-0:18, 0:19-0:28, 0:29-0:35), visual camera directions, and spoken voiceover lines in ${isItalian ? 'Italian' : 'English'}.

Return response strictly as JSON:
{
  "instagram": {
    "hook": "string",
    "body": "string",
    "callToAction": "string",
    "hashtags": ["#tag1", "#tag2", ...]
  },
  "facebook": {
    "headline": "string",
    "body": "string",
    "highlights": ["spec 1", "spec 2", ...],
    "callToAction": "string"
  },
  "tiktok": {
    "hook": "string",
    "musicVibe": "string",
    "scenes": [
      {
        "time": "0:00 - 0:03",
        "visual": "visual direction",
        "voiceover": "voiceover spoken text"
      }
    ]
  }
}`;

  const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3200,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        if (response.status === 404 && modelsToTry.indexOf(model) < modelsToTry.length - 1) {
          continue;
        }
        throw new Error(message);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini API returned empty response.');
      }

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse model JSON.');
        }
      }

      if (!parsed.instagram || !parsed.facebook || !parsed.tiktok) {
        throw new Error('Incomplete social media response generated.');
      }

      const { instagramFull, facebookFull, tiktokFull } = buildFullTexts(parsed, isItalian);

      return {
        id: `post_${Date.now()}`,
        timestamp: Date.now(),
        propertyAddress: property.address,
        language: property.language,
        tone: property.tone,
        isAiGenerated: true,
        modelUsed: `Gemini Enterprise (${model})`,
        instagram: {
          ...parsed.instagram,
          fullText: instagramFull
        },
        facebook: {
          ...parsed.facebook,
          fullText: facebookFull
        },
        tiktok: {
          ...parsed.tiktok,
          fullText: tiktokFull
        }
      };
    } catch (err: any) {
      lastError = err;
      if (err.message && (err.message.includes('API_KEY_INVALID') || err.message.includes('API key not valid'))) {
        throw new Error('Invalid Gemini API Key. Please verify key from Google AI Studio.');
      }
    }
  }

  throw lastError || new Error('Failed to generate posts with Gemini API.');
}
