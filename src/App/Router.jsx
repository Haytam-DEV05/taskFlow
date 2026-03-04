import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// ====================================
import Landing from "../Pages/Landing";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
// ====================================

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
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
