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
import { Inter } from 'next/font/google'
import Footer from '../footer/Footer';
import { ThreeDots } from 'react-loader-spinner'

const inter = Inter({ subsets: ['latin'] })

export default function StripeForm({ setShowModal, setRefetch }) {
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

        console.log('error', error)
        if (!error) {
            setShowModal(false)
            axios.post('https://test.adexconnect.com/api/payments/customer',
                {
                    cardId: paymentMethod.id,
                    cardNumber: paymentMethod.card.last4,
                    exp_year: paymentMethod.card.exp_year,
                    exp_month: paymentMethod.card.exp_month,
                    nameOnCard: nameOnCard,
                    brand: paymentMethod.card.brand,
                }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(function (response) {

                    setRefetch(true)
                    setIsPending(false)

                })
                .catch(function (error) {

                    console.log(error)
                });
        }
    };

    const handleName = (e) => {
        setNameOnCard(e.target.value)
    }
    return (
        <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center' onClick={() => setShowModal(false)}>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='card-payment-modal px-[30px] py-[15px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl w-[400px]'>
                    <div className='flex justify-between items-center flex-col mb-[20px] '>
                        <div className='flex justify-between items-center mb-[20px] w-full'>
                            <div></div>
                            <h1 className='text-[25px]'>Add Card details</h1>
                            <CloseIcon onClick={() => setShowModal(false)} sx={{ "&:hover": { color: "#FCD33B" } }} />
                        </div>

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
                                className={`w-full border  p-2 rounded-lg outline-none ${inter.className}`}
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
                            <button type="submit" disabled={!stripe || !elements} className={`style_banner_button  mx-auto z-10 bg-black mb-4 w-full py-[6px] px-[20px] h-10 rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg `}>
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
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};