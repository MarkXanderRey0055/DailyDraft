import { useState } from "react";

function DiaryEntryInput() {
  const [lastNameInput, setLastNameInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [diaryEntryInput, setDiaryEntryInput] = useState("");

  const [listofNames, setListofNames] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setListofNames([...listofNames, lastNameInput]);
  };

  return (
    <section className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Diary Entry</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        
        {/* DATE */}
        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
            placeholder="enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {lastNameInput && (
            <p className="mt-3 text-lg font-semibold text-green-600">
              My name is {lastNameInput}!
            </p>
          )}
        </div>

        <button type="submit"
          className="px-4 py-2 rounded-lg border border-[#8a9a7c] text-[#8a9a7c] hover:bg-[#8a9a7c] hover:text-white transition-colors text-sm mb-8">Add</button>

        <textarea
          id="diaryEntry" 
          value={diaryEntryInput}
          onChange={(e) => setDiaryEntryInput(e.target.value)}
          placeholder="Start writing your diary here"
          className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
        />
      </form>
    </section>
  );
}

export default DiaryEntryInput;
