import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { UserProvider } from "./Context/UserContext";
import { ProjectProvider } from "./Context/ProjectContext";
import { TasksProvider } from "./Context/TasksContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ProjectProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ProjectProvider>
    </UserProvider>
  </StrictMode>,
);
