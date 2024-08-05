import { atomWithReset } from "jotai/utils";

interface optionValue {
  name: number;
  value: string;
}

export const targetOptionValueAtom = atomWithReset<optionValue[]>([
  {
    name: 0,
    value: "",
  },
  {
    name: 0,
    value: "",
  },
]);
