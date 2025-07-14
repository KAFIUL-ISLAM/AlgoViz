import React, { useState } from "react";

function AIBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      console.log("Calling API with URL:", "${import.meta.env.VITE_API_URL}
/api/openai/");

      const res = await fetch("${import.meta.env.VITE_API_URL}
/api/openai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();
      setResponse(data.reply || data.error || "No response");
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 mt-8 border rounded shadow bg-white dark:bg-carbon max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2 text-[#2B7A70]">💡 AI Helper</h2>
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something related to sorting..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#2B7A70] text-white px-4 py-2 rounded hover:bg-[#1E293B]"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      <div className="mt-4 p-3 border rounded bg-gray-100 text-sm whitespace-pre-wrap">
        {response || "AI response will appear here..."}
      </div>
    </div>
  );
}

export default AIBox;
