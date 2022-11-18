import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import axios from "axios";

const GuestList = () => {
  const [guestList, setGuestList] = useState();
  

   const columns = [
    {
      name: "Guest Name",
      selector: "guestName",
      sortable: true
    },
    {
      name: "Designation",
      selector: "guestDesignation",
      sortable: true
    },
    {
      name: "Department",
      selector: "guestDepartment",
      sortable: true,
      // cell: d => <span>{d.genres.join(", ")}</span>
    },
    {
      name: "Personal No",
      selector: "guestNumber",
      sortable: true
    },
    {
        name: "Office No",
        selector: "guestOfficeNumber",
        sortable: true
      },
      {
        name: "guestEmail",
        selector: "guestEmail",
        sortable: true
      },
      {
        name: "Address",
        selector: "guestAddress",
        sortable: true
      }
  ];


  useEffect(() => {
    getGuestList();
  }, []);

  let getGuestList = async () => {
    let url = "http://localhost:4001/api/getGuestList";
    try {
      let response = await axios.get(url);
      if (response && response.data) {
        console.log("response guestlist", response.data);
        setGuestList(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return(
    <>
    
      <div className="main">
       <DataTable
          columns={columns}
          data={guestList}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      
    </div>
    </>
  );
};

export default GuestList;
