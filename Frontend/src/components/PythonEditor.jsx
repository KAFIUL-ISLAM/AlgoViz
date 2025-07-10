import React, { useState } from "react";

const PythonEditor = () => {
  const [code, setCode] = useState(`print("Hello from Python!")`);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    // Load Pyodide only once
    if (!window.pyodide) {
      window.pyodide = await window.loadPyodide();
    }

    try {
      let result = await window.pyodide.runPythonAsync(code);
      setOutput(result);
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#2B7A70]">
        Run Your Python Code
      </h2>

      <textarea
        rows={8}
        className="w-full border border-gray-300 p-3 rounded mb-4 font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={runCode}
        className="px-6 py-2 bg-[#2B7A70] text-white rounded hover:bg-green-700 transition"
      >
        ▶️ Run
      </button>

      <h3 className="mt-6 mb-2 text-lg font-semibold">Output:</h3>
      <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap min-h-[60px]">
        {output}
      </pre>
    </div>
  );
};

export default PythonEditor;
