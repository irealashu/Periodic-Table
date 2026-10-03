import React, { useState, useMemo } from 'react';
import { ALL_ELEMENTS } from '../data/elements';
import { Calculator, AlertCircle } from 'lucide-react';

export const MolarMassCalculator: React.FC = () => {
  const [formula, setFormula] = useState('H2SO4');

  // Simple formula parser for molar mass
  const calculation = useMemo(() => {
    try {
      const trimmed = formula.trim();
      if (!trimmed) return { mass: 0, breakdown: [], error: null };

      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      let totalMass = 0;
      const breakdownMap: { [symbol: string]: { count: number; name: string; mass: number; element: any } } = {};

      let matchesCount = 0;
      while ((match = regex.exec(trimmed)) !== null) {
        matchesCount++;
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;

        const element = ALL_ELEMENTS.find((el) => el.symbol === symbol);
        if (!element) {
          return { mass: 0, breakdown: [], error: `Unknown element symbol: "${symbol}"` };
        }

        if (!breakdownMap[symbol]) {
          breakdownMap[symbol] = { count: 0, name: element.name, mass: element.atomicMass, element };
        }
        breakdownMap[symbol].count += count;
      }

      if (matchesCount === 0) {
        return { mass: 0, breakdown: [], error: 'Invalid chemical formula syntax.' };
      }

      const breakdown = Object.entries(breakdownMap).map(([sym, data]) => {
        const totalElementMass = data.count * data.mass;
        totalMass += totalElementMass;
        return {
          symbol: sym,
          name: data.element.name,
          count: data.count,
          atomicMass: data.mass,
          totalMass: totalElementMass,
        };
      });

      return {
        mass: totalMass,
        breakdown: breakdown.map(item => ({
          ...item,
          percentage: totalMass > 0 ? (item.totalMass / totalMass) * 100 : 0
        })),
        error: null,
      };
    } catch (err) {
      return { mass: 0, breakdown: [], error: 'Failed to parse chemical formula.' };
    }
  }, [formula]);

  const presets = ['H2O', 'H2SO4', 'C6H12O6', 'NaCl', 'CaCO3', 'CO2', 'NH3', 'CH3COOH'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">Molar Mass Calculator</h2>
            <p className="text-xs text-slate-500">Calculate molecular weight and elemental mass composition instantly</p>
          </div>
        </div>

        {/* Input formula */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 block">Enter Chemical Formula</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="e.g. C6H12O6"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-lg font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-500">Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setFormula(preset)}
                className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                  formula === preset
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {calculation.error ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{calculation.error}</span>
          </div>
        ) : (
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <div className="flex items-baseline justify-between bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider">Total Molar Mass</span>
                <span className="text-3xl md:text-4xl font-bold font-mono text-blue-700">
                  {calculation.mass.toFixed(4)}
                </span>
                <span className="text-sm font-mono text-slate-500 ml-2">g/mol</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-500 block">Formula</span>
                <span className="text-lg font-bold font-mono text-slate-900">{formula}</span>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Element Composition Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-mono text-slate-500">
                      <th className="py-3 px-4">Element</th>
                      <th className="py-3 px-4">Atom Count</th>
                      <th className="py-3 px-4">Atomic Weight (u)</th>
                      <th className="py-3 px-4">Total Mass (g/mol)</th>
                      <th className="py-3 px-4 text-right">Mass %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {calculation.breakdown.map((item) => (
                      <tr key={item.symbol} className="hover:bg-slate-50 transition-colors font-mono">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                            {item.symbol}
                          </span>
                          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-slate-900">{item.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{item.count}</td>
                        <td className="py-3 px-4 text-slate-500">{item.atomicMass.toFixed(3)}</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">{item.totalMass.toFixed(3)}</td>
                        <td className="py-3 px-4 text-right text-slate-900">{item.percentage.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
