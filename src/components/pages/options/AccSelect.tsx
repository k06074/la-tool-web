import { Label } from "@@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@@/components/ui/select";

interface AccSelectProps {
  accValue: number;
  setAccValue: (value: ((prevState: number) => number) | number) => void;
}

export default function AccSelect({ accValue, setAccValue }: AccSelectProps) {
  return (
    <div>
      <Label>부위</Label>
      <Select onValueChange={setAccValue} value={accValue}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={0}>목걸이</SelectItem>
          <SelectItem value={1}>귀걸이</SelectItem>
          <SelectItem value={2}>반지</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
