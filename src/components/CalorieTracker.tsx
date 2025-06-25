import React,{useEffect,useState} from "react";
import foodData from "../data/food.json";
import LRUCache from "../utils/LRUCache";
const cache = new LRUCache(5);
const CalorieTracker: React.FC=()=>{
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [dailyLog, setDailyLog] = useState<any[]>([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0 });
  const [cachedItems, setCachedItems] = useState<{ key: string; value: any }[]>(
    []
  );
  useEffect(()=>{
    const savedLog= localStorage.getItem("dailyLog");
    if (savedLog) {
      const parsed=JSON.parse(savedLog);
      setDailyLog(parsed);
      updateTotals(parsed);
    }
    setCachedItems(cache.entries());
  }, []);
  const handleSearch=(q: string) => {
    setQuery(q);
    if (!q) {
      setResults([]);
      setCachedItems(cache.entries());
      return;
    }
    const matches = foodData.filter((item: any) =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
    setResults(matches);
    setCachedItems(cache.entries());
  };
  const addToLog = (item: any) => {
    cache.put(item.name, item); 
    setCachedItems(cache.entries()); 
    const newLog = [...dailyLog, item];
    setDailyLog(newLog);
    updateTotals(newLog);
    localStorage.setItem("dailyLog", JSON.stringify(newLog));
  };
  const updateTotals = (log: any[]) => {
    const calories = log.reduce((acc, item) => acc + item.calories, 0);
    const protein = log.reduce((acc, item) => acc + item.protein, 0);
    setTotals({ calories, protein });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Food</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter food name"
          autoComplete="off"
        />
        {(results.length > 0 || cachedItems.length > 0) && (
          <div className="border rounded mt-1 max-h-60 overflow-y-auto bg-white z-10 relative shadow-lg">
            {results.length > 0 && (
              <>
                <h3 className="font-semibold p-2 border-b">Search Results</h3>
                {results.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addToLog(item)}
                  >
                    <div>
                      {item.name} - {item.calories} cal, {item.protein}g protein
                    </div>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Add
                    </button>
                  </div>
                ))}
              </>
            )}
            {cachedItems.length > 0 && (
              <>
                <h3 className="font-semibold p-2 border-t border-b">Recent Foods</h3>
                {cachedItems.map(({ key, value }) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addToLog(value)}
                  >
                    <div>
                      {value.name} - {value.calories} cal, {value.protein}g protein
                    </div>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Add
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Today's Log</h2>
        <ul className="border rounded p-2 space-y-2 max-h-96 overflow-y-auto">
          {dailyLog.map((item, index) => (
            <li key={index} className="flex justify-between">
              {item.name} - {item.calories} cal, {item.protein}g
            </li>
          ))}
        </ul>
        <div className="mt-4 text-lg font-bold">
          Total: {totals.calories} cal, {totals.protein}g protein
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;
