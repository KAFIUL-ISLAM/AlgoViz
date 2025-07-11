import React, { useState, useEffect } from "react";

const initialArray = [5, 3, 2, 4, 1];

const Timergame = () => {
  const [array, setArray] = useState([...initialArray]);
  const [firstIndex, setFirstIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setMessage("❌ Time's up! You lost. Refreshing...");
      setGameOver(true);
      setTimeout(resetGame, 2000);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const handleSwap = (index) => {
    if (firstIndex === null) {
      setFirstIndex(index);
    } else {
      const newArray = [...array];
      const temp = newArray[firstIndex];
      newArray[firstIndex] = newArray[index];
      newArray[index] = temp;
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
    setArray(shuffleArray([...initialArray]));
    setFirstIndex(null);
    setMessage("");
    setTimeLeft(10);
    setGameOver(false);
  };

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return (
    <div className="p-6 rounded border shadow bg-white dark:bg-gray-800 text-center">
      <h2 className="text-xl font-bold text-[#2B7A70] mb-4">
        🧩 Selection Sort Practice Game
      </h2>

      <p className="text-gray-600 dark:text-gray-200 mb-2">
        ⏱️ Time Left: <span className="font-semibold">{timeLeft}s</span>
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {array.map((num, idx) => (
          <button
            key={idx}
            onClick={() => !gameOver && handleSwap(idx)}
            className={`px-4 py-2 rounded text-white font-bold text-lg transition ${
              firstIndex === idx ? "bg-yellow-500" : "bg-[#2B7A70]"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {message && (
        <div className="mt-4 text-lg font-semibold text-red-500">{message}</div>
      )}

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        🔄 Restart Game
      </button>
    </div>
  );
};

export default Timergame;
