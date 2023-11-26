'use client'

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';

import dayjs, { Dayjs } from 'dayjs';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import CounterComponent from '../counter/CounterComponent';
import { Divider, Skeleton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';
import formatNumberInput from '@/utils/formatInputNumbers';
import toast from "react-hot-toast";
import { UserContext } from '../../app/layout';
import { HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DateFieldComponent } from '../datePicker/DateFieldComponent';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../addCard/StripeForm';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodList from '../addCard/PaymentMethodList';
import GetPaymentMethod from '@/actions/GetPaymentMethod';

const stripePromise = loadStripe('pk_test_51Hz3inL3Lxo3VPLoBHjjbAES3oCWqKYtTQtgYYPdDhYw8LQboBwmqpz3euwD4KL7x37x0vrFgA2EDu1toAXg6Bo900T7w4sPl5');


export default function Reservation({ data, hasCard, setShowModal, setIsBooked, setIsRequested, discounts, isContentLoaded }) {

    const [date, setDate] = useState('');
    const [counter, setCounter] = useState(1);
    const [incomplete, setIncomplete] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [currentDiscount, setCurrentDiscount] = useState(0);
    const [discountOptions, setDiscountOptions] = useState(false);
    const [user, setUser] = useContext(UserContext)
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [addCard, setAddCard] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function getInfo() {
            const cards = await GetPaymentMethod()
            setPaymentMethods(cards)
        }
        getInfo();

    }, [refetch]);

    useEffect(() => {
        if( !date ){
            if( data.ad_duration_type != '1' ){

                setDate(new Date(data.first_available_date))
            }else{
                setDate(new Date(data.date.from))
            }
        }

    }, []);

    useEffect(() => {
        let hasDiscount = false
        discounts.map((item) => {
            if (counter >= item.duration) {
                hasDiscount = true
                setCurrentDiscount(item.discount)
            }
        })
        if (!hasDiscount) {
            setCurrentDiscount(0)
        }

    }, [counter]);

    const Booking = () => {
        router.push('my-profile?tab=5&sub-tab=1')

        if (user.isLogged) {
            if (paymentMethods.length > 0) {
                setIsPending(true)
                axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/request-reserve`,
                    {
                        data: data,
                        duration: counter,
                        start_date: date
                    }, {
                    withCredentials: true,
                })
                    .then(function (response) {
                        setIsPending(false)
                        setIsRequested(true)
                        router.push('/my-profile?tab=5')
                    })
                    .catch(function (error) {
                        console.log('error', error)
                    });
                return
            }
            setIncomplete(true)
        } else {
            console.log('entrou no false')
            router.push('/login')
        }
    }


    if (!isContentLoaded) {
        return (
            <div className={`w-[400px] min-w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-2 `}>
                <Skeleton variant="rounded" width={'100%'} height={120} />
                <div className='mt-8'>
                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                </div>
                <div className='mt-6'>

                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                </div>
                <div className='mt-auto'>
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                </div>
            </div>
        )
    }
    console.log('data', data)
    console.log('refetch', refetch)
    console.log('DATE', date)
    return (
        <div className={`w-[350px] h-fit flex flex-col   shadow-lg rounded-lg border p-4 `}>
            {data.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''}`}</p>
                    <p className='flex items-center text-gray-500 '>
                        {data.ad_duration_type == '0' ? '/months' : data.ad_duration_type == '2' ? '/units' : ''}
                    </p>
                </div>
            )}
            <div className={` flex items-center  ${data.category_id == 17 ? 'justify-center' : 'justify-between'} mt-4`}>

                {
                    data.ad_duration_type != '1' && (
                        <>
                            <div className='w-[65%]'>
                                <label htmlFor="date" className='mb-1'>Start date</label>
                                <DateFieldComponent
                                    date={date ? date : data.first_available_date}
                                    setDate={(newDate) => setDate(newDate)}
                                    disabledDate={data.first_available_date}
                                />
                            </div>
                            <div className='w-[35%] flex flex-col items-center justify-end'>
                                <label htmlFor="date" className='mb-1'>{data.ad_duration_type == '2' ? 'Units' : 'Duration'}</label>
                                <CounterComponent counter={counter} setCounter={(c) => setCounter(c)} />
                            </div>
                        </>
                    )
                }

            </div>
            <div className='w-full'>
                <div className='mt-4 flex justify-between items-center'>
                    <p className=''>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''} ${data.ad_duration_type != "1" ? `x ${counter} ${data.ad_duration_type === '1' ? 'months' : data.ad_duration_type === '2' ? 'quarters' : data.ad_duration_type === '3' ? 'years' : ''}` : data.category_id == 17 ? `x ${counter}` : ''}`}</p>
                    <p>{`$${data?.price ? formatNumberInput((data.price * counter).toString()) : ''}`}</p>
                </div>
                {
                    currentDiscount > 0 && (

                        <div className='relative mt-2 flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <div onMouseOver={() => setDiscountOptions(true)} onMouseLeave={() => setDiscountOptions(false)}>
                                    <HelpCircle size={17} className='cursor-pointer' />
                                </div>
                                <p className='font-[600]'>Long contract discount</p>
                            </div>
                            <p className='text-green-700'>{`-$${data.price * counter * currentDiscount / 100}`}</p>
                            {
                                discountOptions && (
                                    <div className='absolute bg-black top-10 py-2 left-0 w-[360px] rounded-lg  text-white'>
                                        {discounts.map((discount, index) => (
                                            <div key={index}>
                                                <div className='flex justify-between px-2'>
                                                    <div className='flex'>
                                                        <h1 className='text-[12px]'>Contract duration from<label className='font-semibold'>{` ${discount.duration} ${data.ad_duration_type === '1' ? 'months' : data.ad_duration_type === '2' ? 'quarters' : data.ad_duration_type === '3' ? 'years' : ''} `}</label>have a </h1>
                                                        <h1 className='text-[12px] font-bold ml-1'>{` ${discount.discount}% discount`}</h1>
                                                    </div>
                                                </div>
                                                <Divider variant="" sx={{ color: 'white', width: '100%', marginTop: '5px', marginBottom: '5px' }} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

                <div className='mt-2 flex justify-between items-center'>
                    <p className='text-[20px] font-[600]'>Total</p>
                    <p className='font-[600]'>{`$${data?.price ? formatNumberInput((data.price * counter - (data.price * counter) * (currentDiscount / 100)).toString()) : ''}`}</p>
                </div>
            </div>

            {
                data.status == '1' && (
                    // <Button onClick={Booking} className='mt-4 '>
                    //     Request
                    // </Button>
                    <Dialog className='w-full '>
                        <DialogTrigger className='w-full mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                            Request Booking
                        </DialogTrigger>
                        <DialogContent className='w-full max-w-[550px]'>
                            {
                                (paymentMethods?.length == 0 || addCard) && (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Add Card Details</DialogTitle>
                                            <DialogDescription>
                                                You will only be charge if your request is approved.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Elements stripe={stripePromise}>
                                            <StripeForm
                                                setRefetch={(toggle) => setRefetch(toggle)}
                                                setAddCard={(toggle) => setAddCard(toggle)}
                                            />
                                        </Elements>
                                    </>
                                )
                            }
                            {
                                (paymentMethods?.length > 0 && !addCard) && (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Confirm the Payment Method</DialogTitle>
                                            <DialogDescription>
                                                You will only be charge if your request is approved.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className='max-h-[400px] overflow-y-auto invisible_scroll_bar'>

                                            <PaymentMethodList
                                                data={paymentMethods}
                                                setRefetch={(toggle) => setRefetch(toggle)}

                                            />
                                        </div>
                                        <DialogFooter className='mt-4'>
                                            <div className='w-full flex justify-around items-center'>
                                                <Button variant='outline' onClick={() => setAddCard(true)}>Add Card</Button>
                                                {/* <Button type="submit" onClick={Booking}>Send Request</Button> */}
                                                <Button disabled={isPending} type='submit' onClick={Booking}>
                                                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                        
                                                    Send Request
                                                </Button>
                                            </div>
                                        </DialogFooter>
                                    </>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                )
            }
            {/* {data.status == '1' && (
                <p className='text-[12px] mt-2'>You will only be charge if your reserve request is aproved</p>
            )} */}
            {incomplete && !hasCard && (
                <div className='flex gap-2 items-center mt-2'>
                    <WarningIcon className='text-red-700' sx={{ fontSize: '15px' }} />
                    <h1 className='text-[15px] font-[600]  text-red-700'>Please, provide a <label onClick={() => setShowModal(true)} className='font-[800] cursor-pointer border-b-[1px] border-black'>Payment Method</label></h1>
                </div>
            )}
        </div>
    )
}
