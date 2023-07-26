'use client'
import { useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBox from './ChatBox';
import { useEffect, useRef } from "react";
import { Divider } from '@mui/material';

export default function Chat({ messages, userId,socket, setRefetch,advertisementId,createdBy,isChatPage }) {
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

  const sendMessage = (e) => {
    e.preventDefault()
    setMessage('')
    socket.emit(isChatPage?'send-message':'send-buyer-message',

      {
        sended_by: userId,
        seller_id: createdBy,
        buyer_id: messages[0].buyer_id,
        advertisement_id: advertisementId,
        message: message
      })
    setRefetch(prev => !prev)
  }
  let dates = ''

  return (
    <div className='flex-col w-full'>
      <div className='border shadow-sm w-full h-[540px]  bg-slate-100 rounded-lg p-2 overflow-y-scroll text-right' >

        {
          messages.map((message, index) => {
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
                  <ChatBox text={message.message} currentUser={message.sended_by == userId} time={message.created_at} />
                </div>
              )
            }
            return (
              <ChatBox key={message.id} text={message.message} currentUser={message.sended_by == userId} time={message.created_at} />
            )
          })
        }
        <div ref={messageRef}></div>
      </div>
      <div className='w-full flex gap-1 mt-3'>
        <form onSubmit={sendMessage} className='w-full'>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder='Message'
            className='rounded-l-lg border p-2 pl-4 w-[100%] bg-slate-100 shadow-sm'
          />
        </form>
        <div onClick={sendMessage} className=' border rounded-r-lg p-2 flex justify-center items-center bg-slate-100 shadow-sm cursor-pointer'>
          <SendRoundedIcon />
        </div>
      </div>
    </div>
  )
}
