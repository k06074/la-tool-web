import { SelectGroup } from "@radix-ui/react-select";
import { Label } from "@@/components/ui/label";
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
  optionValue: number;
  setOptionValue: (value: ((prevState: number) => number) | number) => void;
  accValue: number;
}

export default function OptionSelect({
  optionValue,
  setOptionValue,
  accValue,
}: OptionSelectProps) {
  const optionList = ACC_OPTIONS[accValue];
  return (
    <div className="flex-1">
      <Label>옵션</Label>
      <Select
        onValueChange={(v) => setOptionValue(Number(v))}
        value={optionValue.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
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
