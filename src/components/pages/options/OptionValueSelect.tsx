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
  optionValueValue: string;
  setOptionValueValue: (
    value: ((prevState: string) => string) | string,
  ) => void;
  optionValue: number;
}

export default function OptionValueSelect({
  optionValueValue,
  setOptionValueValue,
  optionValue,
}: OptionValueSelectProps) {
  const combinedOptions = [...ALL_OPTIONS, ...ACC_OPTIONS.flat()];

  const valueList =
    combinedOptions.filter((option) => option.value === optionValue)[0]
      ?.option || [];
  return (
    <div>
      <Label>값</Label>
      <Select onValueChange={setOptionValueValue} value={optionValueValue}>
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
