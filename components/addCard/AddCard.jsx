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

const inter = Inter({ subsets: ['latin'] })
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

export default function AddCard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div>
        <h1 className={`text-[25px] ${inter.className}`}>Payment methods</h1>
        <p className={`text-[18px] ${inter.className} mt-4`}>Once you&apos;ve securely added a payment method through our reliable payment system, you can embark on planning your upcoming journey.</p>
      </div>
      <button onClick={() => setShowModal(true)} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Add Payment Method</p>
      </button>
      {showModal ? (
        <Elements stripe={stripePromise}>
          <StripeForm setShowModal={(show)=>setShowModal(show)}/>
        </Elements>
        // <>
        //   <div className='bg-black w-full h-[100vh] absolute z-[90] top-0 left-0 opacity-30 flex justify-center items-center' onClick={() => setShowModal(false)}>
        //   </div>
        //   <div className='card-payment-modal px-[30px] py-[15px]  bg-white z-[99] left-[50%] rounded-xl min-w-[400px]'>
        //     <div className='flex justify-between items-center mb-[20px]'>
        //       <div></div>
        //       <h1 className='text-[25px]'>Add Card details</h1>
        //       <CloseIcon onClick={() => setShowModal(false)} sx={{ "&:hover": { color: "#FCD33B" } }} />
        //     </div>
        //     <div>
        //       <div className=" mt-2 w-full relative">
        //         <div className="flex">
        //           <label htmlFor="lastName" className="block text-black  mb-1">
        //             Name on the card
        //           </label>
        //         </div>
        //         <input
        //           type="text"
        //           id="lastName"
        //           name="lastName"

        //           className={`w-full border  p-2 rounded-lg outline-none ${inter.className}`}
        //         />
        //       </div>
        //       <div className=" mt-4 w-full relative">
        //         <div className="flex justify-between items-center">
        //           <label htmlFor="lastName" className="block text-black  mb-1">
        //             Card Number
        //           </label>
        //           <div className='flex gap-1 items-center'>
        //             <Image
        //               src='/mastercard.png'
        //               alt="Adex Logo"
        //               priority
        //               width={100}
        //               height={100}
        //               className='w-[28px] '

        //             />
        //             <Image
        //               src='/visa.png'
        //               alt="Adex Logo"
        //               priority
        //               width={100}
        //               height={100}
        //               className='w-[28px] '

        //             />
        //           </div>
        //         </div>
        //         <input
        //           type="text"
        //           id="lastName"
        //           name="lastName"
        //           className={`w-full border  p-2 rounded-lg outline-none ${inter.className}`}
        //         />
        //       </div>
        //       <div className='flex gap-2 mt-4'>

        //         <div className=" mt-2 w-[60%] relative">
        //           <div className="flex">
        //             <label htmlFor="lastName" className="block text-black  mb-1">
        //               Expiration
        //             </label>
        //           </div>
        //           <input
        //             type="text"
        //             id="lastName"
        //             name="lastName"

        //             className={`w-full border  p-2 rounded-lg outline-none ${inter.className}`}
        //           />
        //         </div>
        //         <div className=" mt-2 w-[40%] relative">
        //           <div className="flex">
        //             <label htmlFor="lastName" className="block text-black  mb-1">
        //               CVV
        //             </label>
        //           </div>
        //           <input
        //             type="text"
        //             id="lastName"
        //             name="lastName"

        //             className={`w-full border  p-2 rounded-lg outline-none ${inter.className}`}
        //           />
        //         </div>
        //       </div>
        //     </div>
        //     <div className='mt-8 flex justify-center items-center mx-auto'>
        //       <button className='style_banner_button  mx-auto z-10 bg-black mb-4 w-full py-[6px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg'>
        //         <p className='style_banner_button_text font-medium'>Done</p>
        //       </button>

        //     </div>
        //   </div>
        // </>
      ) : ''}
    </div>
  )
}
