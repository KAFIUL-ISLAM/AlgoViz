import React, { useState } from "react";

const questionsWithAnswers = [
  {
    question:
      "Return the result of sorting [10, 9, 8, 7] using Selection Sort.",
    expected: JSON.stringify([7, 8, 9, 10]),
  },
  {
    question: "Return the sorted array [1, 2, 3, 5, 8] from [5, 2, 8, 1, 3].",
    expected: JSON.stringify([1, 2, 3, 5, 8]),
  },
  {
    question: "Return the sorted version of [3, 3, 2, 1].",
    expected: JSON.stringify([1, 2, 3, 3]),
  },
  {
    question: "Sort [20, 5, 15, 10] and return the result.",
    expected: JSON.stringify([5, 10, 15, 20]),
  },
  {
    question: "Return the result of sorting [0, -1, 4, 2] in ascending order.",
    expected: JSON.stringify([-1, 0, 2, 4]),
  },
  {
    question: "Sort [9, 2, 6, 4] and return the sorted array.",
    expected: JSON.stringify([2, 4, 6, 9]),
  },
  {
    question: "Return [1, 2, 3, 4, 5] as it's already sorted.",
    expected: JSON.stringify([1, 2, 3, 4, 5]),
  },
  {
    question: "Return the result of sorting [100, 50, 75].",
    expected: JSON.stringify([50, 75, 100]),
  },
  {
    question: "Return the sorted version of [11, -5, 0, 4, 3].",
    expected: JSON.stringify([-5, 0, 3, 4, 11]),
  },
  {
    question: "Return the sorted output of [8, 1, 9, 2].",
    expected: JSON.stringify([1, 2, 8, 9]),
  },
];

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const runCode = () => {
    try {
      if (language === "javascript") {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        const userOutput = JSON.stringify(result);
        const expectedOutput = questionsWithAnswers[questionIndex].expected;

        if (userOutput === expectedOutput) {
          setOutput("✅ Correct! Great job.");
        } else {
          setOutput(
            `❌ Incorrect.\nYour Output: ${userOutput}\nExpected: ${expectedOutput}`
          );
        }
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
      newIndex = Math.floor(Math.random() * questionsWithAnswers.length);
    } while (newIndex === questionIndex);
    setQuestionIndex(newIndex);
    setCode("");
    setOutput("");
  };

  return (
    <div className="p-6 mt-8 border rounded-2xl bg-white dark:bg-gray-800 text-left shadow-lg transition-all">
      <h2 className="text-2xl font-bold text-[#2B7A70] mb-4">
        Sort It Like It's Hot!
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Question Box */}
        <div>
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              🔍 Question:
            </p>
            <p className="text-gray-800 dark:text-white mb-3">
              {questionsWithAnswers[questionIndex].question}
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
            <label className="mr-2 font-semibold text-gray-700 dark:text-white text-sm">
              Language:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </div>

        {/* Code Editor */}
        <div>
          {" "}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-3 mb-4 font-mono text-sm border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-[#2B7A70]"
            placeholder="Write your code here... Example: [10,9,8,7].sort((a,b)=>a-b)"
          />
          {/* Action Buttons */}
          <div className="flex justify-between w-full mb-4">
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
        </div>
      </div>
      {/* Output Display */}
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm text-gray-800 dark:text-white font-mono whitespace-pre-wrap h-24 overflow-auto">
        {output || "📝 Output will appear here..."}
      </div>
    </div>
  );
};

export default CodeEditor;
