import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const CodeEditor = () => {
  const code = `
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 3, 2, 4, 1]));
`;

  return (
    <LiveProvider code={code} noInline={true}>
      <LiveEditor className="border p-4 rounded-lg" />
      <LiveError className="text-red-500" />
      <div className="p-4 bg-gray-100 dark:bg-carbon rounded-lg">
        <LivePreview />
      </div>
    </LiveProvider>
  );
};

export default CodeEditor;
