import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
interface DayEntry {
  day: number;
  completed: boolean;
  notes: string;
}
interface Habit {
  name: string;
  days: DayEntry[];
}
function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');

  //the below function is made to start a new habit
  const createNewHabit = () => {
    if (!newHabitName) return;
    const newHabit: Habit = {
      name: newHabitName,
      days: Array.from({ length: 21 }, (_, i) => ({
        day: i + 1,
        completed: false,
        notes: ''
      }))
    };
    setHabits([...habits, newHabit]);
    setNewHabitName(''); // yaha pe reset ho jaega 
  };
  const toggleDay = (habitIndex: number, dayIndex: number) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].days[dayIndex].completed = !updatedHabits[habitIndex].days[dayIndex].completed;
    setHabits(updatedHabits);
  };
  const updateNotes = (habitIndex: number, dayIndex: number, notes: string) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].days[dayIndex].notes = notes;
    setHabits(updatedHabits);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Habit Tracker</h1>
        <div className="flex items-center gap-4 mb-8">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Enter your new habit"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={createNewHabit}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl shadow-md"
          >
            Add Habit
          </button>
        </div>
        {habits.length === 0 ? (
          <p className="text-gray-400 text-center">No habits created yet.</p>
        ) : (
          habits.map((habit, habitIndex) => (
            <div key={habitIndex} className="mb-8">
              <h2 className="text-2xl font-bold text-center mb-4">{habit.name}</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {habit.days.map((day, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dayIndex * 0.05 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">Day {day.day}</span>
                      <button
                        onClick={() => toggleDay(habitIndex, dayIndex)}
                        className={`w-6 h-6 rounded ${
                          day.completed ? 'bg-purple-600' : 'border-2 border-purple-600'
                        } flex items-center justify-center`}
                      >
                        {day.completed && <CheckSquare className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                    <textarea
                      placeholder="Notes for the day..."
                      value={day.notes}
                      onChange={(e) => updateNotes(habitIndex, dayIndex, e.target.value)}
                      className="w-full h-20 p-2 text-sm border rounded"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HabitTracker;
