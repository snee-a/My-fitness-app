import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const goals = [
  'Core',
  'Lose Weight',
  'Gain Weight',
  'Improve Cardiovascular Health',
  'Build Strength',
  'Flexibility',
];
const WorkoutSplitGenerator = () => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleGoalSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const goal = e.target.value;
    setSelectedGoal(goal);
    setError(''); 
  };
  const handleGenerateClick = () => {
    if (selectedGoal) {
      navigate('/workout-plan', { state: { goal: selectedGoal } });
    } else {
      setError('Please select a fitness goal to proceed.');
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Workout Split Generator</h2>
      <div className="mb-4">
        <label htmlFor="fitness-goal" className="block font-semibold mb-2">
          What is your fitness goal?
        </label>
        <select
          id="fitness-goal"
          value={selectedGoal}
          onChange={handleGoalSelect}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">-- Select a goal --</option>
          {goals.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <button
        onClick={handleGenerateClick}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
        Generate Workout Plan
      </button>
    </div>
  );
};
export default WorkoutSplitGenerator;
