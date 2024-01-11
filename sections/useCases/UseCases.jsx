import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import UseCasesCard from "./UseCasesCard"
import { useCasesData } from './useCasesData.js'

export default function UseCases() {
    console.log('useCases', useCasesData)
    return (
        <div className="w-[90%] mt-[150px]  mb-[150px] max-w-[510px] xl:max-w-[1000px] flex flex-col items-center gap-3">
            <h1 className="text-[42px]">Use Cases</h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full "
            >
                <CarouselContent>
                    {useCasesData.map((item, index) => (
                        <CarouselItem key={index} className="xl:basis-1/2">
                            <div className="p-1">
                                <UseCasesCard key={item.id} content={item} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}