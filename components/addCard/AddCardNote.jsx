'use client'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function AddCardNote() {
    return (
        <Card className='w-full  h-fit '>
            <CardHeader>
                <CardTitle className='flex gap-2 items-center text-[28px] md:text-[32px] font-[500]'>
                    <div className='w-[50px]'>
                        <Image
                            src='/note.png'
                            alt="note icon"
                            priority
                            width={2000}
                            height={2000}
                            className='w-full'

                        />
                    </div>
                    Payment methods
                </CardTitle>
                <CardDescription>A payment method (credit card) is required to book a listing.</CardDescription>
            </CardHeader>
        </Card>
    )
}
