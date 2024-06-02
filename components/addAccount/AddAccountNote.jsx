'use client'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function AddAccountNote() {
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
                    Payout methods
                </CardTitle>
                <CardDescription>Payout methods are how you receive the money you&apos;ve earned from your listings. At least one Payout method is required before your listing(s) can be viewed and booked from the Marketplace.</CardDescription>
            </CardHeader>
        </Card>
    )
}