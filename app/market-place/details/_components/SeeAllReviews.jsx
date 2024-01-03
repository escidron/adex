import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReviewCard from "./ReviewCard"

export default function SeeAllReviews({ reviews }) {
    return (
        <Dialog className='w-full ' >
            <DialogTrigger className='h-10 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground'>
                See all Reviews{`(${reviews.length})`}
            </DialogTrigger>
            <DialogContent className='w-full max-w-[850px] h-[80vh] overflow-y-auto'>
                <div className='mt-8 grid gap-4 grid-cols-1 '>
                    {
                        reviews.map((review,index) => (
                                <ReviewCard key={review.id+`${index}`} review={review} showFullContent={true}/>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
