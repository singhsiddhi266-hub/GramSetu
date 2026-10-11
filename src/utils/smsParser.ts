import { SMSCommandResult } from '../types';
import { INITIAL_MANDI_DATA, INITIAL_WEATHER_DATA } from '../data/mockData';

export function parseIncomingSMS(input: string): SMSCommandResult {
  const rawIncoming = input.trim();
  const upper = rawIncoming.toUpperCase();
  const tokens = upper.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return {
      rawIncoming,
      parsedIntent: 'EMPTY_INPUT',
      extractedEntities: {},
      characterCount: 0,
      gsmSegments: 1,
      generatedResponse: 'GramSetu SMS Service. Send "MANDI WHEAT", "MAUSAM DEWAS", "ROGI SOYBEAN", or "HELP" to 56161.',
      responseLength: 85,
      status: 'clarification_needed'
    };
  }

  const keyword = tokens[0];

  // 1. Mandi Bhav / Price Inquiries
  if (['MANDI', 'RATE', 'BHAV', 'PRICE', 'DAM', 'DAAM'].includes(keyword)) {
    let cropToken = tokens[1] || '';
    let locationToken = tokens[2] || '';

    // If only 1 token passed, e.g. "MANDI"
    if (!cropToken) {
      const response = '[GramSetu] Format: MANDI <CROP> <MANDI>. Ex: MANDI WHEAT DEWAS or MANDI SOYBEAN INDORE. Tollfree: 1800-GRAMSETU.';
      return buildResult(rawIncoming, 'MANDI_PRICE_HELP', {}, response, 'clarification_needed');
    }

    // Identify matched crop
    const matchedCrop = INITIAL_MANDI_DATA.find(m => 
      m.crop.toUpperCase().includes(cropToken) || 
      m.cropHindi.toUpperCase().includes(cropToken) ||
      cropToken.includes(m.crop.split(' ')[0].toUpperCase())
    ) || INITIAL_MANDI_DATA[0];

    // Identify matched location if specified
    const matchedMandi = INITIAL_MANDI_DATA.find(m => 
      m.district.toUpperCase().includes(locationToken) ||
      m.mandiName.toUpperCase().includes(locationToken)
    ) || matchedCrop;

    const badgeStr = matchedMandi.badge === 'live_verified' ? '[LIVE-VERIFIED]' : 
                     matchedMandi.badge === 'pilot_sample' ? '[PILOT-SAMPLE]' : '[MODEL-DEMO]';

    const response = `[GramSetu] ${badgeStr} ${matchedMandi.crop.split(' ')[0]} at ${matchedMandi.mandiName}: Modal ₹${matchedMandi.modalPrice}/qtl (Min: ₹${matchedMandi.minPrice}, Max: ₹${matchedMandi.maxPrice}). Updated: ${matchedMandi.lastUpdated}.`;

    return buildResult(rawIncoming, 'MANDI_PRICE_LOOKUP', {
      crop: matchedCrop.crop,
      mandi: matchedMandi.mandiName,
      badge: matchedMandi.badge
    }, response, 'success');
  }

  // 2. Weather Inquiries
  if (['MAUSAM', 'WEATHER', 'BARISH', 'BARSAT', 'CLIMATE'].includes(keyword)) {
    const locToken = tokens[1] || 'DEWAS';
    const weather = INITIAL_WEATHER_DATA.find(w => 
      w.district.toUpperCase().includes(locToken)
    ) || INITIAL_WEATHER_DATA[0];

    const alertPrefix = weather.alertLevel === 'warning' ? '⚠️ ALERT: ' : '';
    const response = `[GramSetu] ${alertPrefix}${weather.district}: ${weather.temperatureC}°C, Rain chance ${weather.rainfallChancePct}%, Wind ${weather.windSpeedKmph}km/h. ${weather.condition}. Advice: ${weather.alertMessage.slice(0, 65)}...`;

    return buildResult(rawIncoming, 'WEATHER_LOOKUP', {
      district: weather.district,
      condition: weather.condition,
      alertLevel: weather.alertLevel
    }, response, 'success');
  }

  // 3. Crop Health / Pests / Rogi Inquiry
  if (['ROGI', 'KIDA', 'DOCTOR', 'PEST', 'DISEASE', 'FASAL'].includes(keyword)) {
    const cropToken = tokens[1] || 'CROP';
    const ticketId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

    const response = `[GramSetu] ${ticketId}: Emergency inquiry for ${cropToken}. AI clue logged. If high infestation or chemical spray needed, KVK Officer will SMS verified label dosage. Gram Mitra notified.`;

    return buildResult(rawIncoming, 'CROP_DOCTOR_TRIAGE', {
      crop: cropToken,
      ticket: ticketId,
      status: 'ESCALATED_TO_KVK'
    }, response, 'success');
  }

  // 4. Mitra / Facilitator Request
  if (['MITRA', 'SEVA', 'VISIT', 'HELP', 'SAHAYAK', 'MADAD'].includes(keyword)) {
    const response = '[GramSetu] Your request for Gram Mitra field visit is logged. Mitra Kamal Kishor (Mob: +91 98261XXXXX) will visit within 24h. Dial *123*4# for offline menu.';

    return buildResult(rawIncoming, 'GRAM_MITRA_DISPATCH', {
      assignedMitra: 'Kamal Kishor',
      slaHours: '24'
    }, response, 'success');
  }

  // Fallback
  const fallbackResponse = `[GramSetu] Invalid code. Reply: 1 for Mandi Bhav, 2 for Weather, 3 for Crop Doctor, or dial *123# from any feature phone.`;
  return buildResult(rawIncoming, 'UNKNOWN_SYNTAX', { raw: upper }, fallbackResponse, 'unknown_command');
}

function buildResult(
  rawIncoming: string,
  parsedIntent: string,
  extractedEntities: Record<string, string>,
  generatedResponse: string,
  status: SMSCommandResult['status']
): SMSCommandResult {
  const responseLength = generatedResponse.length;
  // GSM 7-bit default alphabet: 1 SMS = 160 chars. If > 160, concatenated SMS uses 153 chars per segment.
  const gsmSegments = responseLength <= 160 ? 1 : Math.ceil(responseLength / 153);

  return {
    rawIncoming,
    parsedIntent,
    extractedEntities,
    characterCount: rawIncoming.length,
    gsmSegments,
    generatedResponse,
    responseLength,
    status
  };
}

export interface USSDNode {
  id: string;
  title: string;
  screenText: string;
  isTerminal?: boolean;
  options?: { key: string; label: string; nextNodeId: string }[];
}

export const USSD_TREE: Record<string, USSDNode> = {
  root: {
    id: 'root',
    title: 'GramSetu Home (*123#)',
    screenText: 'Welcome to GramSetu *123#\nSelect service:\n1. Mandi Rates (Bhav)\n2. Weather & Spray Alert\n3. Crop Doctor Emergency\n4. Gram Mitra Home Visit\n5. KCC & Scheme Status',
    options: [
      { key: '1', label: '1. Mandi Rates', nextNodeId: 'mandi_select' },
      { key: '2', label: '2. Weather Radar', nextNodeId: 'weather_view' },
      { key: '3', label: '3. Crop Doctor', nextNodeId: 'doctor_triage' },
      { key: '4', label: '4. Mitra Visit', nextNodeId: 'mitra_request' },
      { key: '5', label: '5. Scheme Status', nextNodeId: 'scheme_status' }
    ]
  },
  mandi_select: {
    id: 'mandi_select',
    title: 'Select Mandi',
    screenText: 'GramSetu Mandi Rates:\n1. Dewas APMC\n2. Indore Choithram\n3. Ujjain APMC\n4. Morena APMC\n0. Back',
    options: [
      { key: '1', label: '1. Dewas', nextNodeId: 'dewas_rates' },
      { key: '2', label: '2. Indore', nextNodeId: 'indore_rates' },
      { key: '3', label: '3. Ujjain', nextNodeId: 'ujjain_rates' },
      { key: '4', label: '4. Morena', nextNodeId: 'morena_rates' },
      { key: '0', label: '0. Back', nextNodeId: 'root' }
    ]
  },
  dewas_rates: {
    id: 'dewas_rates',
    title: 'Dewas APMC (Live Verified)',
    screenText: '[Dewas APMC Rates - 08:35 AM]\nWheat: ₹3,120/qtl (Live)\nSoybean: ₹4,650/qtl (Live)\nChana: ₹5,400/qtl (Live)\nArrivals: 1420 Qtl\n\n0. Back  00. Main Menu',
    isTerminal: true,
    options: [
      { key: '0', label: '0. Back', nextNodeId: 'mandi_select' },
      { key: '00', label: '00. Main', nextNodeId: 'root' }
    ]
  },
  indore_rates: {
    id: 'indore_rates',
    title: 'Indore Choithram (Live)',
    screenText: '[Indore Choithram - 09:10 AM]\nSoybean: ₹4,720/qtl (Live)\nWheat Sharbati: ₹3,400/qtl\nOnion: ₹1,650/qtl\nArrivals: 3850 Qtl\n\n0. Back  00. Main Menu',
    isTerminal: true,
    options: [
      { key: '0', label: '0. Back', nextNodeId: 'mandi_select' },
      { key: '00', label: '00. Main', nextNodeId: 'root' }
    ]
  },
  ujjain_rates: {
    id: 'ujjain_rates',
    title: 'Ujjain APMC (Pilot Sample)',
    screenText: '[Ujjain APMC - 07:45 AM]\nChana: ₹5,650/qtl (Pilot)\nWheat: ₹2,980/qtl (Pilot)\nGarlic: ₹8,200/qtl\n*Spot sampled by Mitra\n\n0. Back  00. Main Menu',
    isTerminal: true,
    options: [
      { key: '0', label: '0. Back', nextNodeId: 'mandi_select' },
      { key: '00', label: '00. Main', nextNodeId: 'root' }
    ]
  },
  morena_rates: {
    id: 'morena_rates',
    title: 'Morena APMC (Live)',
    screenText: '[Morena APMC - 08:50 AM]\nMustard (Sarson): ₹5,480/qtl\nBajra: ₹2,200/qtl\nHigh oil demand reported.\n\n0. Back  00. Main Menu',
    isTerminal: true,
    options: [
      { key: '0', label: '0. Back', nextNodeId: 'mandi_select' },
      { key: '00', label: '00. Main', nextNodeId: 'root' }
    ]
  },
  weather_view: {
    id: 'weather_view',
    title: 'Dewas Agro-Weather Radar',
    screenText: '[Weather Radar - 12m sync]\nTemp: 31°C | Humidity: 62%\nRain Chance: 20%\nWind: 14 km/h\nAdvisory: Safe for grain threshing & bagging.\n\n0. Back  00. Main Menu',
    isTerminal: true,
    options: [
      { key: '0', label: '0. Back', nextNodeId: 'root' }
    ]
  },
  doctor_triage: {
    id: 'doctor_triage',
    title: 'Crop Doctor Emergency',
    screenText: 'Report Crop Emergency:\n1. Leaf Yellowing / Mosaic\n2. Stem Borer / Caterpillar\n3. Rust / Fungal Pustules\n4. Wilting / Root Rot\n0. Back',
    options: [
      { key: '1', label: '1. Yellowing', nextNodeId: 'doctor_escalated' },
      { key: '2', label: '2. Caterpillar', nextNodeId: 'doctor_escalated' },
      { key: '3', label: '3. Rust', nextNodeId: 'doctor_escalated' },
      { key: '4', label: '4. Wilting', nextNodeId: 'doctor_escalated' },
      { key: '0', label: '0. Back', nextNodeId: 'root' }
    ]
  },
  doctor_escalated: {
    id: 'doctor_escalated',
    title: 'Triage Ticket Created',
    screenText: 'TICKET #GS-8910 CREATED\nSymptom logged. Assigned to KVK Extension Agronomist.\nYou will receive CIBRC compliant label advisory via SMS in 15 mins.\n\n00. Main Menu',
    isTerminal: true,
    options: [
      { key: '00', label: '00. Main Menu', nextNodeId: 'root' }
    ]
  },
  mitra_request: {
    id: 'mitra_request',
    title: 'Gram Mitra Home Visit',
    screenText: 'Request logged for Bagli Gram Mitra (Kamal Kishor).\nAssistance type: Field Inspection & Consent Sync.\nSLA: Within 24 hours.\nCall 1800-GRAMSETU.\n\n00. Main Menu',
    isTerminal: true,
    options: [
      { key: '00', label: '00. Main Menu', nextNodeId: 'root' }
    ]
  },
  scheme_status: {
    id: 'scheme_status',
    title: 'Scheme & KCC Status',
    screenText: 'Active Farmer ID: Siya-402\n1. PM Fasal Bima: In Progress\n2. KCC Limit: ₹2.80L Active\n3. Soil Health Card: Current\n4. Drip Subsidy: Pending Docs\n\n00. Main Menu',
    isTerminal: true,
    options: [
      { key: '00', label: '00. Main Menu', nextNodeId: 'root' }
    ]
  }
};
