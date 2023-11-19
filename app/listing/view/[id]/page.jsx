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
import GetMyAdvertisement from '@/actions/GetMyAdvertisement'
import GetCategories from '@/actions/GetCategories'
import GetDiscounts from '@/actions/GetDiscounts'
import GetPayoutMethod from '@/actions/getPayoutMethod'

import { Preview } from '@/components/textarea/TextAreaReader'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ListingContext } from './layout'
import { checkCategoryType } from '@/utils/checkCategoryType'
import { Separator } from '@/components/ui/separator'

export default function Listing({ params }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    const [advertisementType, setAdvertisementType] = useState('')
    const [hasPayout, setHasPayout] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const id = params.id

    useEffect(() => {

        async function getInfo() {
            const myListing = await GetMyAdvertisement(id)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)
            const checkPayout = await GetPayoutMethod()
            setHasPayout(checkPayout);

            if (myListing) {
                setListingProperties((prev) => ({
                    ...prev,
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
                    otherListingType:myListing.ad_duration_type
                }));
                const categoryType = checkCategoryType(myListing.category_id)
                setAdvertisementType(categoryType)
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

    return (
        <>
            <TopBar />
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center`}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1000px]'>
                            {
                                !hasPayout && <PayoutWarningBanner />
                            }
                            <div>
                                <ImagesBox listingProperties={listingProperties} />
                                <div className='w- full gap-4 flex justify-between'>
                                    <div className='w-full md:w-[70%] '>
                                        <ListingHeader listingProperties={listingProperties} advertisementType={listingProperties.otherListingType ? listingProperties.otherListingType : advertisementType} />

                                        <Separator className='my-3' />
                                        <Preview value={listingProperties.description} heigth={200} autoHeigth={true}/>

                                        <Separator className='my-3' />
                                        <DateInfo listingProperties={listingProperties} />

                                        {( advertisementType != 1 || listingProperties.otherListingType != 1) && (
                                            <>
                                                <Separator className='my-5' />
                                                <DiscountsInfo listingProperties={listingProperties} advertisementType={advertisementType} />
                                            </>
                                        )}

                                        <Separator className='my-5' />
                                        <InstructionsInfo listingProperties={listingProperties} />
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

