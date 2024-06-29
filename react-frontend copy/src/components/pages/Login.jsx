import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../config/firebase";
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import zIndex from "@mui/material/styles/zIndex";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmitEmailAndPassword = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(e.target[0].value +" " + e.target[1].value)

    try {
      const emailResult = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('token', emailResult.user.accessToken);
      localStorage.setItem('user', JSON.stringify(emailResult.user))
      navigate("/")
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-credential') {
        toast.error("Invalid Credentials!");
      } else {
        toast.error(error.message);
      }
     }       
  }
  

  const handleSubmitGoogleAccount = async (e) => {
    e.preventDefault();
  

    try {
      const googleAccountResult = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem('token', googleAccountResult.user.accessToken);
      localStorage.setItem('user', JSON.stringify(googleAccountResult.user))
      navigate("/")
    } catch (error) {
      console.log(error);
        toast.error(error.message);
      }     
  };


  return (
    <section className="">
      <ToastContainer position="top-center" autoClose={4000}/>
      <div className="absolute zn1"> 
      <img src="/img/hero.jpg" alt="background" />
      </div> 
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-5 col-lg-5 col-md-9 mt-150"> 

            <form
              onSubmit={handleSubmitEmailAndPassword}
              className="contactForm border-1 rounded-12 px-40 pt-20 pb-40 md:px-25 md:py-30 bg-white"
            >
                <div className="text-center mb-30 md:mb-30">
              <h1 className="text-30">Log In</h1>  
            </div>
              <div className="form-input ">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">
                  Email Address
                </label>
              </div>

              <div className="form-input mt-30">
                <input type="password" required />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-30">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="form-checkbox ">
                      <input type="checkbox" name="name" />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="lh-11 ml-10">Remember me</div>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
                </div>
              </div>

              <button
                type="submit"
                className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30"
              >
               <b> Log In </b>  
                 <i className="icon-arrow-top-right ml-10"></i>
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                {/* <div className="col">
                  <button className="button -md -outline-blue-1 text-blue-1 col-12">
                    <i className="icon-facebook mr-10"></i>
                    Continue Facebook
                  </button>
                </div> */}

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <i className="icon-google mr-10"></i>
                    <GoogleButton onClick={handleSubmitGoogleAccount}/>
                  </button>
                </div>
              </div>
              <div className="mt-20 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-accent-1">
                  Sign Up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
