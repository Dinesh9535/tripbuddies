import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment_old = ({ personalDetails}) => {
    //const history = useHistory();
    const navigateTo = useNavigate();
    const handlePayment = () => {
        // Simulate a successful payment
        setTimeout(() => {
            navigateTo('/confirmation');
        }, 1000);
    };

    return (
        <div className="payment-page">
            <h1>Payment</h1>
            <p>Please confirm your booking details:</p>
            <div>
                <p><strong>Trip:</strong> {personalDetails.trip}</p>
                <p><strong>Date:</strong> {bookingDetails.date}</p>
                <p><strong>Name:</strong> {bookingDetails.name}</p>
                <p><strong>Email:</strong> {bookingDetails.email}</p>
            </div>
            <button onClick={handlePayment}>Confirm and Pay</button>
        </div>
    );
};

export default Payment_old;
