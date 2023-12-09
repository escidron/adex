import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm'
import PayoutCompanyForm from '@/sections/add-payout-method/PayoutCompanyForm'
import PayoutIndividualForm from '@/sections/add-payout-method/PayoutIndividualForm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState, useEffect } from 'react'
import GetSellerProfile from '@/actions/GetSellerProfile'
import { Toaster } from 'react-hot-toast'


export default function AddAccountModals({ setRefetch, selectedCompany, selectedCompanyId, setHasPayoutMethod }) {

    const [open, setOpen] = useState(false);
    const [seller, setSeller] = useState(null);
    const [hasAccount, setHasAccount] = useState(false);

    useEffect(() => {
        async function GetInfo() {
            const sellerInfo = await GetSellerProfile(selectedCompanyId)
            setSeller(sellerInfo)
            console.log('seller info',sellerInfo)
            console.log('selectedCompanyId',selectedCompanyId)
            if (sellerInfo.stripe_account) {
                setHasAccount(true)
            }
        }
        GetInfo();
    }, [hasAccount]);

    return (
        <>
            <Toaster />
            <Dialog className='w-full' open={open} onOpenChange={setOpen}>
                <DialogTrigger className='w-[200px] mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                    Add Payout Method
                </DialogTrigger>
                <DialogContent className={`w-full max-w-[500px] ${hasAccount ? 'h-fit' : 'h-[80vh]'}`}>
                    <DialogHeader className='h-[80px]'>
                        <DialogTitle>
                            {
                                hasAccount ? 'Bank Account Details' : 'Stripe Verification Form'
                            }
                        </DialogTitle>
                        <DialogDescription className='mt-2'>
                            {
                                hasAccount ?
                                    'Disclaimer: This information is not being stored by ADEX. It is only used by Stripe in the Payout Process.'
                                    : 'Disclaimer: This information is not being stored by ADEX. It is only used for the Stripe Verification process.'
                            }

                        </DialogDescription>
                    </DialogHeader>
                    <div className='overflow-y-auto'>
                        {
                            seller?.user_type == '1' && !hasAccount && (
                                <PayoutCompanyForm
                                    setHasAccount={(toggle) => setHasAccount(toggle)}
                                    selectedCompany={selectedCompany}
                                    selectedCompanyId={selectedCompanyId}
                                />
                            )
                        }
                        {
                            seller?.user_type == '2' && !hasAccount && (
                                <PayoutIndividualForm setHasAccount={(toggle) => setHasAccount(toggle)} />
                            )
                        }
                        {
                            hasAccount && (
                                <ExternalBankForm
                                    stripeAccount={seller.stripe_account}
                                    selectedCompanyId={selectedCompanyId}
                                    setHasPayoutMethod={setHasPayoutMethod}
                                    setFinish={() => {
                                        setOpen(false)
                                        if (setRefetch) {
                                            setRefetch(prev => !prev)
                                        }
                                    }}
                                />
                            )
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
