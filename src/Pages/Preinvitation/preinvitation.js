import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../CSS/navyday.css";
import Logoright from "../../Images/navydaylogo2.png";
import Logoleft from "../../Images/navydaylogo1.png";
import Logomain from "../../Images/navydaymain1.jpg";
import backimg from "../../Images/navydaymain2.jpg"

import Sidepic1 from "../../Images/sidepic1.png";
import Sidepic2 from "../../Images/sidepic2.png";
import Sidepic3 from "../../Images/sidepic3.png";
import Inner from "../../Images/inner.jpg";
import Map from "../../Images/map.jpg";
import { apiBaseUrl } from "../../util.js";

const PreInvitation = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 430.98); // Set your preferred mobile width
      };
  
      // Initial check on component mount
      handleResize();
  
      // Event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

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


  return (
    <>
      <section className="navyday ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center px-0">
              {/* <div className="top-wrapper">
                <div className="one">
                  <img src={Logoleft} className="img-fluid " />
                </div>
                <div className="two">
                  <h2 className="title f2">Navy day</h2>
                  <p className="date f2">03 December 2023</p>
                </div>
                <div className="three">
                  <img src={Logoright} className="img-fluid " />
                </div>
              </div> */}

<div className={`${isMobile}?navyday-main-pic:responsive-image`}>
                <img src={isMobile?backimg:Logomain} className="img-fluid navy-img"/>
              </div>
            
            
              

              {/* <div className="navyday-main-pic p-5">
                <img src={Logomain} className="img-fluid" />
              </div> */}
            </div>
            {/* <div className="col-12 px-0">
              <div className="muiltiple-pics ">
                <div className="single-pic-wrapper d-flex justify-content-center">
                  <div className="single-pic">
                    <img src={Sidepic1} className="img-fluid " />
                  </div>
                  <div className="single-pic">
                    <img src={Sidepic2} className="img-fluid " />
                  </div>
                  <div className="single-pic">
                    <img src={Sidepic3} className="img-fluid " />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-md-10 text-center responsive-default d-none">
              <div className="navyday-main-pic">
                <img src={Logomain} className="img-fluid " />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------------second card--------------------- */}
      <section className="navyday-second-area common-alternate-bg navyday-common-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="navyday-second-area-card">
                <div className="row">
                  <div className="col-md-12">
                    <div className="one">
                      <div>
                        <img src={Inner} className="img-fluid" alt="" />
                      </div>
                      <div
                        className="qr-code"
                        style={{
                          height: "250px",
                          margin: "0 auto",
                          maxWidth: 64,
                          width: "100%",
                        }}
                      >
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={userData && userData.stringToken}
                           //value={`http://inho.in/markAttendance/${userData.stringToken}`}
                          //value={`http://localhost:3000/markAttendance/${userData.stringToken}`}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>
                    <div className="two">
                      <p className="navyday-second-area-card-title f2 fw-bold">
                        Vice Admiral Adhir Arora, AVSM NM
                      </p>
                      <p className="navyday-second-area-card-title f2">
                        Chief Hydrographer to the Government of India
                      </p>
                      {/* <p className='navyday-second-area-card-title f2 fw-bold'>
                        National Hydrographic Office
                      </p> */}
                      <p className="navyday-second-area-card-title f2">
                        requests the pleasure of the company of
                      </p>
                      <p className="bordered-line text-nowrap">
                        <b className="guestName text-uppercase">                         
                         {userData.guestName} 
                        </b>
                      </p>
                    </div>
                    <div className="three">
                      {/* <p className='subheading'>
                        on the occassion of
                      </p>
                      <p className='mainheading'>
                        Navy Day Celebration
                      </p> */}
                      <p className="navyday-second-area-card-title f2  text-nowrap">
                        for{" "}
                        <span className="highlight-one">
                          " At Home function with Veterans"
                        </span>{" "}
                        on{" "}
                        <span className="highlight-one text-nowrap">03 Dec 2023</span> at
                        3:30 PM
                      </p>
                      <p className="navyday-second-area-card-title f2">
                        at National Hydrographic Office, 107-A Rajpur Road,
                        Dehradun
                      </p>                     
                    </div>
                    <div className="container custom-container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="four">
                            <div className="left-box">
                              <p className="general-info-title">Rsvp</p>
                              <p className="general-info">Staff Officer</p>
                              <p className="general-info">Tel: 8104685364</p>
                              {/* <p className='general-info'>
                          (to be seated by.........P.M.)
                        </p> */}
                            </div>
                            <div className="right-box">
                              <div className="general-info-wrapper">
                                <div className="left">
                                  <p className="general-info">Admit</p>
                                </div>
                                <div className="right">
                                  <p className="general-info">: One</p>
                                </div>
                              </div>
                              <div className="general-info-wrapper">
                                <div className="left">
                                  <p className="general-info">Dress</p>
                                </div>
                                <div className="right">
                                  <p className="general-info">
                                    : National/Lounge Suit
                                  </p>
                                </div>
                              </div>
                              <div className="general-info-wrapper">
                                <div className="left">
                                  <p className="general-info">
                                    Service Officer : Winter
                                    Ceremonial/Equivalent (Without Sword)
                                  </p>
                                </div>
                                <div className="right d-none">
                                  <p className="general-info">
                                    : Winter Ceremonial/Equivalent (Without
                                    Sword)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------------second card--------------------- */}
      {/* <section className="navyday-fifth-area common-alternate-bg navyday-common-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="navyday-fifth-area-card flex-column">
                <div className="entrance-box-wrapper">
                  <div className="entrance-box">
                    <p>Please Bring this QR code</p>
                    <p>at the time of entrance</p>
                  </div>
                </div>
                <div className="entrance-qr text-center">
                  <div className="one">
                    <div className="entrance-qr-code-view">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={userData && userData.stringToken}
                         //value={`http://inho.in/markAttendance/${userData.stringToken}`}
                        //value={`http://localhost:3000/markAttendance/${userData.stringToken}`}

                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-none">
              <span className="copyright">
                Design And Developed By{" "}
                <a
                  href="https://giksindia.com/"
                  className="copyright-highlight"
                  target="_blank"
                >
                  GIKS INDIA PVT LTD{" "}
                </a>
              </span>
            </div>
          </div>
        </div>
      </section> */}
      <section className="navyday-third-area common-alternate-bg navyday-common-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="navyday-third-area-card">
                <div className="row d-none">
                  <div className="col-md-4">
                    <h2 className="navycard-common-title text-decoration-underline">
                      समय
                    </h2>
                  </div>
                  <div className="col-md-8">
                    <h2 className="navycard-common-title text-decoration-underline">
                      कार्यक्रम
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="fw-bold text-center text-uppercase pb-3">
                      Schedule Of Event
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="navyday-third-area-card-wrapper first">
                          <div className="left">
                            <h2 className="navycard-common-title text-decoration-underline">
                              समय
                            </h2>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1530
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1535
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1535-1540
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1540-1545
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1545-1550
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1550-1605
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                1605-1620

                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                1620-1630

                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                1630
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                1655
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>

                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                              <p className="navycard-common-title-content">
                              1700
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                          </div>
                          <div className="right">
                            <h2 className="navycard-common-title text-decoration-underline">
                              कार्यक्रम
                            </h2>
                            <p className="navycard-common-title-content">
                            सभी अतिथि कार्यक्रम स्थल पर पहुंचे

                            </p>
                            <p className="navycard-common-title-content">
                            चीफ हाइड्रोग्राफर का आगमन 

                            </p>
                            <p className="navycard-common-title-content">
                            स्वागत भाषण
                            </p>
                            <p className="navycard-common-title-content">
                            कविता
                            </p>
                            <p className="navycard-common-title-content">
                            भारतीय नौसेना पर लघु फिल्म और फोटो प्रदर्शन
                            </p>
                            <p className="navycard-common-title-content">
                            देशभक्ति गीत/समूह गीत
                            </p>
                            <p className="navycard-common-title-content">
                            बैंड बजाना
                            </p>
                            <p className="navycard-common-title-content">
                            चीफ हाइड्रोग्राफर का संबोधन
                            </p>
                            <p className="navycard-common-title-content">
                            चाय 
                            </p>
                            <p className="navycard-common-title-content">
                            चीफ हाइड्रोग्राफर प्रस्थान
                            </p>
                            <p className="navycard-common-title-content">
                            अतिथि प्रस्थान
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="navyday-third-area-card-wrapper second">
                          <div className="left">
                            <h2 className="navycard-common-title text-decoration-underline">
                              Time
                            </h2>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1640
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1655
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1715
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1716 to 1720
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1721 to 1722
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1722 to 1725
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1725 to 1740
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1740 to 1743
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1743 to 1813
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>
                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">
                                <p className="navycard-common-title-content">
                                  1813 to 1815
                                </p>
                              </div>
                              <div className="time-duration-right"> - </div>
                            </div>

                            <div className="time-duration-wrapper">
                              <div className="time-duration-left">--</div>
                              <div className="time-duration-right"> - </div>
                            </div>
                          </div>
                          <div className="right">
                            <h2 className="navycard-common-title text-decoration-underline">
                              Event
                            </h2>
                            <p className="navycard-common-title-content">
                              Guests arrive
                            </p>
                            <p className="navycard-common-title-content">
                              Senior Dignitaries arrive
                            </p>
                            <p className="navycard-common-title-content">
                              Chief Guest arrives
                            </p>
                            <p className="navycard-common-title-content">
                              Sunset Ceremony
                            </p>
                            <p className="navycard-common-title-content">
                            Release of Web Page (Indian Warning Information & Navigation
                             Services)
                            </p>
                            <p className="navycard-common-title-content">
                            Inauguration of Maritime Information Chart
                            </p>
                            <p className="navycard-common-title-content">
                              Viewing of Exhibits
                            </p>
                            <p className="navycard-common-title-content">
                              Video clip on Navy (1971 war)
                            </p>
                            <p className="navycard-common-title-content">
                              High Tea
                            </p>
                            <p className="navycard-common-title-content">
                              Presentation of Memento
                            </p>
                            <p className="navycard-common-title-content">
                              Chief Guest departs as convenient
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------------fourth card--------------------- */}

      <section className="navyday-fourth-area common-alternate-bg navyday-common-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="f2 map-title">Route Map Of</h2>
              <h2 className="f2 map-title">National Hydrographic Office</h2>
            </div>
            <div className="col-md-12">
              <div className="map-box">
                <img src={Map} className="img-fluid" alt="map" />
              </div>
            </div>
            {/* <div className="col-md-12 ">
              <span className="copyright text-md-end text-center">
                Conceptualised by{" "}
                <span className="text-white">Lt Cdr Mohit Verma</span>
                <br />
                <span className="footer-hide"> and</span> Design And Developed
                By{" "}
                <a
                  href="https://giksindia.com/"
                  className="copyright-highlight"
                  target="_blank"
                >
                  GIKS INDIA PVT LTD{" "}
                </a>
              </span>
            </div> */}
          </div>
        </div>
      </section>
      <section className="navyday-fifth-area common-alternate-bg navyday-common-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="navyday-fifth-area-card flex-column">
                <div className="entrance-box-wrapper">
                  <div className="entrance-box">
                    <p>Please Bring this QR code</p>
                    <p>at the time of entrance</p>
                  </div>
                </div>
                <div className="entrance-qr text-center">
                  <div className="one">
                    <div className="entrance-qr-code-view">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={userData && userData.stringToken}
                         //value={`http://inho.in/markAttendance/${userData.stringToken}`}
                        //value={`http://localhost:3000/markAttendance/${userData.stringToken}`}

                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  </div>
                  <p className="text-request mt-3">*Request to take screenshot of QR code to be shown at the NHO gate.</p>
                  </div>
                <div className="col-md-12 ">
              <span className="copyright text-md-end text-center">
                Conceptualised by{" "}
                <span className="text-white">Lt Cdr Mohit Verma</span>
                <br />
                <span className="footer-hide"> and</span> Design And Developed
                By{" "}
                <a
                  href="https://giksindia.com/"
                  className="copyright-highlight"
                  target="_blank"
                >
                  GIKS INDIA PVT LTD{" "}
                </a>
              </span>
            </div>
              </div>
            </div>
            <div className="col-md-12 d-none">
              <span className="copyright">
                Design And Developed By{" "}
                <a
                  href="https://giksindia.com/"
                  className="copyright-highlight"
                  target="_blank"
                >
                  GIKS INDIA PVT LTD{" "}
                </a>
              </span>
            </div>
          </div>
        
      </section>
    </>
  );
};

export default PreInvitation;