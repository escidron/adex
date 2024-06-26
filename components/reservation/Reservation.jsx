'use client'

import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';

import CounterComponent from '../counter/CounterComponent';
import { Divider, Skeleton } from '@mui/material';
import axios from 'axios';
import formatNumberInput from '@/utils/formatInputNumbers';
import { UserContext } from '../../app/layout';
import { ArrowLeft, HelpCircle, Loader2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { DateFieldComponent } from '../datePicker/DateFieldComponent';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '../addCard/StripeForm';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodList from '../addCard/PaymentMethodList';
import GetPaymentMethod from '@/actions/GetPaymentMethod';
import GetCompanies from '@/actions/GetCompanies';
import GetUserProfile from '@/actions/GetUserProfile';
import CompanyList from './CompanyList';
import CancellationPolicy from '../modals/CancellationPolicy';
import { calculateDiscounts } from '@/utils/calculateDiscounts';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function Reservation({ data, setIsRequested, discounts, isContentLoaded }) {

    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [counter, setCounter] = useState(1);
    const [incomplete, setIncomplete] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [currentDiscount, setCurrentDiscount] = useState(0);
    const [discountOptions, setDiscountOptions] = useState(false);
    const [user, setUser] = useContext(UserContext)
    const [allPaymentsMethod, setAllPaymentsMethod] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [addCard, setAddCard] = useState(false);
    const [isCompanyProfile, setIsCompanyProfile] = useState(false);
    const [companies, setCompanies] = useState();
    const [selectedCompany, setSelectedCompany] = useState('');
    const [hasCompanySelected, setHasCompanySelected] = useState(false);
    const router = useRouter();


    useEffect(() => {
        async function getInfo() {
            const cards = await GetPaymentMethod()
            const myProfile = await GetUserProfile()
            if (myProfile?.userType == '1') {
                const myCompanies = await GetCompanies()
                setCompanies(myCompanies)
                setIsCompanyProfile(true)
            }

            setPaymentMethods(cards)
            setAllPaymentsMethod(cards)
        }
        getInfo();

    }, [refetch]);

    useEffect(() => {
        if (!date) {
            if (data.ad_duration_type != '1') {
                if (data.first_available_date) {
                    if(new Date(data.first_available_date) > new Date()) {
                        setDate(new Date(data.first_available_date))
                    }else{
                        setDate(new Date())
                    }
                } else {
                    setDate(new Date())
                }
            } else {
                if (data.date.from) {
                    setDate(new Date(data.date.from))
                    setEndDate(new Date(data.date.to))
                } else {
                    const startDate = new Date()
                    startDate.setDate(startDate.getDate() + 6)
                    setDate(startDate)
                    setEndDate(startDate)
                }
            }
        }

    }, []);

    useEffect(() => {
        const calculatedDiscount = calculateDiscounts(discounts,counter)
        setCurrentDiscount(calculatedDiscount)
    }, [counter]);

    const Booking = () => {

        if (user.isLogged) {
            if (paymentMethods.length > 0) {
                setIsPending(true)
                axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/request-reserve`,
                    {
                        data: data,
                        duration: counter,
                        start_date: date,
                        end_date: endDate,
                        companyId: selectedCompany
                    }, {
                    withCredentials: true,
                })
                    .then(function (response) {
                        setIsRequested(true)
                        setTimeout(() => {
                            setIsPending(false);
                            router.push('/my-profile?tab=5&sub-tab=1')
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log('error', error)
                    });
                return
            }
            setIncomplete(true)
        } else {
            router.push('/login')
        }
    }

    const handleSelectedCompany = async (id) => {
        const cards = await GetPaymentMethod(id)
        setPaymentMethods(cards)
        setSelectedCompany(id)
    }

    if (!isContentLoaded) {
        return (
            <div className={`w-[400px] min-w-[400px] h-[450px] flex flex-col   shadow-lg rounded-lg border p-2 `}>
                <Skeleton variant="rounded" width={'100%'} height={120} />
                <div className='mt-8'>
                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                </div>
                <div className='mt-6'>

                    <Skeleton variant="text" sx={{ fontSize: '25px' }} />
                </div>
                <div className='mt-auto'>
                    <Skeleton variant="rounded" width={'100%'} height={60} />
                </div>
            </div>
        )
    }

    console.log('data', data)
    console.log('user', user)
    return (
        <div className={`w-[350px] h-fit flex flex-col   shadow-lg rounded-lg border p-4 `}>
            {data.price && (
                <div className='flex justify-center'>
                    <p className='text-[25px] font-[500]'>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''}`}</p>
                    <p className='flex items-center text-gray-500 '>
                        {/* {data.ad_duration_type == '0' ? '/months' : data.ad_duration_type == '2' ? '/units' : ''} */}
                        {
                            data.sub_category == 7 ? (
                                <>
                                    {
                                        data.digital_price_type == '0' ? '/ Per Mention' : data.digital_price_type == '1' ? '/ Per Inclusion' : data.digital_price_type == '2' ? '/ Per Post' : '/ Per Month'
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        data.ad_duration_type == '0' ? '/ Month' : data.ad_duration_type == '2' ? '/ Unit' : ''
                                    }
                                </>
                            )
                        }
                    </p>
                </div>
            )}
            <div className={` flex items-center  ${data.category_id == 17 ? 'justify-center' : 'justify-between'} mt-4`}>

                {
                    data.ad_duration_type != '1' && (
                        <>
                            <div className='w-[65%]'>
                                <label htmlFor="date" className='mb-1'>Start date</label>
                                <DateFieldComponent
                                    date={date ? date : new Date()}
                                    setDate={(newDate) => setDate(newDate)}
                                    disabledDate={(data.first_available_date && new Date(data.first_available_date) > new Date()) ? data.first_available_date : new Date()}
                                />
                            </div>
                            <div className='w-[35%] flex flex-col items-center justify-end'>
                                {
                                    (data.sub_category == 7 && data.digital_price_type != '3') ? (
                                        <>
                                            <label htmlFor="date" className='mb-1'>Quantity</label>
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor="date" className='mb-1'>{data.ad_duration_type == '2' ? 'Units' : 'Duration'}</label>
                                        </>
                                    )
                                }
                                <CounterComponent counter={counter} setCounter={(c) => setCounter(c)} />
                            </div>
                        </>
                    )
                }

            </div>
            <div className='w-full'>
                <div className='mt-4 flex justify-between items-center'>
                    <p className=''>{`$${data?.price ? formatNumberInput(data.price.toString()) : ''} ${data.ad_duration_type != "1" ? `x ${counter} ${data.ad_duration_type === '1' ? 'months' : data.ad_duration_type === '2' ? 'units' : ''}` : data.category_id == 17 ? `x ${counter}` : ''}`}</p>
                    <p>{`$${data?.price ? formatNumberInput((data.price * counter).toString()) : ''}`}</p>
                </div>
                {
                    currentDiscount > 0 && (

                        <div className='relative mt-2 flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <div onMouseOver={() => setDiscountOptions(true)} onMouseLeave={() => setDiscountOptions(false)}>
                                    <HelpCircle size={17} className='cursor-pointer' />
                                </div>
                                <p className='font-[600]'>Discount</p>
                            </div>
                            <p className='text-green-700'>{`-$${data.price * counter * currentDiscount / 100}`}</p>
                            {
                                discountOptions && (
                                    <div className='absolute bg-black top-10 py-2 left-0 w-[360px] rounded-lg  text-white'>
                                        {discounts.map((discount, index) => (
                                            <div key={index}>
                                                <div className='flex justify-between px-2'>
                                                    <div className='flex'>
                                                        <h1 className='text-[12px]'>Contract duration from<label className='font-semibold'>{` ${discount.duration} ${data.ad_duration_type === '1' ? 'months' : data.ad_duration_type === '2' ? 'quarters' : data.ad_duration_type === '3' ? 'years' : ''} `}</label>have a </h1>
                                                        <h1 className='text-[12px] font-bold ml-1'>{` ${discount.discount}% discount`}</h1>
                                                    </div>
                                                </div>
                                                <Divider variant="" sx={{ color: 'white', width: '100%', marginTop: '5px', marginBottom: '5px' }} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

                <div className='mt-2 flex justify-between items-center'>
                    <p className='text-[20px] font-[600]'>Total</p>
                    <p className='font-[600]'>{`$${data?.price ? formatNumberInput((data.price * counter - (data.price * counter) * (currentDiscount / 100)).toString()) : ''}`}</p>
                </div>
            </div>

            {
                (data.status == '1' && user.isLogged && user.userId != data.seller_id) && (

                    <Dialog className='w-full ' onOpenChange={() => {
                        setHasCompanySelected(false)
                        setAddCard(false)
                    }}>
                        <DialogTrigger className='w-full mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                            Request Booking
                        </DialogTrigger>
                        <DialogContent className='w-[90%] max-w-[550px]'>
                            {
                                isCompanyProfile && !hasCompanySelected && (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Select Company</DialogTitle>
                                            <DialogDescription>
                                                On behalf of which of your companies would you like to request the booking?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className='max-h-[400px] overflow-y-auto invisible_scroll_bar'>
                                            {
                                                companies.length > 0 ? (

                                                    <CompanyList
                                                        companies={companies}
                                                        handleSelectedCompany={(id) => handleSelectedCompany(id)}
                                                        selectedCompany={selectedCompany}
                                                    />
                                                ) : (
                                                    <>
                                                        <p className='text-gray-600 italic'>No company available, you neeed to register a company first.</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <DialogFooter className='mt-4'>
                                            <div className='w-full flex justify-end items-center'>
                                                <Button disabled={!selectedCompany} type='submit' onClick={() => setHasCompanySelected(true)}>
                                                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                                                    Next
                                                </Button>
                                            </div>
                                        </DialogFooter>
                                    </>
                                )
                            }
                            {
                                (paymentMethods.length == 0 || addCard) && (isCompanyProfile ? (hasCompanySelected ? true : false) : true) && (
                                    <>
                                        {
                                            isCompanyProfile && (
                                                <ArrowLeft onClick={() => setHasCompanySelected(false)} className="h-4 w-4 absolute left-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
                                            )
                                        }
                                        <DialogHeader className='mt-6'>
                                            <DialogTitle>Add Card Details</DialogTitle>
                                            <DialogDescription>
                                                You will only be charge if your request is approved.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Elements stripe={stripePromise}>
                                            <StripeForm
                                                setRefetch={(toggle) => setRefetch(toggle)}
                                                setAddCard={(toggle) => setAddCard(toggle)}
                                                companyId={selectedCompany}
                                            />
                                        </Elements>
                                        {/* {
                                            isCompanyProfile && (
                                                <Button className='mt-[-10px]' variant='outline' onClick={() => setHasCompanySelected(false)}>Select Company</Button>
                                            )
                                        } */}
                                    </>
                                )
                            }
                            {
                                (paymentMethods.length > 0 && !addCard) && (isCompanyProfile ? (hasCompanySelected ? true : false) : true) && (
                                    <>
                                        {
                                            isCompanyProfile && (
                                                <ArrowLeft onClick={() => setHasCompanySelected(false)} className="h-4 w-4 absolute left-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
                                            )
                                        }
                                        <DialogHeader className='mt-6'>
                                            <DialogTitle>Confirm the Payment Method</DialogTitle>
                                            <DialogDescription>
                                                You will only be charge if your request is approved.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className='max-h-[400px] overflow-y-auto invisible_scroll_bar'>

                                            <PaymentMethodList
                                                data={paymentMethods}
                                                setRefetch={(toggle) => setRefetch(toggle)}

                                            />
                                        </div>
                                        <DialogFooter className='mt-4'>
                                            <div className='w-full flex justify-around items-center'>
                                                <Button variant='outline' onClick={() => setAddCard(true)}>Add Card</Button>
                                                <Button disabled={isPending} type='submit' onClick={Booking}>
                                                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                                                    Send Request
                                                </Button>
                                            </div>
                                        </DialogFooter>
                                    </>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                )
            }
            {
                !user.isLogged && (
                    <Button className='mt-2' onClick={() => router.push('/login')}>
                        Request Booking
                    </Button>
                )
            }
            <Dialog >
                <DialogTrigger >
                    <div className='w-full mt-3 flex justify-center'>
                        <h1 className='text-[12px] underline cursor-pointer'>Cancellation Policy</h1>
                    </div>
                </DialogTrigger>
                <DialogContent className='max-w-[600px] h-fit overflow-y-auto flex flex-col justify-start'>
                    <DialogHeader>
                        <DialogTitle className='text-[26px]'>Cancellation Policy</DialogTitle>
                        <DialogDescription>
                            Please take a moment to carefully read the cancellation policy.
                        </DialogDescription>
                    </DialogHeader>
                    <CancellationPolicy data={data} date={date} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
