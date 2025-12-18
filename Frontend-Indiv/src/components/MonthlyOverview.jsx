import React, { useState, useEffect } from "react";
import { TrendingUp, BookOpen, Sparkles } from "lucide-react";

const MonthlyOverview = ({ entries = [], month, year }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [monthlyStats, setMonthlyStats] = useState({ entries: 0, streak: 0 });

  useEffect(() => {
    const currentMonthEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });

    const calculateStreak = (allEntries) => {
      if (!allEntries || allEntries.length === 0) return 0;
      const sortedDates = [...new Set(allEntries.map((e) => e.date))].sort(
        (a, b) => new Date(b) - new Date(a)
      );
      let streak = 0;
      const today = new Date().toISOString().split("T")[0];

      if (sortedDates[0] === today) {
        streak = 1;
        for (let i = 0; i < sortedDates.length - 1; i++) {
          const d1 = new Date(sortedDates[i]);
          const d2 = new Date(sortedDates[i + 1]);
          if ((d1 - d2) / (1000 * 60 * 60 * 24) === 1) streak++;
          else break;
        }
      }
      return streak;
    };

    setMonthlyStats({
      entries: currentMonthEntries.length,
      streak: calculateStreak(entries),
    });
  }, [entries, month, year]);

  return (
    <div className="bg-[#FCF9EA] rounded-[2rem] lg:rounded-[3rem] p-4 md:p-6 lg:p-8 shadow-xl border border-[#E5E1CC]">
      <h3 className="text-lg md:text-xl font-bold text-[#5F745D] mb-4 lg:mb-6">
        {months[month]} {year} Stats
      </h3>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <div className="bg-gradient-to-br from-white to-[#F8F5E6] p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-[#E5E1CC] shadow-sm">
          <BookOpen className="text-[#90AB8B] mb-2" size={20} />
          <p className="text-3xl font-bold text-[#5F745D]">
            {monthlyStats.entries}
          </p>
          <span className="text-[10px] font-bold text-[#90AB8B] uppercase">
            Entries
          </span>
        </div>

        <div className="bg-gradient-to-br from-white to-[#F8F5E6] p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-[#E5E1CC] shadow-sm">
          <TrendingUp className="text-[#90AB8B] mb-2" size={20} />
          <p className="text-3xl font-bold text-[#5F745D]">
            {monthlyStats.streak}
          </p>
          <span className="text-[10px] font-bold text-[#90AB8B] uppercase">
            Day Streak
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyOverview;