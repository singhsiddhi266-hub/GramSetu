import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Truck, 
  Fuel, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp,
  Coins,
  Receipt,
  Info
} from 'lucide-react';
import { TRANSPORT_VEHICLES, CANDIDATE_MANDIS } from '../data/mockData';
import { LanguageMode, TransportVehicle } from '../types';

interface PillarLogisticsCalculatorProps {
  lang: LanguageMode;
}

export const PillarLogisticsCalculator: React.FC<PillarLogisticsCalculatorProps> = ({ lang }) => {
  // Configurable inputs
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat (Sharbati)');
  const [quantityQtl, setQuantityQtl] = useState<number>(60); // 60 quintals = 120 bags of 50kg
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('v-1'); // Tractor trolley default
  const [dieselPricePerLitre, setDieselPricePerLitre] = useState<number>(94.5);
  const [loadingRatePerBag, setLoadingRatePerBag] = useState<number>(10); // ₹10 per 50kg bag
  const [transitShrinkagePct, setTransitShrinkagePct] = useState<number>(1.0); // 1% moisture/transit spillage
  const [cleaningGradingPerQtl, setCleaningGradingPerQtl] = useState<number>(15); // ₹15/qtl grading charge
  const [emptyReturnBackhaul, setEmptyReturnBackhaul] = useState<boolean>(true); // return trip empty load

  const selectedVehicle: TransportVehicle = useMemo(() => {
    return TRANSPORT_VEHICLES.find(v => v.id === selectedVehicleId) || TRANSPORT_VEHICLES[0];
  }, [selectedVehicleId]);

  const numberOfBags = quantityQtl * 2; // standard 50 kg jute sacks

  // Calculate itemized breakdown for each candidate mandi
  const comparisonResults = useMemo(() => {
    return CANDIDATE_MANDIS.map(mandi => {
      const grossProceeds = quantityQtl * mandi.projectedGrossRate;

      // 1. Fuel & Transport Cost
      // Round trip distance if empty return backhaul
      const totalKm = emptyReturnBackhaul ? mandi.distanceKm * 2 : mandi.distanceKm;
      const fuelLitres = totalKm / selectedVehicle.baseMileageKmPerLitre;
      const fuelCost = Math.round(fuelLitres * dieselPricePerLitre);
      const tollCost = Math.round((totalKm / 100) * selectedVehicle.baseTollPer100Km);
      const driverAllowance = selectedVehicle.driverAllowancePerDay;
      const totalHaulageCost = fuelCost + tollCost + driverAllowance;

      // 2. Handling & Labor
      const villageLoadingCost = numberOfBags * loadingRatePerBag;
      const mandiUnloadingCost = numberOfBags * mandi.unloadingRatePerBag;
      const totalHandlingCost = villageLoadingCost + mandiUnloadingCost;

      // 3. Market Fees, Cess & Commission
      const mandiCess = Math.round(grossProceeds * (mandi.mandiCessPct / 100));
      const arhatiyaCommission = Math.round(grossProceeds * (mandi.arhatiyaCommissionPct / 100));
      const weighbridgeCost = mandi.weighbridgeFlat;
      const totalMarketFees = mandiCess + arhatiyaCommission + weighbridgeCost;

      // 4. Grading & Spoilage / Shrinkage Risk
      const gradingCost = quantityQtl * cleaningGradingPerQtl;
      const shrinkageLossAmount = Math.round(grossProceeds * (transitShrinkagePct / 100));
      const totalQualityLoss = gradingCost + shrinkageLossAmount;

      // Total Deductions
      const totalDeductions = totalHaulageCost + totalHandlingCost + totalMarketFees + totalQualityLoss;

      // Real Net In-Hand
      const netInHandEarnings = grossProceeds - totalDeductions;
      const netPerQuintal = Math.round(netInHandEarnings / quantityQtl);
      const effectiveDeductionPerQtl = Math.round(totalDeductions / quantityQtl);

      return {
        mandi,
        grossProceeds,
        fuelCost,
        tollCost,
        driverAllowance,
        totalHaulageCost,
        villageLoadingCost,
        mandiUnloadingCost,
        totalHandlingCost,
        mandiCess,
        arhatiyaCommission,
        weighbridgeCost,
        totalMarketFees,
        gradingCost,
        shrinkageLossAmount,
        totalQualityLoss,
        totalDeductions,
        netInHandEarnings,
        netPerQuintal,
        effectiveDeductionPerQtl
      };
    });
  }, [
    quantityQtl,
    selectedVehicle,
    dieselPricePerLitre,
    loadingRatePerBag,
    cleaningGradingPerQtl,
    transitShrinkagePct,
    emptyReturnBackhaul,
    numberOfBags
  ]);

  // Find best net realization
  const bestMandiOption = useMemo(() => {
    return [...comparisonResults].sort((a, b) => b.netInHandEarnings - a.netInHandEarnings)[0];
  }, [comparisonResults]);

  // Selected primary option for deep waterfall (default to local or best)
  const [selectedMandiDetailId, setSelectedMandiDetailId] = useState<string>('mandi-local');
  const detailedMandiResult = comparisonResults.find(r => r.mandi.id === selectedMandiDetailId) || comparisonResults[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <span>Pillar 2</span>
          <span aria-hidden="true">·</span>
          <span>Financial Protection</span>
          <span aria-hidden="true">·</span>
          <span>Net Margin Realization</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          {lang === 'hi' ? 'परिवहन एवं लॉजिस्टिक्स शुद्ध लाभ कैलकुलेटर' : 'Transport & Logistics Real Net-Profit Calculator'}
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          {lang === 'hi'
            ? 'केवल सकल दर (Gross Price) के धोखे से बचें। डीजल, पल्लेदारी, मंडी उपकर, आढ़त और वजन के बाद हाथ में आने वाली शुद्ध रकम की सटीक गणना।'
            : 'Uncovers hidden logistics and handling leakages so farmers see authentic net in-hand cash proceeds rather than deceptive headline mandi prices.'}
        </p>
      </div>

      {/* Main Grid: Inputs on Left, Waterfall and Comparison on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Controls (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'hi' ? 'फसल व लॉजिस्टिक्स मापदंड' : 'Shipment & Harvest Parameters'}</span>
            </h3>

            {/* Crop Selector */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'hi' ? 'फसल का प्रकार' : 'Crop Commodity'}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full text-xs font-medium border border-stone-300 rounded-lg p-2.5 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Wheat (Sharbati)">Wheat / गेहूं (शरबती)</option>
                <option value="Soybean (Yellow)">Soybean / सोयाबीन (पीला)</option>
                <option value="Gram / Chana">Chana / चना (देसी)</option>
                <option value="Mustard / Sarson">Mustard / सरसों</option>
                <option value="Garlic / Lehsun">Garlic / लहसुन (रियावन)</option>
              </select>
            </div>

            {/* Quantity Slider / Number input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">
                  {lang === 'hi' ? 'मात्रा (क्विंटल)' : 'Harvest Volume (Quintals)'}
                </label>
                <span className="text-xs font-mono font-bold text-emerald-800 tabular-nums">
                  {quantityQtl} Qtl ({numberOfBags} bags of 50kg)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={quantityQtl}
                onChange={(e) => setQuantityQtl(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
                <span>10 Qtl</span>
                <span>100 Qtl</span>
                <span>200 Qtl</span>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'hi' ? 'परिवहन वाहन (Vehicle)' : 'Transport Vehicle'}
              </label>
              <div className="space-y-1.5">
                {TRANSPORT_VEHICLES.map((vehicle) => {
                  const isSelected = vehicle.id === selectedVehicleId;
                  const isOverload = quantityQtl > vehicle.capacityQtl;
                  return (
                    <button
                      key={vehicle.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' 
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                        <div>
                          <div className="font-semibold text-stone-800">{vehicle.name}</div>
                          <div className="text-[11px] text-stone-500">
                            Cap: {vehicle.capacityQtl} Qtl · Mileage: {vehicle.baseMileageKmPerLitre} km/L
                          </div>
                        </div>
                      </div>
                      {isOverload && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          {Math.ceil(quantityQtl / vehicle.capacityQtl)} Trips
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Granular Expense Overrides */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                {lang === 'hi' ? 'परिवर्तनीय व्यय (Variable Rates)' : 'Variable Expense Constants'}
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-0.5">Diesel Rate (₹/L)</label>
                  <input
                    type="number"
                    value={dieselPricePerLitre}
                    onChange={(e) => setDieselPricePerLitre(Number(e.target.value))}
                    className="w-full p-2 border border-stone-200 rounded-md font-mono text-xs tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-0.5">Loading (₹/bag)</label>
                  <input
                    type="number"
                    value={loadingRatePerBag}
                    onChange={(e) => setLoadingRatePerBag(Number(e.target.value))}
                    className="w-full p-2 border border-stone-200 rounded-md font-mono text-xs tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-0.5">Grading (₹/Qtl)</label>
                  <input
                    type="number"
                    value={cleaningGradingPerQtl}
                    onChange={(e) => setCleaningGradingPerQtl(Number(e.target.value))}
                    className="w-full p-2 border border-stone-200 rounded-md font-mono text-xs tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-0.5">Transit Shrinkage %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={transitShrinkagePct}
                    onChange={(e) => setTransitShrinkagePct(Number(e.target.value))}
                    className="w-full p-2 border border-stone-200 rounded-md font-mono text-xs tabular-nums"
                  />
                </div>
              </div>

              {/* Empty Return Toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={emptyReturnBackhaul}
                  onChange={(e) => setEmptyReturnBackhaul(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <span>Include empty return trip haulage (2x distance fuel)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output: Side-by-Side Mandi Comparison + Waterfall (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Key Insight Alert: The "Gross Rate Illusion" Detector */}
          <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-900 block mb-1">
                Marketplace Illusion Warning:
              </strong>
              <span>
                Indore Choithram Mandi advertises <strong>₹140/qtl higher gross price</strong> than local Dewas APMC.
                However, for a <strong>{quantityQtl} quintal</strong> load, the additional 76 km round-trip freight, urban loading fees, and commission drain <strong>₹{comparisonResults[1]?.effectiveDeductionPerQtl - comparisonResults[0]?.effectiveDeductionPerQtl} more per quintal</strong>.
                Selling at <strong>{bestMandiOption.mandi.name}</strong> yields the highest net in-hand payout of <strong>₹{bestMandiOption.netInHandEarnings.toLocaleString('en-IN')}</strong>.
              </span>
            </div>
          </div>

          {/* 3-Mandi Side-by-Side Comparison Matrix */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-200 flex justify-between items-center">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Multi-Mandi Net Realization Matrix ({quantityQtl} Qtl)
              </h4>
              <span className="text-[11px] text-stone-500 font-medium">Click row for itemized waterfall</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Mandi Destination</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Gross Rate</th>
                    <th className="py-2.5 px-3 font-semibold text-right">All Deductions</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Net Realized / Qtl</th>
                    <th className="py-2.5 px-3 font-semibold text-right">In-Hand Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {comparisonResults.map((item) => {
                    const isSelected = item.mandi.id === selectedMandiDetailId;
                    const isBest = item.mandi.id === bestMandiOption.mandi.id;

                    return (
                      <tr 
                        key={item.mandi.id}
                        onClick={() => setSelectedMandiDetailId(item.mandi.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-50/70 font-medium' : 'hover:bg-stone-50'
                        }`}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            {isBest && (
                              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" title="Highest Net Profit" />
                            )}
                            <div>
                              <div className="font-semibold text-stone-900">{item.mandi.name}</div>
                              <div className="text-[11px] text-stone-500">{item.mandi.distanceKm} km one-way · {item.mandi.crowdDelayHours}h yard wait</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-stone-700 tabular-nums">
                          ₹{item.mandi.projectedGrossRate.toLocaleString('en-IN')}/qtl
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-rose-700 tabular-nums">
                          -₹{item.effectiveDeductionPerQtl}/qtl
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-stone-900 tabular-nums">
                          ₹{item.netPerQuintal.toLocaleString('en-IN')}/qtl
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                          <span className={isBest ? 'text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded' : 'text-stone-800'}>
                            ₹{item.netInHandEarnings.toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Itemized Cost Waterfall for Selected Mandi */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Itemized Cost Waterfall: {detailedMandiResult.mandi.name}
                </h4>
                <span className="text-[11px] text-stone-500">
                  Gross Value: ₹{detailedMandiResult.grossProceeds.toLocaleString('en-IN')} (at ₹{detailedMandiResult.mandi.projectedGrossRate}/qtl)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                Net Margin: {((detailedMandiResult.netInHandEarnings / detailedMandiResult.grossProceeds) * 100).toFixed(1)}%
              </span>
            </div>

            {/* Waterfall Items */}
            <div className="space-y-2 text-xs">
              {/* Haulage */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600 flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-stone-400" />
                  Fuel & Toll ({detailedMandiResult.mandi.distanceKm * 2} km roundtrip @ {selectedVehicle.baseMileageKmPerLitre} km/L)
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{(detailedMandiResult.fuelCost + detailedMandiResult.tollCost).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Driver allowance */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">Driver Day Allowance & Food</span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{detailedMandiResult.driverAllowance.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Loading & Unloading */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">
                  Village Palledari Loading ({numberOfBags} bags @ ₹{loadingRatePerBag}/bag)
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{detailedMandiResult.villageLoadingCost.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">
                  Mandi Yard Unloading / Stacking ({numberOfBags} bags @ ₹{detailedMandiResult.mandi.unloadingRatePerBag}/bag)
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{detailedMandiResult.mandiUnloadingCost.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Mandi Cess & Commission */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">
                  Mandi Cess ({detailedMandiResult.mandi.mandiCessPct}%) & Arhatiya Fee ({detailedMandiResult.mandi.arhatiyaCommissionPct}%)
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{(detailedMandiResult.mandiCess + detailedMandiResult.arhatiyaCommission).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Weighbridge & Quality */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">
                  Dharam Kanta Weighbridge & Cleaning/Grading Fee
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{(detailedMandiResult.weighbridgeCost + detailedMandiResult.gradingCost).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Shrinkage */}
              <div className="flex justify-between items-center py-1 border-b border-stone-100">
                <span className="text-stone-600">
                  Transit Shrinkage & Spillage ({transitShrinkagePct}%)
                </span>
                <span className="font-mono text-stone-800 tabular-nums">
                  -₹{detailedMandiResult.shrinkageLossAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Final Net In-Hand Summary */}
              <div className="pt-2 flex justify-between items-center text-sm font-bold text-stone-900 bg-stone-50 p-2 rounded-lg">
                <span className="text-emerald-900 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-emerald-700" />
                  Net In-Hand Realization:
                </span>
                <span className="font-mono text-emerald-800 text-base tabular-nums">
                  ₹{detailedMandiResult.netInHandEarnings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
