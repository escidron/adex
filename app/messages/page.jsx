'use client'
import ChatListBox from '@/components/chat/ChatListBox';
import Chat from '@/components/chat/Chat';
import Image from 'next/image';
import MultiImage from '@/components/multiImage/MultiImage';

import { useState, useEffect, useRef, useContext } from 'react'
import { UserContext } from "@/app/layout";
import { Divider } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft, MapPin, Users } from 'lucide-react';
import GetNotifications from '@/actions/GetNotifications';
import GetChatMessages from '@/actions/GetChatMessages';
import { Button } from '@/components/ui/button';

export default function MessagesPage() {

    const [messages, setMessages] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [showMessages, setshowMessages] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [contentIsLoaded, setContentIsLoaded] = useState(false);

    const [selectedChat, setSelectedChat] = useState({
        advertisementId: '',
        createdBy: '',
        buyerId: '',
        advertisementImage: '',
        advertisementPrice: '',
        advertisementTitle: '',
        advertisementDescription: '',
        advertisementAddress: '',
        avatar: '',
        name: ''
    });
    const [user, setUser] = useContext(UserContext)
    const searchParams = useSearchParams()
    const key = searchParams.get('key')
    const router = useRouter()
    let chatKey = []
    let lastMessages = []

    useEffect(() => {
        async function GetInfo() {
            const response = await GetNotifications()
            // Get all messages first, then filter if key exists
            const allMessages = await GetChatMessages(null) // Get all messages
            setUser((prev) => ({ ...prev, notificationQuantity: response.length, notifications: response }))
            setAllChats(allMessages || [])
            setContentIsLoaded(true)
            
            // Filter messages if key is provided
            let privateMessages = []
            if (key && allMessages) {
                privateMessages = allMessages.filter(message => message.advertisement_id + message.seller_id + message.buyer_id == key);
                setMessages(privateMessages)
            } else {
                setMessages([])
            }
            if (selectedChat.advertisementId == '' && privateMessages.length > 0) {
                setSelectedChat({
                    advertisementId: privateMessages[0].advertisement_id,
                    createdBy: privateMessages[0].seller_id,
                    buyerId: privateMessages[0].buyer_id,
                    advertisementImage: privateMessages[0].image,
                    advertisementPrice: privateMessages[0].price,
                    advertisementTitle: privateMessages[0].campaign_name || privateMessages[0].title,
                    advertisementDescription: privateMessages[0].description,
                    advertisementAddress: privateMessages[0].address,
                    advertisementDurationType: privateMessages[0].ad_duration_type,
                    avatar: privateMessages[0].profile_image,
                    name: privateMessages[0].name,
                    isCampaign: !!privateMessages[0].campaign_id,
                    campaignId: privateMessages[0].campaign_id,
                    rewardAmount: privateMessages[0].reward_amount,
                    maxParticipants: privateMessages[0].max_participants
                })
            }
        }
        GetInfo()

    }, [refetch]);

    useEffect(() => {

        const interval = setInterval(() => {
            setRefetch(prev => !prev);
        }, 5000);

        return () => {
            clearInterval(interval);
        };

    }, []);



    const selectChat = (advertisementId, sellerId, buyerId) => {
        const privateMessages = allChats.filter(message => message.advertisement_id == advertisementId && message.seller_id == sellerId && message.buyer_id == buyerId);
        setMessages(privateMessages)
        router.push(`/messages?key=${advertisementId + sellerId + buyerId}`)
        allChats.map((chat) => {
            if (chat.advertisement_id + chat.seller_id + chat.buyer_id == advertisementId + sellerId + buyerId) {
                setSelectedChat({
                    advertisementId: chat.advertisement_id,
                    createdBy: chat.seller_id,
                    buyerId: chat.buyer_id,
                    advertisementImage: chat.image,
                    advertisementPrice: chat.price,
                    advertisementTitle: chat.campaign_name || chat.title,
                    advertisementDescription: chat.description,
                    advertisementAddress: chat.address,
                    advertisementDurationType: chat.ad_duration_type,
                    avatar: chat.profile_image,
                    name: chat.name,
                    isCampaign: !!chat.campaign_id,
                    campaignId: chat.campaign_id,
                    rewardAmount: chat.reward_amount,
                    maxParticipants: chat.max_participants

                })

            }
        })
    }

    return (
        <div className={`h-screen w-full flex justify-center pt-[120px]`}>
            {
                contentIsLoaded && (
                    <>
                        {
                            allChats && allChats.length > 0 && (
                                <div className='w-[90%] max-w-[600px] md:max-w-[1000px] flex justify-center gap-2'>
                                    <div className={` md:block ${showMessages ? 'block h-[680px] w-[90%] md:w-[40%]' : 'hidden'} border shadow-sm w-[40%] md:h-[800px] bg-slate-100 rounded-lg overflow-y-scroll text-right`}>
                                        {
                                            allChats.map((chat, index) => {
                                                if (!chatKey.includes(chat.advertisement_id + chat.seller_id + chat.buyer_id)) {

                                                    chatKey.push(chat.advertisement_id + chat.seller_id + chat.buyer_id)

                                                    const key = chat.advertisement_id + chat.seller_id + chat.buyer_id
                                                    const selectedKey = selectedChat.advertisementId + selectedChat.createdBy + selectedChat.buyerId

                                                    const chatMessages = allChats.filter((item) => item.advertisement_id + item.seller_id + item.buyer_id == key);
                                                    const lastMessage = chatMessages[chatMessages.length - 1].message;
                                                    const lastMessageTime = chatMessages[chatMessages.length - 1].created_at;

                                                    lastMessages.push({ key: key, message: lastMessage, time: lastMessageTime })
                                                    return (
                                                        <div key={key} className={`${key == selectedKey && 'bg-slate-200'}`}
                                                            onClick={() => {
                                                                selectChat(chat.advertisement_id, chat.seller_id, chat.buyer_id)
                                                                setshowMessages(false)
                                                            }}>
                                                            <ChatListBox name={chat.name} lastMessage={lastMessage} avatar={chat.profile_image} />
                                                            <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '10px', marginBottom: '0px' }} />
                                                        </div>

                                                    )
                                                }
                                            })
                                        }
                                    </div>

                                    <div className={`w-[90%] md:w-[60%] ${showMessages ? 'hidden md:flex' : 'flex'} flex-col gap-2`}>

                                        <div className='h-[200px] border shadow-sm w-full bg-slate-100 rounded-lg p-2 hidden lg:flex gap-4'>
                                            {/* 이미지 영역 - 항상 공간 확보 */}
                                            <div className='h-full min-w-[35%] max-w-[35%] flex-shrink-0'>
                                                {selectedChat.advertisementImage ? (
                                                    <MultiImage images={selectedChat.advertisementImage} height={'180px'} remove={false} />
                                                ) : (
                                                    <div className='w-full h-full flex justify-center items-center bg-gray-200 rounded-lg'>
                                                        <Image
                                                            src='/adex-logo-white-yellow.png'
                                                            alt="No image available"
                                                            width={80}
                                                            height={80}
                                                            className='opacity-50'
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* 텍스트 정보 영역 */}
                                            <div className='flex-1 flex flex-col justify-between p-2 min-h-0'>
                                                {/* 상단 텍스트 영역 */}
                                                <div>
                                                    <h1 className='text-[24px] font-[600] mb-2'>{selectedChat.advertisementTitle}</h1>
                                                    <div className='flex gap-2 items-center mb-4'>
                                                        {selectedChat.isCampaign ? (
                                                            <>
                                                                <Users className='min-w-[14px] max-w-[14px]' />
                                                                <p className='text-[12px] text-gray-600'>
                                                                    {selectedChat.maxParticipants ? `Up to ${selectedChat.maxParticipants} participants` : 'Campaign Event'}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MapPin className='min-w-[14px] max-w-[14px]' />
                                                                {
                                                                    selectedChat.advertisementAddress ? (
                                                                        <p className='text-[12px] text-gray-600'>{selectedChat.advertisementAddress}</p>
                                                                    ) : (
                                                                        <p className='text-[12px] text-gray-600'>Online Asset</p>
                                                                    )
                                                                }
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* 하단 가격 영역 */}
                                                <div className='mt-auto'>
                                                    {selectedChat.isCampaign ? (
                                                        <div className="flex flex-col">
                                                            <p className='text-[12px] text-gray-600'>Reward per participant</p>
                                                            <p className='text-[18px] font-semibold'>
                                                                ${selectedChat.rewardAmount ? Number(selectedChat.rewardAmount).toFixed(2) : '0.00'}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className='flex items-center text-[20px]'>
                                                            ${selectedChat.advertisementPrice}
                                                            {selectedChat?.advertisementDurationType == '0' ? (
                                                                <p className='text-[15px] text-gray-600 ml-1'>/Month</p>
                                                            ) : selectedChat?.advertisementDurationType == '2' ? (
                                                                <p className='text-[15px] text-gray-600 ml-1'>/Units</p>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                        <div className='h-[80px] border shadow-sm w-full bg-slate-100 rounded-lg p-2 flex md:hidden gap-6'>
                                            {

                                                <div className='w-full flex gap-2 items-center p-2 cursor-pointer '>
                                                    <div onClick={() => setshowMessages(true)} className='hover:bg-slate-200 p-1 rounded-md cursor-pointer'>
                                                        <ChevronLeft />
                                                    </div>
                                                    <div className='min-w-[32px]'>

                                                        {
                                                            selectedChat.avatar ? (

                                                                <Image
                                                                    src={selectedChat.avatar}
                                                                    alt="user image"
                                                                    width={2000}
                                                                    height={2000}
                                                                    priority
                                                                    className='w-8 min-w-8 h-8 rounded-full '
                                                                />
                                                            ) : (
                                                                <div className='w-8 h-8 min-w-8 rounded-full bg-[#FCD33B] text-black font-bold flex justify-center items-center border-2 border-[#FCD33B]'>
                                                                    {selectedChat.name.substring(0, 1).toUpperCase()}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='flex justify-between items-center w-full'>
                                                        <div>
                                                            <h1 className='text-left text-[14px] font-semibold'>{selectedChat.name}</h1>
                                                            {lastMessages.map((message) => {
                                                                if (message.key == selectedChat.advertisementId + selectedChat.createdBy + selectedChat.buyerId) {
                                                                    return (
                                                                        <p key={message.key} className='text-left text-[12px] text-gray-700'>
                                                                            {message.message}
                                                                        </p>
                                                                    )
                                                                }
                                                            })}
                                                        </div>
                                                        {lastMessages.map((message) => {
                                                            if (message.key == selectedChat.advertisementId + selectedChat.createdBy + selectedChat.buyerId) {
                                                                const messageTime = new Date(message.time);
                                                                const timeString = messageTime.toLocaleTimeString('en-US', { 
                                                                    hour: '2-digit', 
                                                                    minute: '2-digit',
                                                                    hour12: false 
                                                                });
                                                                return (
                                                                    <p key={`time-${message.key}`} className='text-left text-[12px] text-gray-700'>
                                                                        {timeString}
                                                                    </p>
                                                                )
                                                            }
                                                            return null;
                                                        })}
                                                    </div>

                                                </div>

                                            }

                                        </div>

                                        <Chat
                                            messages={messages}
                                            setMessages={(newMessage) => setMessages(newMessage)}
                                            userId={user.userId}
                                            createdBy={selectedChat.createdBy}
                                            advertisementId={selectedChat.advertisementId}
                                            // socket={socket}
                                            setRefetch={(refetch) => setRefetch(refetch)} />
                                    </div>
                                </div>
                            )
                        }
                        {
                            (!allChats || allChats.length === 0) && (
                                <div className='mt-[200px] bg-[#FCD33B] h-[150px] rounded-lg p-4 flex flex-col items-center'>
                                    <h1 className='text-[32px]'>You do not have any messages yet</h1>
                                    <Button className='mt-6 gap-2' onClick={() => router.back()}>
                                        <ArrowLeft size={16} />
                                        Back
                                    </Button>
                                </div>
                            )
                        }
                    </>
                )
            }

        </div>
    )
}
