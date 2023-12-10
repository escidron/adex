'use client'

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {
    CardElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from '@stripe/react-stripe-js';
import CloseIcon from '@mui/icons-material/Close';
import { ThreeDots } from 'react-loader-spinner'
import toast, { Toaster } from "react-hot-toast";
import { Button } from '../ui/button';
import { Loader2, Plus } from 'lucide-react';



export default function StripeForm({ setRefetch, setAddCard, companyId }) {
    const stripe = useStripe();
    const elements = useElements();
    const [nameOnCard, setNameOnCard] = useState('');
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPending(true)

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
        });

        if (!error) {
            // setShowModal(false)
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/customer`,
                {
                    cardId: paymentMethod.id,
                    nameOnCard: nameOnCard,
                    companyId:companyId
                }, {
                withCredentials: true,
            })
                .then(function (response) {

                    setRefetch(prev => !prev)
                    setAddCard(false)
                    setIsPending(false)

                })
                .catch(function (error) {

                    console.log(error)
                });
        } else {
            toast.error(error.message)
            setIsPending(false)
        }
    };

    const handleName = (e) => {
        setNameOnCard(e.target.value)
    }
    return (
        <>

            {/* <div><Toaster /></div> */}
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between items-center flex-col mb-[20px] '>
                    <div className=" mt-2 w-full relative">
                        <div className="flex">
                            <label htmlFor="lastName" className="block text-black  mb-1">
                                Name on the card
                            </label>
                        </div>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={nameOnCard}
                            onChange={(e) => handleName(e)}
                            className={`w-full border  p-2 rounded-lg outline-none `}
                        />
                    </div>
                    <div className=" mt-4 w-full relative">
                        <div className="flex justify-between items-center">
                            <label htmlFor="lastName" className="block text-black  mb-1">
                                Card Number
                            </label>
                            <div className='flex gap-1 items-center'>
                                <Image
                                    src='/mastercard.png'
                                    alt="Adex Logo"
                                    priority
                                    width={100}
                                    height={100}
                                    className='w-[28px] '

                                />
                                <Image
                                    src='/visa.png'
                                    alt="Adex Logo"
                                    priority
                                    width={100}
                                    height={100}
                                    className='w-[28px] '

                                />
                            </div>
                        </div>
                        <CardNumberElement />
                    </div>
                    <div className='flex w-full gap-2 mt-4'>

                        <div className='w-[70%]'>
                            <label htmlFor="lastName" className="block text-black  mb-1">
                                Expiration
                            </label>
                            <CardExpiryElement style={{ height: '50px' }} />
                        </div>
                        <div className='w-[30%]'>
                            <label htmlFor="lastName" className="block text-black  mb-1">
                                CVC
                            </label>
                            <CardCvcElement />
                        </div>
                    </div>

                    <div className='mt-8 flex justify-center items-center mx-auto w-full'>
                        {/* <button type="submit" disabled={!stripe || !elements} className={`style_banner_button  mx-auto z-10 bg-black mb-4 w-full py-[6px] px-[20px] h-10 rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg `}>
                            <div className='style_banner_button_text font-semibold text-[18px] text-[#FCD33B] flex items justify-center'>
                                {isPending ? (
                                    <ThreeDots
                                        height="30"
                                        width="40"
                                        radius="9"
                                        color="#FCD33B"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                ) : 'Submit'}
                            </div>
                        </button> */}
                        <Button disabled={isPending} type='submit' className='w-full mt-4 gap-2'>
                            {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                            {
                                !isPending && (
                                    < Plus />
                                )
                            }
                            Add Payment Method
                        </Button>
                    </div>
                </div>
            </form>

        </>
    );
};