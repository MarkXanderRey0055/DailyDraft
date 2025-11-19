const Header = ({ name }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-yellow-600 to-green-400 shadow-lg px-8 py-5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
            <span className="text-lg font-bold text-green-600">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{name}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full transition-colors duration-200 font-semibold text-white shadow-md">
            MR
          </button>
          <div className="sm:hidden flex items-center justify-center w-9 h-9 bg-green-500 hover:bg-green-600 rounded-full transition-colors duration-200 font-semibold text-white text-sm shadow-md">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
