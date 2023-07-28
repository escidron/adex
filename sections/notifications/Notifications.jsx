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

export default function Notifications() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ''
      
    },
    validate,
    onSubmit:  values =>  {

      //  axios.post('https://adexconnect.com/api/users/auth',
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
      <label htmlFor="privacy" className="text-[30px] mt-8">ADEX Notifications</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Reminders</h1>
          <p>Wrap up Emails about content you missed</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{marginLeft:'10px'}}/>
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">Advertisement Updates </h1>
          <p>Changes to Advertisement</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">Repost</h1>
          <p>When others repost your content</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>

      <Divider variant="middle" sx={{color:'black',width:'100%',marginTop:'20px',marginBottom:'20px'}} />
      <label htmlFor="privacy" className="text-[30px]">Marketing Communications</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Sales & Promotions</h1>
          <p>We only notify you for significant promotions</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{marginLeft:'10px'}}/>
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">Product updates</h1>
          <p>Major changes in our product offering</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>

      <div className="flex justify-between items-center w-full mt-8 mb-[200px]">
        <div>
          <h1 className="text-[18px] font-bold ">Newsletter</h1>
          <p>Updates on what’s going on here at Adex.</p>
        </div>
        <PinkSwitch {...label} sx={{marginLeft:'10px'}} />
      </div>

    </div>
  )
}


