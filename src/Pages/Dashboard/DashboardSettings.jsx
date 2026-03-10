import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import supabase from "../../util/supabase";

export default function DashboardSettings() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({
    fullName: "",
    picture: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (data) {
        setProfile({ ...profile, fullName: data.fullName });
      }
    };
    getUser();
  }, [profile, user]);

  return (
    <div className="max-w-3xl mx-auto mt-10 pb-20">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F1F5F9]">
          Dashboard Settings
        </h1>
        <p className="text-slate-400">
          Manage your account preferences and profile information.
        </p>
      </div>

      <form className="bg-[#1E293B] border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* SECTION 1: BASIC INFO */}
        <div className="p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              value={profile.fullName}
              placeholder="John Doe"
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Profile Picture
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-xl hover:border-[#818CF8]/50 transition-colors bg-[#0F172A]/50 group">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-500 group-hover:text-[#818CF8] transition-colors"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-slate-400">
                  <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#818CF8] hover:text-indigo-300">
                    <span>Upload a file</span>
                    <input type="file" name="picture" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A]/40 p-8 border-t border-slate-700/50">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#F1F5F9]">
                More Information
              </h3>
              <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase">
                Optional
              </span>
            </div>
            <p className="text-sm text-slate-500">
              This information helps us personalize your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400 ml-1">
                Gender
              </label>
              <select
                name="gender"
                className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all cursor-pointer"
              >
                <option value="" disabled selected>
                  --Select--
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400 ml-1">
                Phone Number
              </label>
              <input
                type="text"
                name="number"
                placeholder="+1 (555) 000-0000"
                className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all"
              />
            </div>
          </div>
        </div>

        {/* FORM ACTIONS */}
        <div className="p-8 border-t border-slate-700/50 flex justify-end bg-[#1E293B]">
          <button className="bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
