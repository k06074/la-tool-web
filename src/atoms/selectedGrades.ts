import { atomWithReset } from "jotai/utils";

export const selectedGradesAtom = atomWithReset<string[]>([]);
