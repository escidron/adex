'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import HelpIcon from '@mui/icons-material/Help';
import { ThreeDots } from 'react-loader-spinner'
import { Divider, Skeleton } from '@mui/material';
import formatNumberInput from '@/utils/formatInputNumbers';
import dayjs from 'dayjs';
import axios from 'axios';
import CancelBooking from '../modals/CancelBooking';
import toast from 'react-hot-toast';
import Countdown, { zeroPad } from 'react-countdown';
import { CalendarIcon, HelpCircle, Info, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { formatPrice } from '@/utils/format';



export default function ApproveReservation({ advertisement, discounts, currentDiscount, setBookingAccepted, setBookingRejected }) {
    const [isPending1, setIsPending1] = useState(false)
    const [isPending2, setIsPending2] = useState(false)
    const [discountOptions, setDiscountOptions] = useState(false);
    const [openCancelBookingModal, setOpenCancelBookingModal] = useState(false);
    const [cancelMessage, setCancelMessage] = useState('');
    const [finishCountdown, setFinishCountdown] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const createdDate = new Date(advertisement.created_at);
    const currentDate = new Date();
    const startDate = new Date(advertisement.start_date);

    const interval1 = Math.abs(startDate - currentDate);
    const interval2 = Math.abs(currentDate - createdDate);
    const fiveDaysInterval = 5 * 24 * 60 * 60 * 1000;
    const availableDays = interval1 / (1000 * 60 * 60 * 24)

    let hasStarted = false
    let countDownDays

    if (currentDate >= startDate) {
        hasStarted = true
    } else {
        if (availableDays < 5) {
            countDownDays = interval1
        } else {
            countDownDays = fiveDaysInterval - interval2
        }
    }

    useEffect(() => {
        console.log('get contract', advertisement)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/get-contract`,
            {
                advertisementId: advertisement.id,
                sellerId: advertisement.created_by,
                buyerId: advertisement.requested_by
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                setFinishCountdown(response.data.cancellation_allowed == '0')
                setIsContentLoaded(true)
            })
            .catch(function (error) {
                console.log(error)
            });

    }, [advertisement]);

    const Booking = () => {
        setIsPending1(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/create-payment-intent`,
            {
                data: advertisement,
                duration: advertisement.duration,
                start_date: advertisement.date.from
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
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/decline-request`,
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

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/cancel-booking`,
            {
                advertisementId: advertisement.id,
                sellerId: advertisement.created_by,
                buyerId: advertisement.requested_by,
                cancelMessage: cancelMessage,

            }, {
            withCredentials: true,
        })
            .then(function (response) {
                toast.success('Booking sucessfuly canceled.')

                router.push('/my-profile?tab=5&sub-tab=1')

            })
            .catch(function (error) {
                toast.error(error.response.data.error)
            });
    }

    const Finished = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/update-cancellation-status`,
            {
                advertisementId: advertisement.id,
                sellerId: advertisement.created_by,
                buyerId: advertisement.requested_by
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                setFinishCountdown(true)
            })
            .catch(function (error) {
                console.log(error)
            });
        return null
    };

    const renderer = ({ total, days, hours, minutes, seconds }) => {
        if (total) {
            // Render a countdown
            return (
                <div style={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>

                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '60px' }}>
                        {zeroPad(days)}
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '10px' }}>
                        :
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '60px' }}>
                        {zeroPad(hours)}
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '10px' }}>
                        :
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '60px' }}>
                        {zeroPad(minutes)}
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '10px' }}>
                        :
                    </span>
                    <span className='text-green' style={{ fontSize: '35px', textAlign: 'center', marginBottom: '0px', width: '60px' }}>
                        {zeroPad(seconds)}
                    </span>
                </div>
            );
        } else {
            // Render a finished state
            return <Finished />;
        }
    };

    if (!isContentLoaded) {
        return (
            <div className={`w-[400px] min-w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-4 `}>
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
    console.log('advertisement', advertisement)
    return (
        <div className={`w-[400px] min-w-[400px] h-fit flex flex-col   shadow-lg rounded-lg border p-4 `}>

            {
                advertisement?.price && (
                    <div className='flex justify-center'>
                        <p className='text-[25px] font-[500]'>{`$${advertisement?.price ? formatNumberInput(advertisement.price.toString()) : ''}`}</p>
                        <p className='flex items-center text-gray-500 '>
                            {advertisement.ad_duration_type == '0' ? '/month' : advertisement.ad_duration_type === '2' ? '/unit' : ''}
                        </p>
                    </div>
                )
            }
            <div className={`w-full flex flex-col  ${advertisement.category_id == 17 ? 'justify-center' : 'justify-between'} gap-2 mt-4`} disabled={true}>
                {
                    advertisement.ad_duration_type == '2' && (

                        <div className='w-[50%]'>
                            <label htmlFor="date" className='mb-1'>Start date</label>
                            <Button
                                variant={"outline"}
                                className="w-[240px] justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(new Date(advertisement.date.from), "PPP")}
                            </Button>
                        </div>
                    )
                }
                {/* todo:implement the rest of ad durations */}
                {
                    advertisement.ad_duration_type == '0' && (
                        <div className='w-full mt-2'>
                            <div className='flex justify-between px-2'>
                                <label htmlFor="date" className='mb-1'>Start date</label>
                                <label htmlFor="date" className='mb-1'>End date</label>
                            </div>
                            <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <div className='w-full flex justify-between'>
                                    <div>
                                        {format(new Date(advertisement.date.from), "PPP")}
                                    </div>
                                    <p>-</p>
                                    <div>
                                        {format(new Date(advertisement.date.to), "PPP")}
                                    </div>
                                </div>
                            </Button>
                        </div>
                    )
                }

            </div>
            <div className='w-full mt-4'>

                {
                    advertisement.ad_duration_type == '0' && (
                        <div className='mt-4 flex justify-between items-center'>
                            <div className='flex gap-2'>
                                <p>{formatPrice(advertisement.price)}</p>
                                <p>x</p>
                                <div className='flex gap-1 '>
                                    <p>{advertisement.duration}</p>
                                    <p>{advertisement.ad_duration_type == '0' ? 'months' : advertisement.ad_duration_type == '2' ? 'units' : ''}</p>
                                </div>
                            </div>
                            <p>{formatPrice(advertisement.price * advertisement.duration)}</p>
                        </div>
                    )
                }
                {
                    currentDiscount > 0 && (

                        <div className='relative mt-2 flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <div onMouseOver={() => setDiscountOptions(true)} onMouseLeave={() => setDiscountOptions(false)}>
                                    {/* <HelpIcon sx={{ fontSize: '16px' }} className='cursor-pointer opacity-80 ' /> */}
                                    <HelpCircle size={17} className='cursor-pointer' />

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
                    <p className='text-[20px] font-[600]'>{formatPrice((advertisement.price * advertisement.duration - (advertisement.price * advertisement.duration) * (currentDiscount / 100)))}</p>
                </div>
            </div>
            {
                advertisement?.status == 4 && (
                    <div className='mt-8'>
                        <Button onClick={Booking} disabled={isPending1 || isPending2 ? true : false} className='w-full'>
                            {
                                isPending1 && (
                                    <Loader2 size={18} className='animate-spin' />
                                )
                            }
                            Accept
                        </Button>
                        <Button variant='outline' onClick={Decline} disabled={isPending2 || isPending1 ? true : false} className='w-full mt-2'>
                            {
                                isPending2 && (
                                    <Loader2 size={18} className='animate-spin' />
                                )
                            }
                            Decline
                        </Button>
                    </div>
                )
            }
            {
                advertisement?.status == 2 && (!finishCountdown || hasStarted) && (
                    <>
                        <button disabled={isPending2 || isPending1 ? true : false} onClick={() => setOpenCancelBookingModal(true)} className={`z-10 flex mt-auto advertisement justify-center border border-black text-black py-[8px] w-full px-[30px] rounded-md  font-[600] ${!isPending2 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg `}>
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
                        setCancelMessage={(message) => setCancelMessage(message)}
                        cancelMessage={cancelMessage}
                        setOpenCancelBookingModal={(closeModal) => setOpenCancelBookingModal(closeModal)}
                    />
                )
            }


            {
                advertisement.status == 2 && !hasStarted && (
                    <>
                        {
                            finishCountdown ? (
                                <div className='flex flex-col justify-center items-center bg-[#FCD33B] mt-auto rounded-lg p-2 relative py-6'>
                                    <p className='text-lg'>Cancellation is no longer possible.</p>
                                </div>
                            ) : (
                                <>
                                    <div className='flex flex-col items-center bg-[#FCD33B] mt-3 rounded-lg p-2 relative pb-8'>
                                        <p>Time Remaining for Cancellation</p>
                                        {/* <Countdown date={Date.now() + 10000} renderer={renderer} /> */}
                                        <Countdown date={Date.now() + (countDownDays)} renderer={renderer} />
                                        {/* <Countdown date={Date.now() + (fiveDaysMiliseconds - millisecondsDifference)} renderer={renderer} /> */}
                                        <div className='flex mt-[-10px] text-[14px]'>
                                            <p className='absolute bottom-[12px] left-[60px]'>Days</p>
                                            <p className='absolute bottom-[12px] left-[130px]'>Hours</p>
                                            <p className='absolute bottom-[12px] left-[195px]'>Minutes</p>
                                            <p className='absolute bottom-[12px] left-[270px]'>Seconds</p>
                                        </div>
                                    </div>
                                    {
                                        advertisement.ad_duration_type == '1' && (
                                            <div className='flex gap-2 mt-2 border p-2 rounded-lg'>
                                                <p className=' text-[14px]'>After the initial 5-day cancellation period, you will only be able to cancel once the booking has already started. Read the Cancelation Policy</p>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </>

                )
            }

        </div>
    )
}
