import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { apiBaseUrl } from "../../util.js";
import { DashboardNew } from "../../Component/Dashboard";

const ConfirmedGuest = () => {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState()

  useEffect(() => {
    getConfirmedGuestList();
    // getConfirmedGuestListCount();
    
  }, []);

//   const getConfirmedGuestListCount = async () => {
//     let url = `${apiBaseUrl}getConfirmationCount`;
//     try {
//       let response = await axios.get(url);
//       console.log(response, "response")
//       if (response && response.data.guestList) {
//         setTotalCount(response.data.guestList);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
  

  const getConfirmedGuestList = async () => {
    let url = `${apiBaseUrl}getConfirmationGuest`;
    try {
      let response = await axios.get(url);
      if (response && response.data.guestList) {
        setTableData(response.data.guestList);
        setTotalCount(response.data.guestList.length)
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
    {
      name: "Invitation",
      selector: "invitationStatus",
      sortable: true,
    },
    {
      name: "Availablity",
      selector: "availability",
      sortable: true,
    },
    // {
    //   name: "Department",
    //   // selector: "guestDepartment",
    //   selector: (row) => (`${getDepartment(row.guestDepartment)}`),
    //   sortable: true,
    // },
    {
      name: "Mobile No",
      selector: "guestNumber",
      sortable: true,
    },
    {
      name: "Invite 03-Dec",
      selector: (row) => (
        <button
          type="button"
          className="common-category-btn"
          // onClick={() => sendPreInvitation(row)}
        >
          {row && row.preInvitation == "Yes" ? "Resend" : "Send"}
        </button>
      ),
      sortable: false,
    },
    {
      name: "Invite 04-Dec",
      selector: (row) => (
        <button
          type="button"
          className="common-category-btn"
        //  onClick={() => sendInvitation(row)}
        >{ row && row.navydayInvitation == "Yes" ?
        (
          "Resend"
          ) :
          "Send"
        }
        </button>
      ),
      sortable: false,
    },
    // {
    //   name: "Confirmation",
    //   selector: (row) => (
    //     <button
    //       type="button"
    //       className="common-category-btn"
    //       onClick={() => sendReminder(row)}
    //     // >{ row && row.invitationStatus == "Invitation Sent" ?
    //     >{ row && row.reminderStatus == "Reminder Sent" ?
    //     (
    //       "Resend"
    //       ) :
    //       "Send"
    //     }
    //     </button>
    //   ),
    //   sortable: false,
    // },
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <>
    //     <button
    //       type="button"
    //       className="common-category-btn me-2 px-2"
    //       onClick={()=>updateGuest(row)}
    //     // >{ row && row.invitationStatus == "Invitation Sent" ?
    //     >
    //       <AiFillEdit className="text-white"/>
    //     </button>
    //   <button type="button" className="common-category-btn me-2 px-2" onClick={()=>deleteGuest(row)} data-bs-toggle="modal" data-bs-target="#exampleModal">
    //   <AiTwotoneDelete className="text-white"/>
    //   </button>
    //   </>
    //   ),
    //   sortable: false,
    // },
  ];

  const extentionData = {
    columns,
    data: tableData,
  };
  console.log("tableData", tableData)


  return (
    <>
    <DashboardNew>
    <div className="row">
          <div className="col-md-12">
            <h4 className="fw-bold text-center mb-4">Confirmed Guest List - {totalCount && totalCount}</h4>
          </div>
        </div>
      <div className="main-table">
        {tableData.length > 0 ? (
        //   <DataTableExtensions {...extentionData}>
            <DataTable
              columns={columns}
              data={tableData}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
        //   </DataTableExtensions>
        ) : (
          <p>No Data Found</p>
        )}
      </div>
      </DashboardNew>
    </>
  );
};

export default ConfirmedGuest;
