import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../../util/supabase";

export default function CreateTask() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, status } = formInputs;
    if (!title.trim() || !description.trim()) {
      setError("Pleas Fill All Field !");
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.from("tasks").insert({
        title: title,
        description: description,
        status: status.trim() || "todo",
        project_id: id,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setFormInputs({
        title: "",
        description: "",
        status: "",
      });
      navigate(`/dashboard/projects/${id}/tasks`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-[#818CF8] rounded-full"></span>
          Create New Task
        </h1>

        <div className="space-y-6">
          {/* TITLE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Fix navigation bug"
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all"
              onChange={(e) =>
                setFormInputs({ ...formInputs, title: e.target.value })
              }
              value={formInputs.title}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Provide details about this task..."
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all resize-none"
              onChange={(e) =>
                setFormInputs({ ...formInputs, description: e.target.value })
              }
              value={formInputs.description}
            />
          </div>

          {/* STATUS DROPDOWN */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Status
            </label>
            <select
              onChange={(e) =>
                setFormInputs({ ...formInputs, status: e.target.value })
              }
              value={formInputs.status}
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all cursor-pointer"
            >
              <option value="" disabled selected>
                -- Select Status --
              </option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          {error && (
            <div className="bg-red-300 text-red-700 border border-red-700 py-2 px-6 text-center rounded-md">
              {error}
            </div>
          )}
          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4"
          >
            {loading ? "Creating ..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
