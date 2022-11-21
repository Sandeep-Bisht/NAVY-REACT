import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import axios from 'axios';

import { useNavigate, useLocation } from "react-router-dom";
import "../../CSS/form.css";
import Navbar from '../NavBar/navbar.js';

const AddInvites = () => {
  let [guestInfo, setGuestInfo] = useState({})

  const onChangeHandler = (e) => {
    let guestInfoCopy = { ...guestInfo };
    guestInfoCopy[e.target.id] = e.target.value;
    setGuestInfo(guestInfoCopy);
  }
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    console.log(guestInfo, "aa gaya jjj");
    let url = "http://localhost:4001/api/addGuestList";
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
  }
  const navigate = useNavigate();
  








  return (
    <>
      <Navbar />
      <section className="dash-body">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3 left-part col-lg-2 px-0">
              <aside>
                <ul className="ps-0 list-unstyled ">
                  <li>
                    <button
                      className="common-blue btn"
                      onClick={() => navigate("/dashboard")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-house"></i>
                      </span>
                      Dashboard
                    </button>
                  </li>
                </ul>

                <ul className="ps-0 list-unstyled">
                  <li>
                    <button
                      className="common-blue btn"
                      onClick={() => navigate("/dashboard/addInvites")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      New Invitation
                    </button>
                  </li>
                  <li>
                    <button
                      className="common-blue btn"
                      onClick={() =>
                        navigate("/dashboard/guestList")
                      }
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      Guest List
                    </button>
                  </li>
                </ul>


                {/* <ul className="ps-0 list-unstyled mt-4">
                      
                        <li>
                          <button
                            className="common-blue btn"
                            onClick={() =>
                              navigate("/dashboard/transaction_list")
                            }
                          >
                            <span className="me-2">
                              <i className="fa-brands fa-elementor"></i>
                            </span>{" "}
                            Transaction List
                          </button>
                        </li>
                        <li>
                          <button
                            className="common-blue btn"
                            onClick={() => navigate("/dashboard/exhibitorlist")}
                          >
                            <span className="me-2">
                              <i className="fa-brands fa-elementor"></i>
                            </span>{" "}
                            Exhibitor List
                          </button>
                        </li>
                        <li>
                          <button
                            className="common-blue btn"
                            onClick={() => navigate("/dashboard/allSponsor")}
                          >
                            <span className="me-2">
                              <i className="fa-brands fa-elementor"></i>
                            </span>{" "}
                            Sponsors
                          </button>
                        </li>                   
                       </ul> */}
              </aside>
            </div>
            <div className="col-md-9 col-lg-10">
              <div className="sidebar-right-wrapper">

                <section className='guest-form p-5'>
                  <div className='container'>
                    <div className='row'>
                       <div className='col-md-12'>
                          <h4 className='fw-bold text-center mb-4'>Add Guest</h4>
                       </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-10 mx-auto'>
                        <form
                          className='common-form row'
                          onSubmit={(e) => loginFormSubmit(e)}
                        >
                          <div className="mb-3 col-lg-6">
                            <label
                              htmlFor="guestName"
                              className="form-label"
                            >
                              Guest Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="guestName"
                              aria-describedby="emailHelp"
                              onChange={(e) => onChangeHandler(e)}
                            />

                          </div>
                          <div className="mb-3 col-lg-6">
                            <label
                              htmlFor="guestDesignation"
                              className="form-label"
                            >
                              Guest Designation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="guestDesignation"
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </div>
                          <div className="mb-3 col-lg-6">
                            <label
                              htmlFor="guesteNumber"
                              className="form-label"
                            >
                              Guest PhoneNumber
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="guestNumber"
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </div>
                          <div className="mb-3 col-lg-6">
                            <label
                              htmlFor="guestOfficeNumber"
                              className="form-label"
                            >
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
                            <label
                              htmlFor="guestEmail"
                              className="form-label"
                            >
                              Guest Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="guestEmail"
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </div>
                          <div className="mb-3 col-lg-6">
                            <label
                              htmlFor="guestDepartment"
                              className="form-label"
                            >
                              Department
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="guestDepartment"
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </div>
                          <div className="mb-3 col-lg-12">
                            <label for="guestAddress" class="form-label">Address</label>
                            <textarea class="form-control"
                              id="guestAddress"
                              rows="3"
                              onChange={(e) => onChangeHandler(e)}

                            >

                            </textarea>
                          </div>
                          <div className='mt-4 col-lg-12'>
                            <button type="submit" className="btn common-form-btn">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className='guest-form p-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <form
                className='common-form row'
                onSubmit={(e) => loginFormSubmit(e)}
              >
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestName"
                    className="form-label"
                  >
                    Guest Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestName"
                    aria-describedby="emailHelp"
                    onChange={(e) => onChangeHandler(e)}
                  />

                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestDesignation"
                    className="form-label"
                  >
                    Guest Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestDesignation"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestPhoneNumber"
                    className="form-label"
                  >
                    Guest PhoneNumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guestPhoneNumber"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="officialPhoneNumber"
                    className="form-label"
                  >
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="officialPhoneNumber"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>


                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="guestEmail"
                    className="form-label"
                  >
                    Guest Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="guestEmail"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <label
                    htmlFor="department"
                    className="form-label"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label for="address" class="form-label">Address</label>
                  <textarea class="form-control"
                    id="address"
                    rows="3"
                    onChange={(e) => onChangeHandler(e)}

                  >

                  </textarea>
                </div>
                <div className='mt-4 col-lg-12'>
                  <button type="submit" className="btn common-form-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>


  )
}

export default AddInvites