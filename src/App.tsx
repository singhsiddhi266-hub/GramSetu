/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { OverviewSection } from './components/OverviewSection';
import { PillarSmsUssd } from './components/PillarSmsUssd';
import { PillarLogisticsCalculator } from './components/PillarLogisticsCalculator';
import { PillarCropDoctorEscalation } from './components/PillarCropDoctorEscalation';
import { PillarDataBadging } from './components/PillarDataBadging';
import { PillarGramMitraDashboard } from './components/PillarGramMitraDashboard';
import { QuickUssdModal } from './components/QuickUssdModal';
import { RoleMode, LanguageMode } from './types';
import { 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  HeartHandshake,
  ExternalLink 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [roleMode, setRoleMode] = useState<RoleMode>('farmer');
  const [lang, setLang] = useState<LanguageMode>('en');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isQuickUssdOpen, setIsQuickUssdOpen] = useState<boolean>(false);
  
  // Desktop Preview Viewport Switcher: "responsive" (full width) or "mobile-preview" (390px iPhone/Android frame)
  const [viewportPreview, setViewportPreview] = useState<'responsive' | 'mobile-preview'>('responsive');

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Universal Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        roleMode={roleMode}
        setRoleMode={setRoleMode}
        lang={lang}
        setLang={setLang}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
        onOpenQuickUssd={() => setIsQuickUssdOpen(true)}
      />

      {/* Optional Desktop Floating Utility Toolbar to preview mobile touch layout */}
      <div className="hidden xl:flex fixed bottom-5 right-5 z-40 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-stone-300 shadow-xl items-center gap-2 text-xs">
        <span className="text-[11px] font-semibold text-stone-500 pl-2">Viewport Tester:</span>
        <button
          onClick={() => setViewportPreview('responsive')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
            viewportPreview === 'responsive' 
              ? 'bg-emerald-800 text-white shadow-xs' 
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Wide</span>
        </button>
        <button
          onClick={() => setViewportPreview('mobile-preview')}
          className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
            viewportPreview === 'mobile-preview' 
              ? 'bg-emerald-800 text-white shadow-xs' 
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device (390px)</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 pb-20 lg:pb-12">
        <div className={`mx-auto transition-all ${
          viewportPreview === 'mobile-preview' 
            ? 'max-w-[420px] my-6 p-4 bg-stone-200/60 rounded-[40px] shadow-2xl border-8 border-stone-800 overflow-hidden' 
            : 'max-w-7xl px-4 sm:px-6 py-6 sm:py-8'
        }`}>
          
          {/* Active Tab Router */}
          {activeTab === 'overview' && (
            <OverviewSection
              lang={lang}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenQuickUssd={() => setIsQuickUssdOpen(true)}
            />
          )}

          {activeTab === 'sms-ussd' && (
            <PillarSmsUssd lang={lang} />
          )}

          {activeTab === 'logistics' && (
            <PillarLogisticsCalculator lang={lang} />
          )}

          {activeTab === 'crop-doctor' && (
            <PillarCropDoctorEscalation lang={lang} userRole={roleMode} />
          )}

          {activeTab === 'data-badging' && (
            <PillarDataBadging lang={lang} />
          )}

          {activeTab === 'gram-mitra' && (
            <PillarGramMitraDashboard lang={lang} />
          )}
        </div>
      </main>

      {/* Global Quick USSD Modal */}
      <QuickUssdModal
        isOpen={isQuickUssdOpen}
        onClose={() => setIsQuickUssdOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-stone-200 py-8 px-4 sm:px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-stone-800 text-sm flex items-center justify-center sm:justify-start gap-1.5">
              <span>GramSetu (ग्रामसेतु)</span>
              <span className="text-[11px] font-normal text-stone-500">· Rural Agricultural Operating System</span>
            </div>
            <p className="text-[11px] text-stone-500">
              Mitigating operational, technical, and financial risks for rural farmers and Gram Mitras.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-800 font-medium">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Toll-Free: 1800-GRAMSETU</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>eNAM API Gateway Connected</span>
            <span aria-hidden="true">·</span>
            <span>CIBRC Safety Enforced</span>
            <span aria-hidden="true">·</span>
            <span>DPDP Act Section 6 & 7 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
