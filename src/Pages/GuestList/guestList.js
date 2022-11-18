import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {columns, data} from "../Table/table.js"
import axios from "axios";

const GuestList = () => {
  const [guestList, setGuestList] = useState();
  const tableData = {
    columns,
    data
  }

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
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
    </>
  );
};

export default GuestList;
