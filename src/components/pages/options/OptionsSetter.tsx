import { useAtom, useSetAtom } from "jotai/react";
import { useEffect, useState } from "react";
import { getItems } from "@@/api/getApi";
import { accItems } from "@@/atoms/accItems";
import { searchOptionAtom } from "@@/atoms/searchOption";
import AccSelect from "@@/components/pages/options/AccSelect";
import OptionSelect from "@@/components/pages/options/OptionSelect";
import OptionValueSelect from "@@/components/pages/options/OptionValueSelect";
import { Button } from "@@/components/ui/button";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import { CATEGORYS } from "@@/lib/constants";
import { SearchDetailOption } from "@@/types";

export default function OptionsSetter() {
  const [accValue, setAccValue] = useState(0);
  const [quality, setQuality] = useState(67);
  const [point, setPoint] = useState(4);
  const [optionValue, setOptionValue] = useState<number>(0);
  const [searchOption, setSearchOption] = useAtom(searchOptionAtom);
  const [optionValueValue, setOptionValueValue] = useState("");
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
      setOptionValueValue("");
    }
  }, [accValue]);

  useEffect(() => {
    if (optionValue) {
      setOptionValueValue("");
    }
  }, [optionValue]);

  const handleClick = async () => {
    const items = await getItems(searchOption);
    const convertedItems = items.Items.map((i) => {
      return {
        name: i.Name,
        grade: i.Grade,
        auctionInfo: {
          buyPrice: i.AuctionInfo.BuyPrice,
          endDate: i.AuctionInfo.EndDate,
          tradeAmount: i.AuctionInfo.TradeAllowCount,
        },
        arkPoint: i.Options[0].Value,
        itemOption: {
          optionName: i.Options[1].OptionName,
          value: i.Options[1].Value,
        },
      } as Item;
    });
    setItems(convertedItems);
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
        optionValueValue={optionValueValue}
        setOptionValueValue={setOptionValueValue}
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
