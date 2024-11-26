import { atom } from 'recoil';

// 'currentSidAtom'은 현재의 sid 값을 관리하는 Atom
export const currentSidAtom = atom<number>({
  key: 'currentSid',
  default: 22100058,
});