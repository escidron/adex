'use client'
import { useState, useContext } from 'react';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import HelpIcon from '@mui/icons-material/Help';
import { ThreeDots } from 'react-loader-spinner'
import WarningIcon from '@mui/icons-material/Warning';
import { Divider } from '@mui/material';
import { Inter } from 'next/font/google'
import formatNumberInput from '@/utils/formatInputNumbers';
import dayjs from 'dayjs';
import axios from 'axios';
import { RefreshContext } from '@/sections/myAdex/MyAdex';
const inter = Inter({ subsets: ['latin'] })

export default function ApproveReservation({ advertisement }) {
    const [isPending1, setIsPending1] = useState(false)
    const [isPending2, setIsPending2] = useState(false)
    //const [refresh, setRefresh] = useContext(RefreshContext)

    console.log('advertisement', advertisement)
    const discount = 20

    const Booking = () => {
        setIsPending1(true)
        axios.post('http://localhost:8000/api/payments/create-payment-intent',
            {
                data: advertisement,
                duration: advertisement.duration,
                start_date: advertisement.start_date
            }, {
            withCredentials: true,
        })
            .then(function (response) {
                setIsPending1(false)
                // setBookingModalOpen(false)
                // setRefresh(prev=>!prev)

            })
            .catch(function (error) {
                console.log(error)
            });

    }

    const Decline = () => {
        setIsPending2(true)
        axios.post('http://localhost:8000/api/payments/decline-request',
            {
                id: advertisement.id,
                requestedBy:advertisement.requested_by

            }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                setIsPending2(false)
                // setBookingModalOpen(false)
                // setRefresh(prev=>!prev)
            })
            .catch(function (error) {
                console.log(error)
            });


    }

    return (
        <div className={`w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-4 ${inter.className}`}>
            {advertisement?.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${advertisement?.price ? formatNumberInput(advertisement.price.toString()) : ''}`}</p>
                    <p className='flex advertisements-center text-gray-500 '>
                        {advertisement.ad_duration_type === '1' ? '/month' : advertisement.ad_duration_type === '2' ? '/quarter' : advertisement.ad_duration_type === '0' ? '/year' : ''}
                    </p>
                </div>
            )}
            <div className=' flex advertisements-center justify-between gap-2 mt-4' disabled={true}>
                <div className='w-[50%]'>
                    <label htmlFor="date" className='mb-1'>Start date</label>
                    <DatePickerComponent
                        id='date'
                        setDate={(date) => setDate(date)}
                        disabled={true}
                        currentValue={dayjs(`${advertisement?.start_date}`)}
                    />
                </div>
                <div className='w-[50%]'>
                    <label htmlFor="date" className='mb-1'>End date</label>
                    <DatePickerComponent
                        id='date'
                        setDate={(date) => setDate(date)}
                        disabled={true}
                        currentValue={dayjs(`${advertisement?.end_date}`)}
                    />

                </div>
            </div>
            <div className='w-[90%] '>
                <div className='mt-8 flex justify-between advertisements-center'>
                    <p className='font-[600]'>{`$${advertisement?.price ? formatNumberInput(advertisement?.price.toString()) : ''} x ${advertisement?.duration} ${advertisement?.ad_duration_type === '1' ? 'month' : advertisement?.ad_duration_type === '2' ? 'quarter' : 'year'}`}</p>
                    <p>{`$${advertisement?.price ? formatNumberInput((advertisement.price * advertisement?.duration).toString()) : ''}`}</p>
                </div>
                <div className='mt-2 flex justify-between advertisements-center'>
                    <div className='flex advertisements-center gap-1'>
                        <HelpIcon sx={{ fontSize: '16px' }} className='cursor-pointer opacity-80 ' />
                        <p className='font-[600]'>Long contract discount</p>
                    </div>
                    <p className='text-green-700'>{`-$${discount}`}</p>
                </div>

                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

                <div className='mt-2 flex justify-between advertisements-center'>
                    <p className='text-[20px] font-[600]'>Total</p>
                    <p>{`$${advertisement?.price ? formatNumberInput((advertisement?.price * advertisement?.duration - discount).toString()) : ''}`}</p>
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



        </div>
    )
}
