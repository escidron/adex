import Image from 'next/image'
import React, { useRef } from 'react'
import QrCodeComponent from './QrCodeComponent'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine } from 'lucide-react'
import html2canvas from 'html2canvas';
import QrCard from './QrCard'

export default function QrCodeInfo({ id }) {
    const componentRef = useRef(null);

    const handleDownload = () => {
        if (componentRef.current) {
            html2canvas(componentRef.current)
                .then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `listing_${id}.png`;
                    link.click();
                });
        }
    };
    return (
        <div className='flex flex-col items-center'>

            <p className='text-[26px]'>QR Code</p>
            <p className='mt-1'>Showcase your listing by printing and attaching it to your asset.</p>

            {/* element to print */}
            <div ref={componentRef} className='mx-auto w-[800px] mt-8  flex flex-col items-center  text-white p-[50px] absolute left-[-999999px]'>
                <QrCard id={id} isHide={true}/>
            </div>
            
            {/* element to render */}
            <div  className='mx-auto w-full max-w-[700px] mt-8  flex flex-col items-center  text-white md:p-[50px]'>
                <QrCard id={id}/>
            </div>
            <Button onClick={handleDownload} className='mt-6 gap-2'>
                <ArrowDownToLine size={16} />
                Download
            </Button>
        </div>
    )
}
