import React from "react";
import { useRoutes } from "react-router-dom";
import AddInvites from "../Pages/AddInvites/addInvites.js";
import Login from "../Pages/Authantication/login.js";
import Dashboard from "../Pages/Dashboard/dashboard.js";
import GuestList from "../Pages/GuestList/guestList.js";
import CreateCategory from "../Pages/Category/create.js";
//  import Table from "../Pages/Table/table.js";


const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: < Dashboard /> },
    { path : "/dashboard/addInvites", element : <AddInvites /> },
    { path : "/dashboard/guestList", element : <GuestList /> },
    { path : "/dashboard/guestList/:categoryId", element : <GuestList /> },
    { path : "/dashboard/createCategory", element : <CreateCategory /> },
    
    // {path:"/table",element : <Table/>}
  ]);
  return routes;
};

export default AppRoute;
