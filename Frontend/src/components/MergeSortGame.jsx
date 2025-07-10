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

  const resetGame = () => window.location.reload();

  return (
    <div className="p-4 mt-8 border rounded shadow bg-white dark:bg-carbon text-left">
      <h2 className="text-2xl font-bold text-[#2B7A70] mb-4">
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
              className="bg-gray-100 dark:bg-carbon-light p-3 rounded shadow hover:bg-green-200 transition font-mono"
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
        <div className="mt-6 bg-blue-100 p-4 rounded font-mono text-blue-900">
          🎉 Sorted Array: [{finalMerged.join(", ")}]
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-[#2B7A70] text-white rounded hover:bg-[#1E293B]"
        >
          🔄 Restart Game
        </button>
      </div>
    </div>
  );
}

export default MergeSortGame;
