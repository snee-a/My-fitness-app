import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import WorkoutPlayerWrapper from './components/WorkoutPlayerWrapper';
import Home from './components/Home';
import CalorieTracker from './components/CalorieTracker';
import Shop from './components/Shop';
import FitnessTrainer from './components/FitnessTrainer';
import TrainerSelection from './components/TrainerSelection';
import MuscleExercises from './components/MuscleExercises';
import WaterTracker from './components/WaterTracker';
import HabitTracker from './components/HabitTracker';
import Meditation from './components/Meditation';
import PeriodTracker from './components/PeriodTracker';
import Login from './components/Login';
import Signup from './components/Signup';
import PostureCheck from './components/PostureCheck';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import MaleTrainer from './components/MaleTrainer';
import FemaleTrainer from './components/FemaleTrainer';
import WorkoutSplitGenerator from './components/WorkoutSplitGenerator';
import WorkoutResultPage from './components/WorkoutResultPage';

const App: React.FC = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/workout/:goal" element={<WorkoutPlayerWrapper />} />

        <Route path="/" element={<Home />} />
        <Route path="/posture-check" element={<PostureCheck />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/fitness-trainer" element={<FitnessTrainer />} />
        <Route path="/trainer-selection" element={<TrainerSelection />} />
        <Route path="/muscle-exercises/:muscle" element={<MuscleExercises />} />
        <Route path="/calories-tracker" element={<CalorieTracker />} />
        <Route path="/water-tracker" element={<WaterTracker />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/period-tracker" element={<PeriodTracker />} />

       
        <Route path="/workout/:goal" element={<WorkoutPlayerWrapper />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fitness-trainer/male" element={<MaleTrainer />} />
        <Route path="/fitness-trainer/female" element={<FemaleTrainer />} />
        <Route path="/workout-tracker" element={<WorkoutSplitGenerator />} />
        <Route path="/workout-plan" element={<WorkoutResultPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;
