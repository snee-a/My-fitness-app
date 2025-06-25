import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
interface Exercise {
  name: string;
  description: string;
  sets: string;
  reps: string;
  image: string;
}
const exerciseData: Record<string, Exercise[]> = {
  chest: [
    {
      name: 'Bench Press',
      description: 'Lie on a flat bench and press the weight up from your chest.',
      sets: '3-4',
      reps: '8-12',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
  ],
  back: [
    {
      name: 'Lat Pulldown',
      description: 'Pull the bar down to your upper chest while keeping your back straight.',
      sets: '3-4',
      reps: '10-15',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
  ],
  //similarly i will add more muscle groups like shoulder legs 
};

function MuscleExercises() {
  const { muscle } = useParams();
  const exercises = muscle ? exerciseData[muscle] : [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">
          {muscle?.charAt(0).toUpperCase() + muscle?.slice(1)} Exercises
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {exercises.map((exercise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                <div className="flex gap-4">
                  <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full">
                    Sets: {exercise.sets}
                  </div>
                  <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full">
                    Reps: {exercise.reps}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MuscleExercises;