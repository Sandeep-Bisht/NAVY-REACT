import React from "react";
import logo from "../../Images/nhoLogo.png";
import "../../CSS/login.css";
import "../../CSS/common.css";

const Login = () => {
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
                      <form>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                          <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
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
