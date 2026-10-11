import { MandiItem, WeatherAlert, TransportVehicle, CandidateMandi, CropCase, FarmerConsentRecord, FacilitatorAssistanceSession, SchemeEscalation } from '../types';

export const INITIAL_MANDI_DATA: MandiItem[] = [
  {
    id: 'm-1',
    crop: 'Wheat (Sharbati)',
    cropHindi: 'गेहूं (शरबती)',
    variety: 'C-306 Special',
    mandiName: 'Dewas APMC',
    district: 'Dewas',
    state: 'Madhya Pradesh',
    minPrice: 2850,
    modalPrice: 3120,
    maxPrice: 3380,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 1420,
    badge: 'live_verified',
    lastUpdated: 'Today, 08:35 AM',
    source: 'eNAM Gateway · APMC Gate Slip #DWS-8921',
    lotSlipVerified: true,
    notes: 'Bidding active on Platform 2. Moisture standard 12% verified by electronic moisture meter.'
  },
  {
    id: 'm-2',
    crop: 'Soybean (Yellow)',
    cropHindi: 'सोयाबीन (पीला)',
    variety: 'JS 20-34',
    mandiName: 'Indore Choithram Mandi',
    district: 'Indore',
    state: 'Madhya Pradesh',
    minPrice: 4450,
    modalPrice: 4720,
    maxPrice: 4950,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 3850,
    badge: 'live_verified',
    lastUpdated: 'Today, 09:10 AM',
    source: 'eNAM APMC Live Electronic Auction System',
    lotSlipVerified: true,
    notes: 'Strong processor demand. Oil extraction content standard 18.5%.'
  },
  {
    id: 'm-3',
    crop: 'Gram / Chana (Desi)',
    cropHindi: 'चना (देसी)',
    variety: 'JG-11 Bold',
    mandiName: 'Ujjain APMC',
    district: 'Ujjain',
    state: 'Madhya Pradesh',
    minPrice: 5300,
    modalPrice: 5650,
    maxPrice: 5920,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 980,
    badge: 'pilot_sample',
    lastUpdated: 'Today, 07:45 AM',
    source: 'Gram Mitra Field Spot Check (5 Trader Sample)',
    lotSlipVerified: false,
    notes: 'Morning spot sampling before official auction commencement.'
  },
  {
    id: 'm-4',
    crop: 'Cotton (Medium Staple)',
    cropHindi: 'कपास (मध्यम)',
    variety: 'Bunny BT',
    mandiName: 'Khargone Mandi',
    district: 'Khargone',
    state: 'Madhya Pradesh',
    minPrice: 6800,
    modalPrice: 7240,
    maxPrice: 7520,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 620,
    badge: 'pilot_sample',
    lastUpdated: 'Yesterday, 04:30 PM',
    source: 'Local Trader Survey & Ginning Mill Inward Register',
    lotSlipVerified: false,
    notes: 'Price subject to lint % and trash content.'
  },
  {
    id: 'm-5',
    crop: 'Maize (Hybrid)',
    cropHindi: 'मक्का (हाइब्रिड)',
    variety: 'Pioneer 3302',
    mandiName: 'Chhindwara Mandi',
    district: 'Chhindwara',
    state: 'Madhya Pradesh',
    minPrice: 2050,
    modalPrice: 2210,
    maxPrice: 2340,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 2100,
    badge: 'simulated_demo',
    lastUpdated: 'Model Projected for Off-Day',
    source: 'Synthetic Seasonal Trend Model (Historical APMC Curve)',
    lotSlipVerified: false,
    notes: 'Market closed for local holiday. Rates generated for planning calculations only.'
  },
  {
    id: 'm-6',
    crop: 'Mustard (Sarson)',
    cropHindi: 'सरसों',
    variety: 'Pusa Bold',
    mandiName: 'Morena APMC',
    district: 'Morena',
    state: 'Madhya Pradesh',
    minPrice: 5200,
    modalPrice: 5480,
    maxPrice: 5700,
    unit: '₹/Quintal',
    arrivalVolumeQtl: 1150,
    badge: 'live_verified',
    lastUpdated: 'Today, 08:50 AM',
    source: 'Agmarknet Gov Portal Direct Sync',
    lotSlipVerified: true,
    notes: 'High oil demand. MSP baseline ₹5,650/qtl.'
  }
];

export const INITIAL_WEATHER_DATA: WeatherAlert[] = [
  {
    id: 'w-1',
    district: 'Dewas & Ujjain Zone',
    temperatureC: 31,
    humidityPct: 62,
    rainfallChancePct: 20,
    windSpeedKmph: 14,
    condition: 'Partly Cloudy · Moderate Humidity',
    conditionHindi: 'आंशिक बादल · सामान्य नमी',
    alertLevel: 'normal',
    alertMessage: 'Favorable condition for daytime threshing and grain drying. Ensure tarp covers on trolleys.',
    alertMessageHindi: 'फसल गहाई और सुखाने के लिए अनुकूल। ट्रॉलियों पर तिरपाल अवश्य रखें।',
    badge: 'live_verified',
    timestamp: 'Live Radar Sync (12m ago)',
    sourceStation: 'IMD Doppler Radar Indore Station #428'
  },
  {
    id: 'w-2',
    district: 'Sehore & Hoshangabad Belt',
    temperatureC: 28,
    humidityPct: 79,
    rainfallChancePct: 65,
    windSpeedKmph: 24,
    condition: 'Thunderstorm Watch · Gusty Winds',
    conditionHindi: 'आंधी और गरज के साथ बौछार का अलर्ट',
    alertLevel: 'warning',
    alertMessage: 'Precipitation expected in evening hours. Hold off on foliar spray application to prevent chemical wash-off.',
    alertMessageHindi: 'शाम को वर्षा की संभावना। कीटनाशक छिड़काव रोकें ताकि दवा धुल न जाए।',
    badge: 'live_verified',
    timestamp: 'Live Radar Sync (8m ago)',
    sourceStation: 'Krishi Vigyan Kendra Automatic Weather Station'
  },
  {
    id: 'w-3',
    district: 'Dhar & Jhabua Hills',
    temperatureC: 34,
    humidityPct: 45,
    rainfallChancePct: 5,
    windSpeedKmph: 11,
    condition: 'Dry & Sunny · Soil Moisture Low',
    conditionHindi: 'शुष्क और धूप · मिट्टी में नमी कम',
    alertLevel: 'advisory',
    alertMessage: 'Surface evaporation high. Schedule drip or night irrigation for horticultural saplings.',
    alertMessageHindi: 'वाष्पीकरण अधिक है। टपक सिंचाई या रात्रि सिंचाई की व्यवस्था करें।',
    badge: 'pilot_sample',
    timestamp: 'Field Sensor Spot Check (2h ago)',
    sourceStation: 'Gram Mitra IoT Soil Probe Cluster #DH-3'
  }
];

export const TRANSPORT_VEHICLES: TransportVehicle[] = [
  {
    id: 'v-1',
    name: 'Tractor Trolley (45 HP)',
    nameHindi: 'ट्रैक्टर ट्रॉली (45 एचपी)',
    capacityQtl: 70, // 70 quintals (~140 bags)
    baseMileageKmPerLitre: 4.5,
    baseTollPer100Km: 180,
    driverAllowancePerDay: 400,
    suitableFor: 'Local mandis up to 40 km, village unpaved roads'
  },
  {
    id: 'v-2',
    name: 'Small Commercial (Tata Ace / Chota Hathi)',
    nameHindi: 'छोटा हाथी (टाटा ऐस)',
    capacityQtl: 25, // 25 quintals (~50 bags)
    baseMileageKmPerLitre: 14.0,
    baseTollPer100Km: 120,
    driverAllowancePerDay: 500,
    suitableFor: 'Small quantities, rapid trips, congested mandi yards'
  },
  {
    id: 'v-3',
    name: 'Pickup Truck (Mahindra Bolero Maxi)',
    nameHindi: 'पिकअप (महिंद्रा बोलेरो मैक्सी)',
    capacityQtl: 38, // 38 quintals (~76 bags)
    baseMileageKmPerLitre: 11.0,
    baseTollPer100Km: 160,
    driverAllowancePerDay: 600,
    suitableFor: 'Inter-district haulage, perishable vegetables and grains'
  },
  {
    id: 'v-4',
    name: 'Medium Freight (Eicher 6-Wheeler)',
    nameHindi: 'आयशर 6-चक्का ट्रक',
    capacityQtl: 130, // 130 quintals (~260 bags)
    baseMileageKmPerLitre: 6.2,
    baseTollPer100Km: 380,
    driverAllowancePerDay: 800,
    suitableFor: 'Hub mandis up to 150 km, bulk cooperative transport'
  },
  {
    id: 'v-5',
    name: 'Heavy Freight (10-Wheeler Ashok Leyland)',
    nameHindi: 'बड़ा ट्रक 10-चक्का',
    capacityQtl: 240, // 240 quintals (~480 bags)
    baseMileageKmPerLitre: 3.8,
    baseTollPer100Km: 650,
    driverAllowancePerDay: 1200,
    suitableFor: 'Terminal export ports & interstate processing mills'
  }
];

export const CANDIDATE_MANDIS: CandidateMandi[] = [
  {
    id: 'mandi-local',
    name: 'Dewas Local APMC Yard',
    distanceKm: 14,
    projectedGrossRate: 2320, // ₹/quintal
    mandiCessPct: 1.5,
    arhatiyaCommissionPct: 2.0,
    unloadingRatePerBag: 9, // ₹ per 50kg bag
    weighbridgeFlat: 60,
    crowdDelayHours: 1.5,
    provenance: 'live_verified'
  },
  {
    id: 'mandi-hub',
    name: 'Indore Choithram Regional Mandi',
    distanceKm: 52,
    projectedGrossRate: 2460, // ₹/quintal (Higher gross bait!)
    mandiCessPct: 1.5,
    arhatiyaCommissionPct: 2.0,
    unloadingRatePerBag: 14, // higher urban labor rate
    weighbridgeFlat: 100,
    crowdDelayHours: 4.5,
    provenance: 'live_verified'
  },
  {
    id: 'mandi-terminal',
    name: 'Ujjain Special Terminal APMC',
    distanceKm: 88,
    projectedGrossRate: 2510, // ₹/quintal
    mandiCessPct: 1.5,
    arhatiyaCommissionPct: 2.0,
    unloadingRatePerBag: 16,
    weighbridgeFlat: 120,
    crowdDelayHours: 6.0,
    provenance: 'pilot_sample'
  }
];

export const INITIAL_CROP_CASES: CropCase[] = [
  {
    id: 'case-101',
    cropName: 'Soybean (Kharif)',
    cropHindi: 'सोयाबीन (खरीफ)',
    farmerName: 'Rameshwar Patidar',
    village: 'Bagli, Dewas',
    imageUrl: '/src/assets/images/gramsetu_crop_leaf_disease_1791719066975.jpg',
    symptoms: 'Yellow mosaic patterns along leaf veins, puckering, stunted pods.',
    submittedAt: 'Today, 07:15 AM',
    aiDiagnosis: {
      disease: 'Soybean Yellow Mosaic Virus (YMV)',
      diseaseHindi: 'सोयाबीन पीला मोज़ेक वायरस',
      confidenceScore: 78, // Low confidence triggers escalation (< 85%)
      pathogenType: 'viral',
      severityLevel: 'high',
      preliminaryClue: 'Gemini Vision detected vein-clearing characteristic of Whitefly-transmitted Begomovirus.'
    },
    escalationStatus: 'verified_signed',
    escalationTriggerReason: 'AI Confidence below 85% threshold + Quarantine vector warning (Whitefly infestation) requiring certified insecticide guidance.',
    assignedOfficer: {
      name: 'Dr. Surendra K. Verma',
      designation: 'Senior Extension Specialist (Plant Pathology)',
      institution: 'Krishi Vigyan Kendra (KVK) Dewas, RVSKVV',
      registrationNo: 'ICAR-MP-PATH-4419'
    },
    verifiedAdvisory: {
      cibrcChemical: 'Thiamethoxam 25% WG (CIBRC Reg. 12903)',
      commercialBrand: 'Actara / Areva 25 WG',
      exactDosage: '0.4 gram per Litre of water (80-100 g / acre)',
      sprayWaterVolume: '200 Litres per acre via hollow-cone nozzle',
      preHarvestIntervalDays: 21,
      mandatoryPPE: ['Eye goggles', 'Rubber gloves', 'Nose respirator mask', 'Long sleeve cotton apron'],
      organicAlternative: 'Neem Azadirachtin 10,000 PPM @ 2.5 ml/L + Yellow sticky traps @ 15 traps/acre',
      signedTimestamp: 'Today, 08:30 AM',
      signatureHash: 'SHA256:d8a9e4f210c97801be992a548234ff1d761a',
      expertNotes: 'Whitefly (Bemisia tabaci) is the vector. Spray immediately in early morning or late evening. Do not exceed prescribed dosage. Pre-harvest interval is strictly 21 days.'
    }
  },
  {
    id: 'case-102',
    cropName: 'Wheat (Rabi)',
    cropHindi: 'गेहूं (रबी)',
    farmerName: 'Deviram Dhangar',
    village: 'Tonk Khurd, Dewas',
    imageUrl: '/src/assets/images/gramsetu_crop_leaf_disease_1791719066975.jpg',
    symptoms: 'Bright yellow-orange linear stripes of pustules on upper leaf surface.',
    submittedAt: 'Today, 09:20 AM',
    aiDiagnosis: {
      disease: 'Yellow Rust / Stripe Rust (Puccinia striiformis)',
      diseaseHindi: 'गेहूं का पीला रतुआ',
      confidenceScore: 92,
      pathogenType: 'fungal',
      severityLevel: 'critical',
      preliminaryClue: 'Linear uredinial stripes indicate stripe rust. Spores rub off as yellow powder on fingers.'
    },
    escalationStatus: 'queued_for_officer',
    escalationTriggerReason: 'Critical Hazard Alert: Schedule-H fungicide Propiconazole recommendation legally mandates verified Agronomist sign-off to prevent misuse.',
    assignedOfficer: {
      name: 'Pooja Mandloi',
      designation: 'Sub-Divisional Agriculture Extension Officer (SDAO)',
      institution: 'Department of Farmer Welfare & Agriculture Development, MP',
      registrationNo: 'FWAD-MP-EXT-2023-882'
    }
  },
  {
    id: 'case-103',
    cropName: 'Cotton (Kharif)',
    cropHindi: 'कपास',
    farmerName: 'Sunita Bai Chouhan',
    village: 'Kannod, Dewas',
    imageUrl: '/src/assets/images/gramsetu_crop_leaf_disease_1791719066975.jpg',
    symptoms: 'Rosetted flowers, premature boll drop, small exit holes with frass.',
    submittedAt: 'Yesterday, 04:45 PM',
    aiDiagnosis: {
      disease: 'Pink Bollworm (Pectinophora gossypiella)',
      diseaseHindi: 'गुलाबी सुंडी (पिंक बॉलवर्म)',
      confidenceScore: 71,
      pathogenType: 'pest',
      severityLevel: 'critical',
      preliminaryClue: 'Larval feeding marks on unopened squares with petal webbing.'
    },
    escalationStatus: 'in_review',
    escalationTriggerReason: 'AI Confidence 71% (below 85%) + High resistance risk pest requiring IPM threshold verification.',
    assignedOfficer: {
      name: 'Dr. Alok Saxena',
      designation: 'Head Agronomist & IPM Coordinator',
      institution: 'Central Institute for Cotton Research (CICR) Liaison Cell',
      registrationNo: 'CICR-CENT-5108'
    }
  }
];

export const INITIAL_CONSENT_RECORDS: FarmerConsentRecord[] = [
  {
    id: 'f-891',
    farmerName: 'Mukesh Sharma',
    maskedPhone: '+91 98261 •••••',
    village: 'Siya, Dewas',
    landHoldingAcres: 6.5,
    primaryCrops: ['Wheat', 'Soybean', 'Chana'],
    kccEnrolled: true,
    registrationDate: '2026-09-12',
    consentItems: {
      smsMandiPriceAlerts: true,
      cropPhotoTriage: true,
      govtSchemeFacilitation: true,
      thirdPartyLogisticsSharing: false
    },
    consentMethod: 'biometric_aadhaar',
    consentEvidenceRef: 'UIDAI-EKYC-TXN#882193-VERIFIED',
    consentTimestamp: '2026-09-12 11:24 IST',
    facilitatorGramMitra: 'Kamal Kishor (Mitra ID: GM-MP-104)'
  },
  {
    id: 'f-892',
    farmerName: 'Bhanwar Singh Bhati',
    maskedPhone: '+91 94250 •••••',
    village: 'Bairagarh, Dewas',
    landHoldingAcres: 4.0,
    primaryCrops: ['Garlic', 'Onion', 'Wheat'],
    kccEnrolled: true,
    registrationDate: '2026-09-28',
    consentItems: {
      smsMandiPriceAlerts: true,
      cropPhotoTriage: true,
      govtSchemeFacilitation: true,
      thirdPartyLogisticsSharing: true
    },
    consentMethod: 'otp_sms',
    consentEvidenceRef: 'SMS-OTP-992014-AUTH-TS#77102',
    consentTimestamp: '2026-09-28 14:10 IST',
    facilitatorGramMitra: 'Kamal Kishor (Mitra ID: GM-MP-104)'
  },
  {
    id: 'f-893',
    farmerName: 'Kailash Bai',
    maskedPhone: '+91 97552 •••••',
    village: 'Hatpipliya, Dewas',
    landHoldingAcres: 2.2,
    primaryCrops: ['Maize', 'Soybean'],
    kccEnrolled: false,
    registrationDate: '2026-10-04',
    consentItems: {
      smsMandiPriceAlerts: true,
      cropPhotoTriage: true,
      govtSchemeFacilitation: true,
      thirdPartyLogisticsSharing: false
    },
    consentMethod: 'recorded_voice_affirmation',
    consentEvidenceRef: 'AUDIO-AFFIRMATION-REC#44091.WAV (DPDP S-7)',
    consentTimestamp: '2026-10-04 16:45 IST',
    facilitatorGramMitra: 'Priya Joshi (Mitra ID: GM-MP-109)'
  }
];

export const INITIAL_ASSISTANCE_SESSIONS: FacilitatorAssistanceSession[] = [
  {
    id: 'sess-01',
    farmerName: 'Mukesh Sharma',
    sessionType: 'field_visit',
    notes: 'Inspected 2 acres of soybean for yellowing. Captured high-res leaf photos for GramSetu AI triage; flagged whitefly presence.',
    status: 'completed',
    timestamp: 'Today, 08:00 AM',
    syncedWithCloud: true
  },
  {
    id: 'sess-02',
    farmerName: 'Kailash Bai',
    sessionType: 'ekyc_biometric',
    notes: 'Completed PM-Kisan 17th Installment Aadhaar facial eKYC on offline tablet. Successfully cached for government DBT portal sync.',
    status: 'completed',
    timestamp: 'Today, 09:30 AM',
    syncedWithCloud: true
  },
  {
    id: 'sess-03',
    farmerName: 'Deviram Dhangar',
    sessionType: 'pest_emergency',
    notes: 'Wheat rust outbreak reported in Sector 4. Triggered Agronomist escalation pipeline with GPS tags.',
    status: 'escalated_to_bank',
    timestamp: 'Today, 10:15 AM',
    syncedWithCloud: true
  }
];

export const INITIAL_SCHEME_ESCALATIONS: SchemeEscalation[] = [
  {
    id: 'sch-1',
    farmerName: 'Kailash Bai',
    schemeName: 'PM Fasal Bima Yojana (Crop Loss Claim)',
    department: 'AIC / Agriculture Insurance Company',
    slaDeadline: '24 hours remaining (Rule 48h SLA)',
    status: 'submitted_to_portal',
    appliedAmountOrBenefit: '₹34,500 Estimated Indemnity'
  },
  {
    id: 'sch-2',
    farmerName: 'Bhanwar Singh Bhati',
    schemeName: 'Pradhan Mantri Krishi Sinchayee (Drip Subsidy)',
    department: 'Horticulture Department Dewas',
    slaDeadline: '3 days remaining',
    status: 'pending_documents',
    appliedAmountOrBenefit: '55% Subsidy on 2.5 Acre Drip Kit'
  },
  {
    id: 'sch-3',
    farmerName: 'Mukesh Sharma',
    schemeName: 'Kisan Credit Card (KCC) Limit Enhancement',
    department: 'Bank of India, Bagli Branch',
    slaDeadline: 'Approved · Disbursed',
    status: 'sanctioned',
    appliedAmountOrBenefit: '₹2,80,000 Scale of Finance'
  }
];
