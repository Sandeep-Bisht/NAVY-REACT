import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../../CSS/guestList.css";
import "../../CSS/form.css";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { DashboardNew } from "../../Component/Dashboard/index.js";
import { apiBaseUrl } from "../../util.js";
import ExcelExportButton from "../../Component/Dashboard/excelExportButton.js";

const PrenavydayList = () => {
    const [tableData, setTableData] = useState([]);
    const [inviteeType, setInviteeType] = useState("");
    const [departments, setDepartments] = useState([]);
    const [currentMode, setCurrentMode] = useState("List");
    const [allCategories, setAllCategories] = useState([]);
    const [userId, setUserId] = useState("");
    let [responseMsg, setResponseMsg] = useState({});
    let [haveResponse, setHaveResponse] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [guestPayload, setGuestPayload] = useState({
      guestName: "",
      guestDesignation: "",
      guestDepartment: "",
      guestCategory: "",
      guestNumber: "",
      guestOfficeNumber: "",
      guestEmail: "",
    });
  
    const validateForm = () => {
      const errors = {};
  
      const phoneRegex = /^[0-9]{10}$/;
  
      if (!guestPayload.guestName.trim()) {
        errors.guestName = "Full name is required";
      }
  
      if (!guestPayload.guestDesignation.trim()) {
        errors.guestDesignation = "Designation is required";
      }
  
      if (!guestPayload.guestCategory.trim()) {
        errors.guestCategory = "Department is required";
      }
      if (!guestPayload.guestNumber) {
        errors.guestNumber = "Mobile no is required";
      }
  
      if (
        guestPayload.guestNumber &&
        !guestPayload.guestNumber.match(phoneRegex)
      ) {
        errors.guestNumber = "Mobile no is invalid";
      }
  
      setFormErrors(errors);
  
      return Object.keys(errors).length === 0;
    };
  
    const getCategoryList = async () => {
      let url = `${apiBaseUrl}getcategories`;
  
      try {
        let response = await axios.get(url);
  
        if (response && response.data) {
          setAllCategories(response.data.response);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const changeInviteeType = (e) => {
      setInviteeType(e.target.value);
    };
  
    const changeMode = (mode) => {
      setCurrentMode(mode);
    };
  
    const onChangeHandler = (e) => {
      let guestPayloadCopy = { ...guestPayload };
      guestPayloadCopy[e.target.id] = e.target.value;
      setGuestPayload(guestPayloadCopy);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const isValid = validateForm();
      if (isValid) {
        let url = `${apiBaseUrl}updateGuest`;
        try {
          let response = await axios.post(url, guestPayload);
          if (response) {
            if (response.data.message) {
              setCurrentMode("List");
              getGuestList();
            }
            setHaveResponse(true);
            setResponseMsg(response.data);
            setTimeout(() => {
              setHaveResponse(false);
              setResponseMsg({});
            }, 6000);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };

  
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setGuestPayload({
        ...guestPayload,
        [id]: value,
      });
      setFormErrors({
        ...formErrors,
        [id]: "",
      });
    };
    const handleBlur = (event) => {
      const { id, value } = event.target;
      const errors = { ...formErrors };
  
      if (!value) {
        errors[id] = `This is required`;
      }
      setFormErrors(errors);
    };
  
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
  
    useEffect(() => {
      getDepartmentList();
      getCategoryList();
    }, []);
  
    const sendReminder = async (reminderData) => {
      let url = `${apiBaseUrl}sendReminder`;
  
      try {
        let response = await axios.post(url, reminderData);
        if (response) {
          getGuestList();
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const sendInvitation = async (inviteData) => {
      let url = `${apiBaseUrl}sendInvitation`;
      try {
        let response = await axios.post(url, inviteData);
        if (response) {
          getGuestList();
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const sendPreInvitation = async (inviteData) => {
      let url = `${apiBaseUrl}sendPreInvitation`;
      try {
        let response = await axios.post(url, inviteData);
        if (response) {
          getGuestList();
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const sendToAll = async (e) => {
      e.preventDefault();
      let url = `${apiBaseUrl}sendInvitationToAll`;
      let payload = {
        category: "all",
        inviteeType,
      };
  
      try {
        let response = await axios.post(url, payload);
        if (response) {
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    useEffect(() => {
      getGuestList();
    }, []);
  
    const getGuestList = async () => {
      let url = `${apiBaseUrl}getGuestList`;
      try {
        let response = await axios.get(url);
        if (response && response.data) {
            let updatedData = response.data.filter((item) => (item.invitedForPreNavyDay == true))
          setTableData(updatedData);
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
        selector: "preInvitationStatus",
        sortable: true,
      },
      {
        name: "Confirmation",
        selector: "preNavydayAvailability",
        sortable: true,
      },
      {
        name: "Department",
        // selector: "guestDepartment",
        selector: (row) => `${getDepartment(row.guestDepartment)}`,
        sortable: true,
      },
      {
        name: "Mobile No",
        selector: "guestNumber",
        sortable: true,
      },
      {
        name: "Invitation",
        selector: (row) => (
          <button
            type="button"
            className="common-category-btn"
            onClick={() => sendPreInvitation(row)}
          >
            {row && row.preInvitationStatus == "Invitation Sent" ? "Resend" : "Send"}
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
          >
            {row && row.preNavidayReminderStatus == "Reminder Sent" ? "Resend" : "Send"}
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
              onClick={() => updateGuest(row)}
              // >{ row && row.invitationStatus == "Invitation Sent" ?
            >
              <AiFillEdit className="text-white" />
            </button>
            <button
              type="button"
              className="common-category-btn me-2 px-2"
              onClick={() => deleteGuest(row)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <AiTwotoneDelete className="text-white" />
            </button>
          </>
        ),
        sortable: false,
      },
    ];
  
    const deleteGuest = (data) => {
      setUserId(data._id);
    };
  
    const updateGuest = (data) => {
      setGuestPayload(data);
      changeMode("update");
    };
  
    const confirmDeleteGuest = async () => {
      let url = `${apiBaseUrl}deleteGuest`;
      try {
        let response = await axios.post(url, { id: userId });
        if (response) {
          if (response.data.message) {
            setCurrentMode("List");
            getGuestList();
          }
          setHaveResponse(true);
          setResponseMsg(response.data);
          setTimeout(() => {
            setHaveResponse(false);
            setResponseMsg({});
          }, 6000);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const getDepartment = (id) => {
      let departmentName = "";
      if (departments.length > 0) {
        let departmentData = departments.find((item) => item._id == id);
        departmentName = departmentData && departmentData.departmentName;
      }
      return departmentName;
    };
  
    const extentionData = {
      columns,
      data: tableData,
    };
  
  
    return (
      <>
        <DashboardNew>
          <div className="row">
            <div className="col-md-12">
              <h4 className="fw-bold text-center mb-4">Guest List</h4>
            </div>
          </div>
          {haveResponse && (
            <>
              {responseMsg.errorMessage ? (
                <p className="text-danger p-2 alert-danger">
                  {responseMsg.errorMessage}
                </p>
              ) : (
                <p className="text-success  p-2 alert-success">
                  {responseMsg.message}
                </p>
              )}
            </>
          )}
  
          {currentMode == "List" && (
            <>
              <form onSubmit={(e) => sendToAll(e)}>
                <div className="row mb-5">
                  <div className="col-md-4">
                    <select
                      id="inviteeType"
                      className="form-select"
                      value={inviteeType}
                      onChange={(e) => changeInviteeType(e)}
                      required
                    >
                      <option value="" disabled>
                        select Invitee Type
                      </option>
                      <option value="all">All</option>
                      <option value="notSend">Not Send Yet</option>
                      <option value="alreadySend">Already Send</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <button className="common-category-btn" type="submit">
                      Send
                    </button>
                  </div>
                  <div className="col-md-4">
              <ExcelExportButton data={tableData} />
              </div>
                  
                </div>
              </form>
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
            </>
          )}
          {currentMode == "update" && (
            <>
              <div className="row">
                <div className="col-md-12">
                  <form
                    className="common-form row"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="inviteNo" className="form-label">
                        Invity No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inviteNo"
                        value={guestPayload.inviteNo}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
  
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.guestName ? "is-invalid" : ""
                        }`}
                        id="guestName"
                        value={guestPayload.guestName}
                        aria-describedby="emailHelp"
                        onChange={(e) => {
                          onChangeHandler(e);
                          handleInputChange(e);
                        }}
                        onBlur={(e) => handleBlur(e)}
                      />
                      {formErrors.guestName && (
                        <div className="invalid-feedback">
                          {formErrors.guestName}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestDesignation" className="form-label">
                        Designation
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.guestDesignation ? "is-invalid" : ""
                        }`}
                        id="guestDesignation"
                        value={guestPayload.guestDesignation}
                        onChange={(e) => {
                          onChangeHandler(e);
                          handleInputChange(e);
                        }}
                        onBlur={(e) => handleBlur(e)}
                      />
                      {formErrors.guestDesignation && (
                        <div className="invalid-feedback">
                          {formErrors.guestDesignation}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestDepartment" className="form-label">
                        Department
                      </label>
                      <select
                        className="form-select"
                        id="guestDepartment"
                        value={guestPayload.guestDepartment}
                        onChange={(e) => onChangeHandler(e)}
                      >
                        <option disabled value="">
                          Select Department
                        </option>
                        {departments.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.departmentName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
  
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestCategory" className="form-label">
                        Guest Category
                      </label>
                      <select
                        className={`form-control ${
                          formErrors.guestCategory ? "is-invalid" : ""
                        }`}
                        id="guestCategory"
                        value={guestPayload.guestCategory}
                        onChange={(e) => {
                          onChangeHandler(e);
                          handleInputChange(e);
                        }}
                        onBlur={(e) => handleBlur(e)}
                      >
                        <option disabled value="">
                          Select Category
                        </option>
                        {allCategories.map((item, index) => {
                          return (
                            <option value={item._id} key={index}>
                              {item.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestNumber" className="form-label">
                        Mobile No <span>{`( used for sending SMS)`}</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.guestNumber ? "is-invalid" : ""
                        }`}
                        id="guestNumber"
                        value={guestPayload.guestNumber}
                        onChange={(e) => {
                          onChangeHandler(e);
                          handleInputChange(e);
                        }}
                        onBlur={(e) => handleBlur(e)}
                      />
                      {formErrors.guestNumber && (
                        <div className="invalid-feedback">
                          {formErrors.guestNumber}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestOfficeNumber" className="form-label">
                        Official Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guestOfficeNumber"
                        value={guestPayload.guestOfficeNumber}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
  
                    <div className="mb-3 col-lg-6">
                      <label htmlFor="guestEmail" className="form-label">
                        Guest Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="guestEmail"
                        value={guestPayload.guestEmail}
                        onChange={(e) => onChangeHandler(e)}
                      />
                      {formErrors.guestEmail && (
                        <div className="invalid-feedback">
                          {formErrors.guestEmail}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6">
                    <input
                        type="checkbox"
                        id="invitedForPreNavyDay"
                        checked = {guestPayload.invitedForPreNavyDay ? true : false}
                        onChange={() => {setGuestPayload({...guestPayload,invitedForPreNavyDay:guestPayload.invitedForPreNavyDay ? false : true})}}
                      />
                      <label htmlFor="invitedForPreNavyDay" className="form-label">
                        Invited for Pre Navy Day (03 Dec)
                      </label>
                    </div>
  
                    <div className="mb-3 col-lg-6">
                    <input
                        type="checkbox"
                        id="invitedForNavyDay"
                        checked = {guestPayload.invitedForNavyDay ? true : false}
                        onChange={() => {setGuestPayload({...guestPayload,invitedForNavyDay:guestPayload.invitedForNavyDay ? false : true})}}
                      />
                      <label htmlFor="invitedForNavyDay" className="form-label">
                        Invited for Navy Day (04 Dec)
                      </label>
                    </div>
  
                    <div className="mt-4 col-lg-12">
                      <button type="submit" className="btn common-form-btn me-3">
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn common-form-btn "
                        onClick={() => setCurrentMode("List")}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
  
          {/* model */}
  
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Do you really want to remove this guest?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => confirmDeleteGuest()}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end model */}
        </DashboardNew>
      </>
    );
  };
  
  export default PrenavydayList;