"use client"
import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const validate = values => {
    const errors = {};
    
    if (!values.password) {
      errors.password = 'Required';
    }
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

export default function ContactPage() {
    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          message: "",
          number: ""
          
        },
        validate,
        onSubmit:  values =>  {
        //    axios.post('http://3.132.48.54:5000/api/users/auth',
        //       {
        //         email:values.email,
        //         password:values.password
        //     }, {
        //         withCredentials: true,
        //         headers: {
        //           'content-type': 'application/json'
        //         }})
        //       .then(function (response) {
    
        //         setUser({...user,isLogged:true,name:response.data.name,checkLogin:false,showLoginOptions:false})
        //          router.push('/')
    
        //       })
        //       .catch(function (error) {
    
        //         if(error.response.status === 400){
        //           setEmailError(error.response.data.message)
        //         }else{
        //           setPasswordError(error.response.data.message)
        //         }
        //       });
        },
      });
    
  return (
    <div className='style_contact_us flex flex-col items-center justify-center min-h-screen py-2 px-4 relative'>
        <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
        
        <form className=" z-[91] flex flex-col justify-center items-center w-[90%] max-w-[500px] md:w-[500px] h-auto "   onSubmit={formik.handleSubmit} >
            <h1 className='text-white z-[99] text-[51px]'>Contact</h1>
            <p className='text-white text-[25px] z-[99]'>How we can  <span className='text-[#FCD33B] mx-2'>assist</span> you?</p>
            <div className=" mt-6 w-full relative">
                <label htmlFor="name" className="block text-white  mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`w-full border  p-3 rounded-lg outline-none ${inter.className}`}           
                />
                {formik.touched.name && formik.errors.name ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.name}</div> : null}
            </div>

            <div className=" mt-6 w-full relative">
                <label htmlFor="email" className="block text-white  mb-1">
                    Email Address
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full border  p-3 rounded-lg outline-none ${inter.className}`}           
                />
                {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
            </div>

            <div className=" mt-6 w-full relative">
                <label htmlFor="number" className="block text-white  mb-1">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="number"
                    name="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.number}
                    className={`w-full border  p-3 rounded-lg outline-none ${inter.className}`}           
                />
                {formik.touched.number && formik.errors.number ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.number}</div> : null}
            </div>

            <div className=" mt-6 w-full relative">
                <label htmlFor="message" className="block text-white  mb-1">
                    Message
                </label>
                <textarea 
                    type="textarea"
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className={`w-full border  p-3 rounded-lg outline-none h-[140px] resize-none ${inter.className}`} 
                />
                {formik.touched.message && formik.errors.message ? <div className="absolute  top-[170px] text-red-600 font-bold">{formik.errors.message}</div> : null}
            </div>

            <button className='z-10 bg-[#FCD33B] py-[8px] px-[40px] rounded-md mt-4  md:mt-5 hover:bg-black hover:text-[#FCD33B] text-lg
                                    lg:mt-10 '><p className='style_banner_button_text font-semibold text-18px]'>Send</p>
            </button>
        </form>

    </div>
  )
}
