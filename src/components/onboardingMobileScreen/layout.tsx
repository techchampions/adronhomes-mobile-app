import { Navbar } from "./onboardingComponents/Bottomnavigation";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-transparent  px-4 pt-4 pb-16 md:pb-16 z-20">
        <div className="absolute -right-4 md:-right-72 bottom-1 md:bottom-0 w-[600px] h-[600px] md:w-[1700px] md:h-[1700px] lg:w-[2500px] lg:h-[2500px] xl:w-[3500px] xl:h-[3500px] lg:-right-0 bg-[#55A555] rounded-full z-0"></div>

        <div className="flex justify-between items-start relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100/20 rounded-lg transition-colors duration-200"
              aria-label="Open navigation menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-white rounded"></span>
                <span className="block w-6 h-0.5 bg-white rounded"></span>
                <span className="block w-6 h-0.5 bg-white rounded"></span>
              </div>
            </button>

            <div className="text-white">
              <div className="text-sm font-normal opacity-90">Welcome,</div>
              <div
                className="text-lg md:text-xl font-bold mt-1 max-w-[200px] md:max-w-[300px] truncate"
                title="Badamosi BadamosiBadamosi"
              >
                Badamosi BadamosiBadamosi
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white hover:border-gray-200 transition-colors duration-200">
            <img
              src="/myp.svg"
              alt="User profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Add padding-bottom to account for the fixed navbar */}
      <main className="flex-1 overflow-auto pt-36 md:pt-44 pb-32 overflow-y-auto">
        {children}
      </main>

      <Navbar />
    </div>
  );
};