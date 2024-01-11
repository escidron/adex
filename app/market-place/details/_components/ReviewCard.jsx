import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import Image from 'next/image'
import { format } from 'date-fns'
import RatingComponent from '@/components/rating/RatingComponent'
import ShowMore from './ShowMore'

export default function ReviewCard({ review,showFullContent }) {
    console.log('review',review)
    return (
        <Card className='w-full h-[240px] ' key={review.id}>
            <CardHeader>
                <CardTitle className='flex gap-3 items-center '>
                    {
                        review.user_type == 1 && (
                            <>
                                {
                                    review.company_logo ? (
                                        <div className='w-12 h-12'>
                                            <Image
                                                src={review.company_logo}
                                                alt="buyer company Logo"
                                                priority
                                                width={2000}
                                                height={2000}
                                                className='rounded-full w-full h-full object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-black text-white font-[600] rounded-full w-12 h-12 flex justify-center items-center">
                                            {review.company_name.substring(0, 1).toUpperCase()}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        review.user_type == 2 && (
                            <>
                                {
                                    review.profile_image ? (
                                        <div className='w-12 h-12'>
                                            <Image
                                                src={review.profile_image}
                                                alt="buyer Logo"
                                                priority
                                                width={2000}
                                                height={2000}
                                                className='rounded-full w-full h-full object-cover'
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-black text-white font-[600] rounded-full w-12 h-12 flex justify-center items-center">
                                            {review.name.substring(0, 1).toUpperCase()}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }


                    <div>
                        <h1 className='text-[20px]'>{review.user_type == 2 ? review.name : review.company_name}</h1>
                        <p className='text-[14px] text-gray-600 font-[500] mt-1'>{format(new Date(review.created_at), "PPP")}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className=''>
                <RatingComponent size='small' readOnly={true} rating={review.rating} />
                <p className={`${!showFullContent && 'line-clamp-3'}`}>{review.comments}</p>
                {review.comments.length > 140 && !showFullContent && (
                    <ShowMore content={review.comments}/>
                )}
            </CardContent>
        </Card>
    )
}
