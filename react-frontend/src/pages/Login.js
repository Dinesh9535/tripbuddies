import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";
import '../styling/authentication.scss';
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmitEmailAndPassword = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

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
    <div className="formContainer">
              <ToastContainer position="top-center" autoClose={4000}/>

      <div className="formWrapper">
        <span className="logo">Travel buddies</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmitEmailAndPassword}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>

        <h5>---- Or ----</h5>

         <div className="google-btn-div">
           <GoogleButton onClick={handleSubmitGoogleAccount}/>
         </div>
      </div>
    </div>
  );
};

export default Login;
