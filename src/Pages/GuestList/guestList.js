import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../../CSS/guestList.css"
import { DashboardNew } from "../../Component/Dashboard/index.js";
import {apiBaseUrl} from "../../util.js"


const GuestList = () => {
  const navigate = useNavigate();

  const [guestList, setGuestList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const sendInvitation = async (inviteData) => {
    //console.log("invite data", inviteData);
    //delete inviteData.data;
    //console.log("button clicked", inviteData);
    //let payload = JSON.stringify(inviteData)
    // let url = "http://localhost:4001/api/sendInvitation";
    let url = `${apiBaseUrl}sendInvitation`

    try {
      let response = await axios.post(url, inviteData);
      if (response) {
        //console.log("invitation response", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendToAll = async (list) => {
    console.log("button clicked send to all", list);
    // let url = "http://localhost:4001/api/sendInvitationToAll";
    let url = `${apiBaseUrl}sendInvitationToAll`
    
    try {
      let response = await axios.post(url, list);
      if (response) {
        console.log("invitation response", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getGuestList();
  }, []);

  const getGuestList = async () => {
    // let url = "http://localhost:4001/api/getGuestList";
    let url = `${apiBaseUrl}getGuestList`


    try {
      let response = await axios.get(url);

      // console.log("response guestlist 7657", response);

      if (response && response.data) {
        console.log("response guestlist", response);
        setGuestList(response.data);
        setTableData(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      name: "Guest Name",
      selector: "guestName",
      sortable: true,
    },
    {
      name: "Designation",
      selector: "guestDesignation",
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
    {
      name: "Department",
      selector: "guestDepartment",
      sortable: true,
      // cell: d => <span>{d.genres.join(", ")}</span>
    },
    {
      name: "Personal No",
      selector: "guestNumber",
      sortable: true,
    },
    {
      name: "Office No",
      selector: "guestOfficeNumber",
      sortable: true,
    },
    {
      name: "guestEmail",
      selector: "guestEmail",
      sortable: true,
    },
    {
      name: "Address",
      selector: "guestAddress",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (        
        <button
          type="button"
          className="btn btn-primary invite-btn"
          onClick={() => sendInvitation(row)}
        >{ row && row.invitationStatus == "Invitation Sent" ? 
        (
          "Resend Invitation"
          ) : 
          "Send Invitation"
        }
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <>
    <DashboardNew>
                  <div className='row'>
                       <div className='col-md-12'>
                          <h4 className='fw-bold text-center mb-4'>Guest List</h4>
                       </div>
                    </div>

                       
     <div>
    <button className="btn btn-primary mb-5" onClick={()=>sendToAll("sendToAll")}>Send 2 All</button>
      </div>
      <div className="main">        
        <DataTable
          columns={columns}
          data={tableData}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </div>
      </DashboardNew>
    </>
  );
};

export default GuestList;
