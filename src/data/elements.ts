import { ElementData } from '../types';
import { ELEMENTS } from './elementsPart1';
import { ELEMENTS_PART_2 } from './elementsPart2';
import { ELEMENTS_PART_3 } from './elementsPart3';
import { ELEMENTS_PART_4 } from './elementsPart4';
import { ELEMENTS_PART_5 } from './elementsPart5';
import { ELEMENTS_PART_6 } from './elementsPart6';
import { ELEMENTS_PART_7 } from './elementsPart7';

export const ALL_ELEMENTS: ElementData[] = [
  ...ELEMENTS,
  ...ELEMENTS_PART_2,
  ...ELEMENTS_PART_3,
  ...ELEMENTS_PART_4,
  ...ELEMENTS_PART_5,
  ...ELEMENTS_PART_6,
  ...ELEMENTS_PART_7,
];

export function getElementByCategory(category: string): ElementData[] {
  return ALL_ELEMENTS.filter(el => el.category === category);
}

export function getElementByNumber(num: number): ElementData | undefined {
  return ALL_ELEMENTS.find(el => el.number === num);
}

export function getElementBySymbol(sym: string): ElementData | undefined {
  return ALL_ELEMENTS.find(el => el.symbol.toLowerCase() === sym.toLowerCase());
}
