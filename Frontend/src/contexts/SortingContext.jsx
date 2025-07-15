import { createContext, useState, useRef } from "react";
import { getRandomNumber, getDigit, mostDigits } from "../helpers/math.jsx";
import { awaitTimeout } from "../helpers/promises.js";

export const SortingContext = createContext();
const speedMap = {
  slow: 2000, // 2 seconds per operation
  normal: 800, // 0.8 seconds per operation
  fast: 200, // 0.2 seconds per operation
};

function SortingProvider({ children }) {
  const [sortingState, setSortingState] = useState({
    array: [],
    delay: speedMap["normal"],
    algorithm: "bubble_sort",
    sorted: false,
    sorting: false,
    stopSort: false,
  });

  // Reference to track if sorting should be stopped
  const stopSortingRef = useRef(false);

  const changeBar = (index, payload) => {
    setSortingState((prev) => ({
      ...prev,
      array: prev.array.map((item, i) =>
        i === index ? { ...item, ...payload } : item
      ),
    }));
  };

  const generateSortingArray = () => {
    // Don't generate new array if currently sorting
    if (sortingState.sorting) return;

    const generatedArray = Array.from({ length: 12 }, () => {
      return {
        value: getRandomNumber(60, 1000),
        state: "idle",
      };
    });

    setSortingState((prev) => ({
      ...prev,
      array: generatedArray,
      sorted: false,
      sorting: false,
      stopSort: false,
    }));

    // Reset stop flag when generating new array
    stopSortingRef.current = false;
  };

  const bubbleSort = async () => {
    const arr = sortingState.array.map((item) => item.value);

    try {
      for (let i = 0; i < arr.length; i++) {
        if (stopSortingRef.current) return;

        for (let j = 0; j < arr.length - i - 1; j++) {
          // Check stop flag before any operation
          if (stopSortingRef.current) return;

          // Highlight bars
          changeBar(j, { state: "selected" });
          changeBar(j + 1, { state: "selected" });

          // Check stop flag after highlighting
          if (stopSortingRef.current) {
            changeBar(j, { state: "idle" });
            changeBar(j + 1, { state: "idle" });
            return;
          }

          await awaitTimeout(sortingState.delay);

          // Check stop flag before swap
          if (stopSortingRef.current) {
            changeBar(j, { state: "idle" });
            changeBar(j + 1, { state: "idle" });
            return;
          }

          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            // Check stop flag before visual update
            if (stopSortingRef.current) {
              changeBar(j, { state: "idle" });
              changeBar(j + 1, { state: "idle" });
              return;
            }

            changeBar(j, { value: arr[j], state: "selected" });
            changeBar(j + 1, { value: arr[j + 1], state: "selected" });
            await awaitTimeout(sortingState.delay);
          }

          // Check stop flag before resetting state
          if (stopSortingRef.current) {
            changeBar(j, { state: "idle" });
            changeBar(j + 1, { state: "idle" });
            return;
          }

          changeBar(j, { state: "idle" });
          changeBar(j + 1, { state: "idle" });
        }
      }
    } catch (error) {
      console.error("Bubble sort error:", error);
    }
  };

  const insertionSort = async () => {
    try {
      const arr = sortingState.array.map((item) => item.value);

      for (let i = 1; i < arr.length && !stopSortingRef.current; i++) {
        if (stopSortingRef.current) {
          resetBars();
          return;
        }

        let current = arr[i];
        let j = i - 1;

        changeBar(i, { value: current, state: "selected" });

        while (j > -1 && current < arr[j] && !stopSortingRef.current) {
          arr[j + 1] = arr[j];
          changeBar(j + 1, { value: arr[j], state: "selected" });
          j--;
          await awaitTimeout(sortingState.delay);
          changeBar(j + 2, { value: arr[j + 1], state: "idle" });
        }

        if (!stopSortingRef.current) {
          arr[j + 1] = current;
          changeBar(j + 1, { value: current, state: "idle" });
        }
      }
    } catch (error) {
      console.error("Insertion sort error:", error);
      resetBars();
    }
  };

  const selectionSort = async () => {
    try {
      const arr = sortingState.array.map((item) => item.value);

      for (let i = 0; i < arr.length && !stopSortingRef.current; i++) {
        if (stopSortingRef.current) {
          resetBars();
          return;
        }

        let min = i;
        changeBar(min, { state: "selected" });

        for (let j = i + 1; j < arr.length && !stopSortingRef.current; j++) {
          changeBar(j, { state: "selected" });
          await awaitTimeout(sortingState.delay);

          if (arr[j] < arr[min]) {
            changeBar(min, { state: "idle" });
            min = j;
            changeBar(min, { state: "selected" });
          } else {
            changeBar(j, { state: "idle" });
          }
        }

        if (min !== i) {
          let temp = arr[i];
          arr[i] = arr[min];
          changeBar(i, { value: arr[min], state: "idle" });
          arr[min] = temp;
          changeBar(min, { value: temp, state: "idle" });
        } else {
          changeBar(i, { state: "idle" });
          changeBar(min, { state: "idle" });
        }
      }
    } catch (error) {
      console.error("Selection sort error:", error);
      resetBars();
    }
  };
  const mergeSort = async () => {
    try {
      const arr = sortingState.array.map((item) => item.value);
      await mergeSortHelper(arr);
    } catch (error) {
      console.error("Merge sort error:", error);
      resetBars();
    }
  };
  async function mergeSortHelper(arr, start = 0, end = arr.length - 1) {
    if (start >= end || stopSortingRef.current) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, middle);
    if (stopSortingRef.current) return;

    await mergeSortHelper(arr, middle + 1, end);
    if (stopSortingRef.current) return;

    await mergeSortMerger(arr, start, middle, end);
  }
  async function mergeSortMerger(arr, start, middle, end) {
    if (stopSortingRef.current) return;

    try {
      let left = arr.slice(start, middle + 1);
      let right = arr.slice(middle + 1, end + 1);

      let i = 0,
        j = 0,
        k = start;

      while (i < left.length && j < right.length && !stopSortingRef.current) {
        if (left[i] < right[j]) {
          changeBar(k, { value: left[i], state: "selected" });
          arr[k++] = left[i++];
        } else {
          changeBar(k, { value: right[j], state: "selected" });
          arr[k++] = right[j++];
        }
        await awaitTimeout(sortingState.delay);
      }

      while (i < left.length && !stopSortingRef.current) {
        changeBar(k, { value: left[i], state: "selected" });
        arr[k++] = left[i++];
        await awaitTimeout(sortingState.delay);
      }

      while (j < right.length && !stopSortingRef.current) {
        changeBar(k, { value: right[j], state: "selected" });
        arr[k++] = right[j++];
        await awaitTimeout(sortingState.delay);
      }

      if (!stopSortingRef.current) {
        for (let i = start; i <= end; i++) {
          changeBar(i, { value: arr[i], state: "idle" });
        }
      }
    } catch (error) {
      console.error("Merge sort merger error:", error);
      resetBars();
    }
  }

  const quickSort = async () => {
    try {
      const arr = sortingState.array.map((item) => item.value);
      await quickSortHelper(arr);
    } catch (error) {
      console.error("Quick sort error:", error);
      resetBars();
    }
  };

  const quickSortHelper = async (arr, start = 0, end = arr.length - 1) => {
    if (start >= end || stopSortingRef.current) {
      return;
    }

    const pivot = arr[Math.floor((start + end) / 2)];
    let i = start;
    let j = end;

    while (i <= j && !stopSortingRef.current) {
      while (arr[i] < pivot && !stopSortingRef.current) i++;
      while (arr[j] > pivot && !stopSortingRef.current) j--;

      if (i <= j && !stopSortingRef.current) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        changeBar(i, { value: arr[i], state: "selected" });
        changeBar(j, { value: arr[j], state: "selected" });

        await awaitTimeout(sortingState.delay);

        changeBar(i, { value: arr[i], state: "idle" });
        changeBar(j, { value: arr[j], state: "idle" });
        i++;
        j--;
      }
    }

    if (!stopSortingRef.current) {
      await quickSortHelper(arr, start, j);
      await quickSortHelper(arr, i, end);
    }
  };

  const bucketSort = async () => {
    try {
      let arr = sortingState.array.map((item) => item.value);
      let maxDigitCount = mostDigits(arr);

      for (let k = 0; k < maxDigitCount && !stopSortingRef.current; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length && !stopSortingRef.current; i++) {
          let digit = getDigit(arr[i], k);
          digitBuckets[digit].push(arr[i]);
        }

        if (stopSortingRef.current) {
          resetBars();
          return;
        }

        arr = [].concat(...digitBuckets);

        for (let i = 0; i < arr.length && !stopSortingRef.current; i++) {
          changeBar(i, { value: arr[i], state: "selected" });
          await awaitTimeout(sortingState.delay);
          changeBar(i, { value: arr[i], state: "idle" });
        }
      }
    } catch (error) {
      console.error("Bucket sort error:", error);
      resetBars();
    }
  };

  const algorithmMap = {
    bubble_sort: bubbleSort,
    insertion_sort: insertionSort,
    selection_sort: selectionSort,
    merge_sort: mergeSort,
    quick_sort: quickSort,
    bucket_sort: bucketSort,
  };

  const resetBars = () => {
    sortingState.array.forEach((_, index) => {
      changeBar(index, { state: "idle" });
    });
  };

  const startVisualizing = async () => {
    // Don't start if already sorting
    if (sortingState.sorting) return;

    // Reset stop flag and set initial state
    stopSortingRef.current = false;

    setSortingState((prev) => ({
      ...prev,
      sorting: true,
      stopSort: false,
      sorted: false,
    }));

    try {
      await algorithmMap[sortingState.algorithm]();

      // Only update state if we didn't stop
      if (!stopSortingRef.current) {
        setSortingState((prev) => ({
          ...prev,
          sorted: true,
          sorting: false,
          stopSort: false,
        }));
      }
    } catch (error) {
      console.error("Sorting error:", error);
      setSortingState((prev) => ({
        ...prev,
        sorting: false,
        stopSort: false,
      }));
    }
  };

  const stopVisualizing = () => {
    // Set the ref first to ensure immediate stop
    stopSortingRef.current = true;

    setSortingState((prev) => ({
      ...prev,
      sorting: false,
      sorted: false,
    }));

    // Reset all bars to idle state
    resetBars();

    // Reset stopSort after a small delay to allow animations to complete
    setTimeout(() => {
      setSortingState((prev) => ({
        ...prev,
        stopSort: false,
      }));
    }, 100);
  };

  const changeSortingSpeed = (e) => {
    setSortingState((prev) => ({
      ...prev,
      delay: speedMap[e.target.value] || speedMap["normal"],
    }));
  };

  const changeAlgorithm = (algorithm) => {
    setSortingState((prev) => ({
      ...prev,
      algorithm,
    }));
  };

  return (
    <SortingContext.Provider
      value={{
        sortingState,
        generateSortingArray,
        startVisualizing,
        stopVisualizing,
        changeSortingSpeed,
        changeAlgorithm,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
}

export default SortingProvider;
