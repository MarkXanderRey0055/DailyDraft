import React, { useState, useEffect } from "react";
import { Quote, RefreshCw, BookOpen, Copy } from "lucide-react";

const BibleVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previousVerses, setPreviousVerses] = useState([]);

  const inspirationalVerses = [
    // popular
    { book: 24, chapter: 29, verse: 11, name: "Jeremiah 29:11" },
    { book: 19, chapter: 23, verse: 1, name: "Psalm 23:1" },
    { book: 50, chapter: 4, verse: 13, name: "Philippians 4:13" },
    { book: 43, chapter: 3, verse: 16, name: "John 3:16" },
    { book: 45, chapter: 8, verse: 28, name: "Romans 8:28" },
    
    // Psalms
    { book: 19, chapter: 27, verse: 1, name: "Psalm 27:1" },
    { book: 19, chapter: 34, verse: 8, name: "Psalm 34:8" },
    { book: 19, chapter: 46, verse: 1, name: "Psalm 46:1" },
    { book: 19, chapter: 91, verse: 1, name: "Psalm 91:1" },
    { book: 19, chapter: 121, verse: 1, name: "Psalm 121:1" },
    { book: 19, chapter: 139, verse: 14, name: "Psalm 139:14" },
    { book: 19, chapter: 150, verse: 6, name: "Psalm 150:6" },
    
    // isaiah
    { book: 23, chapter: 40, verse: 31, name: "Isaiah 40:31" },
    { book: 23, chapter: 41, verse: 10, name: "Isaiah 41:10" },
    { book: 23, chapter: 43, verse: 2, name: "Isaiah 43:2" },
    { book: 23, chapter: 53, verse: 5, name: "Isaiah 53:5" },
    
    // proverbs
    { book: 20, chapter: 3, verse: 5, name: "Proverbs 3:5" },
    { book: 20, chapter: 16, verse: 3, name: "Proverbs 16:3" },
    { book: 20, chapter: 18, verse: 10, name: "Proverbs 18:10" },
    { book: 20, chapter: 22, verse: 6, name: "Proverbs 22:6" },
    
    //gospels 
    { book: 40, chapter: 5, verse: 16, name: "Matthew 5:16" },
    { book: 40, chapter: 6, verse: 33, name: "Matthew 6:33" },
    { book: 40, chapter: 11, verse: 28, name: "Matthew 11:28" },
    { book: 40, chapter: 19, verse: 26, name: "Matthew 19:26" },
    { book: 40, chapter: 28, verse: 20, name: "Matthew 28:20" },
    { book: 43, chapter: 10, verse: 10, name: "John 10:10" },
    { book: 43, chapter: 14, verse: 6, name: "John 14:6" },
    { book: 43, chapter: 14, verse: 27, name: "John 14:27" },
    { book: 43, chapter: 16, verse: 33, name: "John 16:33" },
    
    //new testament
    { book: 45, chapter: 5, verse: 8, name: "Romans 5:8" },
    { book: 45, chapter: 10, verse: 9, name: "Romans 10:9" },
    { book: 45, chapter: 12, verse: 12, name: "Romans 12:12" },
    { book: 46, chapter: 10, verse: 31, name: "1 Corinthians 10:31" },
    { book: 47, chapter: 4, verse: 18, name: "2 Corinthians 4:18" },
    { book: 47, chapter: 5, verse: 17, name: "2 Corinthians 5:17" },
    { book: 47, chapter: 12, verse: 9, name: "2 Corinthians 12:9" },
    { book: 49, chapter: 2, verse: 10, name: "Ephesians 2:10" },
    { book: 49, chapter: 3, verse: 20, name: "Ephesians 3:20" },
    { book: 51, chapter: 3, verse: 23, name: "Colossians 3:23" },
    { book: 52, chapter: 5, verse: 16, name: "1 Thessalonians 5:16" },
    { book: 54, chapter: 4, verse: 12, name: "1 Timothy 4:12" },
    { book: 55, chapter: 1, verse: 7, name: "2 Timothy 1:7" },
    { book: 58, chapter: 4, verse: 16, name: "Hebrews 4:16" },
    { book: 58, chapter: 11, verse: 1, name: "Hebrews 11:1" },
    { book: 58, chapter: 12, verse: 2, name: "Hebrews 12:2" },
    { book: 59, chapter: 1, verse: 5, name: "James 1:5" },
    { book: 60, chapter: 5, verse: 7, name: "1 Peter 5:7" },
    
    // old testament 
    { book: 6, chapter: 1, verse: 9, name: "Joshua 1:9" },
    { book: 18, chapter: 42, verse: 2, name: "Job 42:2" },
    { book: 30, chapter: 3, verse: 3, name: "Amos 3:3" },
    { book: 34, chapter: 1, verse: 7, name: "Nahum 1:7" },
    
    // Revelation
    { book: 66, chapter: 21, verse: 4, name: "Revelation 21:4" },
  ];

  // fallbacks
  const fallbackVerses = [
    {
      text: "For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil, to give you a future and a hope.",
      reference: "Jeremiah 29:11",
      book: "Jeremiah"
    },
    {
      text: "The LORD is my shepherd; I shall not want.",
      reference: "Psalm 23:1",
      book: "Psalm"
    },
    {
      text: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
      book: "Philippians"
    },
    {
      text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
      reference: "John 3:16",
      book: "John"
    },
    {
      text: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
      reference: "Romans 8:28",
      book: "Romans"
    }
  ];

  const getBookNameFromReference = (reference) => {
    const parts = reference.split(' ');
    
    if (parts.length >= 3 && !isNaN(parts[0])) {
      return `${parts[0]} ${parts[1]}`;
    } else {
      return parts[0];
    }
  };

  const getRandomVerse = () => {
    let availableVerses = inspirationalVerses;
    
    if (previousVerses.length > 0) {
      availableVerses = inspirationalVerses.filter(v => 
        !previousVerses.some(pv => 
          pv.book === v.book && pv.chapter === v.chapter && pv.verse === v.verse
        )
      );
      
      if (availableVerses.length === 0) {
        availableVerses = inspirationalVerses;
        setPreviousVerses([]);
      }
    }
    
    const randomIndex = Math.floor(Math.random() * availableVerses.length);
    const selectedVerse = availableVerses[randomIndex];
    
    setPreviousVerses(prev => {
      const newHistory = [selectedVerse, ...prev.slice(0, 4)];
      return newHistory;
    });
    
    return selectedVerse;
  };

  const fetchVerse = async () => {
    setLoading(true);
    
    try {
      const verseData = getRandomVerse();
      
      const response = await fetch(
        `https://bolls.life/get-text/NKJV/${verseData.book}/${verseData.chapter}/`
      );
      
      if (response.ok) {
        const chapterData = await response.json();
        const verseText = chapterData.find(v => v.verse === verseData.verse);
        
        if (verseText && verseText.text) {
          const cleanText = verseText.text.replace(/<[^>]*>/g, '').trim();
          setVerse({
            text: cleanText,
            reference: verseData.name,
            book: getBookNameFromReference(verseData.name)
          });
          setLoading(false);
          return;
        }
      }
      throw new Error('API response not ok');
    } catch (error) {
      console.log("Using fallback verse:", error);
      
      const randomFallback = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
      setVerse(randomFallback);
    }
    
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (verse?.text) {
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference} (NKJV)`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <div className="bg-[#FCF9EA] rounded-[2rem] lg:rounded-[3rem] p-4 md:p-6 lg:p-8 shadow-xl border border-[#E5E1CC] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-[#90AB8B] to-[#7A9376] rounded-xl shadow-md">
            <Quote size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5F745D]">
              {loading ? "Loading..." : "Daily Scripture"}
            </h3>
            <p className="text-xs text-[#90AB8B] font-medium">
              {verse?.reference || "Refresh for new verse"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded-full transition-all ${
              copied ? 'bg-green-100 text-green-600' : 'hover:bg-[#90AB8B]/10 text-[#90AB8B]'
            }`}
            title={copied ? "Copied!" : "Copy verse"}
            disabled={loading}
          >
            <Copy size={16} />
          </button>
          <button
            onClick={fetchVerse}
            disabled={loading}
            className="p-2 hover:bg-[#90AB8B]/10 rounded-full transition-colors text-[#90AB8B] disabled:opacity-50"
            title="New inspirational verse"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-[#90AB8B]/10 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-[#90AB8B]/10 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-[#90AB8B]/10 rounded w-4/6 animate-pulse"></div>
            <div className="h-4 bg-[#90AB8B]/10 rounded w-3/6 animate-pulse"></div>
            <div className="flex justify-center mt-4">
              <div className="text-xs text-[#90AB8B]">
                Fetching verse...
              </div>
            </div>
          </div>
        ) : verse ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={14} className="text-[#90AB8B]" />
              <span className="text-xs font-bold text-[#90AB8B] uppercase tracking-wider">
                {verse.book}
              </span>
              <span className="text-xs text-[#90AB8B]/70 ml-auto">
                NKJV
              </span>
            </div>
            
            <div className="text eb-container">
              <p className="text-[#5F745D] text-lg leading-relaxed italic mb-6">
                "{verse.text}"
              </p>
            </div>
            
            <div className="pt-5 border-t border-[#E5E1CC]/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#90AB8B] font-bold text-sm not-italic">
                    {verse.reference}
                  </p>
                  <p className="text-[#90AB8B]/70 text-xs mt-1">
                    New King James Version
                  </p>
                </div>
                {copied && (
                  <span className="text-xs font-medium text-green-600 animate-pulse">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-[#90AB8B] italic text-center py-8">
            Click refresh to load a verse
          </p>
        )}
      </div>
    </div>
  );
};

export default BibleVerse;