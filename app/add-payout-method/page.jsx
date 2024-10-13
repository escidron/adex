'use client'
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';
import PayoutIndividualForm from '@/sections/add-payout-method/PayoutIndividualForm'
import PayoutCompanyForm from '@/sections/add-payout-method/PayoutCompanyForm';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GetSellerProfile from '@/actions/GetSellerProfile';
import GetCompany from '@/actions/GetCompany';

export default function AddPayoutMethod() {
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [seller, setSeller] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [company, setCompany] = useState();
  const router = useRouter()
  const searchParams = useSearchParams()
  const companyId = searchParams.get('company_id')

  useEffect(() => {
    async function GetInfo() {
      const sellerInfo = await GetSellerProfile()
      const companyInfo = await GetCompany(companyId)
      setSeller(sellerInfo)
      if (sellerInfo.stripe_account) {
        setHasAccount(true)
      }
      if(companyInfo.length > 0){
        setCompany(companyInfo[0])
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
            <PayoutCompanyForm setHasAccount={(toggle) => setHasAccount(toggle)} company={company}/>
          )
        }
      </>
    </div>
  )
}
