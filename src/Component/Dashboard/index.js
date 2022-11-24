import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiArrowDropDownLine} from 'react-icons/ri'
import "../../CSS/sidebar.css";
import "../../CSS/navbar.css";
import Logo from "../../Images/nhoLogo.png";
import UserLogo from "../../Images/user-logo.png";
import {apiBaseUrl} from "../../util.js"

export function DashboardNew({children}){

    const childrenArray = React.Children.toArray(children);

    const navigate = useNavigate();
    let [allCategories,setAllCategories] = useState([])
    const [mobileView,setMobileView] = useState(false)

    const [windowSize,setWindowSize] = useState(window.innerWidth)

    const getCategoryList = async () => {
      let url =  `${apiBaseUrl}getcategories`;
      
      try {
        let response = await axios.get(url);
  
        if (response && response.data) {
          setAllCategories(response.data.response);
        }
      } catch (error) {
        console.log("error", error);
      }
  };


    let getWindowSize = () =>{
      if(window.innerWidth < 992){
        setMobileView(true)
      }
      else{
        setMobileView(false)
      }

      setWindowSize(window.innerWidth)
    }

    useEffect(()=>{
      getCategoryList()
      getWindowSize()
    },[])

    useEffect(()=>{
      window.addEventListener('resize', getWindowSize)

      return() => {
        window.removeEventListener('resize', getWindowSize)
      }
    },[windowSize])

    return(    <>
    {/* import navbar */}

    <header className="dashboard-header">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <button type='button' className="me-3 btn d-lg-none d-md-block">
              <GiHamburgerMenu className='text-white'/>
              </button>
              <img src={Logo} className="img-fluid w-75" />
              {/* <img src={Logo} alt='logo' className='img-fluid'/> */}
              <h1 className="dashboard-title ms-2">
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

                    <span className="user-text me-2">
                      Admin
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item logout-btn"
                        onClick={()=>navigate('/')}
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
                  <div className={`col-md-1 left-part col-lg-2 px-0 ${mobileView ? 'd-none' : ''}`}>
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
                              onClick={() => navigate("/dashboard/createCategory")}
                            >
                              <span className="me-2">
                                <i className="fa-solid fa-user-plus"></i>
                              </span>
                              Category
                            </button>
                          </li>
                          {/* <li>
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
                          </li> */}
                          <li>
                          <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="custom-accordion-btn my-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <div><span className="me-2"><i class="fa-solid fa-users"></i></span>Guests</div> <RiArrowDropDownLine/>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body py-0">
        <ul className='list-unstyled'>
        <li className='m-0'>
        <button
                              className="common-blue btn"
                              onClick={() =>
                                navigate("/dashboard/guestList")
                              }
                            >
                              <span className="me-2">
                                <i className="fa-solid fa-user-plus"></i>
                              </span>
                              All
                            </button>
        </li>
        {allCategories.map((item,index)=>{
          return(
            <li className='m-0' key={index}>
        <button
                              className="common-blue btn"
                              onClick={() =>
                                navigate(`/dashboard/guestList/${item._id}`)
                              }
                            >
                              <span className="me-2">
                                <i className="fa-solid fa-user-plus"></i>
                              </span>
                              {item.categoryName}
                            </button>
        </li>
          )
        })}
        </ul>
      </div>
    </div>
  </div>
</div>
                          </li>
                        </ul>
                    </aside>
                  </div>      
                  <div className="col-md-12 col-lg-10">
                      <div className="sidebar-right-wrapper">
                           {childrenArray.map((i,index)=>{
                            return(childrenArray[index])
                           })}
                      </div>
                  </div>        
                </div>
              </div>
            </section>
        </>
    )
  }
   