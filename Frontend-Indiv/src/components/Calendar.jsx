import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({
  selectedDate,
  onDateClick,
  month,
  year,
  onMonthChange,
}) => {
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

  const monthName = months[month];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-[#FCF9EA] rounded-[3rem] p-8 shadow-xl border border-[#E5E1CC] min-h-[400px] flex flex-col justify-center">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onMonthChange("prev")}
            className="p-2 hover:bg-[#90AB8B]/10 rounded-full transition-colors"
          >
            <ChevronLeft className="text-[#5F745D]" />
          </button>

          <div className="flex flex-col items-center">
            <div className="px-8 py-2 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full text-white font-bold uppercase tracking-widest text-sm shadow-md">
              {monthName}
            </div>
            <span className="text-[#5F745D] font-medium mt-1 text-xs">
              {year}
            </span>
          </div>

          <button
            onClick={() => onMonthChange("next")}
            className="p-2 hover:bg-[#90AB8B]/10 rounded-full transition-colors"
          >
            <ChevronRight className="text-[#5F745D]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <span
              key={day}
              className="text-[#5F745D] font-bold text-xs opacity-70"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {days.map((day) => {
            const dateString = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;
            const isSelected = selectedDate === dateString;

            return (
              <button
                key={day}
                onClick={() => onDateClick(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-[#90AB8B] to-[#7A9376] text-white shadow-lg scale-110"
                      : "bg-[#F8F5E6] text-[#5F745D] hover:bg-[#90AB8B] hover:text-white"
                  }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
