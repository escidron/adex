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
import { SendHorizontal } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from '@/app/layout'



export default function ListingDetails({ sharedId }) {
    const [user, setUser] = useContext(UserContext)

    const [listingProperties, setListingProperties] = useState({})
    const [advertisementType, setAdvertisementType] = useState('')
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [message, setMessage] = useState('');
    const [hasCard, setHasCard] = useState(false)
    const [isBooked, setIsBooked] = useState(false)
    const [isRequested, setIsRequested] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(false);

    const searchParams = useSearchParams()
    const id = sharedId ? sharedId : searchParams.get('id')
    const notificationId = searchParams.get('notification_id')
    const rejectedId = searchParams.get('rejected')

    const router = useRouter();

    useEffect(() => {

        async function getInfo() {
            const myListing = await GetAdvertisementDetails(id)
            const categories = await GetCategories()
            const discounts = await GetDiscounts(id)
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
                    ad_duration_type: myListing.ad_duration_type,
                    id: id
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
            const response = await SendChatMessage(user.userId, listingProperties.seller_id, user.userId, listingProperties.id, message)
            toast.success('Message sended')
            setMessage(prev => '')
            setRefetch(prev => !prev)
        } else {
            router.push('/login')
        }

    }

    return (
        <>
            <Toaster />
            <div className={`h-full w-full mt-[80px] py-4 flex flex-col items-center justify-center`}>
                {
                    isContentLoaded ? (
                        <div className='w-full  px-6 h-full max-w-[1100px]'>
                            <div>
                                <ImagesBox listingProperties={listingProperties} />
                                <div className='w-full flex justify-between mt-4'>
                                    <div className='w-full md:w-[50%]'>
                                        <ListingHeader listingProperties={listingProperties} advertisementType={advertisementType} hasPaymentBox={true} />

                                        <Separator className='my-6' />
                                        <Preview value={listingProperties.description} heigth={200} autoHeigth={true} />

                                        <Separator className='my-6' />
                                        <SellerDetails listingProperties={listingProperties} />

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

                                    <div className='w-full md:w-[40%] flex justify-end' >
                                        {
                                            !rejectedId && (

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
                                    </div>
                                </div>
                                <Separator className='my-6' />
                                {
                                    isChatOpen ? (
                                        <div className='w-[600px] flex mx-auto'>
                                            {/* <Chat
                                                messages={messages}
                                                isChatPage={false}
                                                userId={user.userId}
                                                createdBy={data.created_by}
                                                advertisementId={data.id}
                                                //socket={socket}
                                                setRefetch={(refetch) => setRefetch(refetch)} /> */}
                                        </div>

                                    ) : (
                                        <div className='w-[600px]'>
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
                                            <div className='flex gap-2 justify-end'>
                                                <Button onClick={sendMessage} className='flex gap-2 items-center'>
                                                    <SendHorizontal size={15} />
                                                    Send Message
                                                </Button>
                                            </div>
                                        </div>
                                    )

                                }
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

