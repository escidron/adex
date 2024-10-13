'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function PayoutWarningBanner({listingProperties,hasPayout}) {
    const router = useRouter();
    return (
        <div className='w-full bg-[#ffb837] rounded-lg flex justify-between items-center p-3 shadow-md'>
            <div className='flex gap-2 items-center'>
                <AlertTriangle size={18} className='min-w-[18px]' />
                {
                    hasPayout ? 
                    <p>Your <b>Payout</b> method is being verified by Stripe, once approved, you will be able to accept the requests and receive payments.
                  This process takes up to 5 business days for <b>Individual</b> accounts and 7 business days for <b>Company</b> accounts.</p> : 
                    <p>Please set up a Payout Method to be able to accept the requests and receive payments.</p>
                }
                
            </div>
            {
                !hasPayout && (
                    <Button onClick={() => router.push('/add-payout-method?company_id=' + listingProperties?.company_id )}>Add Payout Method</Button>
                )
            }
        </div>
    )
}
