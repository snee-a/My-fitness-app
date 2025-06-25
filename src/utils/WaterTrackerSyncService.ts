
import { lockManager } from './LockManager';
export const simulateWaterTrackerSync = () => {
  const resource = 'firebaseWrite';
  const service = 'WaterTrackerSyncService';


  if (lockManager.acquire(resource, service)) {
    console.log(' WaterTrackerSync writing to Firebase...');
    setTimeout(() => {
      console.log(' WaterTrackerSync done.');
      lockManager.release(resource, service);
    }, 3000);
  } else {
    console.warn(` WaterTrackerSync blocked. Retrying...`);
    setTimeout(simulateWaterTrackerSync, 1500);
  }
};
