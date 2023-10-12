'use client'
import { useEffect } from 'react';
import Success from '@/components/messages/Success';
import Link from 'next/link';
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';
import PayoutForm from '@/sections/add-payout-method/PayoutForm'
import { useState } from 'react'
import SecondaryButton from '@/components/buttons/SecondaryButton';
import BlackButton from '@/components/buttons/BlackButton';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



export default function AddPayoutMethod() {
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [stripeAccount, setStripeAccount] = useState('');
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    async function GetAddress() {
      const response = await fetch(
        "https://test.adexconnect.com/api/users/seller-profile",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const res = await response.json()
        setStripeAccount((prev) => (res.account));
      }
    }
    GetAddress();
  }, []);

  return (
    <div className={`w-full mt-[90px]  flex flex-col justify-center items-center ${inter.className}`}>
      {finish ? (
        <Success >
          <h1 className='text-[25px]'>Bank Account registered</h1>
          <p className='my-4'>Payout method registered successfuly, now you will receive your funds in this bank account.</p>

          <div className='flex justify-center w-full'>

            <div className='flex flex-col justify-around w-full'>
              <Link href='/listing' className='mt-6 w-full'>
                <button className='mt-6 cursor-pointer flex justify-center items-center bg-black py-[8px] w-full px-[30px] rounded-md  font-[600] text-[#FCD33B] hover:text-black hover:bg-[#FCD33B]  text-lg
                                   '>Create Listing
                </button>

              </Link>
              <Link href='/' className='mt-2'>
                <div className='cursor-pointer border-2 flex justify-center items-center border-black text-black  py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-[#FCD33B] hover:text-black text-lg'>
                  Back to Home
                </div>
              </Link>
            </div>
          </div>
        </Success>
      ) : (
        <>
          <h1 className='text-[34px]'>Create a payout Method</h1>
          <p className='text-[16px] mb-4'>Complete your listing&apos;s visibility by adding a payout method for receiving payments.</p>
          {stripeAccount === ''
            ? (

              <PayoutForm setStripeAccount={(account) => setStripeAccount(account)} />
            )
            : (
              <ExternalBankForm
                setHasBankAccount={(has) => setHasBankAccount(has)}
                stripeAccount={stripeAccount}
                setFinish={(finish) => setFinish(finish)} />
            )}
        </>
      )
      }
    </div>
  )
}
