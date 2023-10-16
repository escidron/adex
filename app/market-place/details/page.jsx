"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Divider } from '@mui/material';
import BlackButton from '@/components/buttons/BlackButton';
import Footer from '@/components/footer/Footer';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from '@/components/addCard/StripeForm';
import { ThreeDots } from 'react-loader-spinner'
import Success from '@/components/messages/Success';
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Reservation from '@/components/reservation/Reservation';
import { useContext } from 'react';
import { UserContext } from "@/app/layout";
import { io } from "socket.io-client";
import Chat from '@/components/chat/Chat';
import MultiImage from '@/components/multiImage/MultiImage';
import { Toaster } from "react-hot-toast";
import { MapPin } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51Hz3inL3Lxo3VPLoBHjjbAES3oCWqKYtTQtgYYPdDhYw8LQboBwmqpz3euwD4KL7x37x0vrFgA2EDu1toAXg6Bo900T7w4sPl5');

export default function AdDetails({ sharedId }) {
  // var socket = io.connect('http://localhost:4400')
  //var socket = io.connect('https://test.adexconnect.com:4500')
  //console.log(socket)
  const [user, setUser] = useContext(UserContext)
  const [data, setData] = useState({});
  const [accept, setAccept] = useState(false)
  const [hasCard, setHasCard] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isPending, setIsPending] = useState(false)
  const [isPending2, setIsPending2] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [isRequested, setIsRequested] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const id = sharedId ? sharedId : searchParams.get('id')
  const rejectedId = searchParams.get('rejected')
  const notificationId = searchParams.get('notification_id')
  const [gallery, setGallery] = useState([]);
  const [company, setCompany] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [bulletPoints, setBulletPoints] = useState([])

  const router = useRouter();

  useEffect(() => {
    axios.post('https://test.adexconnect.com/api/advertisements/details',
      {
        id: id,
        notificationId: notificationId
      }, {
      withCredentials: true,
    })
      .then(function (response) {
        GetNotifications()
        setData(response.data.data)
        const bulletPoints = response.data.data.description.split('\n');
        setBulletPoints(bulletPoints)
        console.log('checking data')
        if (response.data.data.company_id) {
          getGallery(response.data.data.company_id)
          getCompany(response.data.data.company_id)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    axios.post('https://test.adexconnect.com/api/advertisements/discounts',
      {
        id: id,
      }, {
      withCredentials: true,
    })
      .then(function (response) {
        setDiscounts(response.data.discounts)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    axios.post('https://test.adexconnect.com/api/payments/my-cards',
      {}, {
      withCredentials: true,
    })
      .then(function (response) {
        if (response.data.data.length > 0) {
          setHasCard(true)
          setAccept(false)
        } else {
          setHasCard(false)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [refetch]);

  useEffect(() => {
    if (data.id) {
      axios.post('https://test.adexconnect.com/api/advertisements/messages',
        {}, {
        withCredentials: true,
      })
        .then(function (response) {

          const allMessages = response.data.messages
          const privateMessages = allMessages.filter(message => message.buyer_id == user.userId && message.seller_id == data.created_by && message.advertisement_id == data.id);
          setMessages(privateMessages)
          if (privateMessages.length > 0) {
            setIsChatOpen(true)
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }, [data, user, refetch]);

  async function GetNotifications() {
    axios.post('https://test.adexconnect.com/api/users/notifications',
      {}, {
      withCredentials: true,
    })
      .then(function (response) {

        setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length, notifications: response.data.notifications }))
      })
      .catch(function (error) {
        console.log(error)
      });
  }


  //   socket.on('resend-data', () => {
  //     setRefetch(!refetch)
  // })

  const sendMessage = () => {

    if (user.isLogged) {
      socket.emit('send-buyer-message',
        {
          sended_by: user.userId,
          seller_id: data.created_by,
          buyer_id: user.userId,
          advertisement_id: data.id,
          message: message
        })
      setIsChatOpen(true)
      setRefetch(prev => !prev)
    } else {
      router.push('/login')
    }

  }

  const getGallery = (id) => {
    axios.post('https://test.adexconnect.com/api/users/get-image-gallery',
      {
        id: id,
      },
      {
        withCredentials: true,
      })
      .then(function (response) {
        setGallery(response.data.galleryWithImages)
      })
      .catch(function (error) {
        console.log(error)
      });

  }
  const getCompany = (id) => {
    axios.post('https://test.adexconnect.com/api/users/my-company',
      {
        id: id,
      },
      {
        withCredentials: true,
      })
      .then(function (response) {
        setCompany(response.data[0])
        console.log('company response', response)
      })
      .catch(function (error) {
        console.log(error)
      });

  }
  console.log('gallery', gallery)
  console.log('data', data)

  useEffect(() => {


    setIsRendered(true)
  }, []);

  if (!isRendered) {
    return null
  }
  return (
    <>

      <div className={`mt-[150px] w-full h-full flex justify-center items-center `}>
        <div><Toaster /></div>

        {isBooked ? (
          < Success >
            <h1 className='text-[25px]'>Booking created</h1>

            <p className='my-4'>You will found the contract details in my &ldquo;ADEX&ldquo; section.</p>

            <div className='flex justify-between w-full'>
              <Link href='/' className='mt-6'>
                <SecondaryButton label='later' dark={true} />
              </Link>
              <Link href='/my-profile?tab=5' className='mt-6'>
                <BlackButton label='view details' />
              </Link>
            </div>
          </Success>
        ) : isRequested ? (
          < Success >
            <h1 className='text-[25px]'>Booking requested</h1>
            <p className='my-4'>Your booking request will be answered soon. Thank you for your patience!</p>
            <div className='flex justify-between w-full'>
              <Link href='/' className='mt-6'>
                <BlackButton label='Done' />
              </Link>
            </div>
          </Success>
        ) : (
          <div className='flex flex-col w-[80%] max-w-[1000px] '>
            <div className={`flex flex-col items-center justify-center`}>
              <Link href={`/market-place/${data.company_id ? 'company-details' : 'seller-details'}?id=${data.company_id ? data.company_id : data.created_by}`} className='w-[150px] h-[150px] cursor-pointer'>
                <Image
                  src={data.seller_image && !data.company_id ? data.seller_image : data.company_id ? company.company_logo : '/nouser.png'}
                  alt="Seller Logo"
                  priority
                  width={2000}
                  height={2000}
                  className='rounded-full w-full h-full object-cover'
                />
              </Link>
              <Link href={`/market-place/${data.company_id ? 'company-details' : 'seller-details'}?id=${data.company_id ? data.company_id : data.created_by}`} className='text-[35px] min-w-[250px] text-center cursor-pointer'>{data.company_id ? company.company_name : data.seller_name}</Link>
              <div className="flex items-center justify-center">
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
              </div>
              <Link href={`/market-place/${data.company_id ? 'company-details' : 'seller-details'}?id=${data.company_id ? data.company_id : data.created_by}`} className={` flex item justify-center bg-black text-[#FCD33B] hover:bg-[#FCD33B] hover:text-black py-[8px]  px-[30px] rounded-md mt-2 font-[600]  text-lg `}>
                Seller Details
              </Link>
            </div>
            <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />

            <div className={`flex flex-col lg:flex-row gap-3  ${rejectedId ? 'justify-center' : 'justify-between'}`}>
              <div className='w-[50%] '>
                <div className='w-full h-[300px] shadow-image rounded-lg'>
                  <MultiImage images={data.image ? data.image : [{ data_url: '/nouser.png' }]} height={'300px'} remove={false} />
                </div>
                <div className='mt-4 '>
                  <div className='flex gap-4 items-center'>
                    <h1 className='text-[20px] font-[500]'>{data.title}</h1>
                    <div className="flex items-center justify-center">
                      <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                      <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                      <StarRoundedIcon fontSize='small' sx={{ color: '#FCD33B' }} />
                      <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                      <StarRoundedIcon fontSize='small' sx={{ color: 'gray' }} />
                    </div>
                  </div>
                  <div className='flex items-center  gap-1'>
                    {/* <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} /> */}
                    <MapPin size={16} color='gray' />

                    <h1 className='text-[15px] text-gray-500'>{data.address}</h1>
                  </div>
                  <h1 className='text-[15px] mt-4'>{
                    bulletPoints.length > 0 ? (
                      <ul>
                        {bulletPoints.map((point, index) => {
                          return (

                            <li key={index}>{point}</li>
                          )
                        })}
                      </ul>
                    ) : `${data.description}`
                  }</h1>
                </div>
              </div>
              {!rejectedId ? (

                <Reservation
                  data={data}
                  hasCard={hasCard}
                  setHasCard={(card) => setHasCard(card)}
                  setShowModal={(show) => setShowModal(show)}
                  setIsBooked={(booked) => setIsBooked(booked)}
                  setIsRequested={(requested) => setIsRequested(requested)}
                  discounts={discounts}
                />
              ) : ('')}

            </div>
            <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '40px', marginBottom: '40px' }} />
            {
              isChatOpen ? (
                <div className='w-[600px] flex mx-auto'>
                  <Chat
                    messages={messages}
                    isChatPage={false}
                    userId={user.userId}
                    createdBy={data.created_by}
                    advertisementId={data.id}
                    socket={socket}
                    setRefetch={(refetch) => setRefetch(refetch)} />
                </div>

              ) : (
                <div className='w-[600px]'>
                  <h1 className='text-[20px] font-[500]'>{rejectedId ? 'Any question about the rejected booking request?' : 'Need further clarification?'}</h1>
                  <p className='text-[14px] text-gray-700'>{`Feel free to reach out to ${data.seller_name} via a message.`}</p>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    type="textarea"
                    id="message"
                    name="message"
                    className={`w-full mt-2 overflow-hidden border shadow-sm p-3 rounded-lg outline-none h-[140px] resize-none  focus:border-black`}
                  />
                  <div className='max-w-[100px] flex ml-auto'>
                    <button disabled={isPending2 ? true : false} onClick={sendMessage} className={`z-10 flex item justify-center bg-black text-[#FCD33B] py-[8px] w-full px-[30px] rounded-md mt-2 font-[600]  ${!isPending2 ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg `}>
                      {
                        isPending ? (
                          <ThreeDots
                            height="30"
                            width="40"
                            radius="9"
                            color="#FCD33B"
                            ariaLabel="three-dots-loading"
                            visible={true}
                          />
                        ) : 'Send'
                      }
                    </button>
                  </div>
                </div>
              )

            }

          </div>
        )}
      </div>

      {showModal ? (
        <Elements stripe={stripePromise}>
          <StripeForm setShowModal={(show) => setShowModal(show)} setRefetch={(refetch) => setRefetch(refetch)} />
        </Elements>
      ) : ''}
      <Footer />
    </>
  )
}
