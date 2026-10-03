import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PeriodicTableGrid } from './components/PeriodicTableGrid';
import { IsotopesExplorer } from './components/IsotopesExplorer';
import { MolecularWeightCalculator } from './components/MolecularWeightCalculator';
import { LatticeExplorer } from './components/LatticeExplorer';
import { ElementModal } from './components/ElementModal';
import { ElementData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'table' | 'isotopes' | 'calculator' | 'lattice'>('table');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar adhering to Top Bar Contract */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'table' && <PeriodicTableGrid onSelectElement={setSelectedElement} />}
        {activeTab === 'isotopes' && <IsotopesExplorer onSelectElementModal={setSelectedElement} />}
        {activeTab === 'calculator' && <MolecularWeightCalculator />}
        {activeTab === 'lattice' && <LatticeExplorer onSelectElementModal={setSelectedElement} />}
      </main>

      {/* Element Detail Modal */}
      <ElementModal
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
        onSelectElement={setSelectedElement}
      />
    </div>
  );
}
