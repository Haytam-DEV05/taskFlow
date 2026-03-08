import { useEffect, useState } from "react";
import supabase from "../../util/supabase";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router";

export default function DashboardProjects() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
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
    getProfile();
  }, [user]);
  const handleCreateProject = (e) => {
    e.preventDefault();
    navigate("/dashboard/createProject");
  };
  return (
    <div>
      <h1 className="text-[60px] font-bold">
        Welcome Back <span className="text-blue-400">{profile?.fullName}</span>
      </h1>
      <button
        onClick={handleCreateProject}
        className="bg-blue-400 py-1 px-5 cursor-pointer rounded hover:-translate-y-2 duration-200 transition-all mt-5"
      >
        Create Project +
      </button>
    </div>
  );
}
