import React, { useState } from "react";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  

  const runCode = async () => {
   
  };


  return (
    <div className="p-4 border rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#2B7A70]">
        Multi-language Code Editor
      </h2>

      <div className="mb-4">
        <label className="mr-3 text-gray-700 dark:text-gray-300 font-semibold text-sm">
          Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-1.5 py-1 border border-gray-300 rounded-md bg-white text-gray-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#2B7A70] focus:border-transparent transition"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++ (Not supported yet)</option>
        </select>
      </div>

      

     
        <button
          onClick={runCode}
          className="px-6 py-2 bg-[#2B7A70] text-white rounded hover:bg-[#1E293B] transition"
        >
          ▶️ Run
        </button>
      <h3 className="mt-6 mb-2 text-lg font-semibold">Output:</h3>
      <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap min-h-[60px]">
        {output}
      </pre>
    </div>
    
  );
}
export default CodeEditor;
