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

      //  axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/auth`,
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
    <div className="flex flex-col items-center w-[80%] lg:max-w-[700px] mx-auto ">
      <label htmlFor="privacy" className="text-[30px] mt-8">ADEX Notifications</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Email Notifications</h1>
          <p>Enable email notifications</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{marginLeft:'10px'}}/>
      </div>

      {/* <div className="flex justify-between items-center w-full mt-8">
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
      </div> */}
    </div>
  )
}


