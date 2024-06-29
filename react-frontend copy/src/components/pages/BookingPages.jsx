

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../styles/CheckoutForm.css';
import CheckoutForm from './CheckoutForm.jsx';

// Make sure to replace with your own publishable key
//const stripePromise = loadStripe('pk_test_51PTgcjBE6NiX0AaVZFPD5CbtebwhsKlgcJ1Y3F8Eg3AiX2Fzlp502ZEKawLntMgnSYa3d2ffZGMWjd0VbCVb2r8400Ww87ajUZ');
const stripePromise = loadStripe('pk_test_51PNGQQP7uV08NbFwBTjw5xHkFaCY3E8x98Vr0eeXolNS9Ti0Vvyx2ps4EgoCga9WXpRSsToGPBnD63xssVcK9FSG00YT9OvQ1w');

// Validation schema using Yup
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
  phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
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
export default function BookingPages() {

  const [bookingStage, setBookingStage] = useState(1)
  return (
     <Formik
         initialValues={{ fullname: '', email: '', address: '', zipcode: '', phone: '', state: '', country: '' }}
         validationSchema={validationSchema}
         onSubmit={(values, { setSubmitting }) => {
           axios.post('https://your-server-endpoint.com/api/submit', values)
               .then(response => {
                 console.log('Form submitted successfully:', response.data);
                 setSubmitting(false);
               })
               .catch(error => {
                 console.error('There was an error submitting the form:', error);
                 setSubmitting(false);
               });
         }}
      >
       {({ isSubmitting, isValid }) => (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-light rounded-12 shadow-2 py-15 px-20">
                <h2 className="text-30 md:text-24 fw-700 mb-30">
                    Book Your Trip Now!!!
                </h2>
            </div>

            <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">

              {bookingStage == 1 &&
              <div>
              <h2 className="text-30 md:text-24 fw-700">
                Let us know who you are
              </h2>

              <div className="row y-gap-30 contactForm pt-30">
                <div className="col-12">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">
                      Full Name:
                    </label>
                    <Field type="text" name="fullname" />
                    <ErrorMessage name="fullname" component="div" className="error" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">
                      Phone Number
                    </label>
                    <Field type="text" name="phone" />
                    <ErrorMessage name="phone" component="div" className="error" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">Country</label>
                    <Field as="select" name="country">
                      <option value="" label="Select country" />
                      <option value="IN" label="India" />
                      <option value="USA" label="United States" />
                      <option value="CAN" label="Canada" />
                      <option value="UK" label="United Kingdom" />
                      {/* Add more country options here */}
                    </Field>
                    <ErrorMessage name="country" component="div" className="error" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">City</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">
                      Address 1
                    </label>
                    <Field type="text" name="address" />
                    <ErrorMessage name="address" component="div" className="error" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">
                      State/Province/Region
                    </label>
                    <Field as="select" name="state">
                      <option value="" label="Select state/UT" />
                      {statesAndUTsOfIndia.map(state => (
                          <option key={state} value={state} label={state} />
                      ))}
                    </Field>
                    <ErrorMessage name="state" component="div" className="error" />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-input ">
                    <label className="lh-1 text-16 text-light-1">
                      ZIP code/Postal code
                    </label>
                    <Field type="text" name="zipcode" />
                    <ErrorMessage name="zipcode" component="div" className="error" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="row y-gap-20 items-center justify-between">
                    <div className="col-auto">
                      <div className="text-14">
                        By proceeding with this booking, I agree to tourz Terms
                        of Use and Privacy Policy.
                      </div>
                    </div>


                  </div>
                </div>

              </div>

              </div>
 }
                {bookingStage == 2 &&
                    <div>
                        <h2 className="text-30 md:text-24 fw-700">
                            Your booking details
                        </h2>

                        <div className="pl-50 md:pl-0">
                            <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
                                <h2 className="text-20 fw-500">Your booking details</h2>

                                <div className="d-flex mt-30">
                                    <img className="w-40" src="/img/Trips-1.jpg" alt="image"  style={{width:80}} />
                                    <div className="ml-20">
                                        Zipline 18 Platform and ATV Adventure Tour From India
                                    </div>
                                </div>

                                <div className="line mt-20 mb-20"></div>

                                <div className="">
                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Date:</div>
                                        <div className="">06 April 2023</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Time:</div>
                                        <div className="">10:00 am</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Duration:</div>
                                        <div className="">12 Days</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Tickets:</div>
                                        <div className="">Adult x2 = ₹ 98</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500"></div>
                                        <div className="">Youth x3 = ₹ 383</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500"></div>
                                        <div className="">Children x6 = ₹ 394</div>
                                    </div>
                                </div>

                                <div className="line mt-20 mb-20"></div>

                                <div className="y-gap-15">
                                    <div className="d-flex justify-between">
                                        <div className="fw-500">Service per booking</div>
                                        <div className=""> ₹ 30.00</div>
                                    </div>
                                    <div className="fw-500">Service per person</div>
                                    <div className="d-flex justify-between">

                                        <div className="fw-500">
                                            1 Adult, 2 Youth, 4 Children
                                        </div>
                                        <div className="">₹ 179.00</div>
                                    </div>
                                </div>

                                <div className="line mt-20 mb-20"></div>

                                <div className="">
                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Subtotal</div>
                                        <div className="">₹ 382</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Total</div>
                                        <div className="">₹ 23</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Amount Paid</div>
                                        <div className="">₹ 3.482</div>
                                    </div>

                                    <div className="d-flex items-center justify-between">
                                        <div className="fw-500">Amount Due</div>
                                        <div className=""> <b> ₹ 43.242 </b></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
                                <h2 className="text-20 fw-500">Do you have a promo code?</h2>

                                <div className="contactForm mt-25">
                                    <div className="form-input ">
                                        <input type="text" required />
                                        <label className="lh-1 text-16 text-light-1">
                                            Promo code
                                        </label>
                                    </div>
                                </div>

                                <button className="button -md -outline-accent-1 text-accent-1 mt-30">
                                    Apply
                                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                                </button>
                            </div>

                            <div className="mt-30">
                                <button className="button -md -dark-1 bg-accent-1 text-white col-12" type="submit" disabled={isSubmitting || !isValid}>
                                    <b>Confirm My Trip Order</b>
                                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                                </button>
                            </div>

                        </div>

                    </div>
                    }
{bookingStage == 3 &&
              <div >
                  <h2 className="text-30 md:text-24 fw-700">
                      Proceed with payment
                  </h2>
                  <div className="row y-gap-30 contactForm pt-30">
                      <div className="col-12">
                              <Elements stripe={stripePromise}>
                                  <CheckoutForm />
                              </Elements>
                      </div>
                      <div className="col-12">
                          <div className="row y-gap-20 items-center justify-between">
                              <div className="col-auto">
                                  <div className="text-14">
                                      By proceeding with this booking, I agree to tourz Terms
                                      of Use and Privacy Policy.
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
            </div>
}

{bookingStage == 4 &&
              <div >
              <div className="d-flex flex-column items-center text-center">
                <div className="size-80 rounded-full flex-center bg-accent-1 text-white">
                  <i className="icon-check text-26"></i>
                </div>

                <h2 className="text-30 md:text-24 fw-700 mt-20">
                  System, your order was submitted successfully!
                </h2>
                <div className="mt-10">
                  Booking details has been sent to: mmanju83@gmail.com
                </div>
              </div>

              <div className="border-dashed-1 py-30 px-50 rounded-12 mt-30">
                <div className="row y-gap-15">
                  <div className="col-md-3 col-6">
                    <div>Order Number</div>
                    <div className="text-accent-2">13119</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Date</div>
                    <div className="text-accent-2">27/07/2021</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Total</div>
                    <div className="text-accent-2">₹ 40.10</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Payment Method</div>
                    <div className="text-accent-2">Direct Bank Transfer</div>
                  </div>
                </div>
              </div>

              <h2 className="text-30 md:text-24 fw-700 mt-60 md:mt-30">
                Order Details
              </h2>

              <div className="d-flex item-center justify-between y-gap-5 pt-30">
                <div className="text-18 fw-500">
                  Westminster Walking Tour & Westminster Abbey Entry
                </div>
                <div className="text-18 fw-500">₹ 382</div>
              </div>

              <div className="mt-25">
                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Date:</div>
                  <div className="">06 April 2023</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Time:</div>
                  <div className="">10:00 am</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Duration:</div>
                  <div className="">12 Days</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Tickets:</div>
                  <div className="">
                    Adult x2 = ₹ 98 - Youth x3 = ₹ 383 - Children x6 = ₹ 394
                  </div>
                </div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="d-flex item-center justify-between y-gap-5">
                <div className="text-18 fw-500">Service per booking</div>
                <div className="text-18 fw-500">₹ 43</div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="d-flex item-center justify-between y-gap-5">
                <div className="text-18 fw-500">
                  Service per person 1 Adult, 2 Youth, 4 Children
                </div>
                <div className="text-18 fw-500">₹ 125</div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="row justify-end">
                <div className="col-md-4">
                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Subtotal</div>
                    <div className="text-18 fw-500">₹ 382</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Total</div>
                    <div className="text-18 fw-500">₹ 23</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Amount Paid</div>
                    <div className="text-18 fw-500">₹ 3.482</div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Amount Due</div>
                    <div className="text-20 fw-600">₹ 43.242</div>
                  </div>
                </div>
              </div>
            </div>
}
            <div className="container d-flex items-center justify-between w-100 mt-60" style={{maxWidth:'400px'}} >

                      <button onClick={()=>setBookingStage(pre=>pre-1)} className={`button -md -dark-1 bg-accent-1 text-white ${bookingStage == 1 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'} `} >
                       Previous
                        {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                      </button>


                      <button onClick={()=>setBookingStage(pre=>pre+1)} style={{alignSelf:'end'}}  className={`button -md -dark-1 bg-accent-1 text-white ${bookingStage == 3 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'} `}>
                       <b>Next </b>
                        <i className="icon-arrow-top-right text-16 ml-10"></i>
                      </button>
                    </div>
            </div>

          </div>
        </div>
      </div>
    </section>
       )}
   </Formik>
  );
}
