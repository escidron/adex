import { CheckCircle } from 'lucide-react';
export default function Success({ children }) {
    return (
        <div className='relative border border-green-700 rounded-xl p-8 mt-10 w-full max-w-[500px] shadow-md mx-auto'>
            <div className='absolute top-[-25px] left-[calc(50%-25px)] bg-white '>
                <CheckCircle size={50} color='green' className='bg-green text-[50px]'/>
            </div>
            {children}
        </div>
    )
}
