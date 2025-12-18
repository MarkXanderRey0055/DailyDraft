import { useState, useEffect } from "react";
import Header from "./components/Header";
import DiaryEntryInput from "./components/DiaryEntryInput";
import Calendar from "./components/Calendar";
import MonthlyOverview from "./components/MonthlyOverview";
import BibleVerse from "./components/BibleVerse";
import Footer from "./components/Footer";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
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
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (month === 0) { setMonth(11); setYear(year - 1); }
      else { setMonth(month - 1); }
    } else {
      if (month === 11) { setMonth(0); setYear(year + 1); }
      else { setMonth(month + 1); }
    }
  };

  const handleEntrySaved = () => {
    const stored = localStorage.getItem("diaryEntries");
    if (stored) setEntries(JSON.parse(stored));
  };

  return (
    <div className="min-h-screen bg-[#EBF4DD] flex flex-col">
      <Header name="DailyDraft" />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-grow">
        <div className="block xl:hidden mb-6 lg:mb-8">
          <BibleVerse />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            <div className="sticky top-6 lg:top-8">
              <Calendar 
                selectedDate={selectedDate} 
                onDateClick={handleDateClick} 
                month={month} 
                year={year} 
                onMonthChange={handleMonthChange} 
              />
              <div className="mt-6 lg:mt-8">
                <MonthlyOverview entries={entries} month={month} year={year} />
              </div>
            </div>
          </div>

          {/* diaryinput */}
          <div className="lg:col-span-2 xl:col-span-2">
            <DiaryEntryInput selectedDate={selectedDate} onEntrySaved={handleEntrySaved} />
          </div>

          {/* bibleverse */}
          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-6 lg:top-8 h-fit">
              <BibleVerse />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;