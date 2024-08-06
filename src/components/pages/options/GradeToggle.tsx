import { useAtom, useSetAtom } from "jotai/react";
import { Button } from "@@/components/ui/button";
import { Label } from "@@/components/ui/label";
import { searchOptionAtom } from "../../../atoms/searchOption";
import { selectedGradesAtom } from "../../../atoms/selectedGrades";

export default function GradeToggle() {
  const [selectedGrades, setSelectedGrades] = useAtom(selectedGradesAtom);
  const setSearchOption = useSetAtom(searchOptionAtom);

  const buttonClass = "w-12 border-2 text-black";

  const toggleGrade = (grade: string) => {
    const isSelected = selectedGrades.includes(grade);
    const updatedGrades = isSelected
      ? selectedGrades.filter((g) => g !== grade)
      : [...selectedGrades, grade];

    setSelectedGrades(updatedGrades);

    setSearchOption((prev) => {
      return {
        ...prev,
        ItemGrade: updatedGrades.length === 1 ? updatedGrades[0] : undefined,
      };
    });
  };

  return (
    <div className="min-w-[100px]">
      <Label>단계</Label>
      <div>
        <Button
          onClick={() => toggleGrade("유물")}
          className={
            `${buttonClass} rounded-r-none border-r-0 bg-orange-100 hover:bg-orange-200` +
            `${selectedGrades.includes("유물") ? " bg-orange-300" : ""}`
          }
        >
          유물
        </Button>
        <Button
          onClick={() => toggleGrade("고대")}
          className={`${buttonClass} rounded-l-none border-l-0 bg-blue-100 hover:bg-blue-200 ${
            selectedGrades.includes("고대") ? " bg-blue-300" : "" }`}
        >
          고대
        </Button>
      </div>
    </div>
  );
}
