import React from "react";
import { useRoutes } from "react-router-dom";
import AddInvites from "../Pages/AddInvites/addInvites.js";
import Login from "../Pages/Authantication/login.js";
import Confirmation from "../Pages/Confirmation/confirmation.js";
import Dashboard from "../Pages/Dashboard/dashboard.js";
import GuestList from "../Pages/GuestList/guestList.js";
import CreateCategory from "../Pages/Category/create.js";
import Navyday from "../Pages/Navyday/navyday.js";
import PreInvitation from "../Pages/Preinvitation/preinvitation.js";
import CategoryWiseGuestList from "../Pages/CategoryWiseGuestList/index.js";
import Departmenmt from "../Pages/Department/index.js";
import MarkAttendance from "../Pages/Attendance/markAttendance.js";
import ConfirmedGuest from "../Pages/ConfirmedGuest/confirmedGuest.js";
import Reports from "../Pages/Reports/index.js";
import PresentGuest from "../Pages/PresentGuest/presentGuest.js";
import NavydayList from "../Pages/InvitationLists/navyday.js";
import PrenavydayList from "../Pages/InvitationLists/prenavyday.js";
//  import Table from "../Pages/Table/table.js";

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/*", element:<Login />},
    { path: "/confirmation/:id", element: <Confirmation /> },
    // { path: "/markAttendance/:id", element: <MarkAttendance /> },
    { path: "/markAttendance", element: <MarkAttendance /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path : "/dashboard/confirmed-guests/:date" , element : <ConfirmedGuest /> },

    { path : "/dashboard/reports-confirmed/:date" , element : <Reports /> },


    { path: "/dashboard/addInvites", element: <AddInvites /> },
    { path: "/dashboard/presentGuest/:date", element: < PresentGuest /> },
    { path: "/dashboard/guestList", element: <GuestList /> },
    {
      path: "/dashboard/guestList/:categoryId",
      element: <CategoryWiseGuestList />,
    },
    { path: "/dashboard/createCategory", element: <CreateCategory /> },
    { path: "/dashboard/Department", element: <Departmenmt /> },
    { path: "/dashboard/navyDayInvitationList", element: <NavydayList /> },
    { path: "/dashboard/prenavyDayInvitationList", element: <PrenavydayList /> },
    {
      path: "/navyday/:id",
      element: <Navyday />,
    },
    {
      path: "/prenavyday/:id",
      element: <PreInvitation />,
    },

    // {path:"/table",element : <Table/>}
  ]);
  return routes;
};

export default AppRoute;
