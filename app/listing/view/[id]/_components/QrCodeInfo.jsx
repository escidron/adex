import Image from 'next/image'
import React, { useRef } from 'react'
import QrCodeComponent from './QrCodeComponent'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine } from 'lucide-react'
import html2canvas from 'html2canvas';

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

            <div ref={componentRef} className='mx-auto w-full max-w-[700px] mt-8  flex flex-col items-center  text-white p-[50px]'>
                <div className='relative rounded-lg border border-black p-4 w-full flex flex-col items-center'>
                    <Image
                        src='/qrcode-header.png'
                        alt="Adex Logo"
                        width={2000}
                        height={2000}
                        className='w-[365px] max-h-[185px]'
                    />
                    <p className='mt-1'>Reach more people, place your ad here.</p>
                    <QrCodeComponent value={`https://adexconnect.com/market-place/details?id=${id}`} />
                    <p className='text-black font-[500] mt-3'>Scan this code now with your phone</p>
                    <p className='text-black font-[500] pb-[50px]'>to book this space using <b className='text-[20px]'>adexconnect.com</b></p>
                    <div className='absolute bottom-[-30px] bg-white px-2 flex gap-2 items-center'>
                        <Image
                            src='/adex-logo-black-yellow.png'
                            alt="Adex Logo"
                            width={70}
                            height={70}
                        />
                        <p className='text-black'>Advertisement Reimagined...</p>
                    </div>
                </div>
            </div>
            <Button onClick={handleDownload} className='mt-6 gap-2'>
                <ArrowDownToLine size={16} />
                Download
            </Button>
        </div>
    )
}
