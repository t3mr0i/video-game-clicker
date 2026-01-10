import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LeonardCookieClicker = () => {
  const [cookies, setCookies] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prev => prev + autoClickers * multiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers, multiplier]);

  const handleClick = () => {
    setCookies(prev => prev + 1 * multiplier);
  };

  const buyAutoClicker = () => {
    const cost = (autoClickers + 1) * 10;
    if (cookies >= cost) {
      setCookies(prev => prev - cost);
      setAutoClickers(prev => prev + 1);
    }
  };

  const upgradeMultiplier = () => {
    const cost = (multiplier) * 50;
    if (cookies >= cost) {
      setCookies(prev => prev - cost);
      setMultiplier(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-white">Leonard Cookie Clicker</h1>
      <div className="text-center">
        <div className="mb-4 text-2xl text-white">
          Cookies: {cookies.toLocaleString()}
        </div>
        <button
          onClick={handleClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-110"
        >
          Click for Cookies!
        </button>
        <div className="mt-4 space-y-2">
          <button
            onClick={buyAutoClicker}
            disabled={cookies < (autoClickers + 1) * 10}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Buy Auto Clicker (Cost: {(autoClickers + 1) * 10} cookies)
          </button>
          <button
            onClick={upgradeMultiplier}
            disabled={cookies < (multiplier) * 50}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Upgrade Multiplier (Cost: {(multiplier) * 50} cookies)
          </button>
        </div>
        <div className="mt-4 text-white">
          <p>Auto Clickers: {autoClickers}</p>
          <p>Multiplier: {multiplier}x</p>
        </div>
      </div>
    </div>
  );
};

export default LeonardCookieClicker;