import React from 'react';
import { ALL_ELEMENTS } from '../data/elements';
import { ElementData } from '../types';
import { ElementCard } from './ElementCard';

interface PeriodicTableGridProps {
  onSelectElement: (element: ElementData) => void;
}

export const PeriodicTableGrid: React.FC<PeriodicTableGridProps> = ({ onSelectElement }) => {
  // Helper to map grid coordinates (period & group)
  const renderGridCell = (period: number, group: number) => {
    const element = ALL_ELEMENTS.find((el) => el.period === period && el.group === group);
    if (!element) return <div key={`empty-${period}-${group}`} className="aspect-square" />;

    return (
      <ElementCard
        key={element.number}
        element={element}
        onClick={onSelectElement}
      />
    );
  };

  const lanthanides = ALL_ELEMENTS.filter((el) => el.number >= 57 && el.number <= 71);
  const actinides = ALL_ELEMENTS.filter((el) => el.number >= 89 && el.number <= 103);

  return (
    <div className="space-y-6">
      {/* Main Periodic Table Grid - Optimized layout */}
      <div className="overflow-x-auto pb-4 scrollbar-none">
        <div className="min-w-[1100px] grid grid-cols-18 gap-1 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {Array.from({ length: 7 }, (_, periodIdx) => {
            const period = periodIdx + 1;
            return Array.from({ length: 18 }, (_, groupIdx) => {
              const group = groupIdx + 1;
              return renderGridCell(period, group);
            });
          })}
        </div>

        {/* Lanthanides & Actinides rows */}
        <div className="min-w-[1100px] grid grid-cols-15 gap-1 p-4 mt-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="col-span-15 text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">
            Lanthanides (Period 6)
          </div>
          {lanthanides.map((element) => (
            <ElementCard
              key={element.number}
              element={element}
              onClick={onSelectElement}
            />
          ))}
        </div>

        <div className="min-w-[1100px] grid grid-cols-15 gap-1 p-4 mt-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="col-span-15 text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">
            Actinides (Period 7)
          </div>
          {actinides.map((element) => (
            <ElementCard
              key={element.number}
              element={element}
              onClick={onSelectElement}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
          <span>Alkali Metal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></div>
          <span>Alkaline Earth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div>
          <span>Transition Metal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></div>
          <span>Post-Transition</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-teal-100 border border-teal-300"></div>
          <span>Metalloid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-100 border border-purple-300"></div>
          <span>Nonmetal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-pink-100 border border-pink-300"></div>
          <span>Noble Gas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-indigo-100 border border-indigo-300"></div>
          <span>Lanthanide</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-100 border border-rose-300"></div>
          <span>Actinide</span>
        </div>
      </div>
    </div>
  );
};
