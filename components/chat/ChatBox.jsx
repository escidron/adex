'use client'

import DownloadChatFiles from "@/actions/DownloadChatFiles";
import { Download, File, Trash } from "lucide-react"

export default function ChatBox({ text, currentUser, time, file }) {
  const timetest = '31/03/2024, 2:05:56'
  return (
    <div className={`w-full ${currentUser ? 'text-right' : 'text-left'}`}>
      <div className={`p-2 rounded-xl  min-w-[250px] max-w-[70%] inline-block ${currentUser ? 'bg-[#FCD33B] text-black shadow-md ' : 'bg-white shadow-md'} text-[14px] mt-2 mb-2`}>
        {
          file.length > 0 ? (
            <>
              <div className="flex gap-2  justify-between items-center">
                <div className="flex gap-2 items-center">
                  <File size={18} />
                  <p className="text-[15px] font-[500]">{file.length} file{file.length > 1 && 's'}</p>
                </div>
                <div onClick={() => { }} className='p-2 rounded-lg cursor-pointer hover:bg-slate-200 hover:text-black'>
                  <Download size={18} onClick={async () => DownloadChatFiles(file)} />
                </div>
              </div>
              <p className="text-left">
                {text}
              </p>
            </>
          ) : (
            <p className="text-left">
              {text}
            </p>

          )
        }
        <p className="text-[10px] text-right mt-1">
          {new Date(time).toLocaleString('en-US',{hour: '2-digit', minute: '2-digit'})}
        </p>
      </div>
    </div >
  )
}
