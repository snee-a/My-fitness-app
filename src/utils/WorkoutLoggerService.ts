
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { LockManager } from './LockManager';
const LOCAL_STORAGE_KEY = 'completedWorkouts';
const lockManager = new LockManager();
export interface WorkoutLogEntry {
  userId?: string;
  exercise: string;
  startTime: string;
  endTime: string;
  status: 'Completed' | 'Skipped';
}
export const logWorkout = async (entry: WorkoutLogEntry) => {
  const resource = 'firebaseWrite';
  const service = 'WorkoutLoggerService';
  if (lockManager.acquire(resource, service)) {
    try {
      await addDoc(collection(db, 'workoutLogs'), entry);
      console.log(' Firebase write successful:', entry);
    } catch (error) {
      console.error(' Firebase log error:', error);
    } finally {
      lockManager.release(resource, service);
    }
  } else {
    console.warn(` ${service} blocked. Retrying later...`);
    setTimeout(() => logWorkout(entry), 2000);
  }
  const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  existing.push(entry);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  console.log(' Saved locally:', entry);
};
