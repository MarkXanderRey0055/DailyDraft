import { useState } from "react";
import Header from "./components/Header";
import DiaryEntryInput from "./components/DiaryEntryInput";

function App() {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const handleDateClick = (day) => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <Header name="DailyDraft" />
      <div className="flex gap-6 p-21 bg-gray-50 min-h-screen">
        {/* Left side - Diary Entry */}
        <section className="flex-1">
          <DiaryEntryInput 
            entries={entries} 
            setEntries={setEntries}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </section>
      </div>
    </>
  );
}

export default App;