import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logWorkout } from '../utils/WorkoutLoggerService';
interface Exercise {
  name: string;
  muscleGroup: string;
  duration: number;
  equipment: string;
  basePriority: Record<string, number>;
  videoLink: string;
}
const goalKeyMap: Record<string, string> = {
  "Core": "core",
  "Lose Weight": "weight_loss",
  "Gain Weight": "weight_gain",
  "Improve Cardiovascular Health": "cardiovascular_health",
  "Build Strength": "build_strength",
  "Flexibility": "flexibility"
};
const WorkoutResultPage: React.FC = () => {
  const location = useLocation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [startWorkout, setStartWorkout] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeline, setTimeline] = useState<string[]>([]);
  const selectedGoal = location.state?.goal || "Core";
  const goalKey = goalKeyMap[selectedGoal] || "core";
  const WORK_DURATION = 30; 
  const REST_DURATION = 20; 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/exercise.json');
        const data: Exercise[] = await response.json();
        const sorted = data
          .filter(ex => ex.basePriority[goalKey] !== undefined)
          .sort((a, b) => a.basePriority[goalKey] - b.basePriority[goalKey]);
        setExercises(sorted);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [goalKey]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startWorkout && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && startWorkout) {
      if (isResting) {
        setIsResting(false);
        const nextIndex = currentIndex + 1;
        if (nextIndex < exercises.length) {
          setCurrentIndex(nextIndex);
          setTimeline(prev => [...prev, exercises[nextIndex]?.name]);
          setTimeLeft(WORK_DURATION);
        } else {
          setStartWorkout(false);
        }
      } else {
        setIsResting(true);
        setTimeLeft(REST_DURATION);
        setTimeline(prev => [...prev, 'Rest']);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isResting, startWorkout]);

  const startExercise = () => {
    setStartWorkout(true);
    setTimeline([exercises[0]?.name]);
    setTimeLeft(WORK_DURATION);
  };
  const skipToNext = () => {
    if (isResting) {
      setIsResting(false);
      const nextIndex = currentIndex + 1;
      if (nextIndex < exercises.length) {
        setCurrentIndex(nextIndex);
        setTimeline(prev => [...prev, exercises[nextIndex]?.name]);
        setTimeLeft(WORK_DURATION);
      } else {
        setStartWorkout(false);
      }
    } else {
      setIsResting(true);
      setTimeLeft(REST_DURATION);
      setTimeline(prev => [...prev, 'Rest']);
    }
  };
  const currentExercise = exercises[currentIndex];
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">
        Your <span className="text-blue-600">{selectedGoal}</span> Workout Plan
      </h1>
      {!startWorkout && (
        <>
          <div className="mb-6 space-y-4">
            {exercises.map((ex, i) => (
              <div key={i} className="border p-3 rounded bg-white">
                <h2 className="text-lg font-semibold">{ex.name}</h2>
                <p className="text-sm text-gray-500">{ex.muscleGroup}</p>
              </div>
            ))}
          </div>
          <button
            onClick={startExercise}
            className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
            ▶ Start My Personalized Workout
          </button>
        </>
      )}
      {startWorkout && currentExercise && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2">
            {isResting ? "Rest Time" : currentExercise.name}
          </h2>
          {!isResting && (
            <>
              <p className="text-gray-600 mb-1">Muscle Group: {currentExercise.muscleGroup}</p>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full h-64"
                  src={currentExercise.videoLink.replace("watch?v=", "embed/")}
                  title={currentExercise.name}
                  allowFullScreen
                />
              </div>
            </>
          )}

          <p className="text-xl font-bold mb-2">
            {isResting ? `Rest: ${timeLeft}s` : `Time Left: ${timeLeft}s`}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={skipToNext}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" >
              ⏭️ Skip to Next
            </button>
          </div>



          <div className="relative w-full h-4 bg-gray-300 rounded overflow-hidden mt-6">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 transition-all duration-1000"
              style={{
                width: `${((isResting ? REST_DURATION - timeLeft : WORK_DURATION - timeLeft) /
                  (isResting ? REST_DURATION : WORK_DURATION)) * 100}%`
              }}
            />
          </div>
        </div>
      )}
      {timeline.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-bold mb-2">🧠 CPU Scheduling Timeline</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {timeline.map((item, i) => (
              <div key={i} className="px-4 py-2 bg-blue-100 rounded-full text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkoutResultPage;
