'use client'
import { useState } from 'react';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import HelpIcon from '@mui/icons-material/Help';
import { ThreeDots } from 'react-loader-spinner'
import WarningIcon from '@mui/icons-material/Warning';
import { Divider } from '@mui/material';
import { Inter } from 'next/font/google'
import formatNumberInput from '@/utils/formatInputNumbers';
import dayjs from 'dayjs';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] })

export default function ApproveReservation({ item }) {
    const [isPending1, setIsPending1] = useState(false)
    const [isPending2, setIsPending2] = useState(false)
    console.log('item', item)
    const discount = 20

    const Booking = () => {
            setIsPending1(true)
            axios.post('http://localhost:8000/api/payments/create-payment-intent',
                {
                    data: item,
                    duration: item.duration,
                    start_date: item.start_date
                }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(function (response) {
                    setIsPending1(false)
                })
                .catch(function (error) {
                    console.log(error)
                });
        

    }

    return (
        <div className={`w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-4 ${inter.className}`}>
            {item.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${item?.price ? formatNumberInput(item.price.toString()) : ''}`}</p>
                    <p className='flex items-center text-gray-500 '>
                        {item.ad_duration_type === '1' ? '/month' : item.ad_duration_type === '2' ? '/quarter' : item.ad_duration_type === '0' ? '/year' : ''}
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
                        currentValue={dayjs(`${item.start_date}`)}
                    />
                </div>
                <div className='w-[50%]'>
                    <label htmlFor="date" className='mb-1'>End date</label>
                    <DatePickerComponent
                        id='date'
                        setDate={(date) => setDate(date)}
                        disabled={true}
                        currentValue={dayjs(`${item.end_date}`)}
                    />

                </div>
            </div>
            <div className='w-[90%] '>
                <div className='mt-8 flex justify-between items-center'>
                    <p className='font-[600]'>{`$${item?.price ? formatNumberInput(item.price.toString()) : ''} x ${item.duration} ${item.ad_duration_type === '1' ? 'month' : item.ad_duration_type === '2' ? 'quarter' : 'year'}`}</p>
                    <p>{`$${item?.price ? formatNumberInput((item.price * item.duration).toString()) : ''}`}</p>
                </div>
                <div className='mt-2 flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <HelpIcon sx={{ fontSize: '16px' }} className='cursor-pointer opacity-80 ' />
                        <p className='font-[600]'>Long contract discount</p>
                    </div>
                    <p className='text-green-700'>{`-$${discount}`}</p>
                </div>

                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

                <div className='mt-2 flex justify-between items-center'>
                    <p className='text-[20px] font-[600]'>Total</p>
                    <p>{`$${item?.price ? formatNumberInput((item.price * item.duration - discount).toString()) : ''}`}</p>
                </div>
            </div>
            <button disabled={isPending1 ? true : false} onClick={Booking} className={`z-10 flex item justify-center bg-black text-[#FCD33B] py-[8px] w-full px-[30px] rounded-md mt-4 font-[600] ${!isPending1 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg`}>
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
            <button disabled={isPending2 ? true : false} onClick={() => { }} className={`z-10 flex item justify-center border border-black text-black mt-2 py-[8px] w-full px-[30px] rounded-md  font-[600] ${!isPending2 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg `}>
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


        </div>
    )
}
