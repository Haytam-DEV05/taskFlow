/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import supabase from "../util/supabase";

export const TasksContext = createContext();

export const useTasks = () => {
  return useContext(TasksContext);
};

export const TasksProvider = ({ children }) => {
  const [idProject, setIdProject] = useState("");
  const [tasks, setTasks] = useState([]);

  const getIdProject = (id) => {
    setIdProject(id);
  };

  const getTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", idProject);
    if (data) {
      setTasks(data);
    }
  };

  const getTask = async (idTask) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", idTask)
      .single();
    return { data, error };
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const createTask = async (title, description, status, id) => {
    const { error } = await supabase.from("tasks").insert({
      title: title,
      description: description,
      status: status.trim() || "todo",
      project_id: id,
    });
    getTasks();
    return { error };
  };

  const updateTask = async (title, description, status, idTask) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
        status: status || "todo",
      })
      .eq("id", idTask);
    return { error };
  };

  useEffect(() => {
    getTasks();
  }, [idProject]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getIdProject,
        deleteTask,
        createTask,
        updateTask,
        getTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
