'use client'

import CloseIcon from '@mui/icons-material/Close';
import { Inter } from 'next/font/google'
import BlackButton from '../buttons/BlackButton';

const inter = Inter({ subsets: ['latin'] })

export default function CancelBooking({ setOpenCancelBookingModal,setCancelMessage,cancelMessage,cancelBooking }) {

    return (
        <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center'
                onClick={() => setOpenCancelBookingModal(false)}>
            </div>
            <div className='card-payment-modal px-[60px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl w-full lg:w-1/2 max-w-[600px]'>
                <div className='w-full flex justify-end '>
                    <CloseIcon
                        onClick={() => setOpenCancelBookingModal(false)}
                        sx={{ "&:hover": { color: "#FCD33B",cursor:'pointer' } }} />
                </div>
                <div className='w-full max-h-[600px] p-2 mt-2'>
                    <h1 className='text-[30px] text-center'>Cancel Booking</h1>
                    <div className='flex gap-1 items-end'>
                    <p className='mt-4'>Why do you want to cancel this booking?</p>
                    <p className='text-[10px] mb-[2px]'>{`(optional)`}</p>
                    </div>
                    <textarea
                        type="textarea"
                        id="message"
                        name="message"
                        //placeholder='I want to cancel because...'
                        onChange={(e)=>setCancelMessage(e.target.value)}
                        value={cancelMessage}
                        className={`w-full border mt-2 p-3 rounded-lg outline-none h-[140px] resize-none ${inter.className}`}
                    />
                    <p className='text-[12px]'>Your booking will be canceled,you will be refunded within 10 business days</p>
                    <div className='text-end mt-5'>
                        <BlackButton label='Cancel Booking' onClick={cancelBooking}/>
                    </div>
                </div>

            </div>
        </>
    )
}
