'use client'

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

export default function ViewPhotosSlider({ images }) {
    const [api, setApi] = useState ()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <div className="w-full flex flex-col items-center">
            <Carousel className="w-[80%] " setApi={setApi}>
                <CarouselContent className='w-full'>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className='w-[80%] flex justify-center'>
                            <div className="p-1 md:h-[80vh] w-full max-w-[1000px]">
                                <Image
                                    src={image.data_url}
                                    alt="Listing images"
                                    width={2000}
                                    height={2000}
                                    className={`h-full object-cover rounded-lg`}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
                <CarouselPrevious className='bg-black text-white' />
                <CarouselNext className='bg-black text-white'/>
            </Carousel>
            <div className="py-2 text-center text-md text-muted-foreground">
             {current}/{count}
            </div>
        </div>
    )

}
