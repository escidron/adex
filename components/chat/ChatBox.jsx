'use client'
export default function ChatBox({ text, currentUser, time }) {

  return (
    <div className={`w-full ${currentUser ? 'text-right' : 'text-left'}`}>
      <div className={`p-2 rounded-xl max-w-[70%] inline-block ${currentUser ? 'bg-[#FCD33B] text-black shadow-md ' : 'bg-white shadow-md'} text-[14px] mt-2 mb-2`}>
        <p>
          {text}
        </p>
        <p className="text-[10px] text-right mt-1">
          {time.substring(11, 16)}
        </p>
      </div>
    </div>
  )
}
