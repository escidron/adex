'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function PayoutWarningBanner() {
    const router = useRouter();
    return (
        <div className='w-full bg-[#ffb837] rounded-lg flex justify-between items-center p-3 shadow-md'>
            <div className='flex gap-2 items-center'>
                <AlertTriangle size={18} />
                <p>Please set up a Payout Method to make your listings public.</p>
            </div>
            <Button onClick={() => router.push('/add-payout-method')}>Add Payout Method</Button>
        </div>
    )
}
