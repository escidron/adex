'use client'

import axios from 'axios';
import { useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBox from './ChatBox';
import { useEffect, useRef } from "react";
import { Divider } from '@mui/material';
import SendChatMessage from '@/actions/SendChatMessage';
import getFilesLink from '@/utils/getFilesLink';

export default function Chat({ messages, userId, advertisementId, createdBy, setMessages }) {
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        })
    }
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message) {

      const response = await SendChatMessage(userId, createdBy, messages[0].buyer_id, advertisementId, message)

      setMessages(prev => ([...prev, {
        ...prev[prev.length - 1], sended_by: userId,
        seller_id: createdBy,
        buyer_id: prev[0].buyer_id,
        advertisement_id: advertisementId,
        message: message
      }]))
      setMessage('')
    }

  }
  let dates = ''

  console.log(`messages`, messages);
  return (
    <div className='flex-col w-full'>
      <div className='border shadow-sm w-full h-[540px] md:h-[745px] lg:h-[540px]  bg-slate-100 rounded-lg p-2 overflow-y-scroll text-right' >

        {
          messages.map((message, index) => {

            const FilesArray = message.files ? getFilesLink(message.files) : []
            if (dates.substring(0, 10) != message.created_at.substring(0, 10)) {
              const date = new Date(message.created_at);
              const month = date.toLocaleString('en-US', { month: 'long' });
              const day = date.getUTCDate();
              const year = date.getUTCFullYear();
              dates = message.created_at
              return (
                <div key={message.id}>
                  <div className='flex flex-col items-center h-[40px] mt-[20px]'>
                    <Divider variant="" sx={{ color: 'black', width: '100%' }} />
                    <p className='mt-[-10px] bg-slate-100 px-2 text-[12px] font-semibold'>{`${month} ${day},${year}`}</p>
                  </div>
                    <ChatBox text={message.message} currentUser={message.sended_by == userId} time={message.created_at} file={FilesArray} />
                </div>
              )
            }
            return (
              <div key={index + message.created_at}>
                    <ChatBox text={message.message} currentUser={message.sended_by == userId} time={message.created_at} file={FilesArray} />
              </div>
            )
          })
        }
        <div ref={messageRef}></div>
      </div>
      <div className='w-full flex gap-1 mt-3'>
        <form onSubmit={(e) => sendMessage(e)} className='w-full'>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder='Message'
            className='rounded-l-lg border p-2 pl-4 w-[100%] bg-slate-100 shadow-sm'
          />
        </form>
        <div onClick={(e) => sendMessage(e)} className=' border rounded-r-lg p-2 flex justify-center items-center bg-slate-100 shadow-sm cursor-pointer'>
          <SendRoundedIcon />
        </div>
      </div>
    </div>
  )
}
