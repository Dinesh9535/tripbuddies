import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import {signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleAuthProvider } from "../../config/firebase";
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const mobile = e.target[2].value;
    const password = e.target[3].value;

    try {
      // Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user))
      navigate("/")

    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.info("You already have an account! please Login");
      } else  if (error.code === 'auth/weak-password'){
        toast.error("Password should be at least 6 characters");
      }   else {
        toast.error(error.message);
      }
    }
  };
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
          <div className="col-xl-5 col-lg-7 col-md-9 mt-150">
            <form
              onSubmit={handleSubmit}
              className="contactForm border-1 rounded-12 px-40 pt-20 pb-40 md:px-25 md:py-30 bg-white"
            >
              <div className="text-center mb-20 md:mb-30">
                <h1 className="text-30">Register</h1>
                <div className="text-16 fw-300 mt-0 md:mt-15">
                  Let's create your account!
                </div>
              </div>
              <div className="form-input mt-20">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">First Name*</label>
              </div>

              {/* <div className="form-input mt-20">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Last Name*</label>
              </div> */}
              <div className="form-input mt-20">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">Your Email*</label>
              </div>
              <div className="form-input mt-20">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Mobile*</label>
              </div>
              <div className="form-input mt-20">
                <input type="password" required />
                <label className="lh-1 text-16 text-light-1">Password*</label>
              </div>

              <button className="button -md -dark-1 bg-accent-1 text-white col-12 mt-30">
                <b> Register </b>
                <i className="icon-arrow-top-right ml-10"></i>
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>
              <div className="row y-gap-15">

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    {/* <i className="icon-google mr-10"></i> */}
                    <GoogleButton onClick={handleSubmitGoogleAccount}/>
                  </button>

                </div>
              </div>
              <div className="mt-20 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-accent-1">
                  Log In!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
