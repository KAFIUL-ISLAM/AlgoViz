'use client';

import React from 'react';

export default function GradientBackground({ theme = 'light' }) {
  // Clip path for the abstract shape
  const clipPath =
    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%,' +
    ' 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%,' +
    ' 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%,' +
    ' 74.1% 44.1%)';

  // Light mode colors - Modern blue to teal gradient
  const lightGradient = 'from-[#3b82f6] to-[#06b6d4]';

  // Dark mode colors - Deep purple to cyan gradient
  const darkGradient = 'from-[#7c3aed] to-[#0891b2]';

  const gradient = theme === 'dark' ? darkGradient : lightGradient;

  return (
    <>
      {/* Top blurred shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] 
          -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr ${gradient} opacity-30 
          sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
          style={{ clipPath }}
        />
      </div>

      {/* Bottom blurred shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className={`relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] 
          -translate-x-1/2 bg-gradient-to-tr ${gradient} opacity-30 
          sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]`}
          style={{ clipPath }}
        />
      </div>
    </>
  );
}

