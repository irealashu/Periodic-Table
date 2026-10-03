import React, { useState } from 'react';
import { ALL_ELEMENTS } from '../data/elements';
import { ElementData } from '../types';
import { Box, Search, Activity } from 'lucide-react';

interface LatticeExplorerProps {
  onSelectElementModal: (el: ElementData) => void;
}

export const LatticeExplorer: React.FC<LatticeExplorerProps> = ({ onSelectElementModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData>(
    ALL_ELEMENTS.find((e) => e.symbol === 'Cu') || ALL_ELEMENTS[0]
  );

  const filteredElements = ALL_ELEMENTS.filter(
    (el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.number.toString() === searchQuery
  );

  const getLatticeProfile = (el: ElementData) => {
    const symbol = el.symbol;
    const phase = el.phase;

    if (['Cu', 'Ag', 'Au', 'Al', 'Pb', 'Pt', 'Ni', 'Ca', 'Sr', 'Th'].includes(symbol)) {
      return {
        type: 'FCC',
        system: 'Face-Centered Cubic (FCC / CCP)',
        spaceGroup: 'Fm-3m (No. 225)',
        latticeConstant: '3.615 Å',
        packingEfficiency: '74.0%',
        coordinationNumber: 12,
        atomsPerUnitCell: 4,
        description: 'Atoms are positioned at each of the 8 corners and the centers of all 6 cubic faces. Maximizes space utilization.',
      };
    }
    if (['Fe', 'Na', 'K', 'W', 'Cr', 'V', 'Ba', 'Rb', 'Cs', 'Ta', 'Mo'].includes(symbol)) {
      return {
        type: 'BCC',
        system: 'Body-Centered Cubic (BCC)',
        spaceGroup: 'Im-3m (No. 229)',
        latticeConstant: '2.866 Å',
        packingEfficiency: '68.0%',
        coordinationNumber: 8,
        atomsPerUnitCell: 2,
        description: 'Atoms occupy the 8 corners of the cube plus one atom at the exact geometric center.',
      };
    }
    if (['Mg', 'Zn', 'Ti', 'Cd', 'Zr', 'Be', 'Co', 'Sc', 'Y', 'Hf'].includes(symbol)) {
      return {
        type: 'HCP',
        system: 'Hexagonal Close-Packed (HCP)',
        spaceGroup: 'P6₃/mmc (No. 194)',
        latticeConstant: 'a = 3.209 Å, c = 5.211 Å',
        packingEfficiency: '74.0%',
        coordinationNumber: 12,
        atomsPerUnitCell: 6,
        description: 'Alternating ABAB hexagonal layers stacked with maximum theoretical close-packing density.',
      };
    }
    if (['C', 'Si', 'Ge', 'Sn'].includes(symbol)) {
      return {
        type: 'Diamond',
        system: 'Diamond Cubic',
        spaceGroup: 'Fd-3m (No. 227)',
        latticeConstant: '5.431 Å',
        packingEfficiency: '34.0%',
        coordinationNumber: 4,
        atomsPerUnitCell: 8,
        description: 'Open tetrahedral network structure where each atom is bonded covalently to 4 equidistant neighbors.',
      };
    }
    if (phase === 'Gas' || phase === 'Liquid') {
      return {
        type: 'Amorphous',
        system: 'Amorphous / Fluid (No Crystal Lattice at STP)',
        spaceGroup: 'N/A (Disordered Fluid Phase)',
        latticeConstant: 'N/A',
        packingEfficiency: 'Variable',
        coordinationNumber: 'Variable',
        atomsPerUnitCell: 'N/A',
        description: `${el.name} exists as a ${phase.toLowerCase()} at standard temperature and pressure, possessing no long-range crystalline lattice structure.`,
      };
    }

    return {
      type: 'Complex',
      system: 'Orthorhombic / Monoclinic / Complex Crystalline',
      spaceGroup: 'Space Group Dependent',
      latticeConstant: 'Variable parameters',
      packingEfficiency: '~50% - 70%',
      coordinationNumber: 6,
      atomsPerUnitCell: '4 to 16',
      description: `Crystalline structure characterized by anisotropic unit cell dimensions and lower symmetry point groups.`,
    };
  };

  const lattice = getLatticeProfile(selectedElement);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">Crystal & Lattice Structures</h2>
              <p className="text-xs text-slate-500">Select any element to inspect its crystal system, unit cell geometry, and packing efficiency</p>
            </div>
          </div>

          {/* Search box for elements */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search element (e.g. Copper, Iron)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Selected Element Overview & Complete Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complete Element list sidebar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-h-[580px] overflow-y-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
              Select Element ({filteredElements.length} available)
            </span>
            {filteredElements.map((el) => (
              <button
                key={el.number}
                onClick={() => setSelectedElement(el)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                  selectedElement.number === el.number
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    selectedElement.number === el.number ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {el.symbol}
                  </span>
                  <span className="text-sm font-['Outfit',sans-serif]">{el.name}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  selectedElement.number === el.number ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  No. {el.number}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Lattice breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold font-['Outfit',sans-serif] shadow-md">
                    {selectedElement.symbol}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">{selectedElement.name} Crystal Lattice</h3>
                    <p className="text-xs text-slate-500">Atomic Number: {selectedElement.number} · Phase: {selectedElement.phase}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-50 border-blue-200 text-blue-700">
                  {lattice.type} Lattice
                </span>
              </div>

              {/* Lattice Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Crystal System</span>
                  <span className="text-sm font-bold text-slate-950">{lattice.system}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Space Group</span>
                  <span className="text-sm font-bold font-mono text-slate-950">{lattice.spaceGroup}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Packing Efficiency</span>
                  <span className="text-sm font-bold font-mono text-blue-700">{lattice.packingEfficiency}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Coordination Number</span>
                  <span className="text-sm font-bold font-mono text-slate-950">{lattice.coordinationNumber}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Lattice Constant (a)</span>
                  <span className="text-sm font-bold font-mono text-slate-950">{lattice.latticeConstant}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-mono uppercase block mb-1">Atoms per Unit Cell</span>
                  <span className="text-sm font-bold font-mono text-slate-950">{lattice.atomsPerUnitCell}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">Structural Description</span>
                <p className="text-xs text-slate-700 leading-relaxed">{lattice.description}</p>
              </div>
            </div>

            {/* Scientific Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
              <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-blue-950">
                <span className="font-bold block text-sm">Solid-State Crystallography</span>
                <p className="leading-relaxed">
                  The arrangement of atoms in {selectedElement.name} dictates its macroscopic mechanical properties, electrical conductivity, ductility, and cleavage planes under stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
