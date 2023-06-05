"use client"
import Link from "next/link";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';

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

export default function GeneralInfo() {
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

      //  axios.post('http://localhost:8000/api/users/auth',
      //     {
      //       email:values.email,
      //       password:values.password
      //   }, {
      //       withCredentials: true,
      //       headers: {
      //         'content-type': 'application/json'
      //       }})
      //     .then(function (response) {

      //       setUser({...user,isLogged:true,name:response.data.name,checkLogin:false,showLoginOptions:false})
      //        router.push('/')

      //     })
      //     .catch(function (error) {

      //       if(error.response.status === 400){
      //         setEmailError(error.response.data.message)
      //       }else{
      //         setPasswordError(error.response.data.message)
      //       }
      //     });
    },
  });

  return (
    <div className=" flex flex-col items-center  min-h-screen py-2 relative">
      <form className=" z-[91] w-1/2 h-auto mt-8 flex justify-center flex-col"  onSubmit={formik.handleSubmit} >
        <h1 className="text-[30px]">Contact Details</h1>
        <div className="grid grid-cols-2 gap-[20px] ">   
          <div className=" mt-2 w-full relative">
            <label htmlFor="name" className="block   mb-1 ">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border  p-3 rounded-lg outline-none"           
            />
            {formik.touched.name && formik.errors.name ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.name}</div> : null}
          </div>
          
          <div className=" mt-2 w-full relative">
            <label htmlFor="lastname" className="block   mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.lastname && formik.errors.lastname ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.lastname}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <label htmlFor="emal" className="block   mb-1">
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

          <div className=" mt-2 w-full relative">
            <label htmlFor="number" className="block   mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.number && formik.errors.number ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.number}</div> : null}
          </div>
        </div>

        <h1 className="mt-8 text-[30px]" >Personal Information</h1>
        <div className="grid grid-cols-2 gap-[20px] ">   
          <div className=" mt-2 w-full relative">
            <label htmlFor="birthdate" className="block   mb-1 ">
              Date of Birth
            </label>
            <input
              type="text"
              id="birthdate"
              name="birthdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthdate}
              className="w-full border  p-3 rounded-lg outline-none"           
            />
            {formik.touched.birthdate && formik.errors.birthdate ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.birthdate}</div> : null}
          </div>
          
          <div className=" mt-2 w-full relative">
            <label htmlFor="sex" className="block   mb-1">
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sex}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.sex && formik.errors.sex ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.sex}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <label htmlFor="profession" className="block   mb-1">
              Preofession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profession}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.profession && formik.errors.profession ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.profession}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <label htmlFor="bio" className="block   mb-1">
              Biography
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.bio && formik.errors.bio ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.bio}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <label htmlFor="location" className="block   mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="w-full border  p-3 rounded-lg outline-none" 
            />
            {formik.touched.location && formik.errors.location ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.location}</div> : null}
          </div>
        </div>
        <button onClick={()=>onSubmit()} className='style_banner_button max-w-[200px] mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Save</p>
          </button>
      </form>
    </div>
  );
}
