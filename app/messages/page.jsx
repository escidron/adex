'use client'
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react'
import { UserContext } from "@/app/layout";
import axios from 'axios';
import { Divider } from '@mui/material';
import ChatListBox from '@/components/chat/ChatListBox';
import Chat from '@/components/chat/Chat';
import { io } from "socket.io-client";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSearchParams, useRouter } from 'next/navigation'
import MultiImage from '@/components/multiImage/MultiImage';
import { ChevronLeft } from 'lucide-react';




export default function MessagesPage() {
    var socket = io.connect('https://test.adexconnect.com:4500')
    const [messages, setMessages] = useState([]);
    const [allChats, setallChats] = useState([]);
    const [showMessages, setshowMessages] = useState(false);
    const [refetch, setRefetch] = useState(false);
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
    socket.on('resend-data', () => {
        setRefetch(!refetch)
    })
    useEffect(() => {
        axios.post('https://test.adexconnect.com/api/advertisements/chat-info',
            { key: key }, {
            withCredentials: true,
        })
            .then(function (response) {
                console.log('response', response)
                GetNotifications()

                const allMessages = response.data.messages
                setallChats(allMessages)
                const privateMessages = allMessages.filter(message => message.advertisement_id + message.seller_id + message.buyer_id == key);
                setMessages(privateMessages)
                if (selectedChat.advertisementId == '' && privateMessages.length > 0) {
                    setSelectedChat({
                        advertisementId: privateMessages[0].advertisement_id,
                        createdBy: privateMessages[0].seller_id,
                        buyerId: privateMessages[0].buyer_id,
                        advertisementImage: privateMessages[0].image,
                        advertisementPrice: privateMessages[0].price,
                        advertisementTitle: privateMessages[0].title,
                        advertisementDescription: privateMessages[0].description,
                        advertisementAddress: privateMessages[0].address,
                        advertisementDurationType: privateMessages[0].ad_duration_type,
                        avatar: privateMessages[0].profile_image,
                        name: privateMessages[0].name
                    })
                }

            })
            .catch(function (error) {
                console.log(error)
            });
    }, [refetch]);

    async function GetNotifications() {
        axios.post('https://test.adexconnect.com/api/users/notifications',
            {}, {
            withCredentials: true,

        })
            .then(function (response) {

                setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length }))
                setUser((prev) => ({ ...prev, notifications: response.data.notifications }))
            })
            .catch(function (error) {
                console.log(error)
            });
    }
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
                    advertisementTitle: chat.title,
                    advertisementDescription: chat.description,
                    advertisementAddress: chat.address,
                    advertisementDurationType: chat.ad_duration_type,
                    avatar: chat.profile_image,
                    name: chat.name,

                })

            }
        })
    }


    return (
        <div className={`mt-[120px] w-full flex justify-center `}>
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

                                lastMessages.push({ key: key, message: lastMessage })
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
                        {
                            selectedChat.advertisementImage && (
                                <>
                                    <div className='h-full w-[35%] aspect-auto'>
                                        <MultiImage images={selectedChat.advertisementImage} height={'180px'} remove={false} />
                                    </div>
                                    <div className='relative hidden lg:block '>
                                        <h1 className='text-[24px] font-[600]'>{selectedChat.advertisementTitle}</h1>
                                        <div className='flex gap-2 ml-[-5px]'>
                                            <LocationOnIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                            <p className='text-[14px] mt-[-3px]'>{selectedChat.advertisementAddress}</p>
                                        </div>
                                        <p className='text-[14px] mt-4 w-full'>
                                            {selectedChat.advertisementDescription.length > 125 ? selectedChat.advertisementDescription.split(' ').slice(0, 15).join(' ') + "..."
                                                : selectedChat.advertisementDescription}
                                        </p>
                                        <div className='flex mt-auto text-[20px] absolute bottom-0'>
                                            ${selectedChat.advertisementPrice}/{selectedChat?.advertisementDurationType === '1' ? (<p className='text-[15px] text-gray-600 flex items-center'>Month</p>) : selectedChat.advertisementDurationType === '2' ? (<p className='text-[15px] text-gray-600 flex items-center'>Quarter</p>) : (<p className='text-[15px] text-gray-600 flex items-center'>Year</p>)}
                                        </div>
                                    </div>
                                </>
                            )
                        }

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
                                    <p className='text-left text-[12px] text-gray-700'>10:20</p>
                                </div>

                            </div>

                        }

                    </div>

                    <Chat
                        messages={messages}
                        userId={user.userId}
                        createdBy={selectedChat.createdBy}
                        advertisementId={selectedChat.advertisementId}
                        socket={socket}
                        setRefetch={(refetch) => setRefetch(refetch)} />
                </div>
            </div>
        </div>
    )
}
