import { useAtomValue, useSetAtom } from "jotai/react";

import { getItems } from "@@/api/getApi";
import { accItems } from "@@/atoms/accItems";
import { Button } from "@@/components/ui/button";
import { Item, ItemOption } from "@@/types";
import { searchOptionAtom } from "../../../atoms/searchOption";

interface SearchButtonProps {
  optionValue: number[];
}

export default function SearchButton({ optionValue }: SearchButtonProps) {
  const setItems = useSetAtom(accItems);
  const searchOption = useAtomValue(searchOptionAtom);

  const delay = (ms: number) =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    setItems([]);
    const initialReq = await getItems(searchOption, 1, 1);
    const totalCount = initialReq.TotalCount;
    const requestCount = Math.ceil(totalCount / 10);

    const delayTime = 61000; // Delay in milliseconds (1 minute)

    const makeRequests = async (batchStart: number) => {
      const batchSize = 490;
      const batchEnd = Math.min(batchStart + batchSize, requestCount);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promises: Promise<any>[] = [];
      // eslint-disable-next-line no-plusplus
      for (let i = batchStart; i < batchEnd; i++) {
        const promise = getItems(searchOption, i, i % 5);
        promises.push(promise);
      }

      const results = await Promise.all(promises);

      const convertedItems: Item[] = results.flatMap((items) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.Items.map((i: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ectOptions: any[] = i.Options ?? [];
          const arkOption = ectOptions.find(
            (option) => option.Type === "ARK_PASSIVE",
          ) ?? { Value: 0 };
          const itemOptions: ItemOption[] = ectOptions
            .filter((option) => option.Type === "ACCESSORY_UPGRADE")
            .map((itemOption) => {
              return {
                optionName: itemOption.OptionName,
                value: itemOption.Value,
                isValuePercentage: itemOption.IsValuePercentage,
              };
            });
          return {
            page: items.PageNo,
            name: i.Name,
            grade: i.Grade,
            gradeQuality: i.GradeQuality,
            auctionInfo: {
              buyPrice: i.AuctionInfo.BuyPrice,
              endDate: i.AuctionInfo.EndDate,
              tradeAmount: i.AuctionInfo.TradeAllowCount,
            },
            arkPoint: arkOption.Value,
            itemOption: itemOptions,
          };
        });
      });

      setItems((prev: Item[]) => [...prev, ...convertedItems]);

      if (batchEnd < requestCount) {
        await delay(delayTime);
        await makeRequests(batchEnd);
      }
    };

    await makeRequests(1);
  };

  return (
    <Button
      className="self-center"
      disabled={optionValue[0] === 0 && optionValue[1] === 0}
      onClick={handleClick}
    >
      검색
    </Button>
  );
}
