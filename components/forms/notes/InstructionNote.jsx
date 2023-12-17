import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function InstructionNote() {
    return (
        <Card className='w-full max-w-[450px] h-fit lg:mt-[90px]'>
            <CardHeader>
                <CardTitle className='flex gap-2 items-center'>
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
                    <h1 className='text-[28px] md:text-[32px]'>Instructions</h1>
                </CardTitle>
                <CardDescription>As needed, provide instructions for buyers such as ad drop location, other logistical details, or simply tell buyers to message you with questions. </CardDescription>
            </CardHeader>
        </Card>
    )
}
