import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '../../styles/CheckoutForm.css';
const stripePromise = loadStripe('pk_test_51PNGQQP7uV08NbFwBTjw5xHkFaCY3E8x98Vr0eeXolNS9Ti0Vvyx2ps4EgoCga9WXpRSsToGPBnD63xssVcK9FSG00YT9OvQ1w');

const CheckoutForm = ({ tripCost, tripTitle, members }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigateTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

       const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
           metadata: {
               name: 'goa',
               description: 'goa trip',
               price: 65,
               quantity: 2,
           },
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const response = await fetch('http://localhost:4242/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethod }),
            });

            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.log(result.error.message);
            }

        } else {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const Payment = ({ bookingDetails }) => {
    return (
    <section className="layout-pt-md layout-pb-lg mt-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="booking-page">
                        <div className="bg-light rounded-12 shadow-2 py-15 px-20">
                            <h2 className="text-30 md:text-24 fw-700 mb-30">
                                Confirm and Pay!!!
                            </h2>
                        </div>
                    </div>
                </div>
                    <div className="payment-page">
                        <div className="row y-gap-30 contactForm pt-30">
                            <div className="col-12">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm bookingDetails={bookingDetails} />
                                </Elements>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </section>
    );
};

export default Payment;
