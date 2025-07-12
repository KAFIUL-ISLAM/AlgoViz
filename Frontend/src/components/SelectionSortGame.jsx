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
    <div className="p-6 mt-8 border rounded-2xl shadow-lg bg-white dark:bg-gray-800 text-left transition-all">
      <h2 className="text-2xl font-bold text-[#2B7A70] mb-4 font-sans">
        Selection Sort Challenge
      </h2>
      <p className="mb-4 text-gray-700 dark:text-white-light text-sm font-normal text-left">
        Click once to select an element. Click again to swap with another.
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer w-14 h-14 flex items-center justify-center text-white font-bold text-lg rounded-xl shadow transition-transform duration-200 ${
              selectedIndex === index
                ? "bg-yellow-500 scale-110"
                : currentMinIndex === index
                ? "bg-blue-500"
                : "bg-[#2B7A70] hover:scale-105"
            }`}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={resetGame}
          className="px-5 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#205E5B] transition font-semibold shadow-sm"
        >
          🔁 Reset Game
        </button>
        <p className="text-sm text-gray-700 dark:text-white-light">
          Steps Taken: <span className="font-bold">{step}</span>
        </p>
      </div>

      {isSorted && (
        <div className="mt-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-center p-4 rounded-lg font-semibold shadow">
          🎉 <span>Congratulations! You’ve sorted the array.</span>
        </div>
      )}
    </div>
  );
}
