import { createContext, useEffect, useState } from "react";
import supabase from "../util/supabase";
import { useContext } from "react";
import { UserContext } from "./UserContext";

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(UserContext);

  const getProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user?.id);

    if (data) {
      setProjects(data);
    }
  };

  const getProject = async (id) => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    return { data };
  };

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const deleteProject = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    setProjects(projects.filter((ele) => ele.id !== id));
  };

  const createProject = async (title, description, id) => {
    const { error } = await supabase.from("projects").insert({
      name: title,
      description: description,
      user_id: id,
    });
    getProjects();
    return { error };
  };

  const updateProject = async (title, description, id) => {
    const { error } = await supabase
      .from("projects")
      .update({
        name: title,
        description: description,
      })
      .eq("id", id);
    if (!error) {
      getProjects();
    }
    return { error };
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        deleteProject,
        createProject,
        updateProject,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
