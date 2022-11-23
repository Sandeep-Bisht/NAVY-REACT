import React from "react";
import { useRoutes } from "react-router-dom";
import AddInvites from "../Pages/AddInvites/addInvites.js";
import Login from "../Pages/Authantication/login.js";
import Confirmation from "../Pages/Confirmation.js/confirmation.js";
import Dashboard from "../Pages/Dashboard/dashboard.js";
import GuestList from "../Pages/GuestList/guestList.js";
import Sidebar  from "../Pages/Sidebar/sidebar.js";
//  import Table from "../Pages/Table/table.js";


const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path : "/confirmation/:id", element: <Confirmation /> },
    { path: "/dashboard", element: < Dashboard /> },
    { path : "/dashboard/addInvites", element : <AddInvites /> },
    { path : "/dashboard/guestList", element : <GuestList /> },
    // {path:"/table",element : <Table/>}
  ]);
  return routes;
};

export default AppRoute;
