import React from 'react';
import { ElementData } from '../types';

interface ElementCardProps {
  element: ElementData;
  onClick: (element: ElementData) => void;
  isHighlighted?: boolean;
  isDimmed?: boolean;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  onClick,
  isHighlighted = true,
  isDimmed = false,
}) => {
  const getCategoryColor = (cat: string) => {
    if (cat.includes('alkali metal')) return 'bg-red-100/90 border-red-300 text-red-950 hover:bg-red-200';
    if (cat.includes('alkaline earth')) return 'bg-amber-100/90 border-amber-300 text-amber-950 hover:bg-amber-200';
    if (cat.includes('transition metal')) return 'bg-blue-100/90 border-blue-300 text-blue-950 hover:bg-blue-200';
    if (cat.includes('post-transition')) return 'bg-emerald-100/90 border-emerald-300 text-emerald-950 hover:bg-emerald-200';
    if (cat.includes('metalloid')) return 'bg-teal-100/90 border-teal-300 text-teal-950 hover:bg-teal-200';
    if (cat.includes('nonmetal')) return 'bg-purple-100/90 border-purple-300 text-purple-950 hover:bg-purple-200';
    if (cat.includes('noble gas')) return 'bg-pink-100/90 border-pink-300 text-pink-950 hover:bg-pink-200';
    if (cat.includes('lanthanide')) return 'bg-indigo-100/90 border-indigo-300 text-indigo-950 hover:bg-indigo-200';
    if (cat.includes('actinide')) return 'bg-rose-100/90 border-rose-300 text-rose-950 hover:bg-rose-200';
    return 'bg-slate-200 border-slate-400 text-slate-900 hover:bg-slate-300';
  };

  return (
    <button
      onClick={() => onClick(element)}
      disabled={!isHighlighted && isDimmed}
      className={`group relative flex flex-col justify-between p-1 rounded-xl border shadow-xs transition-all duration-200 text-left aspect-square active:scale-95 ${getCategoryColor(
        element.category
      )} ${
        !isHighlighted || isDimmed
          ? 'opacity-20 grayscale'
          : 'hover:scale-108 hover:shadow-lg hover:z-20 hover:border-blue-600 hover:ring-2 hover:ring-blue-400/30'
      }`}
    >
      <div className="flex items-center justify-between w-full leading-none">
        <span className="text-[9px] sm:text-[11px] font-mono font-extrabold text-slate-900">
          {element.number}
        </span>
        <span className="text-[7px] sm:text-[8px] font-bold text-slate-700 bg-white/70 px-1 py-0.5 rounded shadow-2xs">
          {element.phase.charAt(0)}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto leading-none py-0.5">
        <span className="text-sm sm:text-lg font-extrabold font-['Outfit',sans-serif] tracking-tight text-slate-950 group-hover:text-blue-700 transition-colors">
          {element.symbol}
        </span>
        <span className="text-[7px] sm:text-[9px] font-bold tracking-tight text-center w-full px-0.5 mt-0.5 text-slate-900 leading-tight">
          {element.name}
        </span>
      </div>

      <div className="text-[7px] sm:text-[9px] font-mono font-bold text-slate-800 text-center w-full leading-none bg-white/50 py-0.5 rounded-xs">
        {element.atomicMass.toFixed(2)}
      </div>
    </button>
  );
};
