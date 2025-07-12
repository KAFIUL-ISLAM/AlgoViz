// MergeSortGame.jsx
import React, { useState, useEffect } from "react";

const generateRandomArray = (length = 6) =>
  Array.from({ length }, () => Math.floor(Math.random() * 100));

function MergeSortGame() {
  const [originalArray, setOriginalArray] = useState([]);
  const [currentPairs, setCurrentPairs] = useState([]);
  const [mergedPairs, setMergedPairs] = useState([]);
  const [finalMerged, setFinalMerged] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const arr = generateRandomArray();
    setOriginalArray(arr);
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push([arr[i], arr[i + 1]]);
    }
    setCurrentPairs(pairs);
    setMergedPairs([]);
    setFinalMerged([]);
    setStep(0);
  }, []);

  const mergePair = (pairIndex) => {
    const pair = currentPairs[pairIndex];
    if (!pair || pair.length !== 2) return;

    const sortedPair = [...pair].sort((a, b) => a - b);
    const newMergedPairs = [...mergedPairs, sortedPair];
    const newCurrentPairs = currentPairs.map((p, idx) =>
      idx === pairIndex ? [] : p
    );
    setMergedPairs(newMergedPairs);
    setCurrentPairs(newCurrentPairs);

    if (newMergedPairs.length === Math.ceil(originalArray.length / 2)) {
      const flat = newMergedPairs.flat();
      if (flat.length === originalArray.length) {
        setFinalMerged(flat);
      } else {
        const nextPairs = [];
        for (let i = 0; i < flat.length; i += 2) {
          nextPairs.push(flat.slice(i, i + 2));
        }
        setCurrentPairs(nextPairs);
        setMergedPairs([]);
        setStep((s) => s + 1);
      }
    }
  };

  const resetGame = () => {
    const arr = generateRandomArray();
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push([arr[i], arr[i + 1]]);
    }
    setOriginalArray(arr);
    setCurrentPairs(pairs);
    setMergedPairs([]);
    setFinalMerged([]);
    setStep(0);
  };

  return (
    <div className="p-6 mt-8 border rounded-2xl shadow-lg bg-white dark:bg-gray-800 text-left transition-all">
      <h2 className="text-2xl font-bold text-[#2B7A70] mb-4 font-sans">
        Merge Pairs – Merge Sort Game
      </h2>

      <p className="mb-3 text-gray-700 dark:text-white-light">
        Merge the following pairs in sorted order, step-by-step just like Merge
        Sort!
      </p>

      <div className="mb-4">
        <strong>Step {step + 1}:</strong>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentPairs.map((pair, idx) =>
          pair.length > 0 ? (
            <button
              key={idx}
              onClick={() => mergePair(idx)}
              className="bg-[#2B7A70] hover:scale-105  p-3 rounded-2xl text-white font-bold shadow font-mono"
            >
              {pair.join(", ")} → Merge
            </button>
          ) : (
            <div
              key={idx}
              className="p-3 rounded bg-green-100 text-green-700 font-mono"
            >
              ✅ Merged
            </div>
          )
        )}
      </div>

      {finalMerged.length > 0 && (
        <div className="mt-6 bg-green-100 dark:bg-green-900 p-4 rounded-lg font-mono text-green-800 dark:text-green-200 shadow">
          🎉 <strong>Sorted Array:</strong> [{finalMerged.join(", ")}]
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-[#2B7A70] text-white rounded-full hover:bg-[#205E5B] transition font-semibold shadow-sm"
        >
          🔄 Restart Game
        </button>
      </div>
    </div>
  );
}

export default MergeSortGame;
