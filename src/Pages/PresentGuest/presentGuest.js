import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { DashboardNew } from "../../Component/Dashboard/index.js";
import { apiBaseUrl } from "../../util.js";


const PresentGuest = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getPresentGuestList();
  }, []);

  const getPresentGuestList = async () => {
    let url = `${apiBaseUrl}getPresentGuestList`;
    try {
      let response = await axios.get(url);
      if (response && response.data) {
        setTableData(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const columns = [
    {
      name: "Invitee No",
      selector: "inviteNo",
      sortable: true,
    },
    {
      name: "Name",
      selector: "guestName",
      sortable: true,
    },    
    // {
    //   name: "Department",
    //   // selector: "guestDepartment",
    //   selector: (row) => `${getDepartment(row.guestDepartment)}`,
    //   sortable: true,
    // },
    {
      name: "Mobile No",
      selector: "guestNumber",
      sortable: true,
    },
    // {
    //   name: "Invite 03-Dec",
    //   selector: (row) => (
    //     <button
    //       type="button"
    //       className="common-category-btn"
    //       onClick={() => sendPreInvitation(row)}
    //     >
    //       {row && row.preInvitation == "Yes" ? "Resend" : "Send"}
    //     </button>
    //   ),
    //   sortable: false,
    // },
    // {
    //   name: "Invite 04-Dec",
    //   selector: (row) => (
    //     <button
    //       type="button"
    //       className="common-category-btn"
    //       onClick={() => sendInvitation(row)}
    //     >
    //       {row && row.navydayInvitation == "Yes" ? "Resend" : "Send"}
    //     </button>
    //   ),
    //   sortable: false,
    // }, 
   
  ];
  const extentionData = {
    columns,
    data: tableData,
  };
  return (
    <>
      <DashboardNew>
        <div className="row">
          <div className="col-md-12">
            <h4 className="fw-bold text-center mb-4">Present Guest List {tableData && tableData.length}</h4>
          </div>
        </div>
        <div className="main-table">
          {tableData.length > 0 ? (
            <DataTableExtensions {...extentionData}>
              <DataTable
                columns={columns}
                data={tableData}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </DataTableExtensions>
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </DashboardNew>
    </>
  );
};

export default PresentGuest;
