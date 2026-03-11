import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProject } from "../../Context/ProjectContext";

export default function UpdateProjects() {
  const { updateProject, getProject } = useProject();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await getProject(id);
        if (data) {
          setProjects({
            title: data.name,
            description: data.description,
          });
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, description } = projects;
    if (!title.trim() || !description.trim()) {
      setError("Pleas Enter All Field");
      return;
    }

    try {
      const { error } = updateProject(title, description, id);

      if (error) {
        setError(error.message);
        return;
      }
      navigate("/dashboard/projects");
    } catch (err) {
      console.log(err);
      setError("something wrong");
    }
  };

  if (loading)
    return <div className="text-slate-400 p-8">Loading project...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handleUpdate}
        className="bg-[#1E293B] border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-[#818CF8] rounded-full"></span>
          Update Project
        </h1>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Title
            </label>
            <input
              type="text"
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all"
              value={projects.title}
              onChange={(e) =>
                setProjects({ ...projects, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">
              Description
            </label>
            <textarea
              rows="5"
              className="bg-[#0F172A] border border-slate-700 text-[#F1F5F9] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#818CF8]/50 focus:border-[#818CF8] transition-all resize-none"
              value={projects.description}
              onChange={(e) =>
                setProjects({ ...projects, description: e.target.value })
              }
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-300 text-red-700 border border-red-700 py-1 px-5 text-center rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#818CF8] hover:bg-[#717cf0] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
