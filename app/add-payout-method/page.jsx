'use client'
import Success from '@/components/messages/Success';
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';
import PayoutForm from '@/sections/add-payout-method/PayoutForm'
import { useState } from 'react'

export default function AddPayoutMethod() {
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [stripeAccount, setStripeAccount] = useState('acct_1NKSsSE4vGANdECH');
  const [finish, setFinish] = useState(false);

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      {finish ? (
        <Success message='Bank Account registered successfuly' redirect='my-profile'/>
      ) : (
        <>
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
