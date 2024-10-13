'use client'

import Footer from '@/components/footer/Footer'
import TopBar from './_components/TopBar'
import PayoutWarningBanner from './_components/PayoutWarningBanner'
import ImagesBox from './_components/ImagesBox'
import ListingHeader from './_components/ListingHeader'
import DateInfo from './_components/DateInfo'
import DiscountsInfo from './_components/DiscountsInfo'
import InstructionsInfo from './_components/InstructionsInfo'
import PageSkeleton from './_components/PageSkeleton'
import GetCategories from '@/actions/GetCategories'
import GetDiscounts from '@/actions/GetDiscounts'
import GetAdvertisementDetails from '@/actions/GetAdvertisementDetails'
import ApproveReservation from '@/components/reservation/ApproveReservation'
import GetPayoutMethod from '@/actions/getPayoutMethod'

import { Preview } from '@/components/textarea/TextAreaReader'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ListingContext } from './layout'
import { Separator } from '@/components/ui/separator'
import { useSearchParams } from 'next/navigation'
import GetUserProfile from '@/actions/GetUserProfile'
import GetCompanies from '@/actions/GetCompanies'
import GetCompany from '@/actions/GetCompany'
import BuyerDetails from '@/app/market-place/details/_components/BuyerDetails'
import Reviews from '@/app/market-place/details/_components/Reviews'
import QrCodeComponent from './_components/QrCodeComponent'
import Image from 'next/image'
import QrCodeInfo from './_components/QrCodeInfo'
import { calculateDiscounts } from '@/utils/calculateDiscounts'
import GetSellerProfile from '@/actions/GetSellerProfile'

export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')
    const [hasPayout, setHasPayout] = useState(false);
    const [statusPending, setStatusPending] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [bookingAccepted, setBookingAccepted] = useState(false)
    const [bookingRejected, setBookingRejected] = useState(false)
    const [currentDiscount, setCurrentDiscount] = useState(0)
    const [buyerProfile, setBuyerProfile] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [sellerAccountIsAccepted, setSellerAccountIsAccepted] = useState(false);
    const id = params.id
    const searchParams = useSearchParams()
    const notificationId = searchParams.get('notification_id')
    useEffect(() => {
        async function getInfo() {
            const myListing = await GetAdvertisementDetails(id, notificationId)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)
            let checkPayout = false
            if(myListing.company_id){
                checkPayout = await GetPayoutMethod(myListing.company_id)
            }
            const sellerInfo = await GetSellerProfile(myListing.company_id)

            if (sellerInfo?.isAccepted === '1') {
              setSellerAccountIsAccepted(true)
            }
            const buyerInfo = await GetUserProfile(myListing.requested_by)
            const buyerCompanies = await GetCompany(myListing.requested_by_company)
            setHasPayout(checkPayout)
            setBuyerProfile(buyerInfo)
            setCompanyProfile(buyerCompanies.length > 0 ? buyerCompanies[0] : null)
            if (myListing) {
                setListingProperties({
                    id: myListing.id,
                    created_by: myListing.created_by,
                    company_id: myListing.company_id,
                    requested_by: myListing.requested_by,
                    requested_by_company: myListing.requested_by_company,
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
                    otherListingType: myListing.ad_duration_type,
                    ad_duration_type: myListing.ad_duration_type,
                    status: myListing.status,
                    duration: myListing.duration,
                    stripe_price: myListing.stripe_price,
                    units: myListing.units,
                    created_at: myListing.created_at,
                    rating: myListing.rating,
                    amount_reviews: myListing.amount_reviews
                });
                if (myListing.status == 4 || myListing.status == 2) {
                    setStatusPending(true)
                }

                if (discounts.length > 0) {
                    let duration = myListing.ad_duration_type == '2' ? myListing.units : myListing.duration
                    const calculatedDiscount = calculateDiscounts(discounts, duration)
                    setCurrentDiscount(calculatedDiscount)
                }

                setAdvertisementType(myListing.ad_duration_type)
                setIsContentLoaded(true)

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
        }
        getInfo();

    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);
        };
        handleRouteChange()
    }, []);
    return (
        <>
            <TopBar />
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center`}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1000px]'>
                            {
                                (!hasPayout || !sellerAccountIsAccepted) && <PayoutWarningBanner listingProperties={listingProperties} hasPayout={hasPayout}/>
                            }
                            <div>
                                <ImagesBox listingProperties={listingProperties} />
                                <div className='w-full gap-4 flex flex-col-reverse  md:flex-row justify-between'>
                                    <div className={`w-full ${statusPending ? 'md:w-[50%]' : 'md:w-[70%]'} `}>
                                        <ListingHeader
                                            listingProperties={listingProperties}
                                            advertisementType={listingProperties.otherListingType ? listingProperties.otherListingType : advertisementType}
                                            hasPaymentBox={statusPending}
                                        />

                                        <Separator className='my-3' />
                                        <Preview value={listingProperties.description} heigth={200} autoHeigth={true} />

                                        {
                                            listingProperties.requested_by && (
                                                <>
                                                    <Separator className='my-3' />
                                                    <BuyerDetails buyerId={listingProperties.requested_by} buyerProfile={buyerProfile} companyProfile={companyProfile} />
                                                </>
                                            )
                                        }

                                        <Separator className='my-3' />
                                        <DateInfo listingProperties={listingProperties} />

                                        {(advertisementType != 1 || listingProperties.otherListingType != 1) && (
                                            <>
                                                <Separator className='my-5' />
                                                <DiscountsInfo
                                                    listingProperties={listingProperties}
                                                    advertisementType={advertisementType}
                                                />
                                            </>
                                        )}

                                        <Separator className='my-5' />
                                        <InstructionsInfo listingProperties={listingProperties} />
                                    </div>

                                    {
                                        statusPending && (

                                            <div className='w-full md:w-[40%] flex justify-center md:justify-end mt-2' >
                                                <ApproveReservation
                                                    advertisement={listingProperties}
                                                    discounts={listingProperties.discounts}
                                                    currentDiscount={currentDiscount}
                                                    setBookingAccepted={(accepted) => setBookingAccepted(accepted)}
                                                    setBookingRejected={(rejected) => setBookingRejected(rejected)}
                                                    hasPayout={hasPayout}
                                                    sellerAccountIsAccepted={sellerAccountIsAccepted}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <Separator className='my-6' />
                            <Reviews listingId={listingProperties.id} />
                            <Separator className='my-6' />
                            <QrCodeInfo id={listingProperties.id} />
                        </div>
                    ) : (
                        <PageSkeleton />
                    )
                }
            </div >
            <Footer />
        </>
    )
}

