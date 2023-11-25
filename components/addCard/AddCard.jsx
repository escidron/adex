import { useState } from 'react'
import Image from 'next/image';
import BlackButton from '../buttons/BlackButton';
import CloseIcon from '@mui/icons-material/Close';
import StripeForm from './StripeForm';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentMethodList from './PaymentMethodList';


const stripePromise = loadStripe('pk_test_51Hz3inL3Lxo3VPLoBHjjbAES3oCWqKYtTQtgYYPdDhYw8LQboBwmqpz3euwD4KL7x37x0vrFgA2EDu1toAXg6Bo900T7w4sPl5');

export default function AddCard() {
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);

  //todo:request cards
  return (
    <div>
      <div>
        <h1 className={`text-[25px] `}>Payment methods</h1>
        <p className={`text-[18px]  mt-4`}>Once you&apos;ve securely added a payment method through our reliable payment system, you can embark on planning your upcoming journey.</p>
      </div>
      <button onClick={() => setShowModal(true)} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payment Method</p>
      </button>
      <PaymentMethodList refetch={refetch} setRefetch={setRefetch} data={[]}/>
      {showModal && (
        <Elements stripe={stripePromise}>
          <StripeForm setShowModal={(show)=>setShowModal(show)} setRefetch={(refetch)=>setRefetch(refetch)}/>
        </Elements>
      ) }
    </div>
  )
}
