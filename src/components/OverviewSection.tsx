import React from 'react';
import { 
  Smartphone, 
  Calculator, 
  Stethoscope, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  ShieldAlert, 
  TrendingUp, 
  Sparkles,
  Award
} from 'lucide-react';
import { LanguageMode } from '../types';

interface OverviewSectionProps {
  lang: LanguageMode;
  onNavigateToTab: (tab: string) => void;
  onOpenQuickUssd: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  lang,
  onNavigateToTab,
  onOpenQuickUssd
}) => {
  const pillars = [
    {
      id: 'sms-ussd',
      number: '01',
      title: lang === 'hi' ? 'ऑफलाइन SMS व USSD वर्कफ़्लो' : 'Offline SMS & USSD Resilient Hub',
      riskSolved: 'Technical & Connectivity Risk',
      description: lang === 'hi'
        ? 'फीचर फोन के लिए *123# शॉर्टकोड व SMS पार्सर। बिना डेटा के लाइव मंडी भाव व मौसम की जानकारी।'
        : 'Zero-data GSM-7 interface and interactive menu tree enabling smallholders on keypad feature phones to pull verified rates and trigger triage.',
      icon: Smartphone,
      accent: 'emerald'
    },
    {
      id: 'logistics',
      number: '02',
      title: lang === 'hi' ? 'लॉजिस्टिक्स व शुद्ध लाभ कैलकुलेटर' : 'Marketplace Real Net-Profit Calculator',
      riskSolved: 'Financial & Market Deception Risk',
      description: lang === 'hi'
        ? 'डीजल, पल्लेदारी, मंडी टैक्स और आढ़त का पूरा हिसाब। दूर की मंडी के "ऊंचे रेट के धोखे" से बचाव।'
        : 'Exposes hidden freight, loading, mandi cess, and transit shrinkage to show true in-hand cash realization rather than deceptive gross headline rates.',
      icon: Calculator,
      accent: 'amber'
    },
    {
      id: 'crop-doctor',
      number: '03',
      title: lang === 'hi' ? 'सत्यापित विशेषज्ञ एस्केलेशन पाइपलाइन' : 'Verified Expert Agronomist Escalation',
      riskSolved: 'Biological & Chemical Misuse Risk',
      description: lang === 'hi'
        ? 'एआई फसल डॉक्टर के अपुष्ट सुझावों पर स्वतः रोक। KVK वैज्ञानिकों द्वारा हस्ताक्षरित CIBRC-सम्मत दवा खुराक।'
        : 'Automated rules intercept uncertain AI vision classifications (<85%) and mandate CIBRC label-compliant verification by qualified extension officers.',
      icon: Stethoscope,
      accent: 'blue'
    },
    {
      id: 'data-badging',
      number: '04',
      title: lang === 'hi' ? 'पारदर्शी डेटा बैजिंग प्रणाली' : 'Transparent Data Badging & Provenance',
      riskSolved: 'Operational Misrepresentation Risk',
      description: lang === 'hi'
        ? 'लाइव नीलामी पर्ची (Live), स्पॉट सर्वे (Pilot) और सांख्यिकीय मॉडल (Simulated) की स्पष्ट पहचान।'
        : 'Dynamic cryptographic badges and time-stamped provenance cards clearly distinguishing between physical eNAM gate slips and synthetic models.',
      icon: ShieldCheck,
      accent: 'teal'
    },
    {
      id: 'gram-mitra',
      number: '05',
      title: lang === 'hi' ? 'ग्राम मित्र टास्क एवं सहमति डैशबोर्ड' : 'Gram Mitra Task & DPDP Consent Vault',
      riskSolved: 'Privacy & Operational Governance Risk',
      description: lang === 'hi'
        ? 'DPDP कानून के तहत स्पष्ट अनुमति, संपर्क सुरक्षा और ऑफलाइन फील्ड सहायता का सुरक्षित रिकॉर्ड।'
        : 'Facilitator control plane to capture biometric/audio consent before handling farmer data, log offline sessions, and track scheme SLAs.',
      icon: Users,
      accent: 'purple'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Text & Call to Action (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{lang === 'hi' ? 'ग्रामसेतु: संपूर्ण कृषि सुरक्षा प्रणाली' : 'GramSetu: Rural Agricultural Operating System'}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500 font-normal">v2.4 Resilient Release</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {lang === 'hi' ? (
                  <>
                    तकनीकी, परिचालन व वित्तीय जोखिमों से <span className="text-emerald-800">सुरक्षित कृषि तंत्र</span>
                  </>
                ) : (
                  <>
                    Mitigating Rural Risks Across <span className="text-emerald-800">Five Critical Agronomic Pillars</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                {lang === 'hi'
                  ? 'ग्रामसेतु ग्रामीण भारत के 14 करोड़ किसानों व ग्राम मित्रों को ऑफलाइन USSD, वास्तविक लॉजिस्टिक्स लाभ गणना, विशेषज्ञ-हस्ताक्षरित फसल सुरक्षा और डेटा गोपनीयता से सशक्त बनाता है।'
                  : 'Bridging connectivity deficits, eliminating hidden marketplace logistics leakages, preventing unverified chemical advice, and safeguarding privacy through certified village Gram Mitras.'}
              </p>

              {/* 3 Key Operational Tenets */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700">
                <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Works on 2G Keypad Phones</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Real Net In-Hand Earnings</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>CIBRC Signed Prescriptions</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 mt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToTab('logistics')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Launch Net-Profit Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuickUssd}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm rounded-lg border border-stone-300 transition-colors flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-emerald-700" />
                <span>Test USSD *123# Phone</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image (Col 5) */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-stone-100">
            <img
              src="/src/assets/images/gramsetu_farmer_field_1791719044524.jpg"
              alt="Indian farmer inspecting wheat crop field with smartphone"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent lg:hidden" />
            
            {/* Live Field Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-lg text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-stone-800">Field Activity Status</span>
                <span className="font-mono text-emerald-700 font-medium">Bagli Cluster · Live</span>
              </div>
              <p className="text-stone-700 font-medium text-[11px]">
                "GramSetu helped verify our 60 Quintal wheat harvest net margin before booking the tractor trolley."
              </p>
              <div className="text-[10px] text-stone-400 font-mono">
                Rameshwar Patidar, Bagli Farmer · DPDP Verified Consent #UIDAI-882193
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5 Architectural Risk Pillars Interactive Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            The Five Resilient Risk Pillars
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Explore each specialized module designed to protect smallholder farmers from operational and information asymmetries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => onNavigateToTab(pillar.id)}
                className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-5 shadow-xs transition-all hover:shadow-md cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Pillar {pillar.number}
                    </span>
                    <Icon className="w-5 h-5 text-stone-500 group-hover:text-emerald-700 transition-colors" />
                  </div>

                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    {pillar.riskSolved}
                  </span>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-900 transition-colors mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* Quick Mandi Market Visual Card */}
          <div className="bg-stone-900 text-stone-100 rounded-xl overflow-hidden relative min-h-[220px] flex flex-col justify-between p-5 border border-stone-800">
            <img
              src="/src/assets/images/gramsetu_mandi_market_1791719081884.jpg"
              alt="APMC Mandi Market"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                APMC Electronic Weighing Integration
              </span>
              <h3 className="text-base font-bold text-white">
                Live eNAM Lot Validation
              </h3>
              <p className="text-xs text-stone-300">
                Direct integration with electronic weighbridges and moisture testing standards.
              </p>
            </div>

            <div className="relative z-10 pt-3">
              <button
                onClick={() => onNavigateToTab('data-badging')}
                className="px-3.5 py-1.5 bg-white text-stone-950 font-bold text-xs rounded-lg hover:bg-stone-100 transition-colors"
              >
                Inspect Price Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
