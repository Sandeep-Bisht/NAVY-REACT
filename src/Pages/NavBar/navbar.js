import React from "react";
import "../../CSS/navbar.css";
import Logo from "../../Images/nhoLogo.png";
import UserLogo from "../../Images/user-logo.png";

const Navbar = () => {
  return (
    <>
      <header className="dashboard-header">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src={Logo} className="img-fluid w-75" />
              {/* <img src={Logo} alt='logo' className='img-fluid'/> */}
              <h1 className="dashboard-title ms-2">
                <span></span>NHO
              </h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
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
                      {/* <i className="fa-solid fa-user"></i> */}
                      <img src={UserLogo} className="img-fluid w-75" />
                    </span>

                    {/* <img
                        src={User}
                        className="img-fluid  me-3 dash-user-pic"
                      /> */}
                    <span className="user-text me-2">
                      {/* {loggedInUser.userName} */}
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button
                        //   onClick={() => logoutUser()}
                        className="dropdown-item logout-btn"
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
    </>
    // <>
    // <section className='nav-wrapper'>
    //     <div className='row'>
    //         <div className='col-md-12'>
    //             <div className='nav-logo'>
    //                 <img src={Logo} alt='logo' className='img-fluid'/>
    //             </div>
    //             <div>
    //             <div className="nav-item dropdown">
    //                 <a
    //                   className="text-decoration-none dropdown-toggle p-0 d-user-toggle"
    //                   href="#"
    //                   id="navbarDropdown"
    //                   role="button"
    //                   data-bs-toggle="dropdown"
    //                   aria-expanded="false"
    //                 >
    //                   <span className="user-icon">
    //                     <i className="fa-solid fa-user"></i>
    //                   </span>

    //                   {/* <img
    //                     src={User}
    //                     className="img-fluid  me-3 dash-user-pic"
    //                   /> */}
    //                   {/* <span className="user-text me-2">
    //                     {loggedInUser.userName}
    //                   </span> */}
    //                 </a>
    //                 <ul
    //                   className="dropdown-menu"
    //                   aria-labelledby="navbarDropdown"
    //                 >
    //                   <li>
    //                     <button
    //                       onClick={() => logoutUser()}
    //                       className="dropdown-item logout-btn"
    //                     >
    //                       Logout
    //                     </button>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //         </div>
    //     </div>
    // </section>
    // </>
  );
};

export default Navbar;
