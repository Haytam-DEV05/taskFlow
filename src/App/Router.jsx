import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// ====================================
import Landing from "../Pages/Landing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Navbar from "../Components/Templates/Navbar";
import Footer from "../Components/Templates/Footer";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardProjects from "../Pages/Dashboard/DashboardProjects";
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
    children: [{ path: "/dashboard/projects", element: <DashboardProjects /> }],
  },
]);

export default function Router() {
  return <RouterProvider router={Linkes} />;
}
