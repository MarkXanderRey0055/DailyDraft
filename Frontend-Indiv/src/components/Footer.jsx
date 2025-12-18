import React from "react";

const Footer = () => {
  const authorName = "Mark Xander Rey";

  return (
    <footer className="bg-[#FCF9EA] border-t border-[#E5E1CC] mt-8 sm:mt-12 lg:mt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        <div className="sm:hidden flex flex-col items-center gap-3 text-center">
          <div className="text-[#5F745D] text-sm font-medium">{authorName}</div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full"></div>
            <span className="text-[#5F745D]/80 text-sm">
              DailyDraft Diary App
            </span>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full"></div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-center gap-6">
          <div className="text-[#5F745D] text-sm lg:text-base font-medium whitespace-nowrap">
            {authorName}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full"></div>
            <span className="text-[#5F745D]/80 text-sm lg:text-base">
              DailyDraft Diary App
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
