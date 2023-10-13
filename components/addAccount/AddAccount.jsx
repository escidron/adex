import {useState} from 'react'
import Link from 'next/link'
import BankAccountList from './BankAccountList'


export default function AddAccount() {
  const [refetch, setRefetch] = useState(false);

  return (
    <div>
      <div>
        <h1 className={`text-[25px] `}>Payout methods</h1>
        <p className={`text-[18px]  mt-4`}>Choose your preferred payment method to receive your funds</p>
      </div>
      <Link href='/add-payout-method'>
        <button className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payout Method</p>
        </button>
      </Link>
      <BankAccountList refetch={refetch} setRefetch={setRefetch}/>
    </div>
  )
}
