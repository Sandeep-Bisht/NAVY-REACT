import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/nhoLogo.png";
import {apiBaseUrl} from "../../util.js"
import "../../CSS/login.css";
import "../../CSS/common.css";
import { useForm } from "react-hook-form";

const Login = () => {
  let [loginPayload, setLoginPayload] = useState({  
  });
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [errorMsg,setErrorMsg] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetContactForm,
  } = useForm({
    mode: "onBlur",
  });
  
  const onChangeHandler = (e) => {
    let loginPayloadCopy = { ...loginPayload };
    loginPayloadCopy[e.target.id] = e.target.value;
    setLoginPayload(loginPayloadCopy);
  };

  const loginFormSubmit = (data) => {
    
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    console.log(data)
    const payload=  {
      useremail:data.email,
      password:data.password
    }
    let url = `${apiBaseUrl}getuser`
    try {
      let response = await axios.post(url, payload);
      if (response) {
        if(response.status == 200 && response.data.token){
          console.log(response.data, "response.data response.data")
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard")
        }
      }
    } catch (error) {
      console.log("error", error)
      setErrorMsg("Invalid User Name and Password");
    }
  };

  return (
    <section className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="login-card vh-100">
              <div className="card">
                <div>
                  <div className="card-header text-center">
                    <img src={logo} alt="logo" className="img-fluid" />
                    <p>
                      <b>NHO</b> E-Invite Portal
                    </p>
                    <span className="text-muted text-center">
                      Enter your email address and password to access E-Invite Portal.
                    </span>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(loginFormSubmit)}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          // id="userEmail"
                          // aria-describedby="emailHelp"
                          onChange={(e) => onChangeHandler(e)}
                          {...register("email", {
                            required: true,
                          })}
                        />
                          {errors && errors.email && errors.email.type === "required" && (
                          <p className="text-danger fs-0">This field is required</p>
                        )}                        
                        <div id="userEmail" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="userPassword"
                          onChange={(e) => onChangeHandler(e)}
                          {...register("password", {
                            required: true,
                          })}
                        />
                        {errors && errors.password && errors.password.type =="required" && (
                          <p className="text-danger">This field is required</p>
                        ) }
                       
                      </div>
                      <button type="submit" className="btn">
                        Log In
                      </button>

                      {errorMsg && (
                        <div>
                        <p className="text-danger fs-6 text-center mb-0 mt-3">{errorMsg}</p>
                     </div>
                      )}
                      
                    </form>
                  </div>
                </div>

                {/* <div className="row mt-3">
                <div className="col-12 text-center">
                  <p>
                    <a className="text-white-50 ml-1">Forgot your password?</a>
                  </p>
                  <p className="text-white-50">
                    Don't have an account?{" "}
                    <a routerLink="/auth/signup" className="text-white ml-1">
                      <b>Sign Up</b>
                    </a>
                  </p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
