import { useState, useEffect } from "react";
import Header from "./components/Header";
import DiaryEntryInput from "./components/DiaryEntryInput";
import Calendar from "./components/Calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadEntries = () => {
      const stored = localStorage.getItem("diaryEntries");
      if (stored) setEntries(JSON.parse(stored));
    };
    loadEntries();
  }, []);

  const handleDateClick = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  // calendar
  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  const handleEntrySaved = () => {
    const stored = localStorage.getItem("diaryEntries");
    if (stored) setEntries(JSON.parse(stored));
  };

  return (
    <div className="min-h-screen bg-[#EBF4DD]">
      <Header name="DailyDraft" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <Calendar
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              month={month}
              year={year}
              onMonthChange={handleMonthChange}
            />
          </div>
          <div className="lg:col-span-2">
            <DiaryEntryInput
              selectedDate={selectedDate}
              onEntrySaved={handleEntrySaved}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;