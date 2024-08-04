import { useAtomValue } from "jotai/react";
import { accItems } from "@@/atoms/accItems";
import { targetOptionValueAtom } from "@@/atoms/targetOptionValue";
import { ACC_OPTIONS, ALL_OPTIONS } from "@@/lib/constants";

export default function ItemList() {
  const items = useAtomValue(accItems);
  const targetOptionValue = useAtomValue(targetOptionValueAtom);
  const allOptionList = [...ACC_OPTIONS.flat(), ...ALL_OPTIONS];
  const currentTargetOption = allOptionList.filter(
    (options) => options.value === targetOptionValue.name,
  )[0];
  const currentTargetOptionName = currentTargetOption?.text || "";
  const currentIsValuePercentage =
    currentTargetOption?.isValuePercentage || false;

  const showItems = items.filter(
    (item) =>
      item.itemOption.filter(
        (itemOp) =>
          itemOp.optionName === currentTargetOptionName &&
          itemOp.isValuePercentage === currentIsValuePercentage &&
          itemOp.value >= Number(targetOptionValue.value),
      ).length > 0,
  );

  const getOptionIndex = (optionName, optionValue, isValuePercentage) => {
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
    <div className="h-[calc(100vh-200px)] w-full overflow-y-scroll rounded bg-gray-200 p-2">
      <div className="flex w-full rounded bg-gray-300 px-4 py-1">
        <p className={`w-1/12 ${textString}`}>페이지</p>
        <p className={`w-1/2 ${textString}`}>옵션</p>
        <p className={`w-1/6 ${textString}`}>가격</p>
        <p className={`w-1/12 ${textString}`}>품질</p>
        <p className={`w-1/12 ${textString}`}>가횟</p>
        <p className={`w-1/12 ${textString}`}>깨달음</p>
      </div>
      {showItems.map((item) => (
        <div
          className={`mt-1 flex w-full rounded px-4 py-1
          ${item.grade === "유물" ? "bg-orange-200" : "bg-gray-100"}`}
        >
          <p className={`w-1/12 ${textString}`}>{item.page}</p>
          <div className={`w-1/2 ${textString}`}>
            {item.itemOption.map((itemOp) => (
              <p
                className={`${ optionColor[ getOptionIndex( itemOp.optionName, itemOp.value,
                itemOp.isValuePercentage, ) ] } rounded ${ currentTargetOptionName ===
                itemOp.optionName && currentIsValuePercentage === itemOp.isValuePercentage &&
                "font-bold" }`}
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
