import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
function Meditation() {
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value) * 60;
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 flex items-center justify-center">
      <div className="max-w-xl w-full mx-4">
        <div className="bg-black bg-opacity-50 rounded-3xl p-8 backdrop-blur-lg">
          <div className="flex justify-between items-center mb-8">
            <button className="text-white opacity-60 hover:opacity-100">
              Count Down
            </button>
            <button className="text-cyan-400">Duration</button>
            <button className="text-white opacity-60 hover:opacity-100">
              Interval
            </button>
          </div>
          <div className="text-center mb-12">
            <motion.h1
              key={timeLeft}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-8xl font-light text-white mb-4"
            >
              {formatTime(timeLeft)}
            </motion.h1>
            <p className="text-white opacity-60">Minutes</p>
          </div>
          <div className="mb-12">
            <p className="text-white text-center mb-4">Move the slider to set the duration</p>
            <input
              type="range"
              min="1"
              max="60"
              value={duration / 60}
              onChange={handleSliderChange}
              className="w-full h-2 bg-cyan-400 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={reset}
              className="bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-cyan-400 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Meditation;