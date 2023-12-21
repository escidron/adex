"use client"
import Image from "next/image";
import axios from 'axios'
import TextField from "@/components/inputs/TextField";
import toast, { Toaster } from "react-hot-toast";

import { useState, useRef } from "react";
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";



const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address, please enter a valid email';
    }
    return errors;
};

export default function ForgotPasswordPage() {
    const [emailError, setEmailError] = useState('')
    const [steps, setSteps] = useState(1);
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    const [code6, setCode6] = useState('');
    const [codeOTP, setCodeOTP] = useState('123456');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
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
            // Generate a random number between 100000 and 999999 (inclusive)
            const min = 100000;
            const max = 999999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            setCodeOTP(randomNumber)
            setEmail(values.email)
            // send email
            resendEmail(values)
        },
    });

    const resendEmail = (values,resend) => {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setCodeOTP(randomNumber)

        if(!resend){
            setEmail(values.email)
        }
        // send email
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/send-reset-password-email`,
            {
                email: resend?email:values.email,
                codeOTP: randomNumber
            }, {
            withCredentials: true,

        })
            .then(function (response) {
                setSteps(2)
                toast.success(response.data.message)

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
    }
    const handleConfirm = () => {
        if (codeOTP == code1 + code2 + code3 + code4 + code5 + code6) {
            setSteps(3)
        } else {
            toast.error('Wrong code, try again.')
        }
    }
    const handleReset = () => {
        if (newPassword == '') {
            toast.error('Provide a password.')
        } else if (newPassword.length < 8) {
            toast.error('The password must have more than 8 caracters.')
        } else if (newPassword !== confirmPassword) {
            toast.error('The password do not match.')
        } else {

            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/reset-password`,
                {
                    email: email,
                    password: newPassword
                }, {
                withCredentials: true,

            })
                .then(function (response) {
                    console.log('response', response)
                    setSteps(4)
                    toast.success(response.data.message)

                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        toast.error(error.response.data.error, {
                            duration: 10000,
                            style: {
                                width: 'auto',
                                padding: '16px',
                                minWidth: '450px',
                                fontWeight: 500
                            }
                        })
                    } else {
                        toast.error(error.response.data.error, {
                            duration: 10000,
                            style: {
                                padding: '8px',
                                fontWeight: 500

                            }
                        })
                    }
                });
        }

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
        if (input.value.length >= maxLength) {
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
    };
    return (
        <div className="style_login flex flex-col items-center pt-[150px] md:justify-start min-h-screen py-2 fixed z-[99] top-0 left-0  ">
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
            {
                steps === 1 && (

                    <form className={` z-[91] flex flex-col justify-center  items-center w-full px-8 max-w-[500px] h-fit `} onSubmit={formik.handleSubmit} >
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

                        <Button variant='secondary' className='w-full text-lg font-[600] mt-6'>Send Email</Button>
                        <Button variant='outline2' className='w-full text-lg font-[600] mt-3' onClick={()=>router.push('/login')}>Back to Login</Button>


                    </form>
                )
            }
            {
                steps === 2 && (
                    <div className={` z-[91] flex flex-col justify-center  items-center  w-[400px] h-auto `}>
                        <p className="text-white text-[30px]">Enter the verification code</p>
                        <p className="text-white text-[14px] mt-2 w-[120%] text-center">{`We have sent you a code to ${email}`}</p>
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
                                resendEmail({},true)
                            }}>Click to resend</label>
                        </p>
                    </div>
                )
            }
            {
                steps === 3 && (
                    <div className={` z-[91] flex flex-col text-center justify-center text-black  items-center  w-[400px] h-auto `} >
                        <p className="text-white text-[30px]">Set a new password</p>
                        <p className="text-white text-[16px] mt-2">Your new password must be diferent from previously used passwords</p>

                        <div className=" mt-8 w-full relative">
                            <TextField
                                type="password"
                                label='Password'
                                id="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                onBlur={() => { }}
                                value={newPassword}
                            />
                        </div>

                        <div className=" mt-8 w-full relative">
                            <TextField
                                type="password"
                                label='Confirm Password'
                                id="password2"
                                onChange={(e) => { setConfirmpassword(e.target.value) }}
                                onBlur={() => { }}
                                value={confirmPassword}
                            />
                        </div>
                        <div onClick={handleReset} className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                                   '>Reset password
                        </div>
                    </div>
                )
            }
            {
                steps === 4 && (
                    <div className={` z-[91] flex flex-col text-center justify-center text-black  items-center  w-[400px] h-auto `} >
                        <p className="text-white text-[30px]">Well done!</p>
                        <p className="text-white text-[16px] mt-2">Your new password was reseted successfuly</p>

                        <div onClick={() => {
                            router.push('/login')
                        }} className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-black hover:text-[#FCD33B] text-black text-lg
                               '>Go to Login
                        </div>
                    </div>
                )
            }
        </div>
    );
}