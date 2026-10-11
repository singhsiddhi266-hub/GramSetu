import React from 'react';
import { 
  Radio, 
  Calculator, 
  Stethoscope, 
  ShieldCheck, 
  Users, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Languages, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { RoleMode, LanguageMode } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  roleMode: RoleMode;
  setRoleMode: (role: RoleMode) => void;
  lang: LanguageMode;
  setLang: (lang: LanguageMode) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  onOpenQuickUssd: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  roleMode,
  setRoleMode,
  lang,
  setLang,
  isOfflineMode,
  setIsOfflineMode,
  onOpenQuickUssd
}) => {
  const navItems = [
    { id: 'overview', label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Overview', icon: Compass },
    { id: 'sms-ussd', label: lang === 'hi' ? 'SMS व USSD' : 'SMS & USSD Hub', icon: Smartphone },
    { id: 'logistics', label: lang === 'hi' ? 'लॉजिस्टिक्स कैलकुलेटर' : 'Net-Profit Calc', icon: Calculator },
    { id: 'crop-doctor', label: lang === 'hi' ? 'फसल डॉक्टर व एस्केलेशन' : 'Crop Doctor & Escalation', icon: Stethoscope },
    { id: 'data-badging', label: lang === 'hi' ? 'मंडी व मौसम डेटा' : 'Mandi & Badging', icon: ShieldCheck },
    { id: 'gram-mitra', label: lang === 'hi' ? 'ग्राम मित्र डैशबोर्ड' : 'Gram Mitra Vault', icon: Users },
  ];

  return (
    <>
      {/* Top Header - Strictly compliant with 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
              className="text-xl font-bold tracking-tight text-emerald-900 whitespace-nowrap"
            >
              GramSetu
              <span className="text-xs font-normal text-stone-500 ml-1.5 hidden sm:inline">
                {lang === 'hi' ? 'ग्रामीण कृषि सेतु' : 'Rural Agro OS'}
              </span>
            </a>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-colors py-1 ${
                    isActive 
                      ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary contextual action & quick utilities */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Network State Toggle */}
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              title={isOfflineMode ? 'Switched to 2G/Offline mode' : 'Live High-Speed Mode active'}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                isOfflineMode 
                  ? 'bg-amber-50 text-amber-800 border-amber-300' 
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span className="hidden sm:inline">{isOfflineMode ? '2G / SMS' : '4G Live'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center gap-1 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-stone-600" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenQuickUssd}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
              <span>Dial *123#</span>
            </button>
          </div>
        </div>

        {/* Secondary Sub-Bar for Role Context (Clean human editorial switcher) */}
        <div className="bg-stone-50 border-t border-stone-200 px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
              <span className="font-semibold text-stone-500 whitespace-nowrap">
                {lang === 'hi' ? 'भूमिका मोड:' : 'Active Role:'}
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 rounded-md">
                <button
                  onClick={() => setRoleMode('farmer')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    roleMode === 'farmer' 
                      ? 'bg-white text-emerald-900 shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'hi' ? 'किसान (Farmer)' : 'Farmer'}
                </button>
                <button
                  onClick={() => setRoleMode('facilitator')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    roleMode === 'facilitator' 
                      ? 'bg-white text-emerald-900 shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'hi' ? 'ग्राम मित्र (Facilitator)' : 'Gram Mitra'}
                </button>
                <button
                  onClick={() => setRoleMode('agronomist')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    roleMode === 'agronomist' 
                      ? 'bg-white text-emerald-900 shadow-xs' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang === 'hi' ? 'कृषि वैज्ञानिक (Agronomist)' : 'KVK Officer'}
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-stone-500 text-[11px]">
              <span>Dewas Hub, MP</span>
              <span aria-hidden="true">·</span>
              <span>eNAM Live Sync</span>
              <span aria-hidden="true">·</span>
              <span>DPDP Consent Enforced</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Pattern 1 from Mobile Touch Reference) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg">
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto">
          {navItems.filter(item => item.id !== 'overview').map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[62px]">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
