import React, { useState, useEffect } from 'react';

// Function to generate a random alphanumeric string like '9a**34'
const generateRandomNumber = () => {
  const randomNumber =
    Math.random().toString(36).substr(2, 4).toUpperCase() +
    '**' +
    Math.floor(Math.random() * 100);
  return randomNumber;
};

// Function to generate a random amount in dollars like '10₹'
const generateRandomAmount = () => {
  const randomAmount = Math.floor(Math.random() * 100) + 1 + '₹';
  return randomAmount;
};

// Function to generate random data for the slider
const generateData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const leftSide = generateRandomNumber();
    const center = generateRandomAmount();
    const rightSide = 'earning today';
    data.push({
      left: leftSide,
      center: center,
      right: rightSide,
    });
  }
  return data;
};

// Slider component
const EarningData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = generateData(100); // Generate 100 random items

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 500); // Adjust the interval time for faster movement (e.g., every half second)

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="container relative h-80 overflow-hidden">
      <ul
        className="absolute top-0 left-0 w-full h-full transition-transform duration-200 ease-in-out transform"
        style={{
          transform: `translateY(-₹{currentIndex * (100 / items.length)}%)`,
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={`h-20 flex items-center justify-between shadow-md mt-3 px-4 ₹{
              index >= 5 ? 'hidden' : '' // Hide items beyond the first 5
            }`}
          >
            <span>{item.left}</span>
            <span>{item.center}</span>
            <span>{item.right}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarningData;
