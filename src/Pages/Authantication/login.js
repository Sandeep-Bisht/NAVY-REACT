import React, { useState } from "react";
import axios from "axios";
import logo from "../../Images/nhoLogo.png";
import "../../CSS/login.css";
import "../../CSS/common.css";

const Login = () => {
  let [loginPayload, setLoginPayload] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [userInfo, setUserInfo] = useState([]);

  const onChangeHandler = (e) => {
    let loginPayloadCopy = { ...loginPayload };
    loginPayloadCopy[e.target.id] = e.target.value;
    setLoginPayload(loginPayloadCopy);
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginPayload, "aa gaya jjj");
    handleLogin();
  };

  //  const Get = async (loginPayload) =>{
  //   url = "http://localhost:4001/api/getuser"
  //   try{
  //     const response = await axios(url);
  //     console.log("response.data",response.data)
  //     setUserInfo(response.data);
  // }
  // catch(err){
  //   console.error(err);
  // }
  // };

  const handleLogin = async () => {
    // try {
    //   axios({
    //     method: "GET",
    //     url: "http://localhost:4001/api/getuser",
    //     body:raw,
    //     headers: {"Content-type":"application/json"}
    //   }).then(function(response) {
    //     console.log(response, "response is this");
    //   });
    // } catch (error) {
    //   console.log("error", error);
    // }

    axios
      .get("http://localhost:4001/api/getuser", {
        body: JSON.stringify(loginPayload),
      })
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
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
                      <b>Admin</b>Portal
                    </p>
                    <span class="text-muted text-center">
                      Enter your email address and password to access admin
                      panel.
                    </span>
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => loginFormSubmit(e)}>
                      <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="userEmail"
                          aria-describedby="emailHelp"
                          y
                          onChange={(e) => onChangeHandler(e)}
                        />
                        <div id="emailHelp" className="form-text">
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
                        />
                      </div>
                      <button type="submit" className="btn">
                        Log In
                      </button>
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
