import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "../../CSS/sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();
  return (
    <>
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

                <h2 className="text-center">Welcome to the Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    // <>
    //   <section className="sidebar-wrapper">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <div className="sidebar-card">
    //           <aside>
    //             <ul className="ps-0 list-unstyled ">
    //               <li>
    //                 <button
    //                   className="common-blue btn"
    //                   // onClick={() => goToDashbaord()}
    //                 >
    //                   <span className="me-2">
    //                     <i className="fa-solid fa-house"></i>
    //                   </span>
    //                   Dashboard
    //                 </button>
    //               </li>
    //               <li>
    //                 <button
    //                   className="common-blue btn"
    //                   // onClick={() => goToDashbaord()}
    //                 >
    //                   <span className="me-2">
    //                     <i className="fa-solid fa-house"></i>
    //                   </span>
    //                   Invite Form
    //                 </button>
    //               </li>
    //               <li>
    //                 <button
    //                   className="common-blue btn"
    //                   // onClick={() => goToDashbaord()}
    //                 >
    //                   <span className="me-2">
    //                     <i className="fa-solid fa-house"></i>
    //                   </span>
    //                   All Invitation
    //                 </button>
    //               </li>
    //             </ul>
    //           </aside>
    //           {/* <div className='card'>
    //                     <div className='card-body'>
    //                         <ul>
    //                             <li>
    //                                  <Link to="">Create</Link>                                     
    //                             </li>
    //                             <li>
    //                                  <Link to="">Create</Link>
    //                             </li>
    //                             <li>
    //                                  <Link to="">Create</Link>
    //                             </li>
    //                         </ul>

    //                     </div>
    //                 </div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
  );
};

export default Sidebar;
