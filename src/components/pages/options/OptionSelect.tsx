import { SelectGroup } from "@radix-ui/react-select";
import { useSetAtom } from "jotai/react";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@@/components/ui/select";
import { ACC_OPTIONS, ALL_OPTIONS } from "@@/lib/constants";

interface OptionSelectProps {
  idx: number;
  optionValue: number;
  setOptionValue: (
    value: ((prevState: number[]) => number[]) | number[],
  ) => void;
  accValue: number;
}

export default function OptionSelect({
  idx,
  optionValue,
  setOptionValue,
  accValue,
}: OptionSelectProps) {
  const optionList = ACC_OPTIONS[accValue];
  const setOptionValueValue = useSetAtom(targetOptionValueAtom);
  return (
    <div className="flex-1">
      <Select
        onValueChange={(v) => {
          if (idx === 0) {
            setOptionValue((prev) => [Number(v), prev[1]]);
            setOptionValueValue((prev) => [
              {
                name: Number(v),
                value: "",
              },
              prev[1],
            ]);
          } else {
            setOptionValue((prev) => [prev[0], Number(v)]);
            setOptionValueValue((prev) => [
              prev[0],
              {
                name: Number(v),
                value: "",
              },
            ]);
          }
        }}
        value={optionValue.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">미지정</SelectItem>
            <SelectLabel>특수 옵션</SelectLabel>
            {optionList.map((option) => (
              <SelectItem value={option.value.toString()}>
                {option.text}
              </SelectItem>
            ))}
            <SelectLabel>일반 옵션</SelectLabel>
            {ALL_OPTIONS.map((option) => (
              <SelectItem value={option.value.toString()}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
