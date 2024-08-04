/* eslint-disable no-plusplus */
import { useAtom, useSetAtom } from "jotai/react";
import { useEffect, useState } from "react";
import { getItems } from "@@/api/getApi";
import { accItems } from "@@/atoms/accItems";
import { searchOptionAtom } from "@@/atoms/searchOption";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import AccSelect from "@@/components/pages/options/AccSelect";
import OptionSelect from "@@/components/pages/options/OptionSelect";
import OptionValueSelect from "@@/components/pages/options/OptionValueSelect";
import { Button } from "@@/components/ui/button";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import { CATEGORYS } from "@@/lib/constants";
import { Item, ItemOption, SearchDetailOption } from "@@/types";

export default function OptionsSetter() {
  const [accValue, setAccValue] = useState(0);
  const [quality, setQuality] = useState(67);
  const [point, setPoint] = useState(4);
  const [optionValue, setOptionValue] = useState<number>(0);
  const [searchOption, setSearchOption] = useAtom(searchOptionAtom);
  const [optionValueValue, setOptionValueValue] = useAtom(
    targetOptionValueAtom,
  );
  const setItems = useSetAtom(accItems);

  useEffect(() => {
    const etcOptionList = [
      {
        FirstOption: 7,
        SecondOption: optionValue,
        MinValue: null,
        MaxValue: null,
      },
      {
        FirstOption: 8,
        SecondOption: 1,
        MinValue: point,
        MaxValue: null,
      },
    ] as SearchDetailOption[];
    setSearchOption((prev) => {
      return {
        ...prev,
        ItemGradeQuality: quality,
        CategoryCode: CATEGORYS[accValue],
        EtcOptions: etcOptionList,
      };
    });
  }, [accValue, optionValue, point, quality, setSearchOption]);

  useEffect(() => {
    if (accValue) {
      setOptionValue(0);
      setOptionValueValue({
        name: 0,
        value: "",
      });
    }
  }, [accValue]);

  useEffect(() => {
    if (optionValue) {
      setOptionValueValue({
        name: optionValue,
        value: "",
      });
    }
  }, [optionValue]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    const initialReq = await getItems(searchOption, 1, 1);
    const totalCount = initialReq.TotalCount;
    const requestCount = Math.ceil(totalCount / 10);

    const delayTime = 61000; // Delay in milliseconds (1 minute)

    const makeRequests = async (batchStart: number) => {
      const batchSize = 550;
      const batchEnd = Math.min(batchStart + batchSize, requestCount);

      const promises: Promise<any>[] = [];
      for (let i = batchStart; i < batchEnd; i++) {
        const promise = getItems(searchOption, i, i % 5);
        promises.push(promise);
      }

      const results = await Promise.all(promises);

      const convertedItems: Item[] = results.flatMap((items) => {
        return items.Items.map((i: any) => {
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
    <div className="flex w-full gap-2 rounded bg-gray-200 p-4">
      <AccSelect accValue={accValue} setAccValue={setAccValue} />
      <div>
        <Label>품질</Label>
        <Input
          className="max-w-16"
          type="number"
          id="ItemGradeQuality"
          placeholder="품질"
          value={quality}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue > 100) setQuality(100);
            else setQuality(inputValue ?? 0);
          }}
        />
      </div>
      <div>
        <Label htmlFor="number">깨달음</Label>
        <Input
          className="max-w-16"
          type="number"
          id="accPoint"
          placeholder="깨달음"
          value={point}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue > 13) setPoint(13);
            else setPoint(inputValue ?? 0);
          }}
        />
      </div>
      <OptionSelect
        optionValue={optionValue}
        setOptionValue={setOptionValue}
        accValue={accValue}
      />
      <OptionValueSelect
        optionValueValue={optionValueValue.value}
        setOptionValueValue={(v) =>
          setOptionValueValue({
            name: optionValue,
            value: v,
          })
        }
        optionValue={optionValue}
      />
      <Button
        className="self-end"
        disabled={optionValue === 0}
        onClick={handleClick}
      >
        검색
      </Button>
    </div>
  );
}
