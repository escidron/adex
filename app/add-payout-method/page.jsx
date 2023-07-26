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
        "https://3.132.48.54:5000/api/users/seller-profile",
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
    <div className={`w-full h-[100vh] flex flex-col justify-center items-center ${inter.className}`}>
      {finish ? (
        <Success >
          <h1 className='text-[25px]'>Bank Account registered</h1>
          <p className='my-4'>Payout method registered successfuly, now you will receive your funds in this bank account.</p>

          <div className='flex justify-center w-full'>

            {/* <Link href='/' className='mt-6' >
              <BlackButton label='Done' />
            </Link> */}
            <div className='flex justify-between w-full'>
              <Link href='/' className='mt-6'>
                <SecondaryButton label='Back home' dark={true} />
              </Link>
              <Link href='/listing' className='mt-6'>
                <BlackButton label='Create Listing' />
              </Link>
            </div>
          </div>
        </Success>
      ) : (
        <>
          <h1 className='text-[35px]'>Create a payout Method</h1>
          <p className='text-[16px] mb-4'>Before create your listing, you need to fill some important informations</p>
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
