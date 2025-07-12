import React, { useState } from "react";

const questionsWithAnswers = [
  {
    question: "What is the sorted version of [4, 2, 5, 1]?",
    expected: JSON.stringify([1, 2, 4, 5]),
  },
  {
    question: "Sort [9, 3, 7].",
    expected: JSON.stringify([3, 7, 9]),
  },
  {
    question:
      "How many swaps are needed to sort [3, 2, 1] using selection sort?",
    expected: "1",
  },
  {
    question: "How many swaps to sort [5, 4, 3, 2, 1] using selection sort?",
    expected: "2",
  },
  {
    question: "What’s the smallest number in [4, 9, 1, 7]?",
    expected: "1",
  },
  {
    question: "What’s the second smallest number in [8, 3, 5, 1]?",
    expected: "3",
  },
];

const SortTheMessSimple = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const currentQuestion = questionsWithAnswers[questionIndex];

  const checkAnswer = () => {
    try {
      let userInput;
      if (input.trim().startsWith("[")) {
        userInput = JSON.stringify(JSON.parse(input));
      } else {
        userInput = input.trim();
      }

      if (userInput === currentQuestion.expected) {
        setOutput("✅ Correct! Well done.");
      } else {
        setOutput(
          `❌ Incorrect.\nYour Answer: ${userInput}\nExpected: ${currentQuestion.expected}`
        );
      }
    } catch (err) {
      setOutput(
        "❌ Error: Invalid input format. Use plain numbers or arrays like [1,2,3]."
      );
    }
  };

  const nextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % questionsWithAnswers.length);
    setInput("");
    setOutput("");
  };

  return (
    <div className="p-6 mt-8 max-w-3xl mx-auto border rounded-2xl shadow bg-white dark:bg-gray-800 text-left">
      <h2 className="text-2xl font-bold mb-4 text-[#2B7A70]">
        Sort the Mess (Simple)!
      </h2>

      <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
        {currentQuestion.question}
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. [1, 2, 3] or 2"
        className="w-full p-3 mb-4 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-[#2B7A70]"
      />

      <div className="flex justify-between mb-4">
        <button
          onClick={checkAnswer}
          className="px-5 py-2 bg-[#2B7A70] text-white rounded hover:bg-[#1E293B] text-sm transition"
        >
          ▶️ Run
        </button>
        <button
          onClick={nextQuestion}
          className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm transition"
        >
          🔄 Next
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm text-gray-800 dark:text-white font-mono whitespace-pre-wrap h-28 overflow-auto">
        {output || "📝 Output will appear here..."}
      </div>
    </div>
  );
};

export default SortTheMessSimple;
