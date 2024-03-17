'use client'

import axios from 'axios';
import { useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBox from './ChatBox';
import { useEffect, useRef } from "react";
import { Divider } from '@mui/material';
import SendChatMessage from '@/actions/SendChatMessage';
import getFilesLink from '@/utils/getFilesLink';
import { FileCheck, ImageIcon, Paperclip, X } from 'lucide-react';
import SendFiles from '@/actions/SendFiles';

export default function Chat({ messages, userId, advertisementId, createdBy, setMessages,setRefetch }) {
  const [message, setMessage] = useState('');
  const [uploadFiles, setUploadFiles] = useState([]);
  let dates = ''

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
    if (message || uploadFiles.length > 0) {

      const formData = new FormData();
      const filesNames = []
      uploadFiles.forEach((file, index) => {
        formData.append('files', file);
        filesNames.push(file.name)
      });
      const response = await SendChatMessage(userId, createdBy, messages[0].buyer_id, advertisementId, message, filesNames)
      const filesResponse = await SendFiles(formData)


      setMessages(prev => ([...prev, {
        ...prev[prev.length - 1], sended_by: userId,
        seller_id: createdBy,
        buyer_id: prev[0].buyer_id,
        advertisement_id: advertisementId,
        message: message,
        files:filesNames.join(';')

      }]))
      setMessage('')
      setUploadFiles([])
      setRefetch(prev=>!prev)
    }

  }

  const handleUpload = (files, format) => {
    const selectedFiles = Array.from(files);
    const newFiles = selectedFiles.map((item) => {
      const newFile = new File([item], item.name, { type: item.type });//item is a inmutable object so need to create a copy
      newFile.format = format;

      return newFile;
    })

    setUploadFiles((prev) => ([...prev, ...newFiles]))

  };

  const handleRemoveFiles =  () => {


    setUploadFiles([])

  };
  return (
    <div className='flex-col w-full'>
      <div className='border shadow-sm w-full h-[525px] md:h-[735px] lg:h-[525px]  bg-slate-100 rounded-lg p-2 overflow-y-scroll text-right' >

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
      <div className='w-full flex gap-1 mt-3 relative'>
        <form onSubmit={(e) => sendMessage(e)} className='w-full'>
          <div className='flex rounded-l-lg border p-2 w-[100%] bg-slate-100 shadow-sm'>
            <div className='pl-2 flex gap-1'>
              <input id="file-input" type="file" multiple className='hidden' onChange={(e) => handleUpload(e.target.files, 'file')} />
              <label htmlFor="file-input" className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                <Paperclip size={20} />
              </label>

              <input id="image-input" type="file" accept="image/*" multiple className='hidden' onChange={(e) => handleUpload(e.target.files, 'image')} />
              <label htmlFor="image-input" className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                <ImageIcon size={20} />
              </label>
            </div>
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder='Message'
              className='bg-transparent bg-slate-100 focus:outline-none w-full ml-2'
            />
          </div>
        </form>
        <div onClick={(e) => sendMessage(e)} className=' border rounded-r-lg p-2 flex justify-center items-center bg-slate-100 shadow-sm cursor-pointer'>
          <SendRoundedIcon />
        </div>
        {
          uploadFiles.length > 0 && (

            <div className='absolute h-[150px] max-w-[220px] md:h-[200px] md:max-w-[320px] p-2 bottom-[80px] left-2 bg-white w-full md:w-[400px] rounded-[6px] shadow-md transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-100'>
              <div onClick={handleRemoveFiles} className='flex ml-auto justify-end items-center  p-2 z-[99] w-8 rounded-lg cursor-pointer hover:bg-slate-200 hover:text-black'>
                <X size={18} />
              </div>
              <div className='w-full my-auto flex flex-col items-center mt-4'>
                <FileCheck size={30} />
                <p className='mt-2 text-[18px] font-[500]'>Upload {uploadFiles.length} file{uploadFiles.length > 1 && 's'}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
