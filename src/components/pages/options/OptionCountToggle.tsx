import { useAtom } from "jotai/react";
import { Button } from "@@/components/ui/button";
import { Label } from "@@/components/ui/label";
import { optionCountAtom } from "../../../atoms/optionCount";

export default function OptionCountToggle() {
  const [optionCount, setOptionCount] = useAtom(optionCountAtom);

  const handleOptionCount = (count: number) => {
    setOptionCount(count);
  };

  return (
    <div>
      <Label>연마</Label>
      <div className="flex">
        {[0, 1, 2, 3].map((count, index, arr) => (
          <Button
            key={count}
            onClick={() => handleOptionCount(count)}
            className={`w-8 border-y-2 text-black hover:bg-gray-200
            ${optionCount === count ? "bg-gray-300" : "bg-gray-100"}
            ${index === 0 ? "rounded-l-lg rounded-r-none border-l-2" : index === arr.length - 1 ? "rounded-l-none rounded-r-lg border-r-2" : "rounded-none "} `}
          >
            {count}
          </Button>
        ))}
      </div>
    </div>
  );
}
