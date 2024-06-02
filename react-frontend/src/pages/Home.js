import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from "../config/firebase";
import { useNavigate } from 'react-router-dom';

const Home = () => {
const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
       await signOut(auth);
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       navigate('login')
    } catch (error) {
       console.log(error);
    }
  }

  return (
    <div>
      hello home
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
