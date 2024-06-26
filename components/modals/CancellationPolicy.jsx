import { format } from 'date-fns'
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import diferenceBetweenDates from '@/utils/diferenceBetweenDates';

export default function CancellationPolicy({ data, date }) {
    const [maxCancellationDate, setMaxCancellationDate] = useState(new Date());
    const [exampleDate, setExampleDate] = useState(new Date());
    useEffect(() => {
        const cancellationDate = new Date();
        cancellationDate.setDate(maxCancellationDate.getDate() + 6);

        if (data.ad_duration_type == 1 || data.ad_duration_type == 2) {
            oneTimeCancellationDate(cancellationDate)
        } else {
            recurrentTimeCancellationDate(cancellationDate)
        }
    }, []);

    const oneTimeCancellationDate = (cancellationDate) => {
        const startDate = data.date.from ? data.date.from : date
        if (startDate) {
            const diferencaInDays = diferenceBetweenDates(startDate)
            if (diferencaInDays > 5) {
                setMaxCancellationDate(cancellationDate)
                exampleDate.setMonth(maxCancellationDate.getMonth() + 1)
                exampleDate.setDate(Math.min(exampleDate.getDate() + 6, new Date(exampleDate.getFullYear(), exampleDate.getMonth() + 1, 0).getDate()));
                setExampleDate(exampleDate)

            } else {
                const newStartDate = new Date(startDate)
                newStartDate.setDate(newStartDate.getDate()-1);
                setMaxCancellationDate(newStartDate)
                const exampleDate = newStartDate
                exampleDate.setMonth(newStartDate.getMonth() + 1)
                setExampleDate(exampleDate)
            }
        } else {
            setMaxCancellationDate(cancellationDate)
            exampleDate.setMonth(cancellationDate.getMonth() + 1)
            exampleDate.setDate(Math.min(exampleDate.getDate() + 6, new Date(exampleDate.getFullYear(), exampleDate.getMonth() + 1, 0).getDate()));
            setExampleDate(exampleDate)
        }
    }

    const recurrentTimeCancellationDate = (cancellationDate) => {
        const diferencaInDays = diferenceBetweenDates(date ? date : data.date.from)
        if (diferencaInDays > 5) {
            setMaxCancellationDate(cancellationDate)
            const exampleDate = new Date(cancellationDate)
            exampleDate.setMonth(new Date(exampleDate).getMonth() + 1)
            setExampleDate(exampleDate)
        } else {
            const newdate = new Date(date)
            newdate.setDate(newdate.getDate()-1);
            setMaxCancellationDate(newdate)
            const exampleDate = new Date(newdate)
            exampleDate.setMonth(new Date(newdate).getMonth() + 1)
            setExampleDate(exampleDate)

        }
    }

    return (
        <>
            {/* one time payments */}
            {
                (data.ad_duration_type == 1 || data.ad_duration_type == 2) && (
                    <>
                        <p>A booking can be cancelled either up to the day before the listing start date or within 5 days after booking the listing - whichever comes first.</p>
                        <p>An example is provided below, assuming that the booking will take place today.</p>
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
                        <p>A booking can be cancelled either up to the day before the listing start date or within 5 days after booking the listing - whichever comes first.</p>
                        <p>For listings with a duration exceeding one month, cancellation of the upcoming month&apos;s payments must occur before the monthly billing date to prevent any new charges. An example is provided below, assuming that the booking will take place today and has a duration of 2 months.</p>
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
                                <p className='text-[15px]'>You will be charged for the first month.</p>
                            </div>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>You will NOT be charged for the second month.</p>
                            </div>
                            <Separator className='my-3' />
                            <h1 className='font-[600]'>No cancellation is available on {format(exampleDate, "MMM d")}, or later</h1>
                            <div className='flex items-start gap-4 mt-4'>
                                <p>•</p>
                                <p className='text-[15px]'>You will be charged for the second month.</p>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
