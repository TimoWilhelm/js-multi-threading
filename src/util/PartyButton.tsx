import { useEffect, useState } from 'react';

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function PartyButton() {
  const [color, setColor] = useState(randomColor());
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(randomColor());
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      type="button"
      style={{
        width: '10em',
        height: '10em',
        backgroundColor: color,
        transition: 'all 0.5s ease-in-out',
        transform: `rotate(${rotated ? 180 : 0}deg)`,
      }}
      onClick={() => {
        setRotated(!rotated);
      }}
    >
      PARTY!!!
    </button>
  );
}
