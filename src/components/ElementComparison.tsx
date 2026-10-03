import React, { useState } from 'react';
import { ALL_ELEMENTS } from '../data/elements';
import { ElementData } from '../types';
import { GitCompare, X, Plus } from 'lucide-react';

interface ElementComparisonProps {
  onSelectElementModal: (el: ElementData) => void;
}

export const ElementComparison: React.FC<ElementComparisonProps> = ({ onSelectElementModal }) => {
  const [comparedElements, setComparedElements] = useState<ElementData[]>([
    ALL_ELEMENTS[0], // Hydrogen
    ALL_ELEMENTS[5], // Carbon
    ALL_ELEMENTS[7], // Oxygen
  ]);

  const [selectedToAdd, setSelectedToAdd] = useState<string>('6');

  const addElement = () => {
    const num = parseInt(selectedToAdd, 10);
    const el = ALL_ELEMENTS.find((e) => e.number === num);
    if (el && !comparedElements.some((e) => e.number === num) && comparedElements.length < 4) {
      setComparedElements([...comparedElements, el]);
    }
  };

  const removeElement = (number: number) => {
    setComparedElements(comparedElements.filter((e) => e.number !== number));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">Element Property Comparison</h2>
              <p className="text-xs text-slate-500">Compare up to 4 elements side-by-side across IUPAC scientific properties</p>
            </div>
          </div>

          {/* Add element control */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedToAdd}
              onChange={(e) => setSelectedToAdd(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            >
              {ALL_ELEMENTS.map((el) => (
                <option key={el.number} value={el.number}>
                  {el.number}. {el.name} ({el.symbol})
                </option>
              ))}
            </select>
            <button
              onClick={addElement}
              disabled={comparedElements.length >= 4}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-mono text-slate-500">
                <th className="py-3 px-4 w-44">Property</th>
                {comparedElements.map((el) => (
                  <th key={el.number} className="py-3 px-4 min-w-[200px]">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {el.symbol}
                        </span>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block font-['Outfit',sans-serif]">{el.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">No. {el.number}</span>
                        </div>
                      </div>
                      {comparedElements.length > 1 && (
                        <button
                          onClick={() => removeElement(el.number)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Category</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 capitalize text-slate-800">{el.category}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Atomic Mass</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-blue-700 font-semibold">{el.atomicMass} u</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Period & Group</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-slate-800">Period {el.period}, Group {el.group ?? 'N/A'}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Electron Configuration</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-xs text-slate-700">{el.electronConfiguration}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Electronegativity</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-slate-800">{el.electronegativity ?? 'N/A'}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Atomic Radius</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-slate-800">{el.atomicRadius ? `${el.atomicRadius} pm` : 'N/A'}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Melting Point</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-slate-800">
                    {el.meltingPoint ? `${el.meltingPoint} K (${(el.meltingPoint - 273.15).toFixed(1)} °C)` : 'Unknown'}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Density</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-mono text-slate-800">{el.density ? `${el.density} g/cm³` : 'Unknown'}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Phase at STP</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 font-semibold text-slate-900">{el.phase}</td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-500">Discovery</td>
                {comparedElements.map((el) => (
                  <td key={el.number} className="py-3 px-4 text-xs text-slate-700">
                    <span className="font-semibold block text-slate-900">{el.discoveryYear}</span>
                    <span className="text-slate-500">{el.discoverer}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
