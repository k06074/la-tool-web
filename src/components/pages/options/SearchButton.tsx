/* eslint-disable @typescript-eslint/no-explicit-any,no-continue,no-await-in-loop */
import { useAtomValue, useSetAtom } from "jotai/react";
import { useState } from "react";
import { getItems } from "@@/api/getApi";
import { accItems } from "@@/atoms/accItems";
import { keyDialogOpenAtom } from "@@/atoms/keyDialogOpen";
import { searchOptionAtom } from "@@/atoms/searchOption";
import { Button } from "@@/components/ui/button";
import { useToast } from "@@/components/ui/use-toast";
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
  const setItems = useSetAtom(accItems);
  const searchOption = useAtomValue(searchOptionAtom);
  const [progress, setProgress] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showWaiting, setShowWaiting] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const setKeyDialogOpen = useSetAtom(keyDialogOpenAtom);
  const { toast } = useToast();

  const handleClick = async () => {
    setItems([]);

    try {
      const initialReq = await getItems(searchOption, 1);
      setTotalCount(initialReq.TotalCount);
      const requestCount = Math.ceil(initialReq.TotalCount / 10);

      for (let i = 1; i < requestCount; i += 1) {
        let result;
        try {
          result = await getItems(searchOption, i);
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

        const convertedItem: Item[] = result.Items.map((item: any) => {
          const ectOptions: any[] = item.Options ?? [];
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
            name: item.Name,
            grade: item.Grade,
            gradeQuality: item.GradeQuality,
            auctionInfo: {
              buyPrice: item.AuctionInfo.BuyPrice,
              endDate: item.AuctionInfo.EndDate,
              tradeAmount: item.AuctionInfo.TradeAllowCount,
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
    } catch (error: any) {
      if (error.message === "No API keys found") {
        toast({
          title: "API 키가 없습니다.",
          description: "API 키를 등록해주세요.",
        });
        setKeyDialogOpen(true);
      } else {
        throw error;
      }
    }
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
        className={`absolute left-0 top-0 z-10 flex size-full items-center justify-center
          bg-black/50 ${totalCount === 0 ? "hidden" : "block"}`}
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
