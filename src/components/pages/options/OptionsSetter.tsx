/* eslint-disable no-plusplus */
import { useSetAtom } from "jotai/react";
import { useResetAtom } from "jotai/react/utils";
import { useEffect, useState } from "react";
import { searchOptionAtom } from "@@/atoms/searchOption";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import AccSelect from "@@/components/pages/options/AccSelect";
import OptionSelect from "@@/components/pages/options/OptionSelect";
import OptionValueSelect from "@@/components/pages/options/OptionValueSelect";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import { CATEGORYS } from "@@/lib/constants";
import { SearchDetailOption } from "@@/types";
import GradeToggle from "./GradeToggle";
import OptionCountToggle from "./OptionCountToggle";
import SearchButton from "./SearchButton";

export default function OptionsSetter() {
  const [accValue, setAccValue] = useState(0);
  const [quality, setQuality] = useState(67);
  const [point, setPoint] = useState(4);
  const [optionValue, setOptionValue] = useState<number[]>([0, 0]);
  const setSearchOption = useSetAtom(searchOptionAtom);
  const resetOptionValueValue = useResetAtom(targetOptionValueAtom);

  useEffect(() => {
    const etcOptionList = [
      ...optionValue
        .filter((opt) => opt !== 0)
        .map((op) => {
          return {
            FirstOption: 7,
            SecondOption: op,
            MinValue: null,
            MaxValue: null,
          };
        }),
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
      setOptionValue([0, 0]);
      resetOptionValueValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accValue]);

  return (
    <div className="flex w-full flex-wrap gap-2 rounded border-2 bg-gray-100 p-4">
      <div className="flex gap-2">
        <AccSelect accValue={accValue} setAccValue={setAccValue} />
        <div>
          <Label className="truncate">품질</Label>
          <Input
            className="min-w-12 max-w-20"
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
          <Label htmlFor="number" className="truncate">
            깨달음
          </Label>
          <Input
            className="max-w-20"
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
      </div>
      <div className="flex gap-2">
        <GradeToggle />
        <OptionCountToggle />
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2].map((idx) => (
          <div key={idx} className="flex gap-2">
            <Label className="w-10 self-center truncate">옵션{idx}</Label>
            <OptionSelect
              idx={idx - 1}
              optionValue={optionValue[idx - 1]}
              setOptionValue={setOptionValue}
              accValue={accValue}
            />
            <OptionValueSelect
              idx={idx - 1}
              optionValue={optionValue[idx - 1]}
            />
          </div>
        ))}
      </div>
      <SearchButton optionValue={optionValue} />
    </div>
  );
}
