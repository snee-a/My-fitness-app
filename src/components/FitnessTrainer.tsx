import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
function FitnessTrainer() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleGenderSelect = (gender: 'male' | 'female') => {
    navigate(`/fitness-trainer/${gender}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-teal-700">Please Select Your Gender</h1>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleGenderSelect('male')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            Male
          </button>
          <button
            onClick={() => handleGenderSelect('female')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
          >
            Female
          </button>
        </div>
      </motion.div>
    </div>
  );
}
export default FitnessTrainer;
