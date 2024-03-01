import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowRight, BsCheck2, BsExclamationLg } from "react-icons/bs";
import { apiBaseUrl } from "../../util.js";
import "../../CSS/markattendance.css";
import Logoright from "../../Images/navydaylogo2.png";
import Logoleft from "../../Images/navydaylogo1.png";
import independace from "../../Images/75_th_Independence.png";

const MarkAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState(null);
  const [guestList, setGuestList] = useState([]);
  const [userName, setUserName] = useState();
  const stringTokenRef = React.useRef(null);
  const [invitationDate, setInvitationDate] = useState("");


  useEffect(() => {
    getGuestList();
    stringTokenRef.current.focus();    
  }, []);


  const getGuestList = async () => {
    let url = `${apiBaseUrl}getGuestList`;
    try {
      let response = await axios.get(url);
      if (response) {
        setGuestList(response.data);
        const string = getString(location.pathname);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getString = (pathname) => {
    let newArray = pathname.split("/");
    let stringToken = newArray.pop();
    return stringToken;
  }

  const getPathName = (pathname) => {
    let newArray = pathname.split("/");
    let stringToken = newArray.pop();
    return stringToken;
  };

  const verifyGuest = (stringToken, id) => {
    let userDataCopy = { ...userData };
    userDataCopy[id] = stringToken;

    if (guestList && guestList.length > 0) {
      let usersData = guestList.find(
        (item, index) => item.stringToken == stringToken
      );
      if (usersData) {
        if (usersData.invitedForNavyDay) {
          setInvitationDate("04-Dec-2023");
        }

        userDataCopy.guestName = usersData.guestName;
        userDataCopy.adminPassword = "111";
        userDataCopy.guestId = usersData._id;
        userDataCopy.inviteNo = usersData.inviteNo;
        userDataCopy.guestDesignation = usersData.guestDesignation;
        userDataCopy.guestNumber = usersData.guestNumber;
        userDataCopy.guestCategory = usersData.guestCategory;
        userDataCopy.guestDepartment = usersData.guestDepartment;
        // userDataCopy.attendentDate = new Date().toLocaleDateString();
        userDataCopy.attendentDate = "12/4/2023";
        setUserName(usersData.guestName);
      }
    }

    setUserData(userDataCopy);
  };


  const onChangeHandler = (e) => {
    console.log(e.target.id,"check value", e.target.value)
    verifyGuest(getPathName(e.target.value), e.target.id);
  };

  const markAttendanceSubmit = () => {
    console.log(userData, 'user data is this')
    handleAttendance(userData);
  };

  const handleAttendance = async (userData) => {
    let url = `${apiBaseUrl}markAttendance`;
    try {
      let response = await axios.post(url, userData);
      // let fields = document.getElementById("stringToken");
      // fields.innerHTML = ""
      if (response) {
        document.getElementById("create-course-form").reset();
        stringTokenRef.current.focus();
        if (response.status == 200) {
          let res = response.data;
          setConfirmationMsg(res.message);
          setErrorMsg(null);
          setTimeout(() => {
            setConfirmationMsg(null);
            setUserName();
            setInvitationDate("");
            setUserData(false);
          }, 2000);
        }
      }
    } catch (error) {
      // document.getElementById("create-course-form").reset();
      // let fields = document.getElementById("stringToken");
      // fields.innerHTML = ""
      console.log("error", error.response.data.message);
      setErrorMsg(error.response.data.message);
      setConfirmationMsg(null);
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
    }
  };

  const toggleForm = () => {
    let attendanceForm = document.getElementById("attendanceForm");
    attendanceForm.classList.toggle("attendance-width");
  };

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
                    {/* {userData &&
                      userData.preInvitation == "Yes" &&
                      "03 December 2023"}
                    {userData &&
                      userData.navydayInvitation == "Yes" &&
                      "04 December 2023"} */}

                    {invitationDate}
                  </p>
                </div>
                <div className="three">
                  <img src={Logoright} className="img-fluid " />
                </div>
              </div>
            </div>
          </div>
          <div className="welcome-box">
            <p className="welcome-title">Welcome to National Hydrographic Office</p>
            {/* <p className="welcome-name">{userData && userData.guestName}</p> */}
            <p className="welcome-name">{userName && userName}</p>
          </div>
          <div className="independence">
            <img src={independace} className="img-fluid independence_img" />
          </div>
          <div className="toggle-input-box">
            <div className="left">
              <form
                id="create-course-form"
                className="justify-content-center aign-items-center"
              >
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
                  type="text"
                  className="form-control me-2"
                  id="stringToken"
                  ref={stringTokenRef}
                  // ref={textInput}
                  onChange={(e) => onChangeHandler(e)}
                  value={userData.stringToken}
                  //value={}
                  //placeholder="Enter Code"
                  autoComplete="off"
                />
                <input 
                  type="password"
                  className="form-control me-2"
                  id="adminPassword"
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Enter Code" 
                  value="111"               
                />

                <button
                  type="button"
                  className="btn common-form-btn"
                  onClick={() => markAttendanceSubmit()}
                >
                  <BsArrowRight />
                </button>
               
              </form>
            </div>
          </div>

          {confirmationMsg && (
            <div className="responseBox">
              <div className="successIcon">
                <BsCheck2 />
              </div>
              <p className="success">{confirmationMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="responseBox">
              <div className="errorIcon">
                <BsExclamationLg />
              </div>
              <p className="error">{errorMsg}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MarkAttendance;
