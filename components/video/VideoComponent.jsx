import React from 'react'
export default function VideoComponent() {
  return (
    <div className='w-full mt-6 lg:h-[600px] lg:mt-8 flex justify-center rounded-lg'>
      <video src="/adexVideo.mov" controls autoPlay mute="mute" className='xl:w-[60%] bg-black'/>
    </div>
  )
}
