import { useState, useEffect } from 'react'
import BankAccountList from './BankAccountList'
import AddAccountModals from './AddAccountModals';

export default function AddAccount() {
  const [refetch, setRefetch] = useState(false);

  return (
    <div>
      <div>
        <h1 className={`text-[25px] `}>Payout Methods</h1>
        <p className={`text-[18px]  mt-4`}>Choose your preferred payment method to receive your funds</p>
      </div>
      <AddAccountModals setRefetch={setRefetch}/>
      <BankAccountList refetch={refetch} setRefetch={setRefetch} />
    </div>
  )
}
