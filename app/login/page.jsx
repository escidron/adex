"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import TextField from "@/components/inputs/TextField";



const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address, please enter a valid email';
    }

    return errors;
};

export default function LoginPage() {
    const [user, setUser] = useContext(UserContext)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ''
        },
        validate,
        onSubmit: values => {
            toast.dismiss()
            axios.post('https://test.adexconnect.com/api/users/auth',
                {
                    email: values.email,
                    password: values.password
                }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log('response', response)
                    setUser((prev) => (
                        {
                            ...prev, isLogged: true,
                            name: response.data.name,
                            checkLogin: false,
                            showLoginOptions: false,
                            image: response.data.image,
                            userId: response.data.userId,
                            hasPayout:response.data.hasPayout?true:false

                        }))
                    router.push('/')
                })

                .catch(function (error) {

                    if (error.response.status === 400) {
                        toast.error(error.response.data.message, {
                            duration: 10000,
                            style: {
                                width: 'auto',
                                padding: '16px',
                                minWidth: '450px',
                                fontWeight: 500

                            }
                        })
                    } else {
                        toast.error(error.response.data.message, {
                            duration: 10000,
                            style: {
                                padding: '8px',
                                fontWeight: 500

                            }
                        })
                    }
                });
        },
    });
    return (
        <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2 fixed z-[99] top-0 left-0 ">
            <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
            <div><Toaster /></div>
            <div onClick={() => router.push('/')} className="z-[91] absolute top-[40px] cursor-pointer">
                <Image
                    src='/adex-logo-white-yellow.png'
                    alt="Adex Logo"
                    width={70}
                    height={70}
                    priority
                />
            </div>
            <form className={` z-[91] flex flex-col justify-center  items-center  w-[400px] h-auto `} onSubmit={formik.handleSubmit} >
                <p className="text-white text-[36px]">Login</p>
                <p className="text-white text-[18px] font-normal mt-2">Sign in to <span className="text-[#FCD33B]">continue.</span></p>
                <div className=" mt-6 w-full relative text-black ">
                    <TextField
                        id='email'
                        label='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        errors={formik.errors.email}
                    />

                    {formik.touched.email && formik.errors.email ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.email}</div> : null}
                    {emailError && !formik.errors.email ? <div className="absolute top-[50px]  text-red-600 font-bold ">{emailError}</div> : null}
                </div>

                <div className=" mt-8 w-full relative text-black">
                    <TextField
                        type="password"
                        label='Pasword'
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.password}</div> : null}
                    {passwordError && !formik.errors.password ? <div className="absolute top-[50px]  text-red-600 font-bold ">{passwordError}</div> : null}
                </div>

                <label onClick={()=>router.push('/forgot-password')} className="mt-2 ml-auto text-[#FCD33B] hover:opacity-80 cursor-pointer">Forgot Password ?</label>
                <button className='z-10 bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md mt-4 font-[600] md:mt-5 hover:bg-black hover:text-[#FCD33B] text-black text-lg
                                  lg:mt-10 '>Login
                </button>
                <p className="text-white mt-5">Don&apos;t have an account?
                    <label  className="text-[#FCD33B] hover:opacity-80 cursor-pointer" 
                    onClick={()=>{
                        router.push('/sign-up')
                    }}>Sign Up</label>
                </p>
            </form>
        </div>
    );
}