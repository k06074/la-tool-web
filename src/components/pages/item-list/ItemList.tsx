import { useAtomValue } from "jotai/react";
import { accItems } from "@@/atoms/accItems";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import { ACC_OPTIONS, ALL_OPTIONS } from "@@/lib/constants";

export default function ItemList() {
  const items = useAtomValue(accItems);
  const targetOptionValue = useAtomValue(targetOptionValueAtom);
  const allOptionList = [...ACC_OPTIONS.flat(), ...ALL_OPTIONS];
  const currentTargetOption1 = allOptionList.filter(
    (options) => options.value === targetOptionValue[0].name,
  )[0];
  const currentTargetOptionName1 = currentTargetOption1?.text || "";
  const currentIsValuePercentage1 =
    currentTargetOption1?.isValuePercentage || false;
  const isSecondOption = targetOptionValue[1].value !== "0";
  const currentTargetOption2 = allOptionList.filter(
    (options) => options.value === targetOptionValue[1].name,
  )[0];
  const currentTargetOptionName2 = currentTargetOption2?.text || "";
  const currentIsValuePercentage2 =
    currentTargetOption2?.isValuePercentage || false;

  const showItems = items.filter((item) => {
    const matchesFirstOption = item.itemOption.some(
      (itemOp) =>
        itemOp.optionName === currentTargetOptionName1 &&
        itemOp.isValuePercentage === currentIsValuePercentage1 &&
        itemOp.value >= Number(targetOptionValue[0].value),
    );
    const matchesSecondOption = isSecondOption
      ? item.itemOption.some(
          (itemOp) =>
            itemOp.optionName === currentTargetOptionName2 &&
            itemOp.isValuePercentage === currentIsValuePercentage2 &&
            itemOp.value >= Number(targetOptionValue[1].value),
        )
      : true;

    return matchesFirstOption && matchesSecondOption;
  });

  const getOptionIndex = (
    optionName: string,
    optionValue: number,
    isValuePercentage: boolean,
  ): number => {
    const matchedOption = allOptionList.find(
      (option) =>
        option.text === optionName &&
        option.isValuePercentage === isValuePercentage,
    );

    if (!matchedOption) {
      return -1;
    }
    const valueIndex = matchedOption.option.findIndex(
      (value) => Number(value) === optionValue,
    );

    return valueIndex;
  };
  const optionColor = ["bg-yellow-300", "bg-purple-300", "bg-green-300"];

  const textString = `content-center text-center text-sm text-gray-700`;

  return (
    <div className="h-[calc(100vh-200px)] w-full overflow-y-scroll rounded bg-blue-50 p-2">
      <div className="mb-2 flex w-full rounded bg-gray-200 px-4 py-1">
        <p className={`w-1/12 ${textString}`}>페이지</p>
        <p className={`w-1/2 ${textString}`}>옵션</p>
        <p className={`w-1/6 ${textString}`}>가격</p>
        <p className={`w-1/12 ${textString}`}>품질</p>
        <p className={`w-1/12 ${textString}`}>가횟</p>
        <p className={`w-1/12 ${textString}`}>깨달음</p>
      </div>
      {showItems.map((item) => (
        <div
          className={`relative mt-1 flex w-full rounded-[10px] py-1 pl-2 pr-4
          shadow-[2px_2px_8px_0px_rgba(0,0,0,0.10)]
          ${item.grade === "유물" ? "bg-orange-100" : "bg-gray-100"}`}
        >
          <div
            className={`absolute left-0 top-0 h-full w-[12px] rounded-l-[10px]
            ${item.grade === "유물" ? "bg-orange-300" : "bg-blue-300"}`}
          />
          <p className={`w-1/12 ${textString}`}>{item.page}</p>
          <div className={`w-1/2 ${textString}`}>
            {item.itemOption.map((itemOp) => (
              <p
                className={`${ optionColor[ getOptionIndex( itemOp.optionName, itemOp.value,
                itemOp.isValuePercentage, ) ] } rounded ${ ((currentTargetOptionName1 ===
                itemOp.optionName && currentIsValuePercentage1 === itemOp.isValuePercentage) ||
                (currentTargetOptionName2 === itemOp.optionName && currentIsValuePercentage2 ===
                itemOp.isValuePercentage)) && "font-bold" }`}
              >
                {`${itemOp.optionName}-${itemOp.value}`}
              </p>
            ))}
          </div>
          <p className={`w-1/6 ${textString}`}>{item.auctionInfo.buyPrice}</p>
          <p className={`w-1/12 ${textString}`}>{item.gradeQuality}</p>
          <p className={`w-1/12 ${textString}`}>
            {item.auctionInfo.tradeAmount}
          </p>
          <p className={`w-1/12 ${textString}`}>{item.arkPoint}</p>
        </div>
      ))}
    </div>
  );
}
