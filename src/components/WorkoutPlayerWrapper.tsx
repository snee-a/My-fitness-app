
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutPlayer from './WorkoutPlayer';
import { simulateReminderService } from '../utils/ReminderService';
import { simulateWaterTrackerSync } from '../utils/WaterTrackerSyncService';
import { logWorkout } from '../utils/WorkoutLoggerService';
type Params = {
  goal: string;
};
const WorkoutPlayerWrapper: React.FC = () => {
  const { goal } = useParams<Params>();
  useEffect(() => {
    simulateReminderService();         
    simulateWaterTrackerSync();        
    logWorkout({
      exercise: 'Push-Up',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 600000).toISOString(),
      status: 'Completed',
    });                               
  }, []);
  if (!goal) {
    return <div className="text-red-500 text-center mt-6">⚠️ No goal specified in the URL</div>;
  }
  return <WorkoutPlayer selectedGoal={goal} />;
};
export default WorkoutPlayerWrapper;
