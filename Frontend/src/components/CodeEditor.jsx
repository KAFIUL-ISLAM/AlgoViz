import React, { useState } from "react";

const sortingQuestions = [
  "Write a function to perform Selection Sort on an array of numbers.",
  "Sort the array [5, 2, 8, 1, 3] using Selection Sort and print the sorted array.",
  "Write a function that returns the number of swaps made by Selection Sort.",
  "Given [10, 9, 8, 7], sort it using Selection Sort and return the result.",
  "Implement Insertion Sort for an array of integers and print each step.",
  "Write a function that takes an array and returns true if it's sorted using Selection Sort.",
  "Perform Selection Sort on [20, 5, 15, 10] and return the sorted result.",
  "Write and call a function that sorts an array in descending order using Selection Sort.",
  "Modify Selection Sort to skip sorting if the array is already sorted.",
  "Write a function to find the minimum element's index in a given range of an array.",
];
const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(``);
  const [output, setOutput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const runCode = () => {
    try {
      if (language === "javascript") {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        setOutput(
          result !== undefined ? String(result) : "✅ Code ran successfully."
        );
      } else {
        setOutput(`⚠️ Language "${language}" is not supported yet.`);
      }
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  const refreshQuestion = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * sortingQuestions.length);
    } while (newIndex === questionIndex);
    setQuestionIndex(newIndex);
  };

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-carbon h-full flex flex-col items-start text-left">
      {/* Header */}
      <div className="flex items-center justify-between w-fullmb-4">
        <h2 className="text-xl font-bold text-[#2B7A70]">
          Sorting Algorithm Code Editor
        </h2>
        <div>{/* reserved for future use */}</div>
      </div>

      {/* Question Box */}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md border">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          🔍 Question:
        </p>
        <p className="text-gray-800 dark:text-white mb-2">
          {sortingQuestions[questionIndex]}
        </p>
        <button
          onClick={refreshQuestion}
          className="text-sm px-3 py-1 bg-[#2B7A70] text-white rounded hover:bg-[#1E293B] transition"
        >
          🔄 New Question
        </button>
      </div>

      {/* Language Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold text-gray-700 dark:text-white-light text-sm">
          Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Code Textarea */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-40 p-2 mb-4 font-mono text-sm border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
        placeholder="Write your code here..."
      ></textarea>

      {/* Run and Clear Buttons */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={runCode}
          className="px-6 py-2 bg-[#2B7A70] text-white rounded hover:bg-[#1E293B] transition"
        >
          ▶️ Run
        </button>
        <button
          onClick={() => {
            setCode("");
            setOutput("");
          }}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
        >
          🔄 Clear
        </button>
      </div>

      {/* Output */}
      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-800 dark:text-white whitespace-pre-wrap h-28 overflow-auto">
        {output || "📝 Output will appear here..."}
      </div>
    </div>
  );
};

export default CodeEditor;
