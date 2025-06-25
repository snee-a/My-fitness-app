import React from 'react';
const ExerciseTimeline = ({ exercises, currentIndex, restDuration }) => {
  const timeline = [];
  for (let i = 0; i < exercises.length; i++) {
    timeline.push({
      type: 'exercise',
      name: exercises[i].name
    });
    if (i < exercises.length - 1) {
      timeline.push({
        type: 'rest',
        name: `Rest (${restDuration}s)`
      });
    }
  }
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">🧠 CPU Scheduling Timeline</h3>
      <div className="flex overflow-x-auto gap-2">
        {timeline.map((block, index) => (
          <div
            key={index}
            className={`p-2 px-4 rounded text-white text-sm ${
              block.type === 'exercise' ? 'bg-blue-500' : 'bg-gray-500'
            } ${index / 2 <= currentIndex ? 'opacity-100' : 'opacity-40'}`}
          >
            {block.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExerciseTimeline;
