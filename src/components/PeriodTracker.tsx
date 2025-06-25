import React, { useState } from "react";
import { format, addDays, isSameDay, startOfMonth, endOfMonth, subMonths, addMonths } from "date-fns";
const getPhase = (date, startDate) => {
  if (!startDate) return null;
  const diff = (date - startDate) / (1000 * 60 * 60 * 24);
  if (diff >= 0 && diff < 5) return "menstrual";
  if (diff >= 12 && diff <= 16) return "fertile";
  if (diff === 14) return "ovulation";
  return null;
};
const PeriodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const days = [];
  for (let d = startOfCurrentMonth; d <= endOfCurrentMonth; d = addDays(d, 1)) {
    days.push(d);
  }
  const getColor = (day) => {
    const phase = getPhase(day, selectedDate);
    if (phase === "menstrual") return "bg-pink-300";
    if (phase === "fertile") return "bg-green-300";
    if (phase === "ovulation") return "bg-purple-300";
    return "bg-white";
  };
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Period Tracker</h1>
      <p className="text-pink-600 mb-4 text-lg text-center max-w-md pt-4 border-b-2 border-black">
        Click on your period date
      </p>
      <div className="flex justify-between items-center w-full max-w-lg mb-6">
        <button
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
          onClick={goToPreviousMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
          onClick={goToNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-xl shadow-xl">
        {days.map((day, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center text-sm rounded-full cursor-pointer border ${
              getColor(day)
            } ${isSameDay(day, selectedDate) ? "ring-2 ring-pink-500" : ""}`}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-6 text-center text-sm text-gray-800">
          <p>
            <span className="font-semibold text-pink-500">Period Start:</span>{" "}
            {format(selectedDate, "PPP")}
          </p>
          <p className="mt-1">
            <span className="text-pink-400">Menstrual Phase:</span> {format(selectedDate, "MMM d")} - {format(addDays(selectedDate, 4), "MMM d")}
          </p>
          <p className="text-green-500">
            Fertile Window: {format(addDays(selectedDate, 12), "MMM d")} - {format(addDays(selectedDate, 16), "MMM d")}
          </p>
          <p className="text-purple-500">
            Ovulation Day: {format(addDays(selectedDate, 14), "MMM d")}
          </p>
        </div>
      )}
    </div>
  );
};
export default PeriodTracker;
