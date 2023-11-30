import { useState,useEffect } from 'react'
import Image from 'next/image';
import BlackButton from '../buttons/BlackButton';
import CloseIcon from '@mui/icons-material/Close';
import StripeForm from './StripeForm';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodList from './PaymentMethodList';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react';
import GetPaymentMethod from '@/actions/GetPaymentMethod';

const stripePromise = loadStripe('pk_test_51Hz3inL3Lxo3VPLoBHjjbAES3oCWqKYtTQtgYYPdDhYw8LQboBwmqpz3euwD4KL7x37x0vrFgA2EDu1toAXg6Bo900T7w4sPl5');

export default function AddCard() {
  const [refetch, setRefetch] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [open, setOpen] = useState(false);

  //todo:request cards
  useEffect(() => {
    async function getInfo() {
      const cards = await GetPaymentMethod()
      setPaymentMethods(cards)
    }
    getInfo();

  }, [refetch]);

  return (
    <div>
      <div>
        <h1 className={`text-[25px] `}>Payment methods</h1>
        <p className={`text-[18px]  mt-4`}>Once you&apos;ve securely added a payment method through our reliable payment system, you can embark on planning your upcoming journey.</p>
      </div>

      <Dialog className='w-full ' open={open} onOpenChange={setOpen}>
        <DialogTrigger className='w-[200px] mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          Add Payment Method
        </DialogTrigger>
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
      <PaymentMethodList refetch={refetch} setRefetch={setRefetch} data={paymentMethods} />
    </div>
  )
}
