import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// ====================================
import Landing from "../Pages/Landing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Navbar from "../Components/Templates/Navbar";
import Footer from "../Components/Templates/Footer";
// ====================================

const Layout = () => {
  return (
    <>
      <>
        <Navbar />
      </>
      <>
        <Outlet />
      </>
      <>
        <Footer />
      </>
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
]);

export default function Router() {
  return <RouterProvider router={Linkes} />;
}
