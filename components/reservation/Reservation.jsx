'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import dayjs, { Dayjs } from 'dayjs';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import CounterComponent from '../counter/CounterComponent';
import { Inter } from 'next/font/google'
import { Divider } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import WarningIcon from '@mui/icons-material/Warning';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';
import formatNumberInput from '@/utils/formatInputNumbers';


const inter = Inter({ subsets: ['latin'] })

export default function Reservation({ data, hasCard, setHasCard, setShowModal, setIsDone, discounts }) {

    const currentDate = new Date();
    let currentDateDay = currentDate.getDate();
    let currentDateMonth = currentDate.getMonth() > 0 ? currentDate.getMonth() - 1 : currentDate.getMonth();
    let currentDateYear = currentDate.getFullYear()
    const [date, setDate] = useState(dayjs(`${currentDateYear}-${currentDate.getMonth()}-${currentDateDay + 1}`));
    const [counter, setCounter] = useState(1);
    const [incomplete, setIncomplete] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [currentDiscount, setCurrentDiscount] = useState(0);
    const [discountOptions, setDiscountOptions] = useState(false);


    const searchParams = useSearchParams()



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
        if (hasCard) {
            setIsPending(true)
            if (data.is_automatic === '1') {
                axios.post('http://localhost:8000/api/payments/create-payment-intent',
                    {
                        data: data,
                        duration: counter,
                        start_date: date,
                        current_discount:currentDiscount
                    }, {
                    withCredentials: true,
                })
                    .then(function (response) {
                        setIsPending(false)
                        setIsDone(true)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                return
            }
            axios.post('http://localhost:8000/api/payments/request-reserve',
                {
                    data: data,
                    duration: counter,
                    start_date: date
                }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(function (response) {
                    setIsPending(false)
                    setIsDone(true)
                })
                .catch(function (error) {
                    console.log(error)
                });
            return
        }
        setIncomplete(true)
        console.log('odes has card')
    }
    console.log('discount', discountOptions)
    return (
        <div className={`w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-4 ${inter.className}`}>
            {data.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''}`}</p>
                    <p className='flex items-center text-gray-500 '>
                        {data.ad_duration_type === '1' ? '/month' : data.ad_duration_type === '2' ? '/quarter' : data.ad_duration_type === '0' ? '/year' : ''}
                    </p>
                </div>
            )}
            <div className=' flex items-center justify-between gap-2 mt-4'>
                <div className='w-[60%]'>
                    <label htmlFor="date" className='mb-1'>Start date</label>
                    <DatePickerComponent
                        id='date'
                        setDate={(date) => setDate(date)}
                    />
                </div>
                <div className='w-[40%] flex flex-col items-center'>
                    <label htmlFor="date" className='mb-1'>Duration</label>

                    <CounterComponent counter={counter} setCounter={(c) => setCounter(c)} />

                </div>
            </div>
            <div className='w-[90%] '>
                <div className='mt-8 flex justify-between items-center'>
                    <p className='font-[600]'>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''} x ${counter} ${data.ad_duration_type === '1' ? 'month' : data.ad_duration_type === '2' ? 'quarter' : 'year'}`}</p>
                    <p>{`$${data?.price ? formatNumberInput((data.price * counter).toString()) : ''}`}</p>
                </div>
                {
                    currentDiscount > 0 && (

                        <div className='relative mt-2 flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <div onMouseOver={()=>setDiscountOptions(true)} onMouseLeave={()=>setDiscountOptions(false)}>
                                    <HelpIcon sx={{ fontSize: '16px' }} className='cursor-pointer opacity-80 ' />
                                </div>
                                <p className='font-[600]'>Long contract discount</p>
                            </div>
                            <p className='text-green-700'>{`-$${data.price * counter * currentDiscount / 100}`}</p>
                            {
                                discountOptions && (
                                    <div className='absolute bg-black top-10 py-2 left-0 w-[360px] rounded-lg  text-white'>
                                    {discounts.map((discount, index) => (
                                    <div key={index}>
                                      <div  className='flex justify-between px-2'>
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
                    <p>{`$${data?.price ? formatNumberInput((data.price * counter - (data.price * counter) * (currentDiscount / 100)).toString()) : ''}`}</p>
                </div>
            </div>
            <button disabled={isPending ? true : false} onClick={Booking} className={`flex item justify-center bg-black text-[#FCD33B] py-[8px] w-full px-[30px] rounded-md mt-4 font-[600] md:mt-5 ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg lg:mt-10 `}>
                {data.is_automatic == '1' ? (

                    isPending ? (
                        <ThreeDots
                            height="30"
                            width="40"
                            radius="9"
                            color="#FCD33B"
                            ariaLabel="three-dots-loading"
                            visible={true}
                        />
                    ) : 'Book'

                ) : 'Request'}
            </button>
            {data.is_automatic === '0' && (
                <p className='text-[12px] mt-2'>You will only be charge if your reserve request is aproved</p>
            )}
            {incomplete && !hasCard && (
                <div className='flex gap-2 items-center mt-2'>
                    <WarningIcon className='text-red-700' sx={{ fontSize: '15px' }} />
                    <h1 className='text-[15px] font-[600]  text-red-700'>Please, provide a <label onClick={() => setShowModal(true)} className='font-[800] cursor-pointer border-b-[1px] border-black'>Payment Method</label></h1>
                </div>
            )}
        </div>
    )
}
