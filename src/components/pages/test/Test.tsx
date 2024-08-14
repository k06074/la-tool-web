/* eslint-disable react/no-array-index-key */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
    { id: string; item: string; color: string }[]
  >([]);
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(10 * costs).fill(false),
  );
  const [clickedItems, setClickedItems] = useState<
    { id: string; item: string; color: string }[]
  >([]);

  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    item: string;
    color: string;
    index: number;
  } | null>(null);

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const headerColors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];

  const barColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
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
      Array(costs)
        .fill(null)
        .map(() => ({
          id: uuidv4(),
          item,
          color: colors[index],
        })),
    );

    const shuffledItems = duplicatedItems
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ id, item, color }) => ({ id, item, color }));

    setRandomItems(shuffledItems);
    setRevealed(Array(10 * costs).fill(false));
    setClickedItems([]);
    setClickedIndex(null);
  };

  const handleClick = (index: number) => {
    if (!revealed[index]) {
      setSelectedItem({ ...randomItems[index], index });
      setClickedIndex(index);

      setTimeout(() => {
        const newRevealed = [...revealed];
        newRevealed[index] = true;
        setRevealed(newRevealed);

        setClickedItems([...clickedItems, { ...randomItems[index], index }]);
        setSelectedItem(null);
        setClickedIndex(null);
      }, 1000);
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
          {header.map((headerItem, index) => (
            <Input
              key={`header-${index}`}
              value={headerItem}
              onChange={(e) => {
                const newHeader = [...header];
                newHeader[index] = e.target.value;
                setHeader(newHeader);
              }}
              className={`text-center ${headerColors[index]} h-6 rounded-xl`}
            />
          ))}
          {items.map((item, index) => (
            <div key={`item-${index}`} className="relative w-full">
              <Input
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  setItems(newItems);
                }}
                className={`w-full ${colors[index]}`}
              />
              <div
                className={`absolute bottom-0.5 right-0.5 h-2 rounded ${barColors[index % 5]}`}
                style={{
                  width: `calc(${getColorFillPercentage(colors[index])}% - 4px)`,
                  transition: "width 0.3s ease-in-out",
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

      <div className="flex flex-1 flex-col overflow-y-scroll bg-gray-300">
        <div className="grid grid-cols-5 gap-2 px-10 py-5">
          {randomItems.map(({ id, item, color }, index) => {
            return (
              <motion.div
                key={id}
                layoutId={`box-${id}`}
                className="relative h-10"
              >
                <Button
                  variant="secondary"
                  className={` ${revealed[index] ? color : "bg-gray-500 text-white"} ${
                  clickedItems.some((clickedItem) => clickedItem.id === id)
                      ? "hidden"
                      : ""
                  } size-full opacity-50 `}
                  onClick={() => handleClick(index)}
                >
                  {revealed[index] ? item : "?"}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex h-[300px] flex-col bg-gray-200">
        <div className="grid grid-cols-5 gap-2 px-10 py-5">
          {header.map((headerItem, headerIndex) => (
            <div
              key={`clicked-${headerIndex}`}
              className={`h-[240px] rounded ${headerColors[headerIndex]}`}
            >
              <p className="border-b-2 text-center">{headerItem}</p>
              <div className="grid grid-cols-2 gap-2 p-2">
                {clickedItems.map(
                  ({ id, item, color }, idx) =>
                    idx % 5 === headerIndex && (
                      <motion.div
                        key={id}
                        layoutId={`box-${id}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1 }}
                        className={`h-10 rounded border-2 border-black p-2 text-center ${color}`}
                      >
                        {item}
                      </motion.div>
                    ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`box-${selectedItem.id}`}
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              exit={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`rounded-lg p-10 ${selectedItem.color} shadow-lg`}
            >
              <p className="w-28 text-center text-3xl font-bold">
                {selectedItem.item}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
