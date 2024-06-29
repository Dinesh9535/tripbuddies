import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
//import axios from 'axios';
import '../../../styles/CheckoutForm.css'; // Assuming you have some basic styles
import axios from '../../../components/pages/axiosConfig.jsx';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, token } = await stripe.createToken(cardElement);

            if (error) {
                setError(error.message);
                setProcessing(false);
                return;
            }

            // Send token to your backend for processing payment
            const response = await axios.post('http://localhost:8085/stripe-api/payment/charge', {
                token: token.id,
                amount: 1000, // Amount in cents
            });
            if (response.data.success) {
                setSucceeded(true);
            } else {
                setError('Payment failed');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Card Payment</h2>
            <CardElement />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={!stripe || processing || succeeded}>
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {succeeded && <div className="success">Payment succeeded!</div>}
        </form>
    );
};

export default CheckoutForm;