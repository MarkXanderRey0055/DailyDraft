import { useState, useEffect } from "react";
import { Save, Calendar, User, Clock, Sparkles } from "lucide-react";

function DiaryEntryInput({ onEntrySaved }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEntriesFromStorage = () => {
    try {
      const entries = localStorage.getItem("diaryEntries");
      return entries ? JSON.parse(entries) : [];
    } catch (error) {
      return [];
    }
  };

  const saveEntryToStorage = (entry) => {
    try {
      const existingEntries = getEntriesFromStorage();
      const updatedEntries = [entry, ...existingEntries];
      localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Failed to save entry" };
    }
  };

  const validateEntry = (entry) => {
    const errors = [];
    if (!entry.date) errors.push("Date is required");
    if (!entry.name?.trim()) errors.push("Name is required");
    if (!entry.text?.trim()) errors.push("Entry text is required");
    return { isValid: errors.length === 0, errors };
  };

  useEffect(() => {
    setEntries(getEntriesFromStorage());
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      date: date,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const validation = validateEntry(newEntry);
    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    setIsSubmitting(true);
    const result = saveEntryToStorage(newEntry);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (result.success) {
      setEntries(getEntriesFromStorage());
      setName("");
      setDate(new Date().toISOString().split("T")[0]);
      setText("");
      setIsSubmitting(false);

      if (onEntrySaved) {
        onEntrySaved();
      }
    } else {
      alert(result.message || "Failed to save entry");
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCharCountColor = () => {
    if (text.length === 0) return "from-gray-400 to-gray-400";
    if (text.length < 100) return "from-blue-400 to-indigo-400";
    if (text.length < 500) return "from-indigo-400 to-purple-400";
    if (text.length < 1000) return "from-purple-400 to-pink-400";
    return "from-pink-400 to-rose-400";
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-12 text-center ">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          Daily Draft
        </h1>
      </div>

      <div className="flex justify-center ">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Entry</h2>
                <p className="text-gray-500 mt-2">
                  Today's thoughts and reflections
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
           
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                    <Calendar size={18} className="text-indigo-500" />
                    Entry Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 bg-white"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                    <User size={18} className="text-indigo-500" />
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={50}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 bg-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Today's Thoughts
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 bg-white resize-none placeholder-gray-400 leading-relaxed"
                    required
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div
                      className={`text-sm font-semibold bg-gradient-to-r ${getCharCountColor()} bg-clip-text text-transparent`}
                    >
                      {text.length}/2000
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={
                    !date || !name.trim() || !text.trim() || isSubmitting
                  }
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/30 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.99]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving Entry...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span className="text-lg">Save Entry</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </div>
            </form>
          </div>

          {entries.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Recent Entries
                  </h3>
                  <p className="text-gray-500 mt-2">Your latest reflections</p>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {entries.length} total entries
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entries.slice(0, 4).map((entry) => (
                  <div
                    key={entry.id}
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-50/50 to-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-900">
                            {formatDate(entry.date)}
                          </span>
                          <span className="hidden sm:inline text-gray-400">
                            •
                          </span>
                          {entry.timestamp && (
                            <span className="text-sm text-gray-500 font-medium">
                              {formatTime(entry.timestamp)}
                            </span>
                          )}
                        </div>
                        <span className="text-sm px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium">
                          {entry.name}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed line-clamp-4">
                        {entry.text}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-400">
                          {entry.text.length > 300
                            ? "Detailed reflection"
                            : "Quick note"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {entries.length > 4 && (
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-500">
                    And {entries.length - 4} more entries in your journal
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
           {/* calendar */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryEntryInput;