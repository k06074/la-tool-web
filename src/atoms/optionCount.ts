import { atomWithReset } from "jotai/utils";

export const optionCountAtom = atomWithReset<number[]>([0, 1, 2, 3]);
