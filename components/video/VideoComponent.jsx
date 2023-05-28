import React from 'react'
export default function VideoComponent() {
  return (
    <div className='w-full h-[600px] mt-8 flex justify-center rounded-lg'>
      <video src="/adexVideo.mp4" controls autoPlay mute="mute" className='w-[60%]'/>
    </div>
  )
}
