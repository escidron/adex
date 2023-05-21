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
  
  if (!values.password) {
    errors.password = 'Required';
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
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ''
      
    },
    validate,
    onSubmit:  values =>  {

       axios.post('http://localhost:8000/api/users/auth',
          {
            email:values.email,
            password:values.password
        }, {
            withCredentials: true,
            headers: {
              'content-type': 'application/json'
            }})
          .then(function (response) {

            setUser({...user,isLogged:true,name:response.data.name,checkLogin:false,showLoginOptions:false})
             router.push('/')

          })
          .catch(function (error) {

            if(error.response.status === 400){
              setEmailError(error.response.data.message)
            }else{
              setPasswordError(error.response.data.message)
            }
          });
    },
  });

  return (
    <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2 relative">
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>

      <form className=" z-[91] flex flex-col justify-center items-center  w-[400px] h-auto"  onSubmit={formik.handleSubmit} >
        <p className="text-white text-[36px]">Login</p>
        <p className="text-white text-[18px] font-normal">Sign in to <span className="text-[#FCD33B]">continue.</span></p>
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
          {emailError && !formik.errors.email?<div className="absolute top-[80px]  text-red-600 font-bold ">{emailError}</div> : null}

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
          {passwordError && !formik.errors.password?<div className="absolute top-[80px]  text-red-600 font-bold ">{passwordError}</div> : null}

          
        </div>

        <Link href='/hello' className="mt-2 ml-auto text-[#FCD33B] hover:opacity-80">Forgot Password ?</Link>
        <button className='z-10 bg-[#FCD33B] py-[8px] px-[30px] rounded-md mt-4  md:mt-5 hover:bg-black hover:text-[#FCD33B] text-lg
                                  lg:mt-10 '><p className='style_banner_button_text font-semibold text-18px]'>Login</p>
        </button>
        <p className="text-white mt-5">Don&apos;t have an account? <Link href='/signup' className="text-[#FCD33B] hover:opacity-80">Sign Up</Link></p>
      </form>
    </div>
  );
}