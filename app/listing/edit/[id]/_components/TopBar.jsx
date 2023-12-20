"use client"

import { Button } from '@/components/ui/button'
import { Edit, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function TopBar({ isPending, editListing }) {
    const router = useRouter();
    return (
        <div className="bg-white p-4 h-[80px] flex justify-between items-center border shadow-sm">
            <div className='flex gap-2'>
                <Edit />
                <p className='font-[600] hidden md:flex'>Edit your Listing</p>
            </div>
            <div className='flex gap-2 items-center'>
                <Button variant='outline' onClick={() => router.push('/my-profile?tab=5&sub-tab=0')} className='flex gap-2 items-center'>
                    Cancel
                </Button>
                <Button disabled={isPending} onClick={editListing} className='flex gap-2 items-center'>
                    {
                        isPending && (
                            <Loader2 size={18} className='animate-spin' />
                        )
                    }
                    Save & Exit
                </Button>
            </div>
        </div>
    )
}
