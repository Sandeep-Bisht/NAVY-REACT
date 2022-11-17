import React from "react";
import { useRoutes } from "react-router-dom";
import AddInvites from "../Pages/AddInvites/addInvites.js";
import Login from "../Pages/Authantication/login.js";
import Dashboard from "../Pages/Dashboard/dashboard.js";
import Sidebar  from "../Pages/Sidebar/sidebar.js";

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: < Dashboard /> },
    { path : "/dashboard/addInvites", element : <AddInvites/> }
  ]);
  return routes;
};

export default AppRoute;
