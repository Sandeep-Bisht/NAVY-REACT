import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../../CSS/sidebar.css";
import "../../CSS/navbar.css";
import Logo from "../../Images/nhoLogo.png";
import UserLogo from "../../Images/user-logo.png";
import { apiBaseUrl } from "../../util.js";

export function DashboardNew({ children }) {
  const childrenArray = React.Children.toArray(children);

  const navigate = useNavigate();
  let [allCategories, setAllCategories] = useState([]);
  const [mobileView, setMobileView] = useState(false);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

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

  let getWindowSize = () => {
    if (window.innerWidth < 992) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }

    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    getCategoryList();
    getWindowSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWindowSize);

    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, [windowSize]);

  const goToHomePage =()=>{
    navigate("/");
  }

  return (
    <>
      {/* import navbar */}

      <header className="dashboard-header">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center">
              <button type="button" className="me-3 btn d-lg-none d-md-block">
                <GiHamburgerMenu className="text-white" />
              </button>
              <img src={Logo} className="img-fluid w-75" onClick={goToHomePage}/>
              {/* <img src={Logo} alt='logo' className='img-fluid'/> */}
              <h1 className="dashboard-title ms-2" onClick={goToHomePage}>
                <span></span>NHO
              </h1>
            </a>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <form className="d-flex">
                <div className="nav-item dropdown">
                  <a
                    className="text-decoration-none dropdown-toggle p-0 d-user-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="user-icon">
                      <img src={UserLogo} className="img-fluid w-75" />
                    </span>

                    <span className="user-text me-2">Admin</span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={() => navigate("/")}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>

      {/* end import navbar */}
      <section className="dash-body">
        <div className="container-fluid ">
          <div className="row">
            <div
              className={`col-md-1 left-part col-lg-2 px-0 ${mobileView ? "" : ""
                }`}
            >
              <aside>
                <ul className="ps-0 list-unstyled " style={{margin:"0px"}}>
                  <li>
                    <button
                      className="common-blue btn sidebar-button"
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
                      className="common-blue btn sidebar-button"
                      onClick={() => navigate("/dashboard/Department")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-building-shield"></i>
                      </span>
                      Department
                    </button>
                  </li>
                  <li>
                    <button
                      className="common-blue btn sidebar-button"
                      onClick={() => navigate("/dashboard/createCategory")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-shield"></i>
                      </span>
                      Category
                    </button>
                  </li>
                  <li>
                    <button
                      className="common-blue btn sidebar-button"
                      onClick={() => navigate("/dashboard/addInvites")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      Add Guest
                    </button>
                  </li>
                  <li>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="custom-accordion-btn sidebar-button my-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                          >
                            <div>
                              <span className="me-2">
                                <i className="fa-solid fa-users"></i>
                              </span>
                              Guests
                            </div>{" "}
                            <RiArrowDropDownLine />
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body py-0">
                            <ul className="list-unstyled">
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/guestList")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  All
                                </button>
                              </li>
                              {allCategories.map((item, index) => {
                                return (
                                  <li className="m-0" key={index}>
                                    <button
                                      className="common-blue btn sidebar-sub-heading"
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/guestList/${item._id}`
                                        )
                                      }
                                    >
                                      <span className="me-2">
                                        <i className="fa-solid fa-user"></i>
                                      </span>
                                      {item.categoryName}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li>
                    <button
                      className="common-blue btn"
                      onClick={() => navigate("/dashboard/confirmed-guests")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      Confirmed Guest
                    </button>
                  </li> */}

<li>
                    <div className="accordion" id="accordionReports">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="custom-accordion-btn sidebar-button my-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseReport"
                            aria-expanded="false"
                            aria-controls="collapseReport"
                          >
                            <div>
                              <span className="me-2">
                                <i className="fa-solid fa-users"></i>
                              </span>
                              Reports
                            </div>{" "}
                            <RiArrowDropDownLine />
                          </button>
                        </h2>
                        <div
                          id="collapseReport"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionReports"
                        >
                          <div className="accordion-body py-0">
                            <ul className="list-unstyled">                             
                            <li>
                    <div className="accordion" id="accordionExample2">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="custom-accordion-btn sidebar-button my-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <div>
                              <span className="me-2">
                                <i className="fa-solid fa-users"></i>
                              </span>
                              Confirmed Guest
                            </div>{" "}
                            <RiArrowDropDownLine />
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample2"
                        >
                          <div className="accordion-body py-0">
                            <ul className="list-unstyled">
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/confirmed-guests/navyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  04-Dec-2023
                                </button>
                              </li>
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/confirmed-guests/prenavyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  03-Dec-2023
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                    {/* confirm guest date wise list */}

                    <li>
                    <div className="accordion" id="accordionExample3">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="custom-accordion-btn sidebar-button my-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <div>
                              <span className="me-2">
                                <i className="fa-solid fa-users"></i>
                              </span>
                              Guest Reports
                            </div>{" "}
                            <RiArrowDropDownLine />
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample3"
                        >
                          <div className="accordion-body py-0">
                            <ul className="list-unstyled">
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/reports-confirmed/navyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  04-Dec-2023
                                </button>
                              </li>
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/reports-confirmed/prenavyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  03-Dec-2023
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                   {/* Reports */}
                   <li>
                    <div className="accordion" id="accordionExample5">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFive">
                          <button
                            className="custom-accordion-btn sidebar-button my-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <div>
                              <span className="me-2">
                                <i className="fa-solid fa-users"></i>
                              </span>
                              Present Guest 
                            </div>{" "}
                            <RiArrowDropDownLine />
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample5"
                        >
                          <div className="accordion-body py-0">
                            <ul className="list-unstyled">
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/presentGuest/navyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  04-Dec-2023
                                </button>
                              </li>
                              <li className="m-0">
                                <button
                                  className="common-blue btn sidebar-sub-heading"
                                  onClick={() =>
                                    navigate("/dashboard/presentGuest/prenavyday")
                                  }
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  03-Dec-2023
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>


                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  

                 

                

                 
                  {/* <li>
                    <button
                      className="common-blue btn"
                      onClick={() => navigate("/dashboard/presentGuest")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-building-shield"></i>
                      </span>
                      Present Guest
                    </button>
                  </li> */}
                  
                  <li>
                    <button
                      className="common-blue btn sidebar-button"
                      onClick={() => navigate("/dashboard/prenavyDayInvitationList")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      Invitation List 03 Dec
                    </button>
                  </li>
                  <li>
                    <button
                      className="common-blue btn sidebar-button"
                      onClick={() => navigate("/dashboard/navyDayInvitationList")}
                    >
                      <span className="me-2">
                        <i className="fa-solid fa-user-plus"></i>
                      </span>
                      Invitation List 04 Dec
                    </button>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-md-12 col-lg-10">
              <div className="sidebar-right-wrapper">
                {childrenArray.map((i, index) => {
                  return childrenArray[index];
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
