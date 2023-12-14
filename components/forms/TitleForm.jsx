
import TextField from '../inputs/TextField'

import { useContext, useState } from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function TitleForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [counter, setCounter] = useState(0);
    const handleTitle = (title) => {
        setCounter(title.length)
        setListingProperties({ ...listingProperties, title: title })
    }
    return (
        <div className='w-full flex flex-col items-center lg:flex-row lg:justify-around lg:items-start max-w-[1200px] mx-auto'>
            <Card className='w-full max-w-[450px] h-[150px] lg:hidden'>
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
                        Titles
                    </CardTitle>
                    <CardDescription>Give your listing a creative, unique, and descriptive title. This will distinguish your listing and draw more attention from buyers.</CardDescription>
                </CardHeader>
            </Card>
            <div className='w-full sm:w-[500px] flex flex-col items-center justify-center'>
                <div className='mt-4 w-full flex flex-col max-w-[450px]'>
                    <h1 className='text-[28px] md:text-[32px]'>Title</h1>
                    <TextField
                        autoFocus={true}
                        id='title'
                        label=''
                        onChange={(e) => handleTitle(e.target.value)}
                        onBlur={() => { }}
                        value={listingProperties.title}
                        maxLength={30}
                    />
                    <div className='w-full flex justify-end'>

                        <p className={`font-[500] ${counter == 30 && 'text-red-600'}`}>{counter}/30</p>
                    </div>
                </div>
            </div>
            <Card className='hidden lg:flex w-full max-w-[500px] mt-[50px]  h-[150px] lg:mt-0'>
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
                        Titles
                    </CardTitle>
                    <CardDescription>Give your listing a creative, unique, and descriptive title. This will distinguish your listing and draw more attention from buyers.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
