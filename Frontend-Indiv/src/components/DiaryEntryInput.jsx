import { useState, useEffect } from "react";
import { Save, Calendar, User, Clock, Trash2 } from "lucide-react";

function DiaryEntryInput({ selectedDate, onEntrySaved }) {
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
      return { success: true, entries: updatedEntries };
    } catch (error) {
      return { success: false, message: "Failed to save entry" };
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const existingEntries = getEntriesFromStorage();
      const updatedEntries = existingEntries.filter((entry) => entry.id !== id);
      localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
      setEntries(updatedEntries); 
      
      if (onEntrySaved) {
        onEntrySaved(); 
      }
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
    const initialDate = selectedDate || new Date().toISOString().split("T")[0];
    setDate(initialDate);
  }, [selectedDate]);

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
      setEntries(result.entries || getEntriesFromStorage());
      setName("");
      setDate(selectedDate || new Date().toISOString().split("T")[0]);
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
    if (text.length < 500) return "from-[#90AB8B] to-[#7A9376]";
    return "from-[#7A9376] to-[#5F745D]";
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 lg:space-y-12">
      <div className="text-center mb-4 lg:mb-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#5F745D] mb-3 lg:mb-4">
          Daily Draft
        </h1>
      </div>

      {/* main input */}
      <div className="bg-[#FCF9EA] rounded-[2rem] lg:rounded-[3rem] p-4 md:p-6 lg:p-8 xl:p-10 shadow-xl border border-[#E5E1CC]">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#5F745D]">New Entry</h2>
            </div>
            <div className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white/80 rounded-full border border-[#E5E1CC]">
              <Clock size={16} className="text-[#90AB8B]" />
              <span className="text-sm text-[#5F745D] font-bold">
                {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-bold text-[#5F745D] uppercase tracking-wider">
                  <Calendar size={18} className="text-[#90AB8B]" />
                  Entry Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 md:py-3.5 border border-[#E5E1CC] rounded-2xl focus:ring-2 focus:ring-[#90AB8B]/20 focus:border-[#90AB8B] transition-all duration-300 bg-white"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-bold text-[#5F745D] uppercase tracking-wider">
                  <User size={18} className="text-[#90AB8B]" />
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 md:py-3.5 border border-[#E5E1CC] rounded-2xl focus:ring-2 focus:ring-[#90AB8B]/20 focus:border-[#90AB8B] transition-all duration-300 bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#5F745D] uppercase tracking-wider">Journal Content</label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={10}
                  placeholder="Start writing..."
                  className="w-full px-4 md:px-5 py-4 md:py-5 border border-[#E5E1CC] rounded-3xl focus:ring-2 focus:ring-[#90AB8B]/20 focus:border-[#90AB8B] transition-all duration-300 bg-white resize-none leading-relaxed"
                  required
                />
                <div className="absolute bottom-4 right-6">
                  <div className={`text-xs font-bold bg-gradient-to-r ${getCharCountColor()} bg-clip-text text-transparent`}>
                    {text.length}/2000
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !text}
              className="w-full bg-gradient-to-r from-[#90AB8B] to-[#7A9376] text-white py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Journal Entry"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* saved entries */}
      {entries.length > 0 && (
        <div className="bg-gradient-to-br from-[#FCF9EA] to-[#F8F5E6] rounded-[2rem] lg:rounded-[3rem] p-4 md:p-6 lg:p-8 xl:p-10 shadow-xl border border-[#E5E1CC]">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#5F745D]">Recent Entries</h3>
                <p className="text-[#90AB8B] font-medium mt-1">Your journey so far</p>
              </div>
              <span className="px-4 md:px-5 py-2 bg-white/80 rounded-full border border-[#E5E1CC] text-xs font-bold text-[#5F745D] uppercase tracking-widest">
                {entries.length} Total
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {entries.slice(0, 4).map((entry) => (
                <div key={entry.id} className="group relative bg-white border border-[#E5E1CC] rounded-[2rem] p-4 md:p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#5F745D]">{formatDate(entry.date)}</span>
                      <span className="text-[10px] font-bold text-[#90AB8B] uppercase tracking-tighter">{formatTime(entry.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-3 py-1 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full text-white font-bold uppercase tracking-widest">
                        {entry.name}
                      </span>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        aria-label="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#5F745D]/90 text-sm leading-relaxed line-clamp-4 font-medium italic">
                    "{entry.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiaryEntryInput;