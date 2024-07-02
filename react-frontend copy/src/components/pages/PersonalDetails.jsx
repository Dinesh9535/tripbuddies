import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../styles/PersonalDetails.css';
import * as Yup from 'yup';

const PersonalDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [trip, setTrip] = useState('');
    const [address, setAddress] = useState('');
    const [fullName, setFullName] = user.displayName;
    const [email, setEmail] = user.email;
    const [zipcode, setZipcode] = useState('');
    const [gender, setGender] = useState('');
    //const [phone, setPhone] = localStorage.getItem('mobile');
    const [phone, setPhone] = "9123456789";
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    //const [personalInfo, setPersonalInfo] = useState({ fullName, address, email, gender, zipcode, phone, state, country});
    //const history = useHistory();
    const navigateTo = useNavigate();
    const handleSubmit = (values) => {
        values.preventDefault();
        const personalInfo = {
            fullname: values.fullname,
            email: values.email,
            gender: values.gender,
            address: values.address,
            zipcode: values.zipcode,
            phone: values.phone,
            state: values.state,
            country: values.country
        };
        navigateTo('/confirmation', { state: { personalInfo} });
    };
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .min(2, 'Full name must be at least 2 characters')
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        address: Yup.string()
            .min(5, 'Address must be at least 5 characters')
            .required('Address is required'),
        zipcode: Yup.string()
            .matches(/^[0-9]{5}$/, 'Zip code must be exactly 5 digits')
            .required('Zip code is required'),
        country: Yup.string()
            .required('Country is required'),
        state: Yup.string()
            .required('State is required')
    });

    const statesAndUTsOfIndia = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
        "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
    ];
    return (
        <Formik
            initialValues={{ fullname: '', email: '', gender: '', address: '', zipcode: '', phone: '', state: '', country: '' }}
            validationSchema={validationSchema}
     /*       onSubmit={(values, { setSubmitting }) => {
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
    <section className="layout-pt-md layout-pb-lg mt-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="booking-page">
                        <div className="bg-light rounded-12 shadow-2 py-15 px-20">
                    <h2 className="text-30 md:text-24 fw-700 mb-30">
                        Book Your Trip Now!!!
                    </h2>
                </div>
                        <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
                        <form onSubmit={handleSubmit} className="booking-form">
                            <div>
                        <label htmlFor="fullName"> Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            disabled={true}
                        />
                        <ErrorMessage name="fullname" component="div" className="error" />
                    </div>
                            <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            disabled={true}
                            required
                        />
                    </div>
                            <div>
                                <label htmlFor="phone">Mobile No:</label>
                                <input
                                    type="phone"
                                    id="phone"
                                    value={phone}
                                    disabled={true}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="gender">Select Gender:</label>
                                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                    <option value="">Select a Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="nonbinary">Non-Binary</option>
                                </select>
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
                                <label htmlFor="state">Select State:</label>
                                <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
                                    {statesAndUTsOfIndia.map(state => (
                                        <option key={state} value={state} label={state} />
                                    ))}
                                </select>
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
                            <button type="submit" onClick={handleSubmit}>Proceed to Booking Confirmation</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</Formik>

    );
};

export default PersonalDetails;
