export type RoleMode = 'farmer' | 'facilitator' | 'agronomist';

export type LanguageMode = 'en' | 'hi';

export type DataBadgeType = 'live_verified' | 'pilot_sample' | 'simulated_demo';

export interface MandiItem {
  id: string;
  crop: string;
  cropHindi: string;
  variety: string;
  mandiName: string;
  district: string;
  state: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  unit: string;
  arrivalVolumeQtl: number;
  badge: DataBadgeType;
  lastUpdated: string;
  source: string;
  lotSlipVerified: boolean;
  notes?: string;
}

export interface WeatherAlert {
  id: string;
  district: string;
  temperatureC: number;
  humidityPct: number;
  rainfallChancePct: number;
  windSpeedKmph: number;
  condition: string;
  conditionHindi: string;
  alertLevel: 'normal' | 'advisory' | 'warning';
  alertMessage: string;
  alertMessageHindi: string;
  badge: DataBadgeType;
  timestamp: string;
  sourceStation: string;
}

export interface TransportVehicle {
  id: string;
  name: string;
  nameHindi: string;
  capacityQtl: number; // in quintals (100 kg)
  baseMileageKmPerLitre: number;
  baseTollPer100Km: number;
  driverAllowancePerDay: number;
  suitableFor: string;
}

export interface CandidateMandi {
  id: string;
  name: string;
  distanceKm: number;
  projectedGrossRate: number; // ₹ per quintal
  mandiCessPct: number; // e.g. 1.5%
  arhatiyaCommissionPct: number; // e.g. 2.0%
  unloadingRatePerBag: number; // ₹ per 50kg bag
  weighbridgeFlat: number; // ₹
  crowdDelayHours: number;
  provenance: DataBadgeType;
}

export interface CropCase {
  id: string;
  cropName: string;
  cropHindi: string;
  farmerName: string;
  village: string;
  imageUrl: string;
  symptoms: string;
  submittedAt: string;
  aiDiagnosis: {
    disease: string;
    diseaseHindi: string;
    confidenceScore: number; // 0 - 100
    pathogenType: 'viral' | 'fungal' | 'bacterial' | 'pest' | 'nutrient';
    severityLevel: 'low' | 'moderate' | 'high' | 'critical';
    preliminaryClue: string;
  };
  escalationStatus: 'ai_clue' | 'queued_for_officer' | 'in_review' | 'verified_signed';
  escalationTriggerReason?: string;
  assignedOfficer?: {
    name: string;
    designation: string;
    institution: string; // e.g. Krishi Vigyan Kendra (KVK) Dewas
    registrationNo: string;
  };
  verifiedAdvisory?: {
    cibrcChemical: string; // CIBRC approved active ingredient
    commercialBrand: string;
    exactDosage: string; // e.g., 2.5 ml per litre of water
    sprayWaterVolume: string; // e.g., 200 L per acre
    preHarvestIntervalDays: number; // PHI
    mandatoryPPE: string[];
    organicAlternative: string;
    signedTimestamp: string;
    signatureHash: string;
    expertNotes: string;
  };
}

export interface FarmerConsentRecord {
  id: string;
  farmerName: string;
  maskedPhone: string;
  village: string;
  landHoldingAcres: number;
  primaryCrops: string[];
  kccEnrolled: boolean;
  registrationDate: string;
  consentItems: {
    smsMandiPriceAlerts: boolean;
    cropPhotoTriage: boolean;
    govtSchemeFacilitation: boolean;
    thirdPartyLogisticsSharing: boolean;
  };
  consentMethod: 'biometric_aadhaar' | 'otp_sms' | 'recorded_voice_affirmation';
  consentEvidenceRef: string;
  consentTimestamp: string;
  facilitatorGramMitra: string;
}

export interface FacilitatorAssistanceSession {
  id: string;
  farmerName: string;
  sessionType: 'field_visit' | 'soil_card_guidance' | 'ekyc_biometric' | 'pest_emergency' | 'mandi_bilty_check';
  notes: string;
  status: 'completed' | 'follow_up_required' | 'escalated_to_bank';
  timestamp: string;
  syncedWithCloud: boolean;
}

export interface SchemeEscalation {
  id: string;
  farmerName: string;
  schemeName: string;
  department: string;
  slaDeadline: string;
  status: 'pending_documents' | 'submitted_to_portal' | 'sanctioned' | 'rejected_appealable';
  appliedAmountOrBenefit: string;
}

export interface SMSCommandResult {
  rawIncoming: string;
  parsedIntent: string;
  extractedEntities: Record<string, string>;
  characterCount: number;
  gsmSegments: number;
  generatedResponse: string;
  responseLength: number;
  status: 'success' | 'clarification_needed' | 'unknown_command';
}
