import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  UserCheck, 
  Lock, 
  Upload, 
  Eye, 
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { INITIAL_CROP_CASES } from '../data/mockData';
import { CropCase, LanguageMode } from '../types';

interface PillarCropDoctorEscalationProps {
  lang: LanguageMode;
  userRole?: string;
}

export const PillarCropDoctorEscalation: React.FC<PillarCropDoctorEscalationProps> = ({ lang, userRole }) => {
  const [cases, setCases] = useState<CropCase[]>(INITIAL_CROP_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-101');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);
  const [signedSuccessNotice, setSignedSuccessNotice] = useState<string | null>(null);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Agronomist Sign-off Form state for reviewing unverified cases
  const [signForm, setSignForm] = useState({
    cibrcChemical: 'Propiconazole 25% EC (CIBRC Reg. 18231)',
    commercialBrand: 'Tilt 25 EC / Bumper',
    exactDosage: '1.0 ml per Litre of water (200 ml / acre)',
    sprayWaterVolume: '200 Litres per acre',
    preHarvestIntervalDays: 30,
    organicAlternative: 'Trichoderma harzianum @ 5g/L + balanced potash feeding',
    expertNotes: 'High stripe rust risk due to recent humidity. Spray with protective mask. Restrict spray to infected patches first.'
  });

  const handleSignAdvisory = (caseId: string) => {
    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          escalationStatus: 'verified_signed' as const,
          verifiedAdvisory: {
            cibrcChemical: signForm.cibrcChemical,
            commercialBrand: signForm.commercialBrand,
            exactDosage: signForm.exactDosage,
            sprayWaterVolume: signForm.sprayWaterVolume,
            preHarvestIntervalDays: signForm.preHarvestIntervalDays,
            mandatoryPPE: ['Nose respirator mask', 'Eye goggles', 'Rubber gloves', 'Full gumboots'],
            organicAlternative: signForm.organicAlternative,
            signedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST (Today)',
            signatureHash: `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
            expertNotes: signForm.expertNotes
          }
        };
      }
      return c;
    });

    setCases(updatedCases);
    setSignedSuccessNotice(`Case #${caseId} verified and CIBRC-signed! SMS dispatched to farmer.`);
    setTimeout(() => setSignedSuccessNotice(null), 4000);
  };

  const handleSimulateNewUpload = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const newCase: CropCase = {
        id: `case-${Math.floor(104 + Math.random() * 50)}`,
        cropName: 'Tomato (Hybrid)',
        cropHindi: 'टमाटर',
        farmerName: 'Kailash Bai',
        village: 'Hatpipliya, Dewas',
        imageUrl: '/src/assets/images/gramsetu_crop_leaf_disease_1791719066975.jpg',
        symptoms: 'Water-soaked lesions on lower foliage, rapid wilting during hot noon hours.',
        submittedAt: 'Just now (Offline Sync)',
        aiDiagnosis: {
          disease: 'Tomato Early Blight (Alternaria solani)',
          diseaseHindi: 'टमाटर अगेती झुलसा',
          confidenceScore: 74, // < 85 triggers escalation
          pathogenType: 'fungal',
          severityLevel: 'high',
          preliminaryClue: 'Concentric ring target-board pattern detected on mature leaflets.'
        },
        escalationStatus: 'queued_for_officer',
        escalationTriggerReason: 'Confidence score 74% (< 85% safety threshold) + High threat of rapid defoliation.',
        assignedOfficer: {
          name: 'Dr. Surendra K. Verma',
          designation: 'Senior Extension Specialist',
          institution: 'KVK Dewas',
          registrationNo: 'ICAR-MP-PATH-4419'
        }
      };

      setCases(prev => [newCase, ...prev]);
      setSelectedCaseId(newCase.id);
      setIsSimulatingUpload(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Pillar 3</span>
              <span aria-hidden="true">·</span>
              <span>Agronomic Safety</span>
              <span aria-hidden="true">·</span>
              <span>CIBRC Compliance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {lang === 'hi' ? 'सत्यापित विशेषज्ञ एस्केलेशन पाइपलाइन' : 'Verified Expert Escalation Pipeline'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {lang === 'hi'
                ? 'एआई फसल डॉक्टर के अपुष्ट या गंभीर सुझावों पर स्वतः रोक। कृषि विज्ञान केंद्र (KVK) विशेषज्ञों द्वारा प्रमाणित हस्ताक्षर व लेबल-सम्मत रसायनिक खुराक ही किसान तक पहुंचाई जाती है।'
                : 'Enforces human-in-the-loop agronomic guardrails. Prevents pesticide poisoning and crop damage by escalating unconfident or restricted cases to certified extension officers.'}
            </p>
          </div>

          <button
            onClick={handleSimulateNewUpload}
            disabled={isSimulatingUpload}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 self-start sm:self-center shrink-0 shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>{isSimulatingUpload ? 'Analyzing Leaf...' : 'Scan New Leaf (Test Trigger)'}</span>
          </button>
        </div>
      </div>

      {signedSuccessNotice && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{signedSuccessNotice}</span>
        </div>
      )}

      {/* Pipeline Visual Flow Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-3">
          Automated Escalation Pipeline Status Flow:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-700">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">1. AI Vision Clue</span>
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">Gemini Vision identifies symptoms, confidence %, and hazard level.</p>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">2. Trigger Check</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <p className="text-[11px] text-amber-800 leading-tight">If confidence &lt; 85% or Schedule-H chemical needed ➔ chemical blocked.</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">3. KVK Queue</span>
              <UserCheck className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <p className="text-[11px] text-blue-800 leading-tight">Assigned to district KVK pathologist for official dosage verification.</p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">4. Expert Sign-off</span>
              <Award className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <p className="text-[11px] text-emerald-800 leading-tight">CIBRC-compliant label prescription dispatched with crypto signature.</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Cases List on Left, Detailed Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Triage Queue (Col 4) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Advisory Triage Queue ({cases.length})
              </h3>
              <span className="text-[11px] text-stone-500">Live KVK Sync</span>
            </div>

            <div className="space-y-2">
              {cases.map((c) => {
                const isSelected = c.id === selectedCaseId;
                const isSigned = c.escalationStatus === 'verified_signed';
                const isQueued = c.escalationStatus === 'queued_for_officer';
                const isInReview = c.escalationStatus === 'in_review';

                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1.5 ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600' 
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{c.cropName}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isSigned ? 'bg-emerald-100 text-emerald-800' :
                        isQueued ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isSigned ? 'Expert Signed' : isQueued ? 'Queued KVK' : 'In Review'}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-600 truncate">
                      {c.aiDiagnosis.disease}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono pt-1 border-t border-stone-200/60">
                      <span>{c.farmerName} · {c.village.split(',')[0]}</span>
                      <span className="tabular-nums">AI: {c.aiDiagnosis.confidenceScore}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Case Inspection, Trigger Evaluation & Agronomist Sign Desk (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Case Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
            
            {/* Top Case Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900">
                    {selectedCase.cropName} ({selectedCase.cropHindi})
                  </h3>
                  <span className="text-xs text-stone-400 font-mono">#{selectedCase.id}</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Submitted by <strong>{selectedCase.farmerName}</strong> ({selectedCase.village}) · {selectedCase.submittedAt}
                </div>
              </div>

              {/* Status Badge */}
              <div className="self-start sm:self-auto">
                {selectedCase.escalationStatus === 'verified_signed' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>CIBRC Signed & Enforced</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-lg text-amber-900 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Chemical Advice Withheld (Pending Human Review)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Split Inspection: Leaf Image + Symptoms & AI Clue */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Photo Box */}
              <div className="md:col-span-5 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 relative group">
                <img
                  src={selectedCase.imageUrl}
                  alt={selectedCase.cropName}
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover"
                />
                <div className="p-2.5 bg-stone-900/80 text-stone-200 text-[11px] absolute bottom-0 inset-x-0 backdrop-blur-xs">
                  Field Photo Captured via Gram Mitra Tablet
                </div>
              </div>

              {/* Diagnosis & Trigger Card */}
              <div className="md:col-span-7 space-y-2.5 text-xs">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-stone-500 font-medium">Preliminary AI Vision Diagnosis:</span>
                    <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                      selectedCase.aiDiagnosis.confidenceScore >= 85 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      Confidence: {selectedCase.aiDiagnosis.confidenceScore}%
                    </span>
                  </div>
                  <div className="font-bold text-stone-900 text-sm">
                    {selectedCase.aiDiagnosis.disease}
                  </div>
                  <p className="text-stone-600 text-[11px] mt-1 leading-relaxed">
                    {selectedCase.aiDiagnosis.preliminaryClue}
                  </p>
                </div>

                {/* Automated Escalation Reason */}
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-amber-950">
                  <span className="font-bold block mb-1 text-amber-900 text-[11px]">
                    Automated Escalation Rule Triggered:
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-900/90">
                    {selectedCase.escalationTriggerReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Verified Advisory Dossier (if signed) OR Review Desk (if pending) */}
            {selectedCase.escalationStatus === 'verified_signed' && selectedCase.verifiedAdvisory ? (
              <div className="mt-4 pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Official Signed Agronomic Advisory (CIBRC Label Compliant)</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">
                    {selectedCase.verifiedAdvisory.signedTimestamp}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Approved Active Chemical</span>
                    <span className="font-bold text-stone-900">{selectedCase.verifiedAdvisory.cibrcChemical}</span>
                    <span className="text-[11px] text-stone-600 block mt-0.5">
                      Brand: {selectedCase.verifiedAdvisory.commercialBrand}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Prescribed Dilution & Dosage</span>
                    <span className="font-bold text-stone-900 font-mono">{selectedCase.verifiedAdvisory.exactDosage}</span>
                    <span className="text-[11px] text-stone-600 block mt-0.5">
                      Water: {selectedCase.verifiedAdvisory.sprayWaterVolume}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Pre-Harvest Interval (PHI)</span>
                    <span className="font-bold text-rose-700 font-mono">
                      {selectedCase.verifiedAdvisory.preHarvestIntervalDays} Days strictly
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Do not harvest or consume before interval.
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Organic / IPM Alternative</span>
                    <span className="font-bold text-emerald-900">{selectedCase.verifiedAdvisory.organicAlternative}</span>
                  </div>
                </div>

                {/* Safety PPE & Officer Credential */}
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Verified & Signed By:</span>
                    <span className="font-bold text-stone-900">{selectedCase.assignedOfficer?.name}</span>
                    <span className="text-[11px] text-stone-600 block">
                      {selectedCase.assignedOfficer?.designation} · {selectedCase.assignedOfficer?.institution}
                    </span>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded block">
                      {selectedCase.verifiedAdvisory.signatureHash}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Reg: {selectedCase.assignedOfficer?.registrationNo}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Review Desk for Officer / Facilitator to sign and verify */
              <div className="mt-4 pt-4 border-t border-stone-200 space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800 font-bold text-xs">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <span>Extension Officer Review Desk (Dr. Surendra K. Verma, KVK Dewas)</span>
                  </div>
                  <span className="text-xs text-amber-700 font-semibold">Action Required</span>
                </div>

                <p className="text-xs text-stone-600">
                  Review the leaf symptoms and confirm the label-compliant chemical recommendation and non-chemical alternative before dispatching to the farmer's SMS.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      CIBRC Approved Chemical Formulation
                    </label>
                    <input
                      type="text"
                      value={signForm.cibrcChemical}
                      onChange={(e) => setSignForm({ ...signForm, cibrcChemical: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded-md bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Exact Dosage per Litre of Water
                    </label>
                    <input
                      type="text"
                      value={signForm.exactDosage}
                      onChange={(e) => setSignForm({ ...signForm, exactDosage: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded-md bg-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Pre-Harvest Interval (PHI) in Days
                    </label>
                    <input
                      type="number"
                      value={signForm.preHarvestIntervalDays}
                      onChange={(e) => setSignForm({ ...signForm, preHarvestIntervalDays: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-300 rounded-md bg-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Organic / Bio-control Alternative
                    </label>
                    <input
                      type="text"
                      value={signForm.organicAlternative}
                      onChange={(e) => setSignForm({ ...signForm, organicAlternative: e.target.value })}
                      className="w-full p-2 border border-stone-300 rounded-md bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSignAdvisory(selectedCase.id)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Sign with Officer Credentials & Release Advisory</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
