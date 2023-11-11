'use client'


import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function TopBar() {
    const router = useRouter();
    return (
        <div className='h-[80px] z-[99] border bg-white flex items-center justify-end px-8 fixed top-0 w-full'>
            <div className='flex gap-2 items-center'>
                <Button onClick={() => router.push('/my-profile?tab=5&sub-tab=0')} className='flex gap-2 items-center'>
                    <LogOut size={15} />
                    Exit
                </Button>
            </div>
        </div>
    )
}
