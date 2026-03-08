import { Outlet, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function DashboardLayout() {
  const { user, SignOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBtnLogout = async (e) => {
    e.preventDefault();
    SignOut();
    navigate("/");
  };

  return (
    // Main Container: Setting the background to --bg (#0F172A)
    <section className="flex h-screen bg-[#0F172A] text-[#F1F5F9] font-sans overflow-hidden">
      {/* SIDEBAR: Using --card (#1E293B) for separation */}
      <aside className="w-64 bg-[#1E293B] border-r border-slate-700 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="h-8 w-8 bg-[#818CF8] rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold -rotate-12">T</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
          </div>

          <nav>
            <ul className="space-y-2">
              {["Projects", "Tasks", "Settings"].map((item) => (
                <li
                  key={item}
                  className="px-4 py-3 rounded-xl hover:bg-[#818CF8]/10 hover:text-[#818CF8] transition-all cursor-pointer font-medium text-slate-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          className="w-full bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-300 py-3 rounded-xl transition-colors border border-slate-700 font-medium"
          onClick={handleBtnLogout}
        >
          Logout
        </button>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR: Clean & Transparent look */}
        <header className="h-20 border-b border-slate-800 flex justify-between items-center px-8 bg-[#0F172A]/80 backdrop-blur-md">
          <div className="search-placeholder">
            <span className="text-slate-500 text-sm italic">
              Overview / Dashboard
            </span>
          </div>

          <div className="flex gap-7 items-center">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">
                {user?.email || "Guest User"}
              </p>
              <p className="text-xs text-slate-500">Pro Account</p>
            </div>
            {/* User Avatar with --primary (#818CF8) */}
            <div className="h-10 w-10 bg-[#818CF8] text-white rounded-full flex justify-center items-center font-bold shadow-lg shadow-indigo-500/30 ring-2 ring-[#0F172A]">
              {user?.email?.[0].toUpperCase() || "H"}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
}
