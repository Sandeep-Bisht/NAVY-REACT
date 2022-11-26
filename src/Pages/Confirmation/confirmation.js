import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../CSS/confirmation.css'
import logo from "../../Images/nhoLogo.png";
import { useLocation } from "react-router-dom";
import { apiBaseUrl } from "../../util.js";

const Confirmation = () => {
  const location = useLocation();
  // console.log(location.pathname, "location")
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(false);

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
        console.log("response stringToken", response.data);
        setUserData(response.data.guest);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  

  let invitationResponseHandler = async (guest_response) => {
    let obj = {
      guest_response: guest_response,
      _id: userData._id,
    };

    let url = `${apiBaseUrl}markAvailability`;

    try {
      let response = await axios.post(url, obj);
      if (response) {
        setIsDisabled(true);
        console.log("invitation  response", response);
        setUserData("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section className="confirmationPage">
        <img src={logo} alt="logo" className="img-fluid" />
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12 smsContent">
              {userData && userData.availability == "null" ? (
                <>
                    <p className="text-center para">
                      Are you Intrested for the Event
                    </p>
                    <div className="row pb-3">
                      <div className="col-6 d-flex justify-content-end">
                        <button
                          type="button"
                          disabled={isDisabled}
                          className="btn btn-primary px-5"
                          onClick={() => invitationResponseHandler("yes")}
                        >
                          Yes
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          disabled={isDisabled}
                          className="btn btn-danger px-5"
                          onClick={() => invitationResponseHandler("no")}
                        >
                          No
                        </button>
                      </div>
                    </div>
                </>
              ) : (
                <div className="">
                  <p className="text-center para">
                    You had already respond for the Event.
                  </p>
                  <p>
                    <h4 className="text-center success">Thank you</h4>
                  </p>
                  <div className='col-md-12 '>
                   <span className='copyright px-2'>Conceptualised by CMDE HA Hardas and Design And Developed By <a href='https://giksindia.com/' className='copyright-highlight' target="_blank">GIKS INDIA PVT LTD </a></span>
                  </div>
                </div>
                
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirmation;
