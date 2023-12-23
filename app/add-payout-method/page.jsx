'use client'
import Success from '@/components/messages/Success';
import Link from 'next/link';
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';
import PayoutIndividualForm from '@/sections/add-payout-method/PayoutIndividualForm'
import PayoutCompanyForm from '@/sections/add-payout-method/PayoutCompanyForm';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GetSellerProfile from '@/actions/GetSellerProfile';

export default function AddPayoutMethod() {
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [seller, setSeller] = useState(null);
  const [finish, setFinish] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter()
  useEffect(() => {
    async function GetInfo() {
      const sellerInfo = await GetSellerProfile()
      setSeller(sellerInfo)
      if (sellerInfo.stripe_account) {
        setHasAccount(true)
      }
    }
    GetInfo();
  }, [hasAccount]);

  return (
    <div className={`w-full h-full mt-[100px]  flex flex-col justify-center items-center `}>

      <>
        <h1 className='text-[30px]'>Stripe Verification Form</h1>
        <p className='text-[16px] w-[90%] text-center mb-4'>Complete your listing&apos;s visibility by adding a payout method for receiving payments.</p>
        {seller?.verified_identity === '1' && hasAccount
          ? (
            <ExternalBankForm
              setHasBankAccount={(has) => setHasBankAccount(has)}
              stripeAccount={seller.stripe_account}
              setFinish={() => router.push('/my-profile?tab=5&sub-tab=0')} />
          )
          : seller?.user_type == '2' ? (

            <PayoutIndividualForm setHasAccount={(toggle) => setHasAccount(toggle)} />
          ) : (
            <PayoutCompanyForm setHasAccount={(toggle) => setHasAccount(toggle)} />

          )
        }
      </>
    </div>
  )
}
