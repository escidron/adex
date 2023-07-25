import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlackButton from '../buttons/BlackButton';
import Link from 'next/link';
export default function Success({ children }) {
    return (
        <div className='relative border border-green-700 rounded-xl p-8  w-full max-w-[500px] shadow-md'>
            <div className='absolute top-[-25px] left-[calc(50%-25px)] bg-white '>
                <CheckCircleIcon  sx={{ fontSize: "50px",color:'green' }}/>
            </div>
            {children}
        </div>
    )
}
