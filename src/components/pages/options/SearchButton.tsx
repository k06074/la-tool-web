/* eslint-disable @typescript-eslint/no-explicit-any,no-continue,no-await-in-loop */
import { useAtomValue, useSetAtom } from "jotai/react";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getItems } from "@@/api/getApi";
import { accItems } from "@@/atoms/accItems";
import { searchOptionAtom } from "@@/atoms/searchOption";
import { Button } from "@@/components/ui/button";
import { Item, ItemOption } from "@@/types";

interface SearchButtonProps {
  optionValue: number[];
}

const delay = (ms: number, update: (remaining: number) => void) =>
  new Promise((resolve) => {
    let remaining = ms;
    const interval = setInterval(() => {
      remaining -= 1000;
      update(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        resolve(undefined);
      }
    }, 1000);
  });

export default function SearchButton({ optionValue }: SearchButtonProps) {
  const params = useSearchParams();
  const apiKeyLimit = params.get("laApiKeyLimit");
  const setItems = useSetAtom(accItems);
  const searchOption = useAtomValue(searchOptionAtom);
  const [progress, setProgress] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showWaiting, setShowWaiting] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const handleClick = async () => {
    setItems([]);
    const initialReq = await getItems(searchOption, 1);
    setTotalCount(initialReq.TotalCount);
    const requestCount = Math.ceil(initialReq.TotalCount / 10);

    for (let i = 1; i < requestCount; i += 1) {
      let result;
      try {
        result = await getItems(searchOption, i, apiKeyLimit);
      } catch (error: any) {
        if (error.message === "Rate limit exceeded") {
          setShowWaiting(true);
          setRemainingTime(61000);
          await delay(61000, setRemainingTime);
          setShowWaiting(false);
          i -= 1;
          continue;
        } else {
          throw error;
        }
      }

      const convertedItem: Item[] = result.Items.map((i: any) => {
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
          page: result.PageNo,
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
      setItems((prev: Item[]) => [...prev, ...convertedItem]);
      setProgress(i);
    }
    setTotalCount(0);
    setProgress(0);
  };

  return (
    <>
      <Button
        className="self-center"
        disabled={optionValue[0] === 0 && optionValue[1] === 0}
        onClick={handleClick}
      >
        검색
      </Button>
      <div
        className={`absolute left-0 top-0 z-10 flex size-full items-center justify-center bg-black
          bg-opacity-50 ${totalCount === 0 ? "hidden" : "block"}`}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl text-white">
            {progress * 10} / {totalCount}
          </p>
          {showWaiting && (
            <p className="text-white">
              {Math.ceil(remainingTime / 1000)} 초 후 재시도
            </p>
          )}
        </div>
      </div>
    </>
  );
}
