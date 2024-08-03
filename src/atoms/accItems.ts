import { atomWithReset } from "jotai/utils";
import { Item } from "@@/types";

export const accItems = atomWithReset<Item[]>([]);
