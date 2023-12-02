import { useState, useEffect } from 'react'
import BankAccountList from './BankAccountList'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GetSellerProfile from '@/actions/GetSellerProfile';
import PayoutIndividualForm from '@/sections/add-payout-method/PayoutIndividualForm';
import PayoutCompanyForm from '@/sections/add-payout-method/PayoutCompanyForm';
import ExternalBankForm from '@/sections/add-payout-method/ExternalBankForm';

export default function AddAccount() {
  const [refetch, setRefetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);
  
  useEffect(() => {
    async function GetInfo() {
      const sellerInfo = await GetSellerProfile()
      setSeller(sellerInfo)
      if (sellerInfo.stripe_account) {
        setHasAccount(true)
      }
    }
    GetInfo();
  }, [hasAccount]);

  return (
    <div>
      <div>
        <h1 className={`text-[25px] `}>Payout Methods</h1>
        <p className={`text-[18px]  mt-4`}>Choose your preferred payment method to receive your funds</p>
      </div>
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
                <PayoutCompanyForm setHasAccount={(toggle) => setHasAccount(toggle)} />
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
                  setFinish={() => {
                    setOpen(false)
                    setRefetch(prev => !prev)
                  }} 
                />
              )
            }
          </div>
        </DialogContent>
      </Dialog>
      <BankAccountList refetch={refetch} setRefetch={setRefetch} />
    </div>
  )
}
