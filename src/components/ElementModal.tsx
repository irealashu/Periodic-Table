import React, { useState } from 'react';
import { ElementData } from '../types';
import { X, Atom, Thermometer, BookOpen, Radio } from 'lucide-react';

interface ElementModalProps {
  element: ElementData | null;
  onClose: () => void;
  onSelectElement: (el: ElementData) => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({ element, onClose, onSelectElement }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'quantum' | 'spectrum'>('overview');

  if (!element) return null;

  // Calculate electron shells based on atomic number
  const getShells = (atomicNumber: number) => {
    const capacities = [2, 8, 18, 32, 32, 18, 8];
    let rem = atomicNumber;
    const shells: number[] = [];
    for (let i = 0; i < capacities.length; i++) {
      if (rem <= 0) break;
      const count = Math.min(rem, capacities[i]);
      shells.push(count);
      rem -= count;
    }
    return shells;
  };

  const shells = getShells(element.number);

  // Generate characteristic emission spectral lines
  const getEmissionLines = (el: ElementData) => {
    if (el.number === 1) { // Hydrogen
      return [
        { nm: 656.3, color: '#ef4444', name: 'H-alpha (Red)', position: '75%' },
        { nm: 486.1, color: '#06b6d4', name: 'H-beta (Cyan)', position: '45%' },
        { nm: 434.0, color: '#3b82f6', name: 'H-gamma (Blue)', position: '30%' },
        { nm: 410.2, color: '#8b5cf6', name: 'H-delta (Violet)', position: '20%' },
      ];
    }
    if (el.number === 2) { // Helium
      return [
        { nm: 667.8, color: '#ef4444', name: 'Red Line', position: '78%' },
        { nm: 587.6, color: '#eab308', name: 'Yellow D3', position: '60%' },
        { nm: 501.6, color: '#10b981', name: 'Green Line', position: '48%' },
        { nm: 447.1, color: '#3b82f6', name: 'Blue Line', position: '35%' },
      ];
    }
    if (el.number === 11) { // Sodium
      return [
        { nm: 589.0, color: '#eab308', name: 'Sodium D1 (Yellow)', position: '60%' },
        { nm: 589.6, color: '#facc15', name: 'Sodium D2 (Yellow)', position: '61%' },
      ];
    }
    if (el.number === 10) { // Neon
      return [
        { nm: 640.2, color: '#dc2626', name: 'Neon Red', position: '72%' },
        { nm: 585.2, color: '#ea580c', name: 'Neon Orange', position: '59%' },
        { nm: 540.1, color: '#16a34a', name: 'Neon Green', position: '52%' },
      ];
    }
    const base = 400 + (el.number * 17) % 300;
    return [
      { nm: Number(base.toFixed(1)), color: '#3b82f6', name: 'Primary Line', position: `${(base - 400) / 3}%` },
      { nm: Number((base + 75).toFixed(1)), color: '#8b5cf6', name: 'Secondary Line', position: `${(base + 75 - 400) / 3}%` },
      { nm: Number((base + 140).toFixed(1)), color: '#ec4899', name: 'Tertiary Line', position: `${(base + 140 - 400) / 3}%` },
    ];
  };

  const emissionLines = getEmissionLines(element);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 text-2xl font-bold font-['Outfit',sans-serif]">
              {element.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">{element.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  No. {element.number}
                </span>
              </div>
              <p className="text-xs text-slate-500 capitalize">
                {element.category} · Period {element.period}, Group {element.group ?? 'N/A'} · Block {element.block}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 px-6 gap-6 bg-slate-50 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Overview & Bohr Model
          </button>
          <button
            onClick={() => setActiveTab('spectrum')}
            className={`py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'spectrum'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            Emission Spectrum
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            Physical & Thermodynamic
          </button>
          <button
            onClick={() => setActiveTab('quantum')}
            className={`py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quantum'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Atom className="w-4 h-4" />
            Quantum & Isotopes
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Summary</h3>
                  <p className="text-slate-800 leading-relaxed">{element.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Atomic Mass</span>
                    <span className="text-base font-bold font-mono text-slate-900">{element.atomicMass} u</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Phase at STP</span>
                    <span className="text-base font-bold text-slate-900">{element.phase}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Discovery Year</span>
                    <span className="text-base font-bold text-slate-900">{element.discoveryYear}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Discoverer</span>
                    <span className="text-xs font-semibold text-slate-950 block leading-snug">{element.discoverer}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Common Industrial & Biological Uses</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {element.commonUses.map((use, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-medium">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Improved Dynamic Bohr Model Visualization */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/40 p-6 rounded-2xl border border-slate-200 relative overflow-hidden shadow-inner">
                <span className="absolute top-3 left-3 text-xs font-mono text-slate-500 font-semibold">Bohr Model ({element.number} Electrons)</span>
                <div className="relative w-64 h-64 flex items-center justify-center my-4">
                  {/* Nucleus Glow & Core */}
                  <div className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex flex-col items-center justify-center shadow-lg shadow-blue-500/30 z-20 border-2 border-white">
                    <span className="text-white font-extrabold text-sm">{element.symbol}</span>
                    <span className="text-[9px] text-blue-100 font-mono">{element.number}p⁺</span>
                  </div>

                  {/* Concentric Shells with Orbiting Electrons */}
                  {shells.map((electronCount, shellIdx) => {
                    const size = 76 + shellIdx * 34;
                    const animDuration = 10 + shellIdx * 6;
                    const isReverse = shellIdx % 2 === 1;
                    const shellName = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'][shellIdx];

                    return (
                      <div
                        key={shellIdx}
                        className="absolute rounded-full border border-blue-400/50 animate-spin shadow-2xs"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          animationDuration: `${animDuration}s`,
                          animationDirection: isReverse ? 'reverse' : 'normal',
                          zIndex: 10 - shellIdx,
                        }}
                      >
                        {Array.from({ length: electronCount }).map((_, eIdx) => {
                          const angle = (eIdx / electronCount) * 2 * Math.PI;
                          const radius = size / 2;
                          const x = radius + radius * Math.cos(angle) - 4;
                          const y = radius + radius * Math.sin(angle) - 4;

                          return (
                            <div
                              key={eIdx}
                              className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full shadow-md ring-2 ring-white"
                              style={{
                                left: `${x}px`,
                                top: `${y}px`,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="text-center bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl border border-slate-200 w-full shadow-2xs">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Configuration</span>
                  <span className="text-xs font-bold text-blue-700 font-mono">{element.electronConfiguration}</span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Shell Capacity: {shells.join(', ')} (K, L, M...)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spectrum' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
                    <Radio className="w-5 h-5 text-blue-600" />
                    Atomic Emission Spectrum ({element.name})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    When high voltage or thermal energy excites electrons in {element.name}, they jump to higher energy levels and emit photons at characteristic wavelengths as they return to ground state.
                  </p>
                </div>

                {/* Visible Light Spectrum Bar */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block">
                    Spectroscopic Emission Lines (UV to IR / 400nm - 750nm)
                  </span>
                  <div className="relative h-20 bg-gradient-to-r from-violet-600 via-blue-500 via-green-500 via-yellow-400 to-red-600 rounded-xl overflow-hidden shadow-inner border border-slate-300">
                    {/* Spectral Emission Lines */}
                    {emissionLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-lg ring-2 ring-black/40 flex flex-col items-center group cursor-pointer"
                        style={{ left: line.position }}
                      >
                        <div className="absolute -top-7 bg-slate-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-90 group-hover:opacity-100 z-30">
                          {line.nm} nm
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1">
                    <span>400 nm (Ultraviolet / Violet)</span>
                    <span>550 nm (Green / Yellow)</span>
                    <span>750 nm (Red / Infrared)</span>
                  </div>
                </div>

                {/* Emission Lines Table */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Characteristic Spectral Lines</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {emissionLines.map((line, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full shadow-xs border border-slate-300" style={{ backgroundColor: line.color }} />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{line.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">Wavelength</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold font-mono text-blue-700">{line.nm} nm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Melting Point</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.meltingPoint ? `${element.meltingPoint} K (${(element.meltingPoint - 273.15).toFixed(1)} °C)` : 'Unknown'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Boiling Point</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.boilingPoint ? `${element.boilingPoint} K (${(element.boilingPoint - 273.15).toFixed(1)} °C)` : 'Unknown'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Density</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.density ? `${element.density} g/cm³` : 'Unknown'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Electronegativity (Pauling)</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.electronegativity ?? 'N/A'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Atomic Radius</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.atomicRadius ? `${element.atomicRadius} pm` : 'N/A'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Ionization Energy</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.ionizationEnergy ? `${element.ionizationEnergy} kJ/mol` : 'N/A'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Thermal Conductivity</span>
                <span className="text-lg font-bold font-mono text-slate-950">
                  {element.thermalConductivity ? `${element.thermalConductivity} W/(m·K)` : 'N/A'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Crystal Structure</span>
                <span className="text-base font-bold text-slate-950">{element.crystalStructure}</span>
              </div>
            </div>
          )}

          {activeTab === 'quantum' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Atom className="w-4 h-4 text-blue-600" />
                  Quantum & Oxidation States
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Electron Configuration</span>
                    <span className="text-base font-mono font-bold text-blue-700">{element.electronConfiguration}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Common Oxidation States</span>
                    <div className="flex flex-wrap gap-1">
                      {element.oxidationStates.map((st, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-200 rounded text-xs font-mono text-slate-800">
                          {st > 0 ? `+${st}` : st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Isotopes & Nuclear Properties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Known Isotopes</span>
                    <span className="text-lg font-bold text-slate-950 font-mono">{element.isotopesCount} isotopes recorded</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Radioactivity</span>
                    <span className="text-base font-semibold text-slate-950">
                      {element.number >= 84 || element.phase === 'Artificial' ? 'Radioactive / Synthetic' : 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
