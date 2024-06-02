
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

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

  return (
    <div className="formContainer">
        <ToastContainer position="top-center" autoClose={4000}/>
      <div className="formWrapper">
        <span className="logo">Travel Buddies</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button>Sign up</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;