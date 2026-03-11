import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTasks } from "../../Context/TasksContext";

export default function UpdateTask() {
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    status: "",
  });
  const { updateTask, getTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { idTask, idProject } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error } = await getTask(idTask);
      // console.log("error from updatetask", error);
      
      if (error) {
        setError(error.message);
        return;
      }
      if (data) {
        console.log("data from updatetask", data);
        setFormInputs({
          title: data.title,
          description: data.description,
          status: data.status,
        });
      }
    };
    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, status } = formInputs;
    if (!title.trim() || !description.trim()) {
      setError("Pleas Fill All Field !");
    }

    try {
      setLoading(true);
      const { error } = updateTask(title, description, status, idTask);
      if (error) {
        setError(error.message);
        return;
      }

      navigate(`/dashboard/projects/${idProject}/tasks`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-[#818CF8] rounded-full"></span>
          Update Task
        </h1>

        <div className="space-y-6">
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

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
