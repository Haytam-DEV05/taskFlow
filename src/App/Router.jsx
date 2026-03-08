import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// ====================================
import Landing from "../Pages/Landing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Navbar from "../Components/Templates/Navbar";
import Footer from "../Components/Templates/Footer";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardProjects from "../Pages/Dashboard/DashboardProjects";
import CreateProjects from "../Pages/Projects/CreateProjects";
import UpdateProjects from "../Pages/Projects/UpdateProjects";
import Tasks from "../Pages/Tasks/Tasks";
import CreateTask from "../Pages/Tasks/CreateTask";
// ====================================

const Layout = () => {
  return (
    <>
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
};

const Linkes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/projects", element: <DashboardProjects /> },
      { path: "/dashboard/createProject", element: <CreateProjects /> },
      { path: "/dashboard/updateProjects/:id", element: <UpdateProjects /> },
      { path: "/dashboard/projects/:id/tasks", element: <Tasks /> },
      { path: "/dashboard/projects/:id/createTask", element: <CreateTask /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={Linkes} />;
}
