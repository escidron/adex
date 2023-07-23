"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import TextField from "../inputs/TextField";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address, please enter a valid email';
    }

    return errors;
};

export default function ForgotPassword({ setShowLoginModal, setShowSignUpModal, setShowForgotPasswordModal }) {
    const [emailError, setEmailError] = useState('')
    const [steps, setSteps] = useState(1);
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    const [code6, setCode6] = useState('');
    const [codeOTP, setCodeOTP] = useState('123456');
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        bio: ''
    });
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate,
        onSubmit: values => {
            toast.dismiss()
            setSteps(2)
            // axios.post('http://localhost:8000/api/users/auth',
            //     {
            //         email: values.email,
            //         password: values.password
            //     }, {
            //     withCredentials: true,

            // })
            //     .then(function (response) {
            //         console.log('response', response)
            //         setUser((prev) => (
            //             {
            //                 ...prev, isLogged: true,
            //                 name: response.data.name,
            //                 checkLogin: false,
            //                 showLoginOptions: false,
            //                 image: response.data.image,
            //                 userId: response.data.userId
            //             }))
            //         setShowLoginModal(false)
            //     })
            //     .catch(function (error) {

            //         if (error.response.status === 400) {
            //             toast.error(error.response.data.message, {
            //                 duration: 10000,
            //                 style: {
            //                     width: 'auto',
            //                     padding: '16px',
            //                     minWidth: '450px',
            //                     fontWeight: 500

            //                 }
            //             })
            //         } else {
            //             toast.error(error.response.data.message, {
            //                 duration: 10000,
            //                 style: {
            //                     padding: '8px',
            //                     fontWeight: 500

            //                 }
            //             })
            //         }
            //     });
        },
    });
    const handleConfirm = () => {
        if (codeOTP === code1 + code2 + code3 + code4 + code5 + code6) {
            setSteps(3)
        } else {
            alert('wrong code')
        }
    }
    const handleReset = () => {
            setSteps(4)

    }
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleInputChange = (event, index) => {
        const input = event.target;
        const maxLength = parseInt(input.getAttribute('maxlength'));
        console.log('sssss')
        if (input.value.length >= maxLength) {
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
    };
    console.log(code1 + code2 + code3 + code4 + code5 + code6)
    return (
        <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2 fixed z-[99] top-0 left-0 ">
            <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
            <div><Toaster /></div>
            <div onClick={() => setShowLoginModal(false)} className="z-[91] absolute top-[40px] cursor-pointer">
                <Image
                    src='/adex-logo-white-yellow.png'
                    alt="Adex Logo"
                    width={70}
                    height={70}
                    priority
                />
            </div>
            {
                steps === 1 && (

                    <form className={` z-[91] flex flex-col justify-center  items-center  w-[400px] h-auto ${inter.className}`} onSubmit={formik.handleSubmit} >
                        <p className="text-white text-[36px]">Forgot password?</p>
                        <p className="text-white text-[16px] mt-2">We will send you reset instructions</p>
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

                        <button className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                                   '>Send email
                        </button>
                        <div onClick={() => {
                            setShowForgotPasswordModal(false)
                            setShowLoginModal(true)
                        }} className='mt-3 cursor-pointer border-2 flex justify-center items-center border-[#FCD33B] text-[#FCD33B]  py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-lg'>
                            Back to Login
                        </div>

                    </form>
                )
            }
            {
                steps === 2 && (
                    <div className={` z-[91] flex flex-col justify-center  items-center  w-[400px] h-auto ${inter.className}`}>
                        <p className="text-white text-[30px]">Enter the verification code</p>
                        <p className="text-white text-[16px] mt-2">We have sent you a code to xxxxxxxx</p>
                        {/* <div className="w-full max-w-[400px] flex gap-2 mt-2">
                            <input type="text" value={code1} onChange={(e) => setCode1(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                            <input id="input2" type="text" value={code2} onChange={(e) => setCode2(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                            <input type="text" value={code3} onChange={(e) => setCode3(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                            <input type="text" value={code4} onChange={(e) => setCode4(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                            <input type="text" value={code5} onChange={(e) => setCode5(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                            <input type="text" value={code6} onChange={(e) => setCode6(e.target.value)} className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]" />
                        </div> */}
                        <div className="w-full max-w-[400px] flex gap-2 mt-2">
                            <input
                                type="text"
                                value={code1}
                                onChange={(e) => {
                                    setCode1(e.target.value)
                                    handleInputChange(e, 0)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[0]}
                            />
                            <input
                                type="text"
                                value={code2}
                                onChange={(e) => {
                                    setCode2(e.target.value)
                                    handleInputChange(e, 1)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[1]}
                            />
                            <input
                                type="text"
                                value={code3}
                                onChange={(e) => {
                                    setCode3(e.target.value)
                                    handleInputChange(e, 2)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[2]}
                            />
                            <input
                                type="text"
                                value={code4}
                                onChange={(e) => {
                                    setCode4(e.target.value)
                                    handleInputChange(e, 3)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[3]}
                            />
                            <input
                                type="text"
                                value={code5}
                                onChange={(e) => {
                                    setCode5(e.target.value)
                                    handleInputChange(e, 4)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[4]}
                            />
                            <input
                                type="text"
                                value={code6}
                                onChange={(e) => {
                                    setCode6(e.target.value)
                                    handleInputChange(e, 5)
                                }}
                                className="w-[16%] h-[70px] rounded-lg text-black text-center text-[30px]"
                                maxLength={1}
                                ref={inputRefs[5]}
                            />
                        </div>
                        <div onClick={handleConfirm} className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                                   '>Confirm code
                        </div>
                        <p className="text-white mt-4 ">Did not receive the email?
                            <label href='/login' className="text-[#FCD33B] hover:opacity-80 cursor-pointer" onClick={() => {
                                setShowSignUpModal(false)
                                setShowLoginModal(true)
                            }}>Click to resend</label>
                        </p>
                    </div>
                )
            }
            {
                steps === 3 && (
                    <div className={` z-[91] flex flex-col text-center justify-center text-black  items-center  w-[400px] h-auto ${inter.className}`} >
                        <p className="text-white text-[30px]">Set a new password</p>
                        <p className="text-white text-[16px] mt-2">Your new password must be diferent from previously used passwords</p>

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
                        <div onClick={handleReset} className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                                   '>Reset password
                        </div>
                    </div>
                )
            }
            {
                steps === 4 && (
                    <div className={` z-[91] flex flex-col text-center justify-center text-black  items-center  w-[400px] h-auto ${inter.className}`} >
                    <p className="text-white text-[30px]">Well done!</p>
                    <p className="text-white text-[16px] mt-2">Your new password was reseted successfuly</p>

                    <div onClick={()=>{
                        setShowForgotPasswordModal(false)
                        setShowLoginModal(true)
                    }} className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                               '>Go to Login
                    </div>
                </div>
                )
            }
        </div>
    );
}