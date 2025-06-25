
import { lockManager } from './LockManager'; 
export const simulateReminderService = () => {
  const resource = 'firebaseWrite';
  const service = 'ReminderService';
  if (lockManager.acquire(resource, service)) {
    console.log('🔔 ReminderService writing to Firebase...');
    setTimeout(() => {
      console.log('🔔 ReminderService done.');
      lockManager.release(resource, service);
    }, 3000);
  } else {
    console.warn(`⏳ ReminderService blocked. Retrying...`);
    setTimeout(simulateReminderService, 1500);
  }
};
