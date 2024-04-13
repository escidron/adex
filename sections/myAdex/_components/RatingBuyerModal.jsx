'use client'

import RateBuyer from "@/actions/RateBuyer"
import RatingComponent from "@/components/rating/RatingComponent"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";

export default function RatingBuyerModal({ listing, updateRatingStastus }) {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(1);
    const [open, setOpen] = useState(false);

    return (
        <Dialog className='w-full ' open={open} onOpenChange={setOpen}>
            {/* <Toaster /> */}
            <DialogTrigger className='w-fit h-10 px-4 py-2 border rounded-[16px] border-input bg-background hover:bg-accent hover:text-accent-foreground'>
                Leave a Review
            </DialogTrigger>
            <DialogContent className='w-[90%] max-w-[550px]'>
                <DialogHeader>
                    <DialogTitle className='text-[26px]'>Share Your Opinion</DialogTitle>
                    <DialogDescription>Help us improve by leaving a review. Your insights are valuable in shaping the experience for you and others.</DialogDescription>
                </DialogHeader>
                <div className="mt-6">
                    <h1 className="text-[20px] font-[600] mb-2">Buyer</h1>
                    <div className="flex gap-2 items-center">
                        {
                            listing.user_type == 1 && (
                                <>

                                    <div>
                                        {
                                            listing.comany_logo ? (

                                                <Image
                                                    src={listing.company_logo}
                                                    alt="buyer Logo"
                                                    priority
                                                    width={2000}
                                                    height={2000}
                                                    className='rounded-full w-full h-full object-cover'
                                                />
                                            ) : (
                                                <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                                    {listing.company_name.substring(0, 1).toUpperCase()}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <h1 className="text-[18px]">{listing.company_name}</h1>
                                        <RatingComponent size='small' readOnly={true} rating={listing.company_rating} />
                                    </div>

                                </>
                            )
                        }
                        {
                            listing.user_type == 2 && (

                                <>

                                    <div>
                                        {
                                            listing.comany_logo ? (

                                                <Image
                                                    src={listing.buyer_profile_image}
                                                    alt="buyer Logo"
                                                    priority
                                                    width={2000}
                                                    height={2000}
                                                    className='rounded-full w-full h-full object-cover'
                                                />
                                            ) : (
                                                <div className="bg-black text-white font-[600] rounded-full w-10 h-10 flex justify-center items-center">
                                                    {listing.buyer_name.substring(0, 1).toUpperCase()}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <h1 className="text-[18px]">{listing.buyer_name}</h1>
                                        <RatingComponent size='small' readOnly={true} rating={listing.buyer_rating} />
                                    </div>

                                </>)
                        }
                    </div>
                </div>
                <div className="mt-6">
                    <h1 className="text-[20px] font-[600] mb-2">Give an overall rating</h1>
                    <RatingComponent rating={rating} setRating={(newRating) => setRating(newRating)} />
                </div>
                <div className="mt-6">
                    <h1 className="text-[20px] font-[600] mb-2">Leave your comments...</h1>
                    <textarea
                        type="textarea"
                        id="message"
                        name="message"
                        placeholder='Message ...'
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className={`w-full border  p-3 rounded-lg outline-none h-[140px] resize-none `}
                    />
                </div>
                <Button className='w-[120px] flex ml-auto' onClick={() => {
                    if (comments) {
                        RateBuyer(listing.requested_by, listing.requested_by_company, listing.contract_id, rating, comments)
                        setOpen(false)
                        updateRatingStastus(listing.id)
                    }else{
                        toast.error('Please add some comment')
                    }
                }}>Submit</Button>

            </DialogContent>
        </Dialog>
    )
}
