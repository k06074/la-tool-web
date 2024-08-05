import { useAtom } from "jotai/react";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@/components/ui/select";
import { ACC_OPTIONS, ALL_OPTIONS } from "@@/lib/constants";

interface OptionValueSelectProps {
  idx: number;
  optionValue: number;
}

export default function OptionValueSelect({
  idx,
  optionValue,
}: OptionValueSelectProps) {
  const [optionValueValue, setOptionValueValue] = useAtom(
    targetOptionValueAtom,
  );
  const combinedOptions = [...ALL_OPTIONS, ...ACC_OPTIONS.flat()];

  const valueList =
    combinedOptions.filter((option) => option.value === optionValue)[0]
      ?.option || [];
  return (
    <div>
      <Select
        onValueChange={(v) => {
          if (idx === 0) {
            setOptionValueValue((prev) => [
              {
                name: optionValue,
                value: v,
              },
              prev[1],
            ]);
          } else {
            setOptionValueValue((prev) => [
              prev[0],
              {
                name: optionValue,
                value: v,
              },
            ]);
          }
        }}
        value={optionValueValue[idx].value}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {valueList.map((v) => (
            <SelectItem value={v}>{v}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
