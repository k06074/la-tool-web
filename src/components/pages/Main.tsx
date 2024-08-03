import { useAtomValue } from "jotai/react";
import { getItems } from "@@/api/getApi";
import { searchOptionAtom } from "@@/atoms/searchOption";
import OptionsSetter from "@@/components/pages/options/OptionsSetter";
import { Button } from "@@/components/ui/button";
import { GetItemsProps, SearchDetailOption } from "@@/types";

export default function Main() {
  const so = useAtomValue(searchOptionAtom);
  const searchOption: GetItemsProps = {
    ItemGradeQuality: 67,
    EtcOptions: [
      {
        FirstOption: 7,
        SecondOption: 44,
        MinValue: null,
        MaxValue: null,
      },
    ] as SearchDetailOption,
    CategoryCode: 200010,
    ItemTier: 4,
    PageNo: 1,
    Sort: "BUY_PRICE",
    SortCondition: "ASC",
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <OptionsSetter />
    </main>
  );
}
