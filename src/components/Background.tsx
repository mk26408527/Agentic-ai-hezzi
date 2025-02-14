/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { staticPositions } from '@/utils/staticPositions';

const Background = () => {
  const [positions, setPositions] = useState(staticPositions);

  useEffect(() => {
    // Any random calculations should happen here
  }, []);

  return (
    <div>
      {positions.map((position: { left: string; top: string }, index: number) => (
        <div key={index} style={position}></div>
      ))}
    </div>
  );
}

export default Background;