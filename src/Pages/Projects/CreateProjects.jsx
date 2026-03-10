import { useEffect, useState } from "react";
import supabase from "../../util/supabase";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function CreateProjects() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Project Created:", formInputs);
    const { title, description } = formInputs;
    if (!title.trim() || !description.trim()) {
      setError("Pleas Fill All Field");
      return;
    }
    const { error } = await supabase.from("projects").insert({
      name: title,
      description: description,
      user_id: user.id,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard/projects");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-[#818CF8] rounded-full"></span>
          Create New Project
        </h1>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Website Redesign"
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all placeholder:text-slate-600"
              onChange={(e) =>
                setFormInputs({ ...formInputs, title: e.target.value })
              }
              value={formInputs.title}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe the goals and scope..."
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all placeholder:text-slate-600 resize-none"
              onChange={(e) =>
                setFormInputs({ ...formInputs, description: e.target.value })
              }
              value={formInputs.description}
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-300 text-red-600 py-2 px-6 text-center border border-red-700">
              {error}
            </div>
          )}

          <button className="w-full bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4">
            Create Project
          </button>
        </div>
      </form>

      <p className="text-center text-slate-500 text-sm mt-6">
        Press <kbd className="bg-slate-800 px-2 py-1 rounded">Cmd + Enter</kbd>{" "}
        to save quickly.
      </p>
    </div>
  );
}
