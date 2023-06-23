import { useState } from 'react'
import Image from 'next/image';
import { Inter } from 'next/font/google'
import BlackButton from '../buttons/BlackButton';
import CloseIcon from '@mui/icons-material/Close';
import StripeForm from './StripeForm';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentMethodList from './PaymentMethodList';

const inter = Inter({ subsets: ['latin'] })
const stripePromise = loadStripe('pk_test_51NHvGXEPsNRBDePl4YPHJVK6F4AcdLwpcrPwPn7XB1oipDVod3QsFxMw7bBL1eadUeI9O4UorIUS02J1GBOI0g7200jtC5Uh6v');

export default function AddCard() {
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  return (
    <div>
      <div>
        <h1 className={`text-[25px] ${inter.className}`}>Payment methods</h1>
        <p className={`text-[18px] ${inter.className} mt-4`}>Once you&apos;ve securely added a payment method through our reliable payment system, you can embark on planning your upcoming journey.</p>
      </div>
      <PaymentMethodList refetch={refetch} setRefetch={setRefetch}/>
      <button onClick={() => setShowModal(true)} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payment Method</p>
      </button>
      {showModal ? (
        <Elements stripe={stripePromise}>
          <StripeForm setShowModal={(show)=>setShowModal(show)} setRefetch={(refetch)=>setRefetch(refetch)}/>
        </Elements>
      ) : ''}
    </div>
  )
}
