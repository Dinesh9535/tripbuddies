import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedLogin from './components/ProtectedLogin';
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />}/>
      <Route path="register" index element={<Register/>}/>

      <Route path="/" element={<ProtectedLogin/>}>
        <Route path="/" index element={<Home/>}/>

      </Route>
    </Route>
  )
);

root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
