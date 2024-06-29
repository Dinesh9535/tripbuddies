import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
//import axios from 'axios';
import '../../styles/CheckoutForm.css';
import axios from './axiosConfig';

const Successful = () => {
  return (
      <div>
      <h1>Payment Successful!</h1>
      </div>
    );
};

export default Successful;