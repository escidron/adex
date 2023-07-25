"use client"
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import TextField from "@/components/inputs/TextField";
import { ThreeDots } from "react-loader-spinner";
import { styled } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";



const PinkSwitch =styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FCD33B',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'black',
  },
}));

export default function Security() {
 const [isPending, setIsPending] = useState();
  
  const validate = values => {
    const errors = {};
  
    if (!values.current) {
      errors.current = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }else if (values.password.length < 8){
      errors.password = 'The password must have more than 8 caracters.';

    }

    if (!values.password2) {
      errors.password2 = 'Required';
  
    } else if (values.password2 !== values.password) {
      errors.password2 = 'passwords must be equal'
    }
  
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      current:'',
      password: '',
      password2: ''

    },
    validate,
    onSubmit: values => {
      setIsPending(true)
      console.log(          {
        newPassword:values.password,
        current:values.current
    })
       axios.post('http://localhost:8000/api/users/change-password',
          {
            newPassword:values.password,
            current:values.current
        }, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log('response',response)
            setIsPending(false)
            toast.success(response.data.message)

          })
          .catch(function (error) {
            setIsPending(false)
            if (error.response.status === 401) {
              toast.error(error.response.data.error, {
                  duration: 5000,
                  style: {
                      width: 'auto',
                      padding: '16px',
                      minWidth: '450px',
                      fontWeight: 500
                  }
              })
          } else {
              toast.error(error.response.data.error, {
                  duration: 5000,
                  style: {
                      padding: '8px',
                      fontWeight: 500

                  }
              })
          }
          });
    },
  });
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className="flex flex-col items-center max-w-[40%] mx-auto ">
      <div><Toaster /></div>
      <label htmlFor="privacy" className="text-[30px] mt-8">Privacy</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Public Profile</h1>
          <p>Making your profile public means anyone can see your information</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{ marginLeft: '10px' }} />
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">Show email</h1>
          <p>This lets users find you by your email address</p>
        </div>
        <PinkSwitch {...label} sx={{ marginLeft: '10px' }} />
      </div>

      <Divider variant="middle" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />
      <label htmlFor="privacy" className="text-[30px]">Two Fact Authentication</label>
      <div className="flex justify-between items-center  w-full mt-8">
        <div className="">
          <h1 className="text-[18px] font-bold ">Authenticator App</h1>
          <p>Google auth or 1Password</p>
        </div>
        <PinkSwitch {...label} defaultChecked sx={{ marginLeft: '10px' }} />
      </div>

      <div className="flex justify-between items-center w-full mt-8">
        <div>
          <h1 className="text-[18px] font-bold ">SMS Recovery</h1>
          <p>Standard messaging rates apply</p>
        </div>
        <PinkSwitch {...label} sx={{ marginLeft: '10px' }} />
      </div>
      <Divider variant="middle" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

      <h1 className="text-[30px]">Change Password</h1>
      <form className="flex flex-col mb-[250px] w-[400px]" onSubmit={formik.handleSubmit}>
        <div className=" mt-8 w-full relative">
          <TextField
            type="current"
            label='Current Password'
            id="current"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.current}
            erros={formik.errors.current}
          />
          {formik.touched.current && formik.errors.current ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.current}</div> : null}
        </div>
        <div className=" mt-8 w-full relative">
          <TextField
            type="password"
            label='Password'
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            erros={formik.errors.password}
          />
          {formik.touched.password && formik.errors.password ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.password}</div> : null}
        </div>

        <div className=" mt-8 w-full relative">
          <TextField
            type="password"
            label='Confirm Password'
            id="password2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            erros={formik.errors.password2}
          />
          {formik.touched.password2 && formik.errors.password2 ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.password2}</div> : null}
        </div>
        <button disabled={isPending? true : false} type="submit" className={`flex justify-center items-center bg-black font-[600] py-[8px] text-[#FCD33B] px-[30px] rounded-md mt-6 w-full ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg`}>
          {isPending ? (
            <ThreeDots
              height="30"
              width="40"
              radius="9"
              color="#FCD33B"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : 'Change password'}

        </button>
      </form>
    </div>
  )
}
