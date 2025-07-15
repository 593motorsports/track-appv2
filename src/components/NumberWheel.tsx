import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NumberWheelProps {
  onNumberGenerated?: (number: number) => void;
}

const NumberWheel: React.FC<NumberWheelProps> = ({ onNumberGenerated }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360) + (randomNumber * 7.2); // 360/50 = 7.2 degrees per number
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setCurrentNumber(randomNumber);
      setIsSpinning(false);
      onNumberGenerated?.(randomNumber);
    }, 3000);
  };

  return (
    <Card className="bg-white/80 backdrop-blur border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <span>🎯</span>
          Random Number Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative w-48 h-48">
          <div 
            className={`w-full h-full rounded-full border-8 border-gradient-to-r from-pink-400 to-purple-500 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center transition-transform duration-3000 ease-out`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="text-4xl font-bold text-purple-600">
              {isSpinning ? '?' : (currentNumber || '?')}
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
          </div>
        </div>
        
        <Button 
          onClick={spinWheel}
          disabled={isSpinning}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-2"
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </Button>
        
        {currentNumber && !isSpinning && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Generated Number:</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {currentNumber}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NumberWheel;