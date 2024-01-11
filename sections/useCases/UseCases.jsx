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
        <div className="w-full mt-[150px] max-w-[1000px] flex flex-col items-center gap-3">
            <h1 className="text-[32px]">Use Cases</h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full "
            >
                <CarouselContent>
                    {useCasesData.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 max-h-[485px]">
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