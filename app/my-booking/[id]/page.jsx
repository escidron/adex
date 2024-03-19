'use client'

import Footer from '@/components/footer/Footer'
import TopBar from '../../listing/view/[id]/_components/TopBar'
import ImagesBox from '../../listing/view/[id]/_components/ImagesBox'
import ListingHeader from '../../listing/view/[id]/_components/ListingHeader'
import DateInfo from '../../listing/view/[id]/_components/DateInfo'
import DiscountsInfo from '../../listing/view/[id]/_components/DiscountsInfo'
import InstructionsInfo from '../../listing/view/[id]/_components/InstructionsInfo'
import PageSkeleton from '../../listing/view/[id]/_components/PageSkeleton'
import GetCategories from '@/actions/GetCategories'
import GetDiscounts from '@/actions/GetDiscounts'

import { Preview } from '@/components/textarea/TextAreaReader'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ListingContext } from './layout'
import { Separator } from '@/components/ui/separator'
import GetAdvertisementDetails from '@/actions/GetAdvertisementDetails'
import ApproveReservation from '@/components/reservation/ApproveReservation'
import SellerDetails from '@/app/market-place/details/_components/SellerDetails'
import GetUserProfile from '@/actions/GetUserProfile'
import GetCompany from '@/actions/GetCompany'
import Reviews from '@/app/market-place/details/_components/Reviews'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ContactSeller from '@/app/market-place/details/_components/ContactSeller'
import { calculateDiscounts } from '@/utils/calculateDiscounts'

export default function Booking({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')
    const [statusPending, setStatusPending] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [currentDiscount, setCurrentDiscount] = useState(0)
    const [sellerProfile, setSellerProfile] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const id = params.id
    const router = useRouter()
    useEffect(() => {

        async function getInfo() {
            const myListing = await GetAdvertisementDetails(id)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)

            const sellerInfo = await GetUserProfile(myListing.created_by)
            const sellerCompanies = await GetCompany(myListing.company_id)

            setSellerProfile(sellerInfo)
            setCompanyProfile(sellerCompanies.length > 0 ? sellerCompanies[0] : null)

            if (myListing) {
                setListingProperties({
                    id: myListing.id,
                    created_by: myListing.created_by,
                    created_at: myListing.created_at,
                    requested_by: myListing.requested_by,
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
                    seller_name: myListing.seller_name,
                    seller_image: myListing.seller_image,
                    seller_id: myListing.created_by,
                    ad_duration_type: myListing.ad_duration_type,
                    rating: myListing.rating
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
            <TopBar route={'/my-profile?tab=5&sub-tab=1'} />
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center`}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1000px]'>
                            <div>
                                <ImagesBox listingProperties={listingProperties} />
                                <div className='w-full gap-4 flex flex-col-reverse  md:flex-row justify-between'>
                                    <div className={`w-full ${statusPending ? 'md:w-[50%]' : 'md:w-[70%]'} `}>
                                        <ListingHeader listingProperties={listingProperties} advertisementType={advertisementType} hasPaymentBox={true} />

                                        <Separator className='my-6' />
                                        <Preview value={listingProperties.description} heigth={200} />

                                        <Separator className='my-6' />
                                        <SellerDetails
                                            sellerId={listingProperties.seller_id}
                                            sellerProfile={sellerProfile}
                                            companyProfile={companyProfile}
                                        />

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
                                                <DiscountsInfo listingProperties={listingProperties} advertisementType={advertisementType} />
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
                                    {
                                        statusPending && (

                                            <div className='w-full md:w-[40%] flex justify-center md:justify-end mt-2' >
                                                <ApproveReservation
                                                    advertisement={listingProperties}
                                                    discounts={listingProperties.discounts}
                                                    currentDiscount={currentDiscount}
                                                    setBookingAccepted={(accepted) => setBookingAccepted(accepted)}
                                                    setBookingRejected={(rejected) => setBookingRejected(rejected)}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <Separator className='my-6' />
                            <Reviews listingId={listingProperties.id} />
                            <Separator className='my-6' />
                            <ContactSeller listingProperties={listingProperties} />
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

