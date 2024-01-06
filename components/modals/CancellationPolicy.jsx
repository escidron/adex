import { format, parseISO } from 'date-fns'
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import diferenceBetweenDates from '@/utils/diferenceBetweenDates';

export default function CancellationPolicy({ data }) {
    const [maxCancellationDate, setMaxCancellationDate] = useState(new Date());
    const [exampleDate, setExampleDate] = useState(new Date());

    useEffect(() => {
        let exampleDate = new Date()
        const cancellationDate = new Date();
        cancellationDate.setDate(maxCancellationDate.getDate() + 6);

        if (data.date.from) {
            const diferencaInDays = diferenceBetweenDates(data.date.from)
            if (diferencaInDays > 5) {
                setMaxCancellationDate(cancellationDate)
                exampleDate.setMonth(maxCancellationDate.getMonth() + 1)
                exampleDate.setDate(Math.min(exampleDate.getDate() + 6, new Date(exampleDate.getFullYear(), exampleDate.getMonth() + 1, 0).getDate()));
                setExampleDate(exampleDate)

            } else {
                setMaxCancellationDate(new Date(data.date.from))
                exampleDate.setMonth(new Date(data.date.from).getMonth() + 1)
                exampleDate.setDate(Math.min(exampleDate.getDate() + 6, new Date(exampleDate.getFullYear(), exampleDate.getMonth() + 1, 0).getDate()));

                setExampleDate(exampleDate)
            }
        } else {
            setMaxCancellationDate(cancellationDate)
            exampleDate.setMonth(cancellationDate.getMonth() + 1)
            exampleDate.setDate(Math.min(exampleDate.getDate() + 6, new Date(exampleDate.getFullYear(), exampleDate.getMonth() + 1, 0).getDate()));
            setExampleDate(exampleDate)
        }


    }, []);
    return (
        <>
            {/* one time payments */}
            {
                (data.ad_duration_type == 1 || data.ad_duration_type == 2) && (
                    <>
                        <p>Cancellation is allowed within a period of five (5) calendar days after booking. Below, an example is provided, assuming that the booking takes place today. Additionally, if the start date of the listing is less than 5 days away, the maximum cancellation date will be set to the listing&apos;s start date.</p>
                        <div className='w-full p-2 mt-2'>
                            <h1 className='font-[600]'>Cancel before {format(maxCancellationDate, "MMM d")}</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>There will be no charge.</p>
                            </div>
                            <Separator className='my-3' />
                            <h1 className='font-[600]'>No cancellation is available on {format(maxCancellationDate, "MMM d")}, or later</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>The full amount will be charged.</p>
                            </div>
                        </div>
                    </>
                )
            }
            {/* recurrent payments */}
            {
                data.ad_duration_type == 0 && (
                    <>
                        <p>Cancellation is allowed within five (5) calendar days after booking. For listings with a duration exceeding one month, cancellation of the upcoming month&apos;s payments must occur before the monthly billing date to prevent any new charges. Below, an example is provided, assuming that the booking takes place today and has a duration of 2 months.</p>
                        <div className='w-full p-2 mt-2'>
                            <h1 className='font-[600]'>Cancel before {format(maxCancellationDate, "MMM d")}</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>There will be no charge.</p>
                            </div>
                            <Separator className='my-3' />
                            <h1 className='font-[600]'>Cancel between {format(maxCancellationDate, "MMM d")} and {format(exampleDate, "MMM d")}</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>There will be charges for the first month.</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'> There will be no charges for the second month.</p>
                            </div>
                            <Separator className='my-3' />
                            <h1 className='font-[600]'>No cancellation is available on {format(exampleDate, "MMM d")}, or later</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>There will be charges for the second month.</p>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
