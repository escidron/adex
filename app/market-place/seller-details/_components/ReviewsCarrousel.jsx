import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReviewCard from "../../details/_components/ReviewCard"
export default function ReviewsCarrousel({ data }) {
  return (
    <>

      {
        data.length > 0 ? (

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {data.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 ">
                  <div className="p-1">
                    <ReviewCard key={review.id} review={review} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className='text-gray-600 italic text-[26px]'>No reviews</p>
          )
      }
    </>
  )
}
