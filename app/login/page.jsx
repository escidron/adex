"use client"
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import TextField from "@/components/inputs/TextField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

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
    const [isPending, setIsPending] = useState(false)

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ''
        },
        validate,
        onSubmit: values => {
            toast.dismiss()
            setIsPending(true)
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/auth`,
                {
                    email: values.email,
                    password: values.password
                }, {
                withCredentials: true,
            })
                .then(function (response) {
                    setUser((prev) => (
                        {
                            ...prev, isLogged: true,
                            name: response.data.name,
                            checkLogin: false,
                            showLoginOptions: false,
                            image: response.data.image,
                            userId: response.data.userId,
                            hasPayout: response.data.hasPayout ? true : false,
                            userType: response.data.userType,
                            notifications: response.data.notifications,
                            notificationQuantity: response.data.notificationQuantity
                        }))
                    setTimeout(() => {
                        router.push('/')
                        setIsPending(false)
                    }, 1000);
                })

                .catch(function (error) {
                    setIsPending(false)

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
        <div className=" style_login flex flex-col items-center pt-[150px] md:justify-start min-h-screen py-2 fixed z-[99] top-0 left-0 ">
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
            <form className={`z-[91] flex flex-col justify-center mt-8 items-center w-full px-8 max-w-[500px] h-fit `} onSubmit={formik.handleSubmit} >
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

                <label onClick={() => router.push('/forgot-password')} className="mt-2 ml-auto text-[#FCD33B] hover:opacity-80 cursor-pointer">Forgot Password</label>

                <Button variant='secondary' disabled={isPending} type='submit' className='w-full mt-4 text-lg font-[600]'>
                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                    Login
                </Button>
                <p className="text-white mt-5">Don&apos;t have an account-
                    <label className="text-[#FCD33B] hover:opacity-80 cursor-pointer"
                        onClick={() => {
                            router.push('/sign-up')
                        }}>Sign Up</label>
                </p>
                {/* <Link href={'/sign-up'} disabled={isPending} className='w-full mt-4 text-lg font-[600] inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-[#FCD33B] text-[#FCD33B]  bg-transparent hover:bg-[#FCD33B] hover:text-accent-foreground'>
                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                    Sign Up
                </Link> */}
            </form>
        </div>
    );
}