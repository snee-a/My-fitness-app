"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Settings, X } from "lucide-react";
interface WaterLogEntry {
  amount: number;
  timestamp: number;
}
interface Toast {
  id: number;
  message: string;
}
export default function WaterTracker() {
  const [intake, setIntake] = useState(0);
  const [goalIntake, setGoalIntake] = useState(2000); //2000 just as default user can change it
  const [waterLog, setWaterLog] = useState<WaterLogEntry[]>([]);
  const [inputAmount, setInputAmount] = useState<number>(250); //same goes for 250ml size of glass 
  const [showSettings, setShowSettings] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("20:00");
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAmount > 0) {
      setIntake((prev) => prev + inputAmount);
      setWaterLog((prev) => [...prev, { amount: inputAmount, timestamp: Date.now() }]);
      addToast(`Added ${inputAmount}ml!`);
      if (intake + inputAmount >= goalIntake) {
        addToast("🎉 Goal Achieved!");
      }
      setInputAmount(250);
    }
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setIntake(0);
      setWaterLog([]);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [intake]);
  useEffect(() => {
 
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    if (!remindersEnabled) return;
    if (!reminderTime) return; 
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          addToast("Please enable notifications to receive reminders.");
          return;
        }
        scheduleNotification();
      });
    } else {
      scheduleNotification();
    }

    function scheduleNotification() {
      const [hours, minutes] = reminderTime.split(":").map(Number);
      const now = new Date();
      let notifyTime = new Date();
      notifyTime.setHours(hours, minutes, 0, 0);
      if (notifyTime <= now) {
        notifyTime.setDate(notifyTime.getDate() + 1);
      }
      const timeout = notifyTime.getTime() - now.getTime();
      notificationTimeoutRef.current = setTimeout(() => {
        new Notification("Water Reminder", {
          body: "💧 Time to drink water and stay hydrated!",
        });
        addToast("💧 Reminder notification sent!");
        scheduleNotification();
      }, timeout);
    }
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [remindersEnabled, reminderTime]);
  const percentage = Math.min((intake / goalIntake) * 100, 100);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-tr from-teal-100 to-white">
      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-teal-700">Water Tracker</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-teal-100">
          <Settings className="w-6 h-6 text-teal-600" />
        </button>
      </div>
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#e0f2f1"
            strokeWidth="15"
            fill="none"/>
          <motion.circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#14b8a6"
            strokeWidth="15"
            fill="none"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * percentage) / 100}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
            transition={{ duration: 1 }}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-teal-700">{intake}ml</h2>
          <p className="text-gray-500 text-sm">of {goalIntake}ml</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
            className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter amount (ml)"/>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-xl shadow-md" >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-md mb-8">
        <h2 className="text-lg font-semibold text-teal-700 mb-4">Today's Log</h2>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {waterLog.length === 0 ? (
            <p className="text-gray-400 text-sm">No entries yet.</p>
          ) : (
            waterLog.map((entry, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-700">
                <span>+{entry.amount}ml</span>
                <span>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg w-80 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}>
              <button
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSettings(false)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-teal-700 mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 text-sm">Daily Goal (ml)</label>
                  <input
                    type="number"
                    value={goalIntake}
                    onChange={(e) => setGoalIntake(parseInt(e.target.value))}
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">Reminders</span>
                  <button
                    onClick={() => setRemindersEnabled(!remindersEnabled)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      remindersEnabled ? "bg-teal-100 text-teal-600" : "bg-gray-200 text-gray-400"
                    }`} >
                    {remindersEnabled ? "On" : "Off"}
                  </button>
                </div>
                {remindersEnabled && (
                  <div>
                    <label className="text-gray-700 text-sm">Reminder Time</label>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-lg" >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
