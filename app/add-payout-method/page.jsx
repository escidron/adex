'use client'
import { useEffect } from 'react';
import Success from '@/components/messages/Success';
import Link from 'next/link';
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';
import PayoutIndividualForm from '@/sections/add-payout-method/PayoutIndividualForm'
import { useState } from 'react'
import PayoutCompanyForm from '@/sections/add-payout-method/PayoutCompanyForm';





export default function AddPayoutMethod() {
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [seller, setSeller] = useState(null);
  const [finish, setFinish] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    async function GetAddress() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/seller-profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const res = await response.json()
        setSeller(res.data);
        if (res.data.stripe_account) {
          setHasAccount(true)
        }
      }
    }
    GetAddress();
  }, [hasAccount]);

  console.log('seller', seller)
  return (
    <div className={`w-full h-full mt-[100px]  flex flex-col justify-center items-center `}>
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
          <h1 className='text-[30px]'>Stripe Verification Form</h1>
          <p className='text-[16px] w-[90%] text-center mb-4'>Complete your listing&apos;s visibility by adding a payout method for receiving payments.</p>
          {seller?.verified_identity === '1' && hasAccount
            ? (
              <ExternalBankForm
                setHasBankAccount={(has) => setHasBankAccount(has)}
                stripeAccount={seller.stripe_account}
                setFinish={(finish) => setFinish(finish)} />
            )
            : seller?.user_type == '2' ? (

              <PayoutIndividualForm setHasAccount={(toggle) => setHasAccount(toggle)} />
            ) : (
              <PayoutCompanyForm setHasAccount={(toggle) => setHasAccount(toggle)} />

            )
          }
        </>
      )
      }
    </div>
  )
}
