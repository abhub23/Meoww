import { create } from 'zustand';

type Cattype = {
  catName: string;
  setCatName: (newname: string) => void;
};

export const useCatname = create<Cattype>((set) => ({
  catName: 'Persian',
  setCatName: (newname: string) => set({ catName: newname }),
}));
