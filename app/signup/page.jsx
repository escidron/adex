"use client"
import Link from "next/link";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';

const validate = values => {
  const errors = {};
  
  if (!values.firstName) {
    errors.firstName = 'Required';
  } 

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  
  if (!values.password2) {
    errors.password2 = 'Required';

  }else if(values.password2 !== values.password){
    errors.password2 = 'passwords must be equal'
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function LoginPage() {
  const [user,setUser] = useContext(UserContext)
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
    },
    validate,
    onSubmit:  values =>  {
       axios.post('http://localhost:8000/api/users',
          {
            name:`${values.firstName} ${values.lastName}`,
            firstName:values.firstName,
            lastName:values.lastName,
            phone:values.phone,
            email:values.email,
            password:values.password
        }, {
            headers: {
              'content-type': 'application/json'
            }})
          .then(function (response) {
            setUser({...user,isLogged:true,name:values.firstName,showLoginOptions:false})
            router.push('/')
          })
          .catch(function (error) {
          });
    },
  });

  return (
    <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2  relative">
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>

      <form className=" z-[91] flex flex-col justify-center items-center  w-[400px] h-auto mt-[95px]"  onSubmit={formik.handleSubmit}>
        <p className="text-white text-[36px]">Register</p>
        <p className="text-white text-[18px] font-normal mb-6">Register to access the <span className="text-[#FCD33B]">ADEX</span> Market Place</p>
        
        <div className=" w-full relative">
          <label htmlFor="firstName" className="block text-white  mb-1">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full border  p-3 rounded-lg outline-none "
            
          />
          {formik.touched.firstName && formik.errors.firstName ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.firstName}</div> : null}
        </div>
        
        <div className=" mt-6 w-full relative">
          <label htmlFor="lastName" className="block text-white  mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full border  p-3 rounded-lg outline-none"
          />
          {formik.touched.lastName && formik.errors.lastName ? <div className="absolute top-[80px] text-red-600  font-bold">{formik.errors.lastName}</div> : null}
        </div>
        <div className=" mt-6 w-full relative">
          <label htmlFor="phone" className="block text-white  mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full border  p-3 rounded-lg outline-none"
          />
          {formik.touched.phone && formik.errors.phone ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.phone}</div> : null}
        </div>
        <div className=" mt-6 w-full relative">
          <label htmlFor="email" className="block text-white  mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full border  p-3 rounded-lg outline-none"           
          />
          {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
        </div>
        <div className=" mt-6 w-full relative">
          <label htmlFor="password" className="block text-white  mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full border  p-3 rounded-lg outline-none" 
          />
          {formik.touched.password && formik.errors.password ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.password}</div> : null}
        </div>
        <div className=" mt-6 w-full relative">
          <label htmlFor="password2" className="block text-white  mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            className="w-full border  p-3 rounded-lg outline-none"
          />
          {formik.touched.password2 && formik.errors.password2 ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.password2}</div> : null}
        </div>
        <button type="submit" className='z-10 bg-[#FCD33B] py-[8px] px-[30px] rounded-md mt-8  md:mt-7 hover:bg-black hover:text-[#FCD33B] text-lg'>
            <p className='style_banner_button_text font-semibold text-[18px]'>Sign Up</p>
        </button>
        <p className="text-white mt-5">Have an account? <Link href='/login' className="text-[#FCD33B] hover:opacity-80">Login</Link></p>
      </form>
    </div>
  );
}