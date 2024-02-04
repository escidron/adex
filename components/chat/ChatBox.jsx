'use client'

import DownloadChatFiles from "@/actions/DownloadChatFiles";
import { Download, File, Trash } from "lucide-react"

export default function ChatBox({ text, currentUser, time, file }) {

  return (
    <div className={`w-full ${currentUser ? 'text-right' : 'text-left'}`}>
      <div className={`p-2 rounded-xl max-w-[70%] inline-block ${currentUser ? 'bg-[#FCD33B] text-black shadow-md ' : 'bg-white shadow-md'} text-[14px] mt-2 mb-2`}>
        {
          file.length > 0 ? (
            <div className="flex gap-2 min-w-[250px] justify-between items-center">
              <div className="flex gap-2 items-center">
                <File size={18} />
                <p className="text-[15px] font-[500]">{file.length} file(s)</p>
              </div>
              <div onClick={() => {}} className='p-2 z-[99] rounded-lg cursor-pointer hover:bg-slate-200 hover:text-black'>
                <Download size={18} onClick={async () => DownloadChatFiles(file)} />
              </div>
            </div>
          ) : (
            <p>
              {text}
            </p>

          )
        }
        <p className="text-[10px] text-right mt-1">
          {time.substring(11, 16)}
        </p>
      </div>
    </div >
  )
}
