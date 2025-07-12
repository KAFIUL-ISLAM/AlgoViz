import React, { useState, useEffect } from "react";

const generateRandomArray = (length = 5) =>
  Array.from({ length }, () => Math.floor(Math.random() * 100));

const Timergame = () => {
  const [array, setArray] = useState(generateRandomArray());
  const [firstIndex, setFirstIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft <= 0) {
      setMessage("❌ Time's up! You lost. Refreshing...");
      setGameOver(true);
      setTimeout(resetGame, 2000);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  const handleSwap = (index) => {
    if (!gameStarted || gameOver) return;

    if (firstIndex === null) {
      setFirstIndex(index);
    } else {
      const newArray = [...array];
      [newArray[firstIndex], newArray[index]] = [
        newArray[index],
        newArray[firstIndex],
      ];
      setArray(newArray);
      setFirstIndex(null);
      checkWin(newArray);
    }
  };

  const checkWin = (arr) => {
    const isSorted = arr.every((val, i, a) => !i || a[i - 1] <= val);
    if (isSorted) {
      setMessage("✅ Well done! Array sorted!");
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setArray(generateRandomArray());
    setFirstIndex(null);
    setMessage("");
    setTimeLeft(10);
    setGameOver(false);
    setGameStarted(false);
  };

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startGame = () => {
    setGameStarted(true);
    setMessage("");
    setGameOver(false);
    setTimeLeft(10);
  };

  return (
    <div className="p-6 mt-8 border rounded-2xl shadow bg-white dark:bg-gray-800 text-left transition-all">
      <h2 className="text-2xl font-bold text-[#2B7A70] mb-4">
        Beat The Clock – Selection Sort Challenge
      </h2>

      <p className="mb-3 text-gray-700 dark:text-white-light text-sm">
        Swap elements to sort the array before time runs out!
      </p>

      <p className="text-base font-semibold text-[#1E293B] dark:text-white mb-4">
        ⏱️ Time Left:{" "}
        <span className="text-red-600">{gameStarted ? `${timeLeft}s` : "--"}</span>
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {array.map((num, idx) => (
          <button
            key={idx}
            onClick={() => handleSwap(idx)}
            disabled={!gameStarted || gameOver}
            className={`w-14 h-14 rounded-xl shadow flex items-center justify-center font-bold text-white text-lg transition-transform duration-200 ${
              firstIndex === idx
                ? "bg-yellow-500 scale-110"
                : "bg-[#2B7A70] hover:scale-105"
            } ${
              !gameStarted || gameOver
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {!gameStarted ? (
        <div className="flex justify-center">
          <button
            onClick={startGame}
            className="px-6 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#1E293B] transition"
          >
            ▶️ Start Game
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={resetGame}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded-full"
          >
            🔄 Restart Game
          </button>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-4 rounded font-semibold shadow text-center ${
            message.includes("Well done")
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Timergame;
