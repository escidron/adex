'use client'

import { Loader2 } from 'lucide-react';
import { DialogTrigger } from '../ui/dialog';

export default function CancelBooking({ setCancelMessage, cancelMessage, cancelBooking, isCancelPending }) {

    return (
            <div className='w-full max-h-[600px] p-2 mt-2'>
                <textarea
                    type="textarea"
                    id="message"
                    name="message"
                    //placeholder='I want to cancel because...'
                    onChange={(e) => setCancelMessage(e.target.value)}
                    value={cancelMessage}
                    className={`w-full border mt-2 p-3 rounded-lg outline-none h-[140px] resize-none `}
                />
                <div className='text-end mt-5'>
                    <DialogTrigger onClick={cancelBooking} disabled={isCancelPending} className='ml-[20px] h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                        Cancel Booking
                        {
                            isCancelPending && (
                                <Loader2 size={18} className='mr-1 animate-spin' />
                            )
                        }
                    </DialogTrigger>
                </div>
            </div>
    )
}
