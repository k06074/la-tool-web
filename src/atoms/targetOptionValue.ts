import { atomWithReset } from "jotai/utils";

interface optionValue {
  name: number;
  value: string;
  realValue?: number;
}

export const targetOptionValueAtom = atomWithReset<optionValue[]>([
  {
    name: 0,
    value: "",
    realValue: 1,
  },
  {
    name: 0,
    value: "",
    realValue: 1,
  },
]);
