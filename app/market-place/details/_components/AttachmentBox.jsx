import { Button } from '@/components/ui/button';
import { File, ImageIcon, X } from 'lucide-react';
import React from 'react'

export default function AttachmentBox({ files,handleRemoveFile }) {

    const meuArray = Array.from({ length: 3 }, (_, index) => index);

    return (
        <div className='pl-2 mt-2 '>
            <Button onClick={()=>handleRemoveFile(null,true)} variant='outline' className={`${files.length == 0 && 'hidden'}`}>Remove all</Button>
            {files.map((item, index) => {
                return (
                    <div key={index} className='p-2 border rounded-lg mt-1 relative flex justify-between items-center' >
                        <div className='flex gap-2 items-center'>
                            <File size={18}  className={`${item.format == 'image' && 'hidden'}`}/>
                            <ImageIcon size={18}  className={`${item.format == 'file' && 'hidden'}`}/>
                            {item.name}
                        </div>
                        <div onClick={()=>handleRemoveFile(item.name,false)} className='p-2 z-[99] rounded-lg cursor-pointer hover:bg-slate-200 hover:text-black'>
                            <X size={18}  />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
