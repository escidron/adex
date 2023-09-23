'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import HelpIcon from '@mui/icons-material/Help';
import { ThreeDots } from 'react-loader-spinner'
import { Divider } from '@mui/material';
import { Inter } from 'next/font/google'
import formatNumberInput from '@/utils/formatInputNumbers';
import dayjs from 'dayjs';
import axios from 'axios';
import CancelBooking from '../modals/CancelBooking';
import toast from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] })

export default function ApproveReservation({ advertisement, discounts, currentDiscount,setBookingAccepted,setBookingRejected }) {
    const [isPending1, setIsPending1] = useState(false)
    const [isPending2, setIsPending2] = useState(false)
    const [discountOptions, setDiscountOptions] = useState(false);
    const [openCancelBookingModal, setOpenCancelBookingModal] = useState(false);
    const [cancelMessage, setCancelMessage] = useState('');
    const router = useRouter();

    const Booking = () => {
        setIsPending1(true)
        axios.post('https://test.adexconnect.com/api/payments/create-payment-intent',
            {
                data: advertisement,
                duration: advertisement.duration,
                start_date: advertisement.start_date
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                setIsPending1(false)
                setBookingAccepted(true)
                // setBookingModalOpen(false)
                // setRefresh(prev=>!prev)

            })
            .catch(function (error) {
                console.log(error)
            });

    }

    const Decline = () => {
        setIsPending2(true)
        axios.post('https://test.adexconnect.com/api/payments/decline-request',
            {
                id: advertisement.id,
                requestedBy: advertisement.requested_by

            }, {
            withCredentials: true,
        })
            .then(function (response) {
                setIsPending2(false)
                setBookingRejected(true)
                // setBookingModalOpen(false)
                // setRefresh(prev=>!prev)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const cancelBooking = () => {
        setOpenCancelBookingModal(false)
        axios.post('https://test.adexconnect.com/api/payments/cancel-booking',
            {
                advertisementId: advertisement.id,
                sellerId: advertisement.created_by,
                buyerId: advertisement.requested_by,
                cancelMessage:cancelMessage

            }, {
            withCredentials: true,
        })
            .then(function (response) {
                toast.success('Booking sucessfuly cancelled.')
                router.push('/my-profile?tab=5&sub-tab=1')

            })
            .catch(function (error) {
                toast.error(error.response.data.error)
            });
    }
    return (
        <div className={`w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-4 ${inter.className}`}>

            {advertisement?.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${advertisement?.price ? formatNumberInput(advertisement.price.toString()) : ''}`}</p>
                    <p className='flex items-center text-gray-500 '>
                        {advertisement.ad_duration_type === '1' ? '/months' : advertisement.ad_duration_type === '2' ? '/quarters' : advertisement.ad_duration_type === '3' ? '/years' : ''}
                    </p>
                </div>
            )}
            <div className=' flex items-center justify-between gap-2 mt-4' disabled={true}>
                <div className='w-[50%]'>
                    <label htmlFor="date" className='mb-1'>Start date</label>
                    <DatePickerComponent
                        id='date'
                        setDate={(date) => setDate(date)}
                        disabled={true}
                        currentValue={dayjs(`${advertisement?.start_date}`)}
                    />
                </div>
                {
                    advertisement.ad_duration_type !== '0' && (
                        <div className='w-[50%]'>
                            <label htmlFor="date" className='mb-1'>End date</label>
                            <DatePickerComponent
                                id='date'
                                setDate={(date) => setDate(date)}
                                disabled={true}
                                currentValue={dayjs(`${advertisement?.end_date}`)}
                            />
                        </div>
                    )
                }

            </div>
            <div className='w-[90%] '>

                {
                    advertisement.ad_duration_type !== '0' && (
                        <div className='mt-8 flex justify-between items-center'>
                        <p className='font-[600]'>{`$${advertisement?.price ? formatNumberInput(advertisement?.price.toString()) : ''} ${advertisement.ad_duration_type !== "0" ? `x ${advertisement.duration} ${advertisement.ad_duration_type === '1' ? 'months' : advertisement.ad_duration_type === '2' ? 'quarters' : advertisement.ad_duration_type === '3' ? 'years' : ''}` : ''}`}</p>
                        <p>{`$${advertisement?.price ? formatNumberInput((advertisement.price * advertisement?.duration).toString()) : ''}`}</p>
                    </div>
                    )
                }
                {
                    currentDiscount > 0 && (

                        <div className='relative mt-2 flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <div onMouseOver={() => setDiscountOptions(true)} onMouseLeave={() => setDiscountOptions(false)}>
                                    <HelpIcon sx={{ fontSize: '16px' }} className='cursor-pointer opacity-80 ' />
                                </div>
                                <p className='font-[600]'>Long contract discount</p>
                            </div>
                            <p className='text-green-700'>{`-$${advertisement.price * advertisement.duration * currentDiscount / 100}`}</p>
                            {
                                discountOptions && (
                                    <div className='absolute bg-black top-10 py-2 left-0 w-[360px] rounded-lg  text-white'>
                                        {discounts.map((discount, index) => (
                                            <div key={index}>
                                                <div className='flex justify-between px-2'>
                                                    <div className='flex'>
                                                        <h1 className='text-[12px]'>Contract duration from<label className='font-semibold'>{` ${discount.duration} ${advertisement.ad_duration_type === '1' ? 'months' : advertisement.ad_duration_type === '2' ? 'quarters' : advertisement.ad_duration_type === '3' ? 'years' : ''} `}</label>have a </h1>
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
                    <p>{`$${advertisement?.price ? formatNumberInput((advertisement.price * advertisement.duration - (advertisement.price * advertisement.duration) * (currentDiscount / 100)).toString()) : ''}`}</p>
                </div>
            </div>
            {
                advertisement?.status == 4 ? (
                    <>
                        <button disabled={isPending1 || isPending2 ? true : false} onClick={Booking} className={`z-10 flex advertisement justify-center bg-black text-[#FCD33B] py-[8px] w-full px-[30px] rounded-md mt-4 font-[600] ${!isPending1 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg`}>
                            {
                                isPending1 ? (
                                    <ThreeDots
                                        height="30"
                                        width="40"
                                        radius="9"
                                        color="#FCD33B"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                ) : 'Accept'
                            }
                        </button>
                        <button disabled={isPending2 || isPending1 ? true : false} onClick={Decline} className={`z-10 flex advertisement justify-center border border-black text-black mt-2 py-[8px] w-full px-[30px] rounded-md  font-[600] ${!isPending2 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg `}>
                            {
                                isPending2 ? (
                                    <ThreeDots
                                        height="30"
                                        width="40"
                                        radius="9"
                                        color="black"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                ) : 'Decline'
                            }
                        </button>
                    </>
                ) : ('')
            }
                        {
                advertisement?.status == 2 && (
                    <>
                        <button disabled={isPending2 || isPending1 ? true : false} onClick={()=>setOpenCancelBookingModal(true)} className={`z-10 flex mt-auto advertisement justify-center border border-black text-black py-[8px] w-full px-[30px] rounded-md  font-[600] ${!isPending2 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg `}>
                            {
                                isPending2 ? (
                                    <ThreeDots
                                        height="30"
                                        width="40"
                                        radius="9"
                                        color="black"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                ) : 'Cancel Booking'
                            }
                        </button>
                    </>
                ) 
            }

            {
                openCancelBookingModal && (
                    <CancelBooking 
                        cancelBooking={cancelBooking}
                        setCancelMessage = {(message)=>setCancelMessage(message)}
                        cancelMessage={cancelMessage}
                        setOpenCancelBookingModal={(closeModal)=>setOpenCancelBookingModal(closeModal)}
                    />
                )
            }

        </div>
    )
}
