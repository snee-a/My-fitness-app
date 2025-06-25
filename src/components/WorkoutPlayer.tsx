import React, { useEffect, useState } from 'react';
import { logWorkout } from '../utils/WorkoutLoggerService';
interface WorkoutPlayerProps {
  selectedGoal: string;
}
const exercises = [
  'Jumping Jacks',
  'Push-Ups',
  'Squats',
  'Lunges',
  'Plank',
];
const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ selectedGoal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  useEffect(() => {
    if (currentIndex === 0) {
      setStartTime(new Date()); // Record start time
    }
    if (currentIndex >= exercises.length) {
      setIsWorkoutComplete(true);
      const endTime = new Date();
      logWorkout({
        exercise: selectedGoal,
        startTime: startTime?.toISOString() || '',
        endTime: endTime.toISOString(),
        status: 'Completed',
      });
      return;
    }
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000); // 2 seconds per exercise (for demo)
    return () => clearTimeout(timer);
  }, [currentIndex]);
  return (
    <div className="text-center mt-8">
      <h1 className="text-xl font-bold mb-4">🔥 {selectedGoal} Workout</h1>
      {!isWorkoutComplete ? (
        <div>
          <p className="text-lg">Now doing: <strong>{exercises[currentIndex]}</strong></p>
          <p className="text-gray-500 mt-2">Exercise {currentIndex + 1} of {exercises.length}</p>
        </div>
      ) : (
        <div className="text-green-600 text-lg font-semibold"> Workout Complete & Logged!</div>
      )}
    </div>
  );
};
export default WorkoutPlayer;
