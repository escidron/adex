'use client'
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react'
import { UserContext } from "@/app/layout";
import axios from 'axios';
import { Divider } from '@mui/material';
import { Inter } from 'next/font/google'
import ChatListBox from '@/components/chat/ChatListBox';
import Chat from '@/components/chat/Chat';
import { io } from "socket.io-client";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSearchParams,useRouter } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function MessagesPage() {
    var socket = io.connect('http://localhost:4000')
    const [messages, setMessages] = useState([]);
    const [allChats, setallChats] = useState([]);
    const [message, setMessage] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [selectedChat, setSelectedChat] = useState({
        advertisementId: '',
        createdBy: '',
        buyerId: '',
        advertisementImage: '',
        advertisementPrice: '',
        advertisementTitle: '',
        advertisementDescription: '',
        advertisementAddress: ''
    });
    const [user, setUser] = useContext(UserContext)
    const searchParams = useSearchParams()
    const router = useRouter()
    socket.on('resend-data', () => {
        setRefetch(!refetch)
    })
    useEffect(() => {
        axios.post('http://localhost:8000/api/advertisements/chat-info',
            {}, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                const key = searchParams.get('key')
                const allMessages = response.data.messages
                setallChats(allMessages)
                const privateMessages = allMessages.filter(message => message.advertisement_id + message.seller_id + message.buyer_id == key);
                setMessages(privateMessages)
                if(selectedChat.advertisementId == '' && privateMessages.length > 0){
                    setSelectedChat({
                        advertisementId: privateMessages[0].advertisement_id,
                        createdBy: privateMessages[0].seller_id,
                        buyerId: privateMessages[0].buyer_id,
                        advertisementImage: privateMessages[0].image,
                        advertisementPrice: privateMessages[0].price,
                        advertisementTitle: privateMessages[0].title,
                        advertisementDescription: privateMessages[0].description,
                        advertisementAddress: privateMessages[0].address,
                        advertisementDurationType: privateMessages[0].ad_duration_type
                    })
                }

            })
            .catch(function (error) {
                console.log(error)
            });
    }, [refetch]);

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
                    advertisementDurationType: chat.ad_duration_type
                })

            }
        })
    }

    let chatKey = []
    return (
        <div className={`mt-[120px] w-full flex justify-center ${inter.className}`}>
            <div className='w-[60%] flex justify-center gap-2'>
                <div className='border shadow-sm w-[40%] h-[800px] bg-slate-100 rounded-lg p-2 overflow-y-scroll text-right'>
                    {
                        allChats.map((chat, index) => {
                            if (!chatKey.includes(chat.advertisement_id + chat.seller_id + chat.buyer_id)) {
                                chatKey.push(chat.advertisement_id + chat.seller_id + chat.buyer_id)
                                return (
                                    <div key={chat.advertisement_id + chat.seller_id + chat.buyer_id} 
                                        onClick={() => {
                                            //router.push(`/messages?key=${chat.advertisement_id + chat.seller_id + chat.buyer_id}`)
                                            selectChat(chat.advertisement_id, chat.seller_id, chat.buyer_id)
                                            }}>
                                        <ChatListBox name={chat.name} lastMessage={chat.message} />
                                        <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />
                                    </div>

                                )
                            }
                        })
                    }
                </div>

                <div className='w-[60%] flex flex-col gap-2'>
                    <div className='h-[200px] border shadow-sm w-full bg-slate-100 rounded-lg p-2 flex gap-4'>
                        {
                            selectedChat.advertisementImage ? (
                                <>
                                    <div className='h-full aspect-square'>
                                        <Image
                                            src={selectedChat.advertisementImage}
                                            alt='ad image'
                                            priority
                                            width={2100}
                                            height={2100}
                                            className='h-full w-full rounded-md'
                                        />
                                    </div>
                                    <div className='relative hidden xl:block '>
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
                                            ${selectedChat.advertisementPrice}/{selectedChat.advertisementDurationType === '1' ? (<p className='text-[15px] text-gray-600 flex items-center'>Month</p>) : selectedChat.advertisementDurationType === '2' ? (<p className='text-[15px] text-gray-600 flex items-center'>Quarter</p>) : (<p className='text-[15px] text-gray-600 flex items-center'>Year</p>)}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ''
                            )
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
