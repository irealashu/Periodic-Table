export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  period: number;
  group: number | null;
  block: 's' | 'p' | 'd' | 'f';
  category: 
    | 'diatomic nonmetal'
    | 'noble gas'
    | 'alkali metal'
    | 'alkaline earth metal'
    | 'metalloid'
    | 'polyatomic nonmetal'
    | 'post-transition metal'
    | 'transition metal'
    | 'lanthanide'
    | 'actinide'
    | 'unknown';
  electronConfiguration: string;
  electronegativity: number | null; // Pauling scale
  atomicRadius: number | null; // pm
  ionizationEnergy: number | null; // kJ/mol
  electronAffinity: number | null; // kJ/mol
  meltingPoint: number | null; // K
  boilingPoint: number | null; // K
  density: number | null; // g/cm³
  phase: 'Gas' | 'Liquid' | 'Solid' | 'Artificial';
  discoveryYear: number | string;
  discoverer: string;
  summary: string;
  oxidationStates: number[];
  crystalStructure: string;
  thermalConductivity: number | null; // W/(m·K)
  isotopesCount: number;
  commonUses: string[];
}

export type PropertyFilter = 
  | 'category'
  | 'block'
  | 'phase'
  | 'electronegativity'
  | 'atomicRadius'
  | 'meltingPoint'
  | 'density'
  | 'discoveryYear';
