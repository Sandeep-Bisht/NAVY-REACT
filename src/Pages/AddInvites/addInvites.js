import React, { useEffect, useState } from "react";
import axios from "axios";
import {apiBaseUrl} from "../../util.js"

import { useNavigate } from "react-router-dom";
import "../../CSS/form.css";
import { DashboardNew } from "../../Component/Dashboard";

const AddInvites = () => {
  let [guestInfo, setGuestInfo] = useState({
    invitationStatus: "null",
    availability: "null",
    reminderStatus : "null",
    attendentDate : []    
  });

  let [allCategories, setAllCategories] = useState([]);
  let [allDepartments, setAllDepartments] = useState([]);

  const getCategoryList = async () => {
    let url = `${apiBaseUrl}getcategories`

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
    let url = `${apiBaseUrl}getDepartments`

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

  const onChangeHandler = (e) => {
    let guestInfoCopy = { ...guestInfo };
    guestInfoCopy[e.target.id] = e.target.value;
    setGuestInfo(guestInfoCopy);
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();

    let url = `${apiBaseUrl}addGuestList`
    try {
      let response = await axios.post(url, guestInfo);
      if (response) {
        console.log("response guestlist", response);
        if(response.status == 200){
          navigate("/dashboard/guestList")
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const navigate = useNavigate();

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
                    type="number"
                    className="form-control"
                    id="inviteNo"
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </div>

                  <div className="mb-3 col-lg-6">
                    <label htmlFor="guestName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guestName"
                      aria-describedby="emailHelp"
                      onChange={(e) => onChangeHandler(e)}
                      required
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label htmlFor="guestDesignation" className="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guestDesignation"
                      onChange={(e) => onChangeHandler(e)}
                      
                    />
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
                      required
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
                      className="form-select"
                      id="guestCategory"
                      onChange={(e) => onChangeHandler(e)}
                      defaultValue=""
                      required
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
                    <label htmlFor="guesteNumber" className="form-label">
                      Mobile No <span>{`( used for sending SMS)`}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guestNumber"
                      onChange={(e) => onChangeHandler(e)}
                      required
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label htmlFor="guestOfficeNumber" className="form-label">
                      Official Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guestOfficeNumber"
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
