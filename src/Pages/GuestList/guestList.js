import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../../CSS/guestList.css"
import "../../CSS/form.css"
import { AiTwotoneDelete, AiFillEdit } from 'react-icons/ai'
import { DashboardNew } from "../../Component/Dashboard/index.js";
import {apiBaseUrl} from "../../util.js"


const GuestList = () => {
  const [tableData, setTableData] = useState([]);
  const [inviteeType, setInviteeType] = useState('')
  const [departments, setDepartments] = useState([])

  const changeInviteeType = (e) =>{
    setInviteeType(e.target.value)
  }

  const getDepartmentList = async () => {
    let url = `${apiBaseUrl}getDepartments`;
    
    try {
      let response = await axios.get(url);

      if (response && response.data) {
        setDepartments(response.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }
};

useEffect(()=>{
  getDepartmentList()
},[])

  const sendReminder = async (reminderData) => {
    let url = `${apiBaseUrl}sendReminder`

    try {
      let response = await axios.post(url, reminderData);
      if (response) {
        getGuestList()
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const sendInvitation = async (inviteData) => {
    let url = `${apiBaseUrl}sendPreInvitation`
    try {
      let response = await axios.post(url, inviteData);
      if (response) {
        getGuestList()
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendToAll = async (e) => {
    e.preventDefault();
    let url = `${apiBaseUrl}sendInvitationToAll`
    let payload = {
      "category":"all",
      inviteeType
    }

    try {
      let response = await axios.post(url, payload);
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
    let url = `${apiBaseUrl}getGuestList`
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
      // selector: "guestDepartment",
      selector: (row) => (`${getDepartment(row.guestDepartment)}`),
      sortable: true,
    },
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
          onClick={() => sendInvitation(row)}
        >{ row && row.invitationStatus == "Invitation Sent" ? 
        (
          "Resend"
          ) : 
          "Send"
        }
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
          onClick={() => sendInvitation(row)}
        >{ row && row.invitationStatus == "Invitation Sent" ? 
        (
          "Resend"
          ) : 
          "Send"
        }
        </button>
      ),
      sortable: false,
    },  
    {
      name: "Confirmation",
      selector: (row) => (        
        <button
          type="button"
          className="common-category-btn"
          onClick={() => sendReminder(row)}
        // >{ row && row.invitationStatus == "Invitation Sent" ? 
        >{ row && row.reminderStatus == "Reminder Sent" ? 
        (
          "Resend"
          ) : 
          "Send"
        }
        </button>
      ),
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => (    
        <>    
        <button
          type="button"
          className="common-category-btn me-2 px-2"
        // >{ row && row.invitationStatus == "Invitation Sent" ? 
        >
          <AiFillEdit className="text-white"/>
        </button>
        <button
        type="button"
        className="common-category-btn me-2 px-2"
      // >{ row && row.invitationStatus == "Invitation Sent" ? 
      >
        <AiTwotoneDelete className="text-white"/>
      </button>
      </>
      ),
      sortable: false,
    },
  ];

  const getDepartment = (id) =>{
    
    let departmentData = departments.find((item)=>item._id == id)
    return departmentData.departmentName
  }

  const extentionData = {
    columns,
    'data':tableData
  };


  return (
    <>
    <DashboardNew>
                  <div className='row'>
                       <div className='col-md-12'>
                          <h4 className='fw-bold text-center mb-4'>Guest List</h4>
                       </div>
                    </div>

                       
     <div>
      <form onSubmit={(e)=>sendToAll(e)}>
        <div className="row mb-5">
          <div className="col-md-4">
            <select id="inviteeType" className="form-select" value={inviteeType} onChange={(e)=>changeInviteeType(e)} required>
              <option value="" disabled>select Invitee Type</option>
              <option value="all">All</option>
              <option value="notSend">Not Send Yet</option>
              <option value="alreadySend">Already Send</option>
            </select>
          </div>
          <div className="col-md-4">
          <button className="common-category-btn" type="submit">Send</button>
          </div>
        </div>
      </form>
      </div>
      <div className="main-table">  
      {tableData.length > 0 ? 
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
        :
        <p>No Data Found</p>}
      </div>
      </DashboardNew>
    </>
  );
};

export default GuestList;
