import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  // console.log(location.pathname, "location")
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(false)

  const getPathName = (pathname) => {
    let newArray = pathname.split("/");
    let stringToken = newArray.pop();
    return stringToken;
  };

  const verifyGuest = async (stringToken) => {
    console.log("stringToken on api call", stringToken);
    let url = "http://localhost:4001/api/verifyGuestByToken";

    try {
      let response = await axios.get(url, {
        params: {
          stringToken: stringToken,
        },
      });
      if (response && response.data) {
        console.log("response stringToken", response.data);
        setUserData(response.data.guest)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (location && location.pathname) {
      verifyGuest(getPathName(location.pathname));
    }
  }, []);

  let invitationResponseHandler = async (guest_response) => {
    let obj = {
      guest_response: guest_response,
      _id: userData._id,
    };
     console.log("Guest Response", obj);

    let url = "http://localhost:4001/api/markAvailability";
    try {
      let response = await axios.post(url, obj);
      if (response) {
        setIsDisabled(true);
        console.log("invitation  response", response);
        setUserData("")
      }
    } catch (error) {
      console.log("error", error);
    }
  };

//   console.log("userData", userData)

  return (
    <>
     
         <section>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
            { userData && userData.setUserData == "null" ? (
                <>
              <div className="card">
                <p className="text-center">Are you Intrested for the Event</p>
                <div className="row pb-3">
                  <div className="col-md-6 d-flex justify-content-end">
                    <button
                      type="button"
                      disabled={isDisabled}
                      className="btn btn-primary"
                      onClick={() => invitationResponseHandler("yes")}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      disabled={isDisabled}
                      className="btn btn-danger"
                      onClick={() => invitationResponseHandler("no")}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              </>
            ) : <div className="card">
            <p className="text-center">You had already repond for the Event</p> 
            <p><h4 className="text-center text-success">Thankyu</h4></p>           
          </div>
            }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirmation;
