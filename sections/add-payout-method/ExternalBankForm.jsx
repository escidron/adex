"use client"
import { useState,useContext } from 'react'
import { UserContext } from '../../app/layout';

import axios from 'axios'
import Link from 'next/link';
import { useFormik } from 'formik';
import { Inter } from 'next/font/google'
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { ThreeDots } from 'react-loader-spinner'
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })



export default function ExternalBankForm({ setAccount, stripeAccount, setFinish }) {
    const [isPending, setIsPending] = useState(false)
    const [user, setUser] = useContext(UserContext)

    const validate = values => {
        const errors = {};

        if (!values.bankName) {
            errors.bankName = 'Required';
        }

        if (!values.routingNumber) {
            errors.routingNumber = 'Required';
        }

        if (!values.accountNumber) {
            errors.accountNumber = 'Required';
        }


        if (!values.confirmAccount) {
            errors.confirmAccount = 'Required';
        } else if (values.confirmAccount !== values.accountNumber) {
            errors.confirmAccount = 'The account number must be equal';

        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            routingNumber: '',
            accountNumber: '',
            confirmAccount: '',
            bankName: ''
        },
        validate,
        onSubmit: values => {
            setIsPending(true)
            toast.dismiss()
            axios.post('http://localhost:8000/api/payments/external-bank',
                {
                    routingNumber: values.routingNumber,
                    accountNumber: values.accountNumber,
                    stripeAccount: stripeAccount,
                    bankAccountName: values.bankName
                }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        setIsPending(false)
                        setFinish(true)
                        setUser((prev) => ({ ...prev, hasPayout:true }))

                    }
                })
                .catch(function (error) {
                    setIsPending(false)
                    console.log(error)
                    toast.error(error.response.data.error, {
                        duration: 20000,
                        style: {
                            width: 'auto',
                            padding: '16px',
                            minWidth: '550px',
                            fontWeight: 500
          
                        }
                    })
                });
        },
    });

    return (
        <div className={` flex flex-col items-center justify-center min-h-screen py-2  ${inter.className} p-2 `}>
            <div><Toaster /></div>
            <form className="text-black z-[91] relative px-10 py-8 border border-black rounded-lg flex flex-col justify-center items-center  max-w-[500px] min-w-[400px] h-auto " onSubmit={formik.handleSubmit}>
                <Link href='/my-profile' className='absolute top-4 right-4'>
                    <CloseIcon sx={{ "&:hover": { color: "#FCD33B" } }} />
                </Link>
                <p className=" text-[36px]">Bank Account</p>
                <p className=" text-[18px] font-normal mb-6">Enter your bank account details</p>
                <div className=" w-full relative">
                    <div className="flex">
                        <label htmlFor="bankName" className="block  mb-1">
                            Bank Name
                        </label>
                    </div>
                    <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bankName}
                        className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
                    />
                    {formik.touched.bankName && formik.errors.bankName ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.bankName}</div> : null}
                </div>

                <div className=" mt-4 w-full relative ">
                    <div className="flex">
                        <label htmlFor="routingNumber" className="block  mb-1">
                            Routing number
                        </label>
                    </div>
                    <input
                        type="text"
                        id="routingNumber"
                        name="routingNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.routingNumber}
                        className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
                    />
                    {formik.touched.routingNumber && formik.errors.routingNumber ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.routingNumber}</div> : null}
                </div>

                <div className=" mt-4 w-full relative">
                    <div className="flex">
                        <label htmlFor="accountNumber" className="block   mb-1">
                            Account number
                        </label>
                    </div>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.accountNumber}
                        className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
                    />
                    {formik.touched.accountNumber && formik.errors.accountNumber ? <div className="absolute top-[70px] text-red-600 text-[12px]  font-bold">{formik.errors.accountNumber}</div> : null}
                </div>

                <div className=" mt-4 w-full relative">
                    <div className="flex">
                        <label htmlFor="confirmAccount" className="block   mb-1">
                            Confirm account number
                        </label>
                    </div>
                    <input
                        type="text"
                        id="confirmAccount"
                        name="confirmAccount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmAccount}
                        className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
                    />
                    {formik.touched.confirmAccount && formik.errors.confirmAccount ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.confirmAccount}</div> : null}
                </div>

                <button type="submit" className={`flex gap-2 relative justify-center items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md mt-8  md:mt-7 ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg`}>
                    <LockIcon sx={{ fontSize: '18px' }} />
                    <div type="submit" className='style_banner_button_text font-semibold text-[18px] cursor-pointer'>
                        {isPending ? (
                            <ThreeDots
                                height="30"
                                width="40"
                                radius="9"
                                color="#FCD33B"
                                ariaLabel="three-dots-loading"
                                visible={true}
                            />
                        ) : 'Submit'}
                    </div>
                </button>
                {/* <p className=" mt-5 text-[12px]">Afterwards, you will be redirected to a secure enviroment, where you can input your bank account information.</p> */}
            </form>
        </div>
    );
}
