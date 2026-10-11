import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  UserPlus, 
  Cloud, 
  CloudOff, 
  RefreshCw, 
  Mic, 
  Fingerprint, 
  MessageSquare, 
  AlertCircle,
  FolderLock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  INITIAL_CONSENT_RECORDS, 
  INITIAL_ASSISTANCE_SESSIONS, 
  INITIAL_SCHEME_ESCALATIONS 
} from '../data/mockData';
import { 
  FarmerConsentRecord, 
  FacilitatorAssistanceSession, 
  SchemeEscalation, 
  LanguageMode 
} from '../types';

interface PillarGramMitraDashboardProps {
  lang: LanguageMode;
}

export const PillarGramMitraDashboard: React.FC<PillarGramMitraDashboardProps> = ({ lang }) => {
  const [consentRecords, setConsentRecords] = useState<FarmerConsentRecord[]>(INITIAL_CONSENT_RECORDS);
  const [sessions, setSessions] = useState<FacilitatorAssistanceSession[]>(INITIAL_ASSISTANCE_SESSIONS);
  const [schemes, setSchemes] = useState<SchemeEscalation[]>(INITIAL_SCHEME_ESCALATIONS);
  
  const [showNewFarmerModal, setShowNewFarmerModal] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // New Farmer Registration Form
  const [newFarmer, setNewFarmer] = useState<{
    farmerName: string;
    phone: string;
    village: string;
    landHoldingAcres: number;
    primaryCrop: string;
    consentSms: boolean;
    consentCropPhoto: boolean;
    consentScheme: boolean;
    consentLogistics: boolean;
    consentMethod: FarmerConsentRecord['consentMethod'];
  }>({
    farmerName: '',
    phone: '',
    village: 'Bagli, Dewas',
    landHoldingAcres: 4.5,
    primaryCrop: 'Soybean',
    consentSms: true,
    consentCropPhoto: true,
    consentScheme: true,
    consentLogistics: false,
    consentMethod: 'biometric_aadhaar'
  });

  // Handle Synchronizing offline tasks with cloud
  const handleSyncCloud = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSessions(prev => prev.map(s => ({ ...s, syncedWithCloud: true })));
      setSyncStatusMsg('All 3 offline field sessions & consent records synced with GramSetu Central Registry!');
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }, 1200);
  };

  const handleRegisterFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmer.farmerName || !newFarmer.phone) return;

    const maskedPhone = `+91 ${newFarmer.phone.slice(0, 5)} •••••`;
    const newRecord: FarmerConsentRecord = {
      id: `f-${Math.floor(900 + Math.random() * 99)}`,
      farmerName: newFarmer.farmerName,
      maskedPhone,
      village: newFarmer.village,
      landHoldingAcres: Number(newFarmer.landHoldingAcres),
      primaryCrops: [newFarmer.primaryCrop],
      kccEnrolled: true,
      registrationDate: new Date().toISOString().split('T')[0],
      consentItems: {
        smsMandiPriceAlerts: newFarmer.consentSms,
        cropPhotoTriage: newFarmer.consentCropPhoto,
        govtSchemeFacilitation: newFarmer.consentScheme,
        thirdPartyLogisticsSharing: newFarmer.consentLogistics
      },
      consentMethod: newFarmer.consentMethod,
      consentEvidenceRef: newFarmer.consentMethod === 'biometric_aadhaar' 
        ? `UIDAI-EKYC-TXN#${Math.floor(100000 + Math.random() * 900000)}`
        : newFarmer.consentMethod === 'otp_sms'
        ? `SMS-OTP-${Math.floor(100000 + Math.random() * 900000)}-AUTH`
        : `VOICE-AFFIRMATION-REC#${Math.floor(10000 + Math.random() * 90000)}.WAV`,
      consentTimestamp: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST (Today)`,
      facilitatorGramMitra: 'Kamal Kishor (Mitra ID: GM-MP-104)'
    };

    setConsentRecords(prev => [newRecord, ...prev]);
    setShowNewFarmerModal(false);
    setSyncStatusMsg(`Farmer profile for ${newFarmer.farmerName} recorded with explicit DPDP consent.`);
    setTimeout(() => setSyncStatusMsg(null), 4000);

    // Reset
    setNewFarmer({
      farmerName: '',
      phone: '',
      village: 'Bagli, Dewas',
      landHoldingAcres: 4.5,
      primaryCrop: 'Soybean',
      consentSms: true,
      consentCropPhoto: true,
      consentScheme: true,
      consentLogistics: false,
      consentMethod: 'biometric_aadhaar'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Pillar 5</span>
              <span aria-hidden="true">·</span>
              <span>Facilitator Field Operations</span>
              <span aria-hidden="true">·</span>
              <span>DPDP Consent Enforced</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {lang === 'hi' ? 'ग्राम मित्र टास्क एवं सहमति ट्रैकिंग डैशबोर्ड' : 'Gram Mitra Task & Consent Tracking Dashboard'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {lang === 'hi'
                ? 'डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) नियमों के तहत किसानों की स्पष्ट अनुमति, संपर्क सुरक्षा, ऑफलाइन फील्ड विज़िट और योजनाओं की ट्रैकिंग।'
                : 'Enables village-level Krishi Mitras to securely register farmers with auditable consent proofs, log field visits offline, and monitor scheme SLAs.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={handleSyncCloud}
              disabled={isSyncing}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-700' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Offline Cache'}</span>
            </button>
            <button
              onClick={() => setShowNewFarmerModal(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Farmer Profile</span>
            </button>
          </div>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Facilitator Status KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-stone-500 block mb-1">Registered Farmers</span>
          <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
            {consentRecords.length + 45} Farmers
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Bagli Cluster #4</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-stone-500 block mb-1">DPDP Verified Consent</span>
          <div className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
            100% Compliant
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">Biometric & Voice Affirmation</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-stone-500 block mb-1">Field Assistance Logs</span>
          <div className="text-xl font-bold font-mono text-stone-900 tabular-nums">
            {sessions.length} Logged Today
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">Offline-first tablet storage</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-stone-500 block mb-1">Scheme SLA Tracking</span>
          <div className="text-xl font-bold font-mono text-amber-800 tabular-nums">
            {schemes.length} Active
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">PM Fasal Bima & KCC Loans</span>
        </div>
      </div>

      {/* Main Content: Consent Vault Table + Field Logs & Scheme Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Farmer Consent Vault (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-200 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderLock className="w-4 h-4 text-emerald-800" />
                  <span>Farmer Explicit Consent Vault (DPDP Section 6 & 7)</span>
                </h3>
                <span className="text-[11px] text-stone-500">Contact data masked · Permissions enforced</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Audit Trail Active
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {consentRecords.map((record) => (
                <div key={record.id} className="p-4 hover:bg-stone-50/60 transition-colors text-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                        <span>{record.farmerName}</span>
                        <span className="text-xs font-mono text-stone-500 font-normal">{record.maskedPhone}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {record.village} · {record.landHoldingAcres} Acres · Crops: {record.primaryCrops.join(', ')}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-1 rounded block">
                        {record.consentMethod === 'biometric_aadhaar' ? 'Aadhaar Biometric' :
                         record.consentMethod === 'otp_sms' ? 'SMS OTP Auth' : 'Voice Affirmation'}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                        {record.consentTimestamp}
                      </span>
                    </div>
                  </div>

                  {/* Explicit Permission Granularity Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                    <div className={`p-1.5 rounded text-[10px] flex items-center gap-1 ${
                      record.consentItems.smsMandiPriceAlerts ? 'bg-emerald-50 text-emerald-900 font-medium' : 'bg-stone-100 text-stone-400'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Mandi Alerts</span>
                    </div>

                    <div className={`p-1.5 rounded text-[10px] flex items-center gap-1 ${
                      record.consentItems.cropPhotoTriage ? 'bg-emerald-50 text-emerald-900 font-medium' : 'bg-stone-100 text-stone-400'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Photo Triage</span>
                    </div>

                    <div className={`p-1.5 rounded text-[10px] flex items-center gap-1 ${
                      record.consentItems.govtSchemeFacilitation ? 'bg-emerald-50 text-emerald-900 font-medium' : 'bg-stone-100 text-stone-400'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Govt Schemes</span>
                    </div>

                    <div className={`p-1.5 rounded text-[10px] flex items-center gap-1 ${
                      record.consentItems.thirdPartyLogisticsSharing ? 'bg-emerald-50 text-emerald-900 font-medium' : 'bg-stone-100 text-stone-400'
                    }`}>
                      {record.consentItems.thirdPartyLogisticsSharing ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <span className="w-3 h-3 text-center leading-none">✕</span>
                      )}
                      <span>Logistics Share</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-400 font-mono flex items-center justify-between pt-1 border-t border-stone-100">
                    <span>Evidence Hash: {record.consentEvidenceRef}</span>
                    <span>Mitra: {record.facilitatorGramMitra.split('(')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Offline Field Logs + Scheme Escalation Queue (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Field Assistance Sessions */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Doorstep Field Assistance Logs
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">Offline-Ready</span>
            </div>

            <div className="space-y-2">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-stone-900">{sess.farmerName}</span>
                    <span className="text-stone-400 font-mono">{sess.timestamp}</span>
                  </div>
                  <div className="text-stone-700 text-[11px] leading-relaxed">
                    {sess.notes}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1 border-t border-stone-200/50">
                    <span className="capitalize font-medium">{sess.sessionType.replace('_', ' ')}</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{sess.syncedWithCloud ? 'Cloud Synced' : 'Cached on Tablet'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheme Escalations & Grievance Pipeline */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Government Scheme & Grievance SLAs
              </h4>
              <span className="text-[11px] text-stone-500">Kisan Call / DBT</span>
            </div>

            <div className="space-y-2">
              {schemes.map((sch) => (
                <div key={sch.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-stone-900 block">{sch.schemeName}</span>
                      <span className="text-[11px] text-stone-500">{sch.farmerName} · {sch.department}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      sch.status === 'sanctioned' ? 'bg-emerald-100 text-emerald-800' :
                      sch.status === 'submitted_to_portal' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {sch.status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-stone-600 bg-white p-2 rounded border border-stone-200">
                    <span className="font-mono">{sch.appliedAmountOrBenefit}</span>
                    <span className="font-medium text-amber-800">{sch.slaDeadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* New Farmer Registration Modal with DPDP Consent Controls */}
      {showNewFarmerModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-scaleUp">
            
            <div className="flex justify-between items-start border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  New Farmer Profile & Consent Capture
                </h3>
                <span className="text-xs text-stone-500">
                  Enforces explicit opt-in under DPDP Act before storing phone or land records
                </span>
              </div>
              <button
                onClick={() => setShowNewFarmerModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterFarmer} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Farmer Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radheshyam Patel"
                    value={newFarmer.farmerName}
                    onChange={(e) => setNewFarmer({ ...newFarmer, farmerName: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Mobile Number (10 digits)</label>
                  <input
                    type="tel"
                    required
                    placeholder="98261XXXXX"
                    value={newFarmer.phone}
                    onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-md font-mono focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Land Holding (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newFarmer.landHoldingAcres}
                    onChange={(e) => setNewFarmer({ ...newFarmer, landHoldingAcres: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Primary Crop</label>
                  <select
                    value={newFarmer.primaryCrop}
                    onChange={(e) => setNewFarmer({ ...newFarmer, primaryCrop: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-md bg-stone-50"
                  >
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Chana">Chana (चना)</option>
                    <option value="Garlic">Garlic (लहसुन)</option>
                  </select>
                </div>
              </div>

              {/* Mandatory DPDP Granular Checkboxes */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                <span className="text-[11px] font-bold text-stone-800 block">
                  Mandatory Granular Consent Checkboxes:
                </span>
                
                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFarmer.consentSms}
                    onChange={(e) => setNewFarmer({ ...newFarmer, consentSms: e.target.checked })}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Permit daily Mandi price & Doppler weather text SMS alerts</span>
                </label>

                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFarmer.consentCropPhoto}
                    onChange={(e) => setNewFarmer({ ...newFarmer, consentCropPhoto: e.target.checked })}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Permit crop pathology leaf photos to be triaged by AI and KVK Agronomists</span>
                </label>

                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFarmer.consentScheme}
                    onChange={(e) => setNewFarmer({ ...newFarmer, consentScheme: e.target.checked })}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Permit facilitation of government DBT subsidies (PM Fasal Bima & KCC)</span>
                </label>

                <label className="flex items-center gap-2 text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFarmer.consentLogistics}
                    onChange={(e) => setNewFarmer({ ...newFarmer, consentLogistics: e.target.checked })}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Share harvest batch weights with third-party transport drivers for aggregation</span>
                </label>
              </div>

              {/* Consent Evidence Capture Method */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Consent Verification Proof Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFarmer({ ...newFarmer, consentMethod: 'biometric_aadhaar' })}
                    className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 ${
                      newFarmer.consentMethod === 'biometric_aadhaar' ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold' : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <Fingerprint className="w-4 h-4 text-emerald-700" />
                    <span className="text-[10px]">Aadhaar Biometric</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewFarmer({ ...newFarmer, consentMethod: 'otp_sms' })}
                    className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 ${
                      newFarmer.consentMethod === 'otp_sms' ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold' : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span className="text-[10px]">SMS OTP Auth</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewFarmer({ ...newFarmer, consentMethod: 'recorded_voice_affirmation' })}
                    className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 ${
                      newFarmer.consentMethod === 'recorded_voice_affirmation' ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold' : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <Mic className="w-4 h-4 text-emerald-700" />
                    <span className="text-[10px]">Voice Affirmation</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewFarmerModal(false)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg text-xs"
                >
                  Save & Cryptographically Sign Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
