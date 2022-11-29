import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../util.js";
import logo from "../../Images/nhoLogo.png";
import "../../CSS/login.css";
import "../../CSS/common.css";
import "../../CSS/markattendance.css"



const MarkAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState();


  useEffect(() => {
    if (location && location.pathname) {
      verifyGuest(getPathName(location.pathname));
    }
  }, []);

  const getPathName = (pathname) => {
    let newArray = pathname.split("/");
    let stringToken = newArray.pop();
    return stringToken;
  };

  const verifyGuest = async (stringToken) => {
    let url = `${apiBaseUrl}verifyGuestByToken`;

    try {
      let response = await axios.get(url, {
        params: {
          stringToken: stringToken,
        },
      });
      if (response && response.data) {
        setUserData(response.data.guest);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onChangeHandler = (e) => {
    let userDataCopy = { ...userData };
    userDataCopy[e.target.id] = e.target.value;
    setUserData(userDataCopy);
  };

  const markAttendanceSubmit = (e) => {
    e.preventDefault();
    handleAttendance(userData);
  };

  const handleAttendance = async (userData) => {
    let today = new Date().toLocaleDateString();
    //let today = "11/30/2022"
    userData.attendentDate = today;
    
    let url = `${apiBaseUrl}markAttendance`;
    delete userData.availability;
    delete userData.guestEmail;
    delete userData.stringToken;
    delete userData.guestOfficeNumber;
    delete userData.invitationStatus;
    delete userData.reminderStatus;
    userData.guestId = userData._id
    // delete userData._id;
    
   
    try {
      let response = await axios.post(url, userData);
      if (response) {
        if (response.status == 200) {
          let res = response.data;
          setConfirmationMsg(res.message);
        }
      }
    } catch (error) {
      console.log("error", error);
      setErrorMsg(error);
    }
  };

  return (
    <>
      <section className="login-wrapper mark-attendance">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="login-card vh-100">
                <div className="card pb-0 pt-1
                ">
                  <div>
                    <div className="card-header text-center">
                      <img src={logo} alt="logo" className="img-fluid" />
                      <p>
                        <b>NHO</b> Mark Attendance
                      </p>
                       { userData && userData.preInvitation == "Yes" && userData.navydayInvitation == "Yes" ? 
                       "Invitation valid for 3 & 4 Dec"  : !userData.navydayInvitation &&  userData.preInvitation == "Yes" ? "Invitation valid for 3 Dec" 
                       :  !userData.preInvitation && userData.navydayInvitation == "Yes" ? 
                       "Invitation valid for  4 Dec" : " "
                       }
                    </div> 
                    <div className="card-body pt-1">
                      <form onSubmit={(e) => markAttendanceSubmit(e)}>
                        <div className="mb-2">
                          <label htmlFor="inviteNo" className="form-label">
                            Invitee No
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inviteNo"
                            value={userData && userData.inviteNo}
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="guestName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="guestName"
                            value={userData && userData.guestName}
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor="guestDesignation"
                            className="form-label"
                          >
                            Designation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="guestDesignation"
                            value={userData && userData.guestDesignation}
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="guestNumber" className="form-label">
                            Mobile
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="guestNumber"
                            value={userData && userData.guestNumber}
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="adminPassword" className="form-label">
                            Admin Password
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="adminPassword"
                            onChange={(e) => onChangeHandler(e)}
                          />
                        </div>

                        <button type="submit" className="btn">
                          Mark Attendance
                        </button> 

                        {confirmationMsg && (
                          <div>
                            <p className="text-success fs-6 text-center mb-0 mt-3">
                              {confirmationMsg}
                            </p>
                          </div>
                        )}

                        {errorMsg && (
                          <div>
                            <p className="text-danger fs-6 text-center mb-0 mt-3">
                              {errorMsg}
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarkAttendance;
