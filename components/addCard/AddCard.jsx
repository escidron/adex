'use client'
import { useState,useEffect } from 'react'
import StripeForm from './StripeForm';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodList from './PaymentMethodList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GetPaymentMethod from '@/actions/GetPaymentMethod';
import AddCardNote from './AddCardNote';
import { Separator } from '../ui/separator';
import toast, { Toaster } from "react-hot-toast";

 const stripePromise = loadStripe('pk_test_51Hz3inL3Lxo3VPLoBHjjbAES3oCWqKYtTQtgYYPdDhYw8LQboBwmqpz3euwD4KL7x37x0vrFgA2EDu1toAXg6Bo900T7w4sPl5');
 //const stripePromise = loadStripe('pk_live_51Hz3inL3Lxo3VPLo1HZXUJ0JX3NiC7qVlyiw37nBRE3hf206rKHs6CSYrSXo1tlePY7ConUThfIMqtfbXgOVroS800fll05dSk');

export default function AddCard({ companyId }) {
  const [refetch, setRefetch] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getInfo() {
      const cards = await GetPaymentMethod(companyId)
      setPaymentMethods(cards)
    }
    getInfo();

  }, [refetch]);

  return (
    <div>

      <AddCardNote />
      <Dialog className='w-full ' open={open} onOpenChange={setOpen}>
        <DialogTrigger className='w-[200px] mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          Add Payment Method
        </DialogTrigger>
          <Toaster />
        <DialogContent className='w-full max-w-[550px]'>
          <>
            <DialogHeader>
              <DialogTitle>Add Card Details</DialogTitle>
            </DialogHeader>
            <Elements stripe={stripePromise}>
              <StripeForm
                setRefetch={(toggle) => {
                  setOpen(false)
                  setRefetch(toggle)}}
                  setAddCard={(toggle) => setAddCard(toggle)}
                
              />
            </Elements>
          </>
        </DialogContent>
      </Dialog>
      <Separator className='my-4' />
      <PaymentMethodList refetch={refetch} setRefetch={setRefetch} data={paymentMethods} />
    </div>
  )
}
