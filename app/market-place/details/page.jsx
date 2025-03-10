'use client'

import Footer from '@/components/footer/Footer'
import ImagesBox from '../../listing/view/[id]/_components/ImagesBox'
import ListingHeader from '../../listing/view/[id]/_components/ListingHeader'
import DateInfo from '../../listing/view/[id]/_components/DateInfo'
import DiscountsInfo from '../../listing/view/[id]/_components/DiscountsInfo'
import InstructionsInfo from '../../listing/view/[id]/_components/InstructionsInfo'
import PageSkeleton from '../../listing/view/[id]/_components/PageSkeleton'
import GetCategories from '@/actions/GetCategories'
import GetDiscounts from '@/actions/GetDiscounts'
import GetAdvertisementDetails from '@/actions/GetAdvertisementDetails'
import Reservation from '@/components/reservation/Reservation'
import SellerDetails from './_components/SellerDetails'
import SendChatMessage from '@/actions/SendChatMessage'

import { Preview } from '@/components/textarea/TextAreaReader'
import { useState, useEffect, useContext } from 'react'
import { Separator } from '@/components/ui/separator'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, SendHorizontal } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from '@/app/layout'
import Reviews from './_components/Reviews'
import GetUserProfile from '@/actions/GetUserProfile'
import GetCompany from '@/actions/GetCompany'
import CreateCampaignSubscription from '@/actions/CreateCampaignSubscription'
import CancelCampaignSubscription from '@/actions/CancelCampaignSubscription'
import GetUserSubscribed from '@/actions/GetUserSubscribed'
import GetCompanies from '@/actions/GetCompanies'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CompanyList from '@/components/reservation/CompanyList'



export default function ListingDetails({ sharedId }) {
    const [user, setUser] = useContext(UserContext)
    const [isPending, setIsPending] = useState(false)

    const [listingProperties, setListingProperties] = useState({})
    const [advertisementType, setAdvertisementType] = useState('')
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [message, setMessage] = useState('');
    const [hasCard, setHasCard] = useState(false)
    const [isBooked, setIsBooked] = useState(false)
    const [isRequested, setIsRequested] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [sellerProfile, setSellerProfile] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const searchParams = useSearchParams()
    const id = sharedId ? sharedId : searchParams.get('id')
    const rejectedId = searchParams.get('rejected')
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [loginRequired, setLoginRequired] = useState(false);
    const [companies, setCompanies] = useState();
    const [isCompanyProfile, setIsCompanyProfile] = useState(false);
    const [hasCompanySelected, setHasCompanySelected] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const router = useRouter();
    useEffect(() => {

        async function getInfo() {
            const myListing = await GetAdvertisementDetails(id)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)
            const myProfile = await GetUserProfile()
            if (myProfile?.userType == '1') {
                const myCompanies = await GetCompanies()
                setCompanies(myCompanies)
                setIsCompanyProfile(true)
            }
            const sellerInfo = await GetUserProfile(myListing.created_by)
            const sellerCompanies = await GetCompany(myListing.company_id)
            const subscription = await GetUserSubscribed(myListing.id)
            if (subscription?.length > 0) {
                setSubscriptionId(subscription[0].id)
            }
            setSellerProfile(sellerInfo)
            setCompanyProfile(sellerCompanies.length > 0 ? sellerCompanies[0] : null)

            setDiscounts(discounts)

            if (myListing) {
                setAdvertisementType(myListing.ad_duration_type)
                setListingProperties((prev) => ({
                    ...prev,
                    status: myListing.status,
                    sub_category: myListing.category_id,
                    title: myListing.title,
                    location: myListing.address,
                    latitude: myListing.lat,
                    longitude: myListing.long,
                    description: myListing.description,
                    price: myListing.price,
                    date: {
                        from: myListing.start_date,
                        to: myListing.end_date,
                    },
                    first_available_date: myListing.first_available_date,
                    images: myListing.image,
                    select_business: myListing.company_id,
                    instructions: myListing.instructions,
                    building_asset: myListing.sub_asset_type,
                    seller_name: myListing.seller_name,
                    seller_image: myListing.seller_image,
                    seller_id: myListing.created_by,
                    seller_rating: myListing.seller_rating,
                    ad_duration_type: myListing.ad_duration_type,
                    id: id,
                    rating: myListing.rating,
                    amount_reviews: myListing.amount_reviews,
                    digital_price_type: myListing.digital_price_type,
                }));

            }
            if (categories && myListing) {

                categories.map((category) => {
                    if (category.id == myListing.category_id) {
                        setListingProperties((prev) => ({
                            ...prev,
                            category: category.parent_id,
                        }));
                    }
                });
            }
            if (discounts) {

                setListingProperties((prev) => ({
                    ...prev,
                    discounts: discounts,
                }));
            }
            setIsContentLoaded(true)
        }
        getInfo();

    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);
        };
        handleRouteChange()
    }, []);

    const sendMessage = async () => {

        if (user.isLogged) {
            if (message) {

                const response = await SendChatMessage(user.userId, listingProperties.seller_id, user.userId, listingProperties.id, message)
                toast.success('Message Sent')
                setMessage(prev => '')
                setRefetch(prev => !prev)
            }
        } else {
            router.push('/login')
        }

    }

    const registerOnCampain = async () => {
        setIsPending(true)
        try {
            const subscriptionId = await CreateCampaignSubscription(listingProperties.id,selectedCompany)
            setSubscriptionId(subscriptionId)
        } catch (error) {
            console.log(error)
        }
        setIsPending(false)
    }
    const handleSelectedCompany = async (id) => {
        setSelectedCompany(id)
    }
    return (
        <>
            <Toaster />
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center`}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1100px]'>
                            <div>
                                {
                                    listingProperties.images.length > 0 && (
                                        <ImagesBox listingProperties={listingProperties} />
                                    )
                                }
                                <div className='w-full flex flex-col-reverse  md:flex-row justify-between mt-4'>
                                    <div className='w-full md:w-[50%]'>
                                        <ListingHeader listingProperties={listingProperties} advertisementType={advertisementType} hasPaymentBox={true} />

                                        <Separator className='my-6' />
                                        <Preview value={listingProperties.description} heigth={200} autoHeigth={true} />

                                        <Separator className='my-6' />
                                        <SellerDetails sellerId={listingProperties.seller_id} sellerProfile={sellerProfile} companyProfile={companyProfile} />

                                        {
                                            (listingProperties.first_available_date || (listingProperties.date.from && listingProperties.date.to)) && (
                                                <>
                                                    <Separator className='my-6' />
                                                    <DateInfo listingProperties={listingProperties} />
                                                </>
                                            )
                                        }

                                        {advertisementType != 1 && listingProperties.discounts.length > 0 && (
                                            <>
                                                <Separator className='my-6' />
                                                <DiscountsInfo
                                                    listingProperties={listingProperties}
                                                    advertisementType={advertisementType}
                                                />
                                            </>
                                        )
                                        }


                                        {listingProperties.instructions?.length > 12 && (
                                            <>
                                                <Separator className='my-6' />
                                                <InstructionsInfo listingProperties={listingProperties} />
                                            </>
                                        )
                                        }
                                    </div>

                                    <div className='w-full md:w-[40%] flex justify-center md:justify-end' >
                                        {
                                            !rejectedId && listingProperties.sub_category != 24 && (

                                                <Reservation
                                                    data={listingProperties}
                                                    hasCard={hasCard}
                                                    setHasCard={(card) => setHasCard(card)}
                                                    setShowModal={(show) => setShowModal(show)}
                                                    setIsBooked={(booked) => setIsBooked(booked)}
                                                    setIsRequested={(requested) => setIsRequested(requested)}
                                                    discounts={discounts}
                                                    isContentLoaded={isContentLoaded}
                                                />
                                            )
                                        }
                                        {
                                            listingProperties.sub_category == 24 && (
                                                <div className={`w-[350px] h-fit flex flex-col shadow-lg rounded-lg border p-4 `}>
                                                    {
                                                        subscriptionId ? (
                                                            <div className="flex flex-col gap-2  p-2 rounded-md">
                                                                <h1 className="text-[18px] font-bold">You have successfully subscribed</h1>
                                                                <p className="text-[15px]">When you&apos;re ready to submit your post link, you can find this campaign in <span className="font-bold cursor-pointer underline" onClick={() => router.push('/my-profile?tab=5&sub-tab=1')}>My Bookings</span>.</p>
                                                                <p className="text-[15px]">Set up your <span className="font-bold cursor-pointer underline" onClick={() => router.push('/my-profile?tab=4')}>Payout</span> method to receive payments.</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    isCompanyProfile ? (

                                                                        <Dialog className='w-full ' onOpenChange={() => {
                                                                            setHasCompanySelected(false)
                                                                        }}>
                                                                            <DialogTrigger className='w-full mt-2 h-10 px-4 py-2 bg-black text-primary-foreground hover:bg-black/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                                                                Register for this Campaign
                                                                            </DialogTrigger>
                                                                            <DialogContent className='w-[90%] max-w-[550px]'>
                                                                                {
                                                                                    !hasCompanySelected && (
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
                                                                                                    <Button disabled={!selectedCompany} type='submit'
                                                                                                        onClick={() => {
                                                                                                            setHasCompanySelected(true)
                                                                                                            registerOnCampain()
                                                                                                        }}>
                                                                                                        {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                                                                                                        Subscribe
                                                                                                    </Button>
                                                                                                </div>
                                                                                            </DialogFooter>
                                                                                        </>
                                                                                    )
                                                                                }

                                                                            </DialogContent>
                                                                        </Dialog>
                                                                    ) : (
                                                                        <Button
                                                                            disabled={isPending}
                                                                            onClick={user.isLogged ? registerOnCampain : () => setLoginRequired(true)}
                                                                        >
                                                                            {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                                                                            <p>
                                                                                Register for this Campaign
                                                                            </p>
                                                                        </Button>
                                                                    )
                                                                }

                                                                {
                                                                    loginRequired && (
                                                                        <div>
                                                                            <p className='text-red-500 text-[14px] mt-2'>You must create an account before registering for this campaign.</p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }

                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <Separator className='my-6' />
                                <Reviews listingId={listingProperties.id} />
                                <Separator className='my-6' />

                                <div className='w-full max-w-[600px] '>
                                    <h1 className='text-[20px] font-[500]'>{rejectedId ? 'Any question about the rejected booking request?' : 'Need further clarification?'}</h1>
                                    <p className='text-[14px] text-gray-700'>{`Feel free to reach out to ${listingProperties.seller_name} via a message.`}</p>
                                    <textarea
                                        onChange={(e) => setMessage(e.target.value)}
                                        type="textarea"
                                        id="message"
                                        name="message"
                                        value={message}
                                        className={`w-full mt-2 overflow-hidden border shadow-sm p-3 rounded-lg outline-none h-[140px] resize-none  focus:border-black`}
                                    />
                                    <div className='flex gap-2 justify-start'>
                                        <Button onClick={sendMessage} className='flex gap-2 items-center'>
                                            <SendHorizontal size={15} />
                                            Send Message
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <PageSkeleton />
                    )
                }
            </div>
            <Footer />
        </>
    )
}

