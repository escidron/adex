"use client"
import Link from "next/link";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

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

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FCD33B',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'black',
  },
}));

export default function Security() {
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
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className="flex flex-col items-center max-w-[40%] mx-auto ">
      <label htmlFor="privacy" className="text-[30px] mt-8">Privacy</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Public Profile</h1>
          <p>Making your profile public means anyone can see your information</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{marginLeft:'10px'}}/>
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">Show email</h1>
          <p>This lets users find you by your email address</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>

      <Divider variant="middle" sx={{color:'black',width:'100%',marginTop:'20px',marginBottom:'20px'}} />
      <label htmlFor="privacy" className="text-[30px]">Two Fact Authentication</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Authenticator App</h1>
          <p>Google auth or 1Password</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{marginLeft:'10px'}}/>
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">SMS Recovery</h1>
          <p>Standard messaging rates apply</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>
      <Divider variant="middle" sx={{color:'black',width:'100%',marginTop:'20px',marginBottom:'20px'}} />

      <h1 className="text-[30px]">Change Password</h1>
      <form className="flex flex-col mb-[250px] w-[400px]">
        <div className=" mt-2 w-full relative">
          <label htmlFor="current" className="block   mb-1">
            Current Password
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
        <div className=" mt-2 w-full relative">
          <label htmlFor="current" className="block   mb-1">
            New Password
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
        <div className=" mt-2 w-full relative">
          <label htmlFor="current" className="block   mb-1">
          Confirm Password
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
          <button onClick={()=>onSubmit()} className='style_banner_button max-w-[200px] mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Save</p>
          </button>
      </form>
    </div>
  )
}
