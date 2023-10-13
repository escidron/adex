"use client"
import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import TextField from '@/components/inputs/TextField';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';




export default function ContactPage() {
  const router = useRouter();

  const validate = values => {
    const errors = {};
  
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.number) {
      errors.number = 'Required';
    }
    if (!values.message) {
      errors.message = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      message: ""

    },
    validate,
    onSubmit: values => {

      console.log(        {
            name: values.name,
            email: values.email,
            number:values.number,
            message: values.message
          })
      axios.post('https://test.adexconnect.com/api/users/contact-us',
        {
          name: values.name,
          email: values.email,
          number:values.number,
          message: values.message
        }, {
        withCredentials: true,
      })
        .then(function (response) {
          toast.success('Thank you for contacting us! We will get back to you shortly.')
          router.push('/')
        })
        .catch(function (error) {
          toast.error('Something went wrong, please try again.')
        });
    },
  });

  return (
    <div className='style_contact_us flex flex-col items-center justify-center min-h-screen py-2 px-4 relative'>
      <div><Toaster /></div>
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
      <form className=" z-[91] flex flex-col justify-center items-center w-[90%] max-w-[500px] md:w-[500px] h-auto " onSubmit={formik.handleSubmit} >
        <h1 className='text-white z-[99] text-[51px]'>Contact</h1>
        <p className='text-white text-[25px] z-[99]'>How we can  <span className='text-[#FCD33B] mx-2'>assist</span> you?</p>
        <div className=" mt-6 w-full relative">
          <TextField
            id='name'
            label='Full name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            errors={formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.name}</div> : null}
        </div>

        <div className=" mt-6 w-full relative">
          <TextField
            id='email'
            label='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errors={formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.email}</div> : null}
        </div>

        <div className=" mt-6 w-full relative">
          {/* <label htmlFor="number" className="block text-white  mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className={`w-full border  p-3 rounded-lg outline-none `}
          /> */}
          <TextField
            id='number'
            label='Phone Number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            errors={formik.errors.number}
          />
          {formik.touched.number && formik.errors.number ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.number}</div> : null}
        </div>

        <div className=" mt-6 w-full relative">
          <textarea
            type="textarea"
            id="message"
            name="message"
            placeholder='Message ...'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`w-full border  p-3 rounded-lg outline-none h-[140px] resize-none `}
          />
          {formik.touched.message && formik.errors.message ? <div className="absolute  top-[140px] text-red-600 font-bold">{formik.errors.message}</div> : null}
        </div>

        <button className='z-10 bg-[#FCD33B] w-full py-[8px] px-[40px] rounded-md mt-4  md:mt-5 hover:bg-black hover:text-[#FCD33B] text-lg
                                    lg:mt-10 '><p className='style_banner_button_text font-semibold text-18px]'>Send message</p>
        </button>
      </form>

    </div>
  )
}
