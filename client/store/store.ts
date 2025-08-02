import { create } from 'zustand';
import type { CatPropTypes } from '@/client/components/catData';

type Cattype = {
  catName: string;
  setCatName: (newname: string) => void;
};

export const useCatname = create<Cattype>((set) => ({
  catName: 'Persian',
  setCatName: (newname: string) => set({ catName: newname }),
}));

type CatDatatype = {
  cat: CatPropTypes | null;
  setCat: (newname: CatPropTypes) => void;
};

export const useCat = create<CatDatatype>((set) => ({
  cat: null,
  setCat: (newData: CatPropTypes) => set({ cat: newData }),
}));
