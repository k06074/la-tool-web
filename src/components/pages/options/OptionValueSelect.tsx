import { useAtom } from "jotai/react";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import { Label } from "@@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@/components/ui/select";
import { ACC_OPTIONS, ALL_OPTIONS } from "@@/lib/constants";

interface OptionValueSelectProps {
  optionValue: number;
}

export default function OptionValueSelect({
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
      <Label>값</Label>
      <Select
        onValueChange={(v) =>
          setOptionValueValue({
            name: optionValue,
            value: v,
          })
        }
        value={optionValueValue.value}
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
