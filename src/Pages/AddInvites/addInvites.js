import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../util.js";

import { useNavigate } from "react-router-dom";
import "../../CSS/form.css";
import { DashboardNew } from "../../Component/Dashboard";

const AddInvites = () => {
  let [guestInfo, setGuestInfo] = useState({
    invitationStatus: "Not Sent",
    preInvitationStatus: "Not Sent",
    preNavydayAvailability:"Not Responded",
    availability: "Not Responded",
    reminderStatus: "null",
    attendentDate: [],
    guestName: "",
    guestDesignation: "",
    guestDepartment: "",
    guestCategory: "",
    guestNumber: "",
    guestOfficeNumber: "",
    guestEmail: "",
  });

  let [allCategories, setAllCategories] = useState([]);
  let [allDepartments, setAllDepartments] = useState([]);
  let [formErrors, setFormErrors] = useState({});

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

  const getDepartmentList = async () => {
    let url = `${apiBaseUrl}getDepartments`;

    try {
      let response = await axios.get(url);

      if (response && response.data) {
        setAllDepartments(response.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCategoryList();
    getDepartmentList();
  }, []);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    const phoneRegex = /^[0-9]{10}$/;

    if (!guestInfo.guestName.trim()) {
      errors.guestName = "Full name is required";
    }
    if (!guestInfo.guestDesignation.trim()) {
      errors.guestDesignation = "Designation is required";
    }
    if (!guestInfo.guestDepartment) {
      errors.guestDepartment = "Please select a Department";
    }

    if (!guestInfo.guestCategory) {
      errors.guestCategory = "Guest category is required";
    }

    if (!guestInfo.guestNumber) {
      errors.guestNumber = "Mobile no is required";
    }

    if (guestInfo.guestNumber && !guestInfo.guestNumber.match(phoneRegex)) {
      errors.guestNumber = "Mobile no is invalid";
    }

    if (
      guestInfo.guestOfficeNumber &&
      !guestInfo.guestOfficeNumber.match(phoneRegex)
    ) {
      errors.guestOfficeNumber = "Invalid office phone no format";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onChangeHandler = (e) => {
    let guestInfoCopy = { ...guestInfo };
    guestInfoCopy[e.target.id] = e.target.value;
    setGuestInfo(guestInfoCopy);
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      let url = `${apiBaseUrl}addGuestList`;
      try {
        let response = await axios.post(url, guestInfo);
        if (response) {
          if (response.status === 200) {
            navigate("/dashboard/guestList");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setGuestInfo({
      ...guestInfo,
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

  // const navigate = useNavigate();

  return (
    <>
      <DashboardNew>
        <section className="guest-form">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h4 className="fw-bold text-center mb-4">Add Guest</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form
                  className="common-form row"
                  onSubmit={(e) => loginFormSubmit(e)}
                >
                  <div className="mb-3 col-lg-6">
                    <label htmlFor="inviteNo" className="form-label">
                      Invity No
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inviteNo"
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
                      onChange={(e) => onChangeHandler(e)}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select Department
                      </option>
                      {allDepartments.map((item, index) => {
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
                      onChange={(e) => {
                        onChangeHandler(e);
                        handleInputChange(e);
                      }}
                      onBlur={(e) => handleBlur(e)}
                      defaultValue=""
                    >
                      <option hidden>Select Category</option>
                      {allCategories.map((item, index) => {
                        return (
                          <option value={item._id} key={index}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                    </select>
                    {formErrors.guestCategory && (
                      <div className="invalid-feedback">
                        {formErrors.guestCategory}
                      </div>
                    )}
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
                      className={`form-control ${
                        formErrors.guestOfficeNumber ? "is-invalid" : ""
                      }`}
                      id="guestOfficeNumber"
                      onChange={(e) => onChangeHandler(e)}
                    />
                    {formErrors.guestOfficeNumber && (
                      <div className="invalid-feedback">
                        {formErrors.guestOfficeNumber}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label htmlFor="guestEmail" className="form-label">
                      Guest Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="guestEmail"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </div>
                  
                  <div className="mt-4 col-lg-12">
                    <button type="submit" className="btn common-form-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </DashboardNew>
    </>
  );
};

export default AddInvites;
