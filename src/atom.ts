import { atom } from 'recoil';

// Atom for managing the current sid
export const currentSidAtom = atom<number>({
  key: 'currentSid', // unique ID for the atom
  default: 22100058, // default sid value
});