import { format, parseISO } from 'date-fns'
import { Separator } from '../ui/separator';

export default function CancellationPolicy({ status, durationType }) {

    const maxCancellationDate = new Date()
    maxCancellationDate.setDate(maxCancellationDate.getDate() + 5);

    return (
        <>
            {/* one time payments */}
            {
                durationType == 1 || durationType == 2 && (
                    <div className='w-full p-2 mt-2'>
                        <div>
                            <h1 className='font-[600]'>Booking starts after {format(maxCancellationDate, "PPP")}</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Cancellation without charges is available until  ${format(maxCancellationDate, "PPP")}`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Payment processing will be initiated after ${format(maxCancellationDate, "PPP")}`}</p>
                            </div>
                        </div>
                        <Separator className='my-3' />
                        <div>
                            <h1 className='font-[600]'>Booking starts on {format(maxCancellationDate, "PPP")} or later</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Cancellation without charges is available until the booking start date.`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`When the booking starts, payment processing will be initiated.`}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* recurrent payments */}
            {
                durationType == 0 && (
                    <div className='w-full p-2 mt-2'>
                        <div>
                            <h1 className='font-[600]'>Booking starts after {format(maxCancellationDate, "PPP")}</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Cancellation without charges is available until  ${format(maxCancellationDate, "PPP")}`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Payment processing will be initiated after ${format(maxCancellationDate, "PPP")}`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`For bookings with a duration of 2 or more months, cancellations are permitted as long as they are made before the monthly billing date.`}</p>
                            </div>
                        </div>
                        <Separator className='my-3' />
                        <div>
                            <h1 className='font-[600]'>Booking starts on {format(maxCancellationDate, "PPP")} or later</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`Cancellation without charges is available until the booking start date.`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`When the booking starts, payment processing will be initiated.`}</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>{`For bookings with a duration of 2 or more months, cancellations are permitted as long as they are made before the monthly billing date.`}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
