import { atomWithReset } from "jotai/utils";
import { GetItemsProps, SearchDetailOption } from "@@/types";

export const searchOptionAtom = atomWithReset<GetItemsProps>({
  ItemGradeQuality: 67,
  EtcOptions: [
    {
      FirstOption: 7,
      SecondOption: 44,
      MinValue: null,
      MaxValue: null,
    },
  ] as SearchDetailOption[],
  CategoryCode: 200010,
  ItemTier: 4,
  PageNo: 1,
  Sort: "BUY_PRICE",
  SortCondition: "ASC",
});
