import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Filter, 
  ExternalLink, 
  Info, 
  CloudRain, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Search,
  Sparkles
} from 'lucide-react';
import { INITIAL_MANDI_DATA, INITIAL_WEATHER_DATA } from '../data/mockData';
import { MandiItem, WeatherAlert, DataBadgeType, LanguageMode } from '../types';

interface PillarDataBadgingProps {
  lang: LanguageMode;
}

export const PillarDataBadging: React.FC<PillarDataBadgingProps> = ({ lang }) => {
  const [mandiList] = useState<MandiItem[]>(INITIAL_MANDI_DATA);
  const [weatherList] = useState<WeatherAlert[]>(INITIAL_WEATHER_DATA);
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvenanceItem, setSelectedProvenanceItem] = useState<MandiItem | null>(null);

  // Filtered mandi list
  const filteredMandi = mandiList.filter(item => {
    const matchesBadge = selectedBadgeFilter === 'all' || item.badge === selectedBadgeFilter;
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBadge && matchesSearch;
  });

  const renderBadge = (badge: DataBadgeType) => {
    switch (badge) {
      case 'live_verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>LIVE VERIFIED</span>
          </span>
        );
      case 'pilot_sample':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>PILOT SAMPLE</span>
          </span>
        );
      case 'simulated_demo':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-900 border border-sky-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>SIMULATED MODEL</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <span>Pillar 4</span>
          <span aria-hidden="true">·</span>
          <span>Data Provenance & Trust</span>
          <span aria-hidden="true">·</span>
          <span>Zero Misrepresentation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          {lang === 'hi' ? 'पारदर्शी डेटा बैजिंग एवं सत्यापन प्रणाली' : 'Transparent Data Badging & Provenance System'}
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          {lang === 'hi'
            ? 'कृषि मंडियों और मौसम की जानकारी में भ्रामक दरों की रोकथाम। वास्तविक नीलामी पर्ची (Live), ग्रामीण मित्र स्पॉट सर्वे (Pilot) और सांख्यिकीय अनुमान (Simulated) को अलग-अलग पहचानें।'
            : 'Prevents farmer misrepresentation by visually enforcing strict data provenance boundaries across APMC auction lots, local spot surveys, and synthetic projections.'}
        </p>
      </div>

      {/* Trust Badging Legend Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2.5">
          Provenance Trust Standards & Verification SLAs:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          
          <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
            <div className="flex items-center gap-2">
              {renderBadge('live_verified')}
              <span className="font-semibold text-stone-900">Highest Reliability</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Physical electronic gate slip or eNAM live auction stream verified. Max 30-minute staleness SLA.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
            <div className="flex items-center gap-2">
              {renderBadge('pilot_sample')}
              <span className="font-semibold text-stone-900">Spot Inspected</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Survey of 5–10 primary mandi arhatiyas by a certified Gram Mitra. Indicative morning trend.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
            <div className="flex items-center gap-2">
              {renderBadge('simulated_demo')}
              <span className="font-semibold text-stone-900">Synthetic Planning Model</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Used when mandi is closed for holidays. Generated via multi-year seasonal price elasticities.
            </p>
          </div>

        </div>
      </div>

      {/* Mandi Auction Price Table with Badges */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs space-y-0">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-stone-900">
              Live Mandi Price Board ({filteredMandi.length} Markets Active)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search crop or mandi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg">
              <button
                onClick={() => setSelectedBadgeFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedBadgeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedBadgeFilter('live_verified')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedBadgeFilter === 'live_verified' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Live Only
              </button>
              <button
                onClick={() => setSelectedBadgeFilter('pilot_sample')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedBadgeFilter === 'pilot_sample' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Pilot Only
              </button>
              <button
                onClick={() => setSelectedBadgeFilter('simulated_demo')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedBadgeFilter === 'simulated_demo' ? 'bg-white text-sky-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Simulated
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[11px]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Commodity & Variety</th>
                <th className="py-2.5 px-3 font-semibold">APMC Yard / District</th>
                <th className="py-2.5 px-3 font-semibold">Provenance Badge</th>
                <th className="py-2.5 px-3 font-semibold text-right">Modal Rate</th>
                <th className="py-2.5 px-3 font-semibold text-right">Min - Max Range</th>
                <th className="py-2.5 px-3 font-semibold text-right">Arrivals (Qtl)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Audit Slip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMandi.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-stone-50/80 transition-colors cursor-pointer"
                  onClick={() => setSelectedProvenanceItem(item)}
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-900">{item.crop}</div>
                    <div className="text-[11px] text-stone-500">{item.variety}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-stone-800 font-medium">{item.mandiName}</div>
                    <div className="text-[11px] text-stone-500">{item.district}, {item.state}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {renderBadge(item.badge)}
                      <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.lastUpdated}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-400">per Quintal</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-stone-600 tabular-nums">
                    ₹{item.minPrice} - ₹{item.maxPrice}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-stone-700 tabular-nums">
                    {item.arrivalVolumeQtl.toLocaleString('en-IN')} Qtl
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProvenanceItem(item);
                      }}
                      className="px-2 py-1 text-[11px] text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                    >
                      View Source
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doppler Weather Advisory Cards with Transparent Provenance */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-stone-900">
            Doppler Agro-Meteorology & Radar Bulletins
          </h3>
          <span className="text-xs text-stone-500">Live IMD & KVK Station Network</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weatherList.map((weather) => (
            <div 
              key={weather.id}
              className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                weather.alertLevel === 'warning' ? 'border-amber-300' : 'border-stone-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{weather.district}</h4>
                  <span className="text-[11px] text-stone-500 font-mono">{weather.sourceStation}</span>
                </div>
                {renderBadge(weather.badge)}
              </div>

              {/* Weather Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-2 bg-stone-50 rounded-lg text-center text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Temp</span>
                  <span className="font-mono font-bold text-stone-800">{weather.temperatureC}°C</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Humidity</span>
                  <span className="font-mono font-bold text-stone-800">{weather.humidityPct}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Rain Chance</span>
                  <span className={`font-mono font-bold ${weather.rainfallChancePct > 50 ? 'text-amber-700' : 'text-stone-800'}`}>
                    {weather.rainfallChancePct}%
                  </span>
                </div>
              </div>

              {/* Advisory Message */}
              <div className="text-xs text-stone-700 leading-relaxed">
                <span className="font-semibold block text-stone-900 mb-0.5">{weather.condition}</span>
                {weather.alertMessage}
              </div>

              <div className="text-[10px] text-stone-400 font-mono border-t border-stone-100 pt-2 flex items-center justify-between">
                <span>{weather.timestamp}</span>
                <span className="text-emerald-700 font-medium">Auto-synced</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provenance Inspector Modal / Drawer */}
      {selectedProvenanceItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-scaleUp">
            
            <div className="flex justify-between items-start border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {renderBadge(selectedProvenanceItem.badge)}
                  <span className="text-xs text-stone-400 font-mono">ID: {selectedProvenanceItem.id}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {selectedProvenanceItem.crop} ({selectedProvenanceItem.mandiName})
                </h3>
              </div>
              <button
                onClick={() => setSelectedProvenanceItem(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Audit Details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Upstream Inward Source:</span>
                  <span className="font-semibold text-stone-900">{selectedProvenanceItem.source}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Physical Gate Slip:</span>
                  <span className={`font-semibold ${selectedProvenanceItem.lotSlipVerified ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {selectedProvenanceItem.lotSlipVerified ? 'Verified & Stamped' : 'Unverified Spot Inquiry'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Last Updated:</span>
                  <span className="font-mono text-stone-900">{selectedProvenanceItem.lastUpdated}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Lot Arrival Volume:</span>
                  <span className="font-mono text-stone-900">{selectedProvenanceItem.arrivalVolumeQtl} Quintals</span>
                </div>
              </div>

              {selectedProvenanceItem.notes && (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-700 block mb-0.5">Yard Observation Note:</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {selectedProvenanceItem.notes}
                  </p>
                </div>
              )}

              {/* Legal Misrepresentation Guarantee */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 text-[11px] space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Anti-Misrepresentation Protocol:
                </span>
                <p>
                  GramSetu binds all mandi figures to explicit source audits. Under no circumstance are simulated projection rates presented without unambiguous badges.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProvenanceItem(null)}
                className="px-4 py-2 bg-stone-900 text-white font-medium text-xs rounded-lg hover:bg-stone-800 transition-colors"
              >
                Close Audit Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
