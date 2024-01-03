import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function ShowMore({content}) {
    return (
        <Dialog className='w-full ' >
            <DialogTrigger className='underline font-[600]'>
                Show More
            </DialogTrigger>
            <DialogContent className='w-full max-w-[550px]'>
                {content}
            </DialogContent>
        </Dialog>
    )
}
