import { useEffect, useState } from "react";
import supabase from "../../util/supabase";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router";

export default function DashboardProjects() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();
      if (data) {
        setProfile(data);
      }
    };
    const getProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.log(error.message);
      }
      if (data) {
        setProjects(data);
      }
    };
    getProfile();
    getProjects();
  }, [user]);
  const handleCreateProject = (e) => {
    e.preventDefault();
    navigate("/dashboard/createProject");
  };

  const handleBtnDelete = async (id) => {
    if (confirm("are you sure, You Want To delete This Project ?")) {
      await supabase.from("projects").delete().eq("id", id);
      setProjects(projects.filter((ele) => ele.id !== id));
    }
  };

  return (
    <div>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F1F5F9] tracking-tight">
            Welcome Back, <br />
            <span className="bg-linear-to-r from-[#818CF8] to-indigo-400 bg-clip-text text-transparent">
              {profile?.fullName || "User"}
            </span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Here is an overview of your active projects and tasks.
          </p>
        </div>

        <button
          onClick={handleCreateProject}
          className="group flex items-center gap-2 bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-[#818CF8]/20 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="text-xl font-light">+</span>
          Create Project
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((p, index) => {
          return (
            <div
              key={index}
              className="group bg-[#1E293B] border border-slate-700/40 p-6 rounded-2xl hover:border-[#818CF8]/50 transition-all duration-300 shadow-xl hover:shadow-[#818CF8]/5 shadow-transparent flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#818CF8] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 bg-[#0F172A] rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-[#818CF8]/30 transition-colors">
                    <span className="text-[#818CF8] font-bold">
                      {p.name?.[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-[#0F172A] px-2 py-1 rounded">
                    Active
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#F1F5F9] mb-2 group-hover:text-[#818CF8] transition-colors line-clamp-1">
                  {p.name}
                </h2>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {p.description ||
                    "No description provided for this project yet. Start adding details to track progress."}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-5 border-t border-slate-700/50">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#818CF8]/10 hover:bg-[#818CF8] text-[#818CF8] hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border border-[#818CF8]/20 group/btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 group-hover/btn:rotate-12 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Update
                </button>

                <button
                  onClick={() => handleBtnDelete(p.id)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300"
                  title="Delete Project"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
