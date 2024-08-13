import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export default function Test() {
  const [costs, setCosts] = useState(4);

  const [header, setHeader] = useState<string[]>(["1", "2", "3", "4", "5"]);
  const [items, setItems] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [randomItems, setRandomItems] = useState<
    { item: string; color: string }[]
  >([]);
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(10 * costs).fill(false),
  );
  const [clickedItems, setClickedItems] = useState<
    { item: string; color: string }[]
  >([]);

  const headerColors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];

  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-red-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];

  const handleCreateRandom40Items = () => {
    const duplicatedItems = items.flatMap((item, index) =>
      Array(costs).fill({ item, color: colors[index] }),
    );

    const shuffledItems = duplicatedItems
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item, color }) => ({ item, color }));

    setRandomItems(shuffledItems);
    setRevealed(Array(10 * costs).fill(false));
    setClickedItems([]);
  };

  const handleClick = (index: number) => {
    if (!revealed[index]) {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);

      setClickedItems([...clickedItems, randomItems[index]]);
    }
  };

  const getColorFillPercentage = (color: string) => {
    const unrevealedCount = randomItems.filter(
      (item, index) => item.color === color && !revealed[index],
    ).length;
    return (unrevealedCount / costs) * 100;
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col bg-gray-200">
        <div className="grid grid-cols-5 gap-2 px-10 py-5">
          {[...Array(5)].map((_, index) => (
            <Input
              value={header[index]}
              onChange={(e) => {
                const newHeader = [...header];
                newHeader[index] = e.target.value;
                setHeader(newHeader);
              }}
              className={`text-center ${headerColors[index]} h-6 rounded-xl`}
            />
          ))}
          {[...Array(10)].map((_, index) => (
            <div className="relative w-full">
              <Input
                value={items[index]}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  setItems(newItems);
                }}
                className={`w-full ${colors[index]}`}
              />
              <div
                className={`absolute bottom-0 right-0 h-2 ${headerColors[index % 5]}`}
                style={{
                  width: `${getColorFillPercentage(colors[index])}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mx-10 flex gap-5">
          <Input
            value={costs}
            onChange={(e) => {
              setCosts(Number(e.target.value));
            }}
            className="w-10"
          />
          <Button className="mb-5 flex-1" onClick={handleCreateRandom40Items}>
            생성!
          </Button>
        </div>
      </div>

      <div className="flex h-[420px] flex-col bg-gray-300">
        <div className="grid grid-cols-5 gap-2 px-10 py-5">
          {randomItems.map(({ item, color }, index) => (
            <Button
              variant="secondary"
              className={` ${revealed[index] ? color : "bg-gray-500 text-white"} border-2 border-black`}
              onClick={() => handleClick(index)}
            >
              {revealed[index] ? item : "?"}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex h-[300px] flex-col bg-gray-200">
        <div className="grid grid-cols-5 gap-2 px-10 py-5">
          {[...Array(5)].map((_, index) => (
            <div className={`h-[240px] rounded ${headerColors[index]}`}>
              <p className="border-b-2 text-center">{header[index]}</p>
              <div className="grid grid-cols-2 gap-2 p-2">
                {clickedItems.map(
                  ({ item, color }, idx) =>
                    idx % 5 === index && (
                      <p className={`rounded p-2 text-center ${color}`}>
                        {item}
                      </p>
                    ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
