import React, { useState } from 'react';
import { ALL_ELEMENTS } from '../data/elements';
import { Calculator, Atom, Sparkles, ArrowRight } from 'lucide-react';

export const MolecularWeightCalculator: React.FC = () => {
  const [formula, setFormula] = useState('H2O');
  const [result, setResult] = useState<{
    molarMass: number;
    elements: { symbol: string; name: string; count: number; atomicMass: number; totalMass: number; percentage: number }[];
    error?: string;
  } | null>(null);

  const presets = ['H2O', 'CO2', 'NaCl', 'C6H12O6', 'H2SO4', 'CaCO3', 'NH3', 'CH3COOH'];

  // Simple chemical formula parser (e.g. H2O, NaCl, C6H12O6)
  const calculateMolarMass = (inputFormula: string) => {
    try {
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      let totalMass = 0;
      const elementMap: { [symbol: string]: number } = {};

      let lastIndex = 0;
      while ((match = regex.exec(inputFormula)) !== null) {
        lastIndex = regex.lastIndex;
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;

        const el = ALL_ELEMENTS.find((e) => e.symbol === symbol);
        if (!el) {
          return { molarMass: 0, elements: [], error: `Unknown element symbol: "${symbol}"` };
        }

        elementMap[symbol] = (elementMap[symbol] || 0) + count;
      }

      if (lastIndex !== inputFormula.length) {
        return { molarMass: 0, elements: [], error: 'Invalid chemical formula syntax.' };
      }

      const elementsList = Object.entries(elementMap).map(([symbol, count]) => {
        const el = ALL_ELEMENTS.find((e) => e.symbol === symbol)!;
        const totalMassEl = el.atomicMass * count;
        totalMass += totalMassEl;
        return {
          symbol,
          name: el.name,
          count,
          atomicMass: el.atomicMass,
          totalMass: totalMassEl,
          percentage: 0,
        };
      });

      // Calculate percentages
      elementsList.forEach((item) => {
        item.percentage = (item.totalMass / totalMass) * 100;
      });

      return { molarMass: totalMass, elements: elementsList };
    } catch (e) {
      return { molarMass: 0, elements: [], error: 'Failed to parse chemical formula.' };
    }
  };

  React.useEffect(() => {
    const res = calculateMolarMass(formula.trim());
    setResult(res);
  }, [formula]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">Molecular Weight Calculator</h2>
            <p className="text-xs text-slate-500">Calculate molar mass and elemental composition percentages from chemical formulas</p>
          </div>
        </div>

        {/* Input & Presets */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-2">
              Enter Chemical Formula
            </label>
            <div className="relative">
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g. H2O, C6H12O6, NaCl"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base font-mono text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-mono">Quick Formula Presets:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setFormula(preset)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all ${
                    formula === preset
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div className="space-y-6 pt-4 border-t border-slate-200">
            {result.error ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-mono">
                {result.error}
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold block mb-1">Molar Mass (Molecular Weight)</span>
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">
                      {result.molarMass.toFixed(4)} <span className="text-base font-normal text-slate-600">g/mol</span>
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-white border border-blue-200 rounded-xl text-xs font-mono text-blue-800 font-semibold shadow-xs">
                    Formula: {formula}
                  </div>
                </div>

                {/* Breakdown table */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Elemental Composition Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-xs font-mono text-slate-500">
                          <th className="py-2 px-3">Element</th>
                          <th className="py-2 px-3">Symbol</th>
                          <th className="py-2 px-3">Atom Count</th>
                          <th className="py-2 px-3">Atomic Mass (u)</th>
                          <th className="py-2 px-3">Total Mass (u)</th>
                          <th className="py-2 px-3">Mass %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-sm font-mono">
                        {result.elements.map((el, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors text-xs">
                            <td className="py-3 px-3 font-sans font-semibold text-slate-900">{el.name}</td>
                            <td className="py-3 px-3 font-bold text-blue-600">{el.symbol}</td>
                            <td className="py-3 px-3">{el.count}</td>
                            <td className="py-3 px-3 text-slate-600">{el.atomicMass.toFixed(3)}</td>
                            <td className="py-3 px-3 text-slate-800 font-bold">{el.totalMass.toFixed(3)}</td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${el.percentage}%` }}></div>
                                </div>
                                <span className="font-semibold">{el.percentage.toFixed(1)}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
