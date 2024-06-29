import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const BookingDetails = ({ setBookingDetails }) => {
    const [trip, setTrip] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const details = { fullName, address, email, zipcode, phone, state, country };
        setBookingDetails(details);
        history.push('/payment');
    };

    return (
        <Formik
            initialValues={{ fullName: '', email: '', address: '', zipcode: '', phone: '', state: '', country: '' }}
            validationSchema={validationSchema}
/*            onSubmit={(values, { setSubmitting }) => {
                axios.post('https://your-server-endpoint.com/api/submit', values)
                    .then(response => {
                        console.log('Form submitted successfully:', response.data);
                        setSubmitting(false);
                    })
                    .catch(error => {
                        console.error('There was an error submitting the form:', error);
                        setSubmitting(false);
                    });
            }}*/
        >
        <div className="booking-page">
            <h1>Book a Trip</h1>
            <form onSubmit={handleSubmit} className="booking-form">
                <div>
                    <label htmlFor="fullName"> Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zipcode">zipcode:</label>
                    <input
                        type="text"
                        id="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">zipcode:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">state:</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
            </Formik>
    );
};

export default BookingDetails;
