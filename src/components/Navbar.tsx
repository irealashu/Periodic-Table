import React, { useState } from 'react';
import { BookOpen, Radio, Calculator, Box, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'table' | 'isotopes' | 'calculator' | 'lattice';
  setActiveTab: (tab: 'table' | 'isotopes' | 'calculator' | 'lattice') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'table', label: 'Periodic Table', icon: BookOpen },
    { id: 'isotopes', label: 'Isotopes & Decay', icon: Radio },
    { id: 'calculator', label: 'Molecular Calculator', icon: Calculator },
    { id: 'lattice', label: 'Lattice Structures', icon: Box },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between shadow-xs">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-xl font-['Outfit',sans-serif]">
          H
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit',sans-serif]">
          Periodic Table
        </h1>
      </div>

      {/* Right: Hamburger Menu */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2.5 text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 flex items-center gap-2 shadow-xs"
          aria-label="Toggle Menu"
        >
          <span className="text-xs font-semibold hidden sm:inline font-mono">Menu</span>
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Hamburger Dropdown List (Positioned right-aligned) */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
            <div className="px-4 py-2 border-b border-slate-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Navigation Menu</span>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 font-semibold border-r-4 border-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
