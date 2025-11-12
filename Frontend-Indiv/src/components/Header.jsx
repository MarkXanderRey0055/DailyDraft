const Header = ({name}) => {

  return (
    <>
      <header className="pb-6 px-20 shadow-sm shadow-blue-200 bg-green-200">
        <article className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-black-700">{name}</h1>
          </div>
          <div>
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-8">
                <span class="font-medium text-gray-600 dark:text-gray-300 py-6 ">MR</span>
            </div>
          </div>
        </article>
      </header>
    </> 
  );
};

export default Header;
