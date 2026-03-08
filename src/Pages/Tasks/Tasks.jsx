import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../../util/supabase";

export default function Tasks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error.message);
      }
      if (data) {
        console.log("data", data);
        setProject(data);
      }
    };
    const getTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", id);

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setTasks(data);
      }
    };
    getProject();
    getTasks();
  }, [id]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    navigate(`/dashboard/projects/${id}/createTask`);
  };

  

  return (
    <div className="p-8">
      {/* PROJECT HEADER */}
      <header className="mb-10 border-b border-slate-700 pb-8">
        <h2 className="text-4xl font-extrabold text-[#F1F5F9]">
          {project.name}
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl">{project.description}</p>
      </header>

      {/* SECTION TITLE & ACTION */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#F1F5F9]">Tasks</h3>
        <button
          onClick={handleCreateTask}
          className="bg-[#818CF8] hover:bg-[#717cf0] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-[#818CF8]/20"
        >
          + Create Task
        </button>
      </div>

      {/* TASKS LIST */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#1E293B] border border-slate-700/50 p-5 rounded-2xl flex items-center justify-between hover:border-[#818CF8]/30 transition-all"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#F1F5F9]">
                {task.title}
              </h2>
              <p className="text-sm text-slate-400">{task.description}</p>
            </div>

            {/* STATUS BADGE LOGIC */}
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                task.status === "done"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : task.status === "inProgress"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-slate-500/10 text-slate-400 border-slate-500/20"
              }`}
            >
              {task.status}
            </span>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button className="text-sm text-slate-400 hover:text-[#818CF8] px-3 py-2 transition-colors">
                Update
              </button>
              <button className="text-sm text-slate-400 hover:text-red-400 px-3 py-2 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
