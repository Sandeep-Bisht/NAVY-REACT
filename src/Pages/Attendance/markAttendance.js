import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowRight, BsCheck2, BsExclamationLg } from 'react-icons/bs'
import { apiBaseUrl } from "../../util.js";
import "../../CSS/markattendance.css"
import Logoright from "../../Images/navydaylogo2.png";
import Logoleft from "../../Images/navydaylogo1.png";



const MarkAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState(null);
  const [guestList, setGuestList] = useState([])


  useEffect(() => {
    if (location && location.pathname) {
      verifyGuest(getPathName(location.pathname));
    }
  }, []);

  useEffect(() => {
    getGuestList();
  }, [])

  const getGuestList = async () => {
    let url = `${apiBaseUrl}getGuestList`;
    try {
      let response = await axios.get(url);
      if (response && response.data) {
        setGuestList(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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

 const  toggleForm = () =>{
   let attendanceForm = document.getElementById("attendanceForm")
   attendanceForm.classList.toggle("attendance-width")
 }


  return (
    <>
    <section className="navyday mark-attendance-single">
      <div className="container-fluid">
        <div className="row">
           <div className="col-12 text-center px-0">
              <div className="top-wrapper">
                <div className="one">
                  <img src={Logoleft} className="img-fluid " />
                </div>
                <div className="two">
                  <h2 className="title f2">Navy day</h2>
                  <p className="date f2">
                    {(userData && userData.preInvitation == "Yes" ) && "03 December 2022"}
                    {(userData && userData.navydayInvitation == "Yes" ) && "04 December 2022"}
                       </p>
                </div>
                <div className="three">
                  <img src={Logoright} className="img-fluid " />
                </div>
              </div>
            </div>
        </div>
        <div className="welcome-box">
             <p className="welcome-title">Welcome to NHO</p>
             <p className="welcome-name">{userData && userData.guestName}</p>
        </div>
        <div className="toggle-input-box">
            <div className="left">
            <form onSubmit={(e) => markAttendanceSubmit(e)} className="justify-content-center aign-items-center">
                          <input
                            type="hidden"
                            className="form-control"
                            id="inviteNo"
                            value={userData && userData.inviteNo}
                          />
                          <input
                            type="hidden"
                            className="form-control"
                            id="guestName"
                            value={userData && userData.guestName}
                          />
                          <input
                            type="hidden"
                            className="form-control"
                            id="guestDesignation"
                            value={userData && userData.guestDesignation}
                          />
                          <input
                            type="hidden"
                            className="form-control"
                            id="guestNumber"
                            value={userData && userData.guestNumber}
                          />
                          <input
                            type="password"
                            className="form-control me-2"
                            id="adminPassword"
                            onChange={(e) => onChangeHandler(e)}
                            placeholder="Enter Code"
                          />

                        <button type="submit" className="btn common-form-btn">
                        <BsArrowRight/>
                        </button> 
                      </form>
            </div>
        </div>
        
                        {confirmationMsg && (
                          <div className="responseBox">
                            <div className="successIcon">
                            <BsCheck2/>
                            </div>
                            <p className="success">
                              {confirmationMsg}
                            </p>
                          </div>
                        )}

                        {errorMsg && (
                          <div className="responseBox">
                          <div className="errorIcon">
                          <BsExclamationLg/>
                          </div>
                          <p className="error">
                          {errorMsg}
                          </p>
                        </div>
                        )}
      </div>
    </section>
    </>
  );
};

export default MarkAttendance;
