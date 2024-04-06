import Image from 'next/image'
import QrCodeComponent from './QrCodeComponent'

export default function QrCard({id,isHide}) {
    return (
        <div className={`relative rounded-lg border border-black p-4 ${isHide ? 'w-[600px]' : 'w-full'} flex flex-col items-center`}>
            <Image
                src='/qrcode-header.png'
                alt="Adex Logo"
                width={2000}
                height={2000}
                className='w-[365px] max-h-[185px]'
            />
            <QrCodeComponent value={`https://adexconnect.com/market-place/details?id=${id}`} />
            <p className='text-black font-[500] mt-3 text-[13px] sm:text-[14px] md:text-[16px]'>Scan this code now with your phone</p>
            <p className='text-black font-[500] pb-[50px] text-[13px] sm:text-[14px] md:text-[16px]'>to book this space using <b className='text-[14px] sm:text-[18px] md:text-[20px]'>adexconnect.com</b></p>
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
    )
}
