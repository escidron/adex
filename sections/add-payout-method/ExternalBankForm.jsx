"use client"
import axios from 'axios'

import { useState, useContext } from 'react'
import { UserContext } from '../../app/layout';

import { useFormik } from 'formik';
import toast, { Toaster } from "react-hot-toast";
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExternalBankForm({ stripeAccount, setFinish, selectedCompanyId, setHasPayoutMethod }) {
    const [isPending, setIsPending] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const router = useRouter()
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
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/external-bank`,
                {
                    routingNumber: values.routingNumber,
                    accountNumber: values.accountNumber,
                    stripeAccount: stripeAccount,
                    bankAccountName: values.bankName,
                    companyId : selectedCompanyId
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
                        setUser((prev) => ({ ...prev, hasPayout: true }))
                        setHasPayoutMethod(true)
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

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
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
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
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
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
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
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                />
                {formik.touched.confirmAccount && formik.errors.confirmAccount ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.confirmAccount}</div> : null}
            </div>

            <Button disabled={isPending} type="submit" className='w-full mt-6 text-[16px] flex gap-2'>
                {
                    isPending ? (
                        <Loader2 size={18} className='animate-spin' />
                    ) : (
                        <Lock size={18} />
                    )
                }
                Add Payout Method
            </Button>
        </form>
    );
}

