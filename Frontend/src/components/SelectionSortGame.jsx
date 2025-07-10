import { useEffect, useState } from "react";

const generateRandomArray = (length = 5) =>
  Array.from({ length }, () => Math.floor(Math.random() * 100));

export default function SelectionSortGame() {
  const [array, setArray] = useState(generateRandomArray());
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentMinIndex, setCurrentMinIndex] = useState(null);
  const [step, setStep] = useState(0);
  const [isSorted, setIsSorted] = useState(false);

  const handleClick = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setCurrentMinIndex(index);
    } else {
      const newArray = [...array];
      [newArray[selectedIndex], newArray[index]] = [
        newArray[index],
        newArray[selectedIndex],
      ];
      setArray(newArray);
      setSelectedIndex(null);
      setCurrentMinIndex(null);
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let sorted = true;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        sorted = false;
        break;
      }
    }
    setIsSorted(sorted);
  }, [array]);

  const resetGame = () => {
    setArray(generateRandomArray());
    setSelectedIndex(null);
    setCurrentMinIndex(null);
    setStep(0);
    setIsSorted(false);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-carbon max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#2B7A70]">
        🧩 Selection Sort Practice Game
      </h2>

      <p className="mb-4 text-gray-600 dark:text-white-light text-sm text-center">
        Click once to select the current index. Click again to swap with another element.
      </p>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer w-14 h-14 flex items-center justify-center text-white font-bold rounded-md transition-transform ${
              selectedIndex === index
                ? "bg-yellow-500 scale-110"
                : currentMinIndex === index
                ? "bg-blue-500"
                : "bg-[#2B7A70]"
            }`}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={resetGame}
          className="bg-[#2B7A70] hover:bg-[#1E293B] text-white px-5 py-2 rounded-full transition"
        >
          🔁 Reset Game
        </button>
        <p className="text-sm text-gray-600 dark:text-white-light">
          Steps Taken: <span className="font-bold">{step}</span>
        </p>
      </div>

      {isSorted && (
        <div className="mt-4 text-center text-green-600 font-bold">
          🎉 Congratulations! You’ve sorted the array.
        </div>
      )}
    </div>
  );
}
