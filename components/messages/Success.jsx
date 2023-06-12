import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlackButton from '../buttons/BlackButton';
import Link from 'next/link';
export default function Success({ message }) {
    return (
        <div className='relative border border-green-700 rounded-xl p-8 text-center w-full max-w-[500px]'>
            <div className='absolute top-[-25px] left-[calc(50%-25px)] bg-white '>
                <CheckCircleIcon  sx={{ fontSize: "50px",color:'green' }}/>
            </div>
            <h1 className='text-[40px] text-green-700'>Success</h1>
            <p className='mb-4'>{message}</p>

            <Link href='/' className='mt-6'>
                <BlackButton label='Ok'/>
            </Link>
        </div>
    )
}
