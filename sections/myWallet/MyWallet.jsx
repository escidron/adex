import Image from 'next/image';
import TabsComponent from '@/components/tabs/TabsComponent';
import group from '../../public/group.png'



export default function MyWallet() {


  return (
      <div className='w-full flex flex-col items-center '> 
        <h1 className='text-[30px] mt-8'>Payments & payouts</h1>
        <div className='flex mt-4 w-[80%] items-center'>
          <div className='w-[60%]'>
            <TabsComponent />
          </div>
        </div>
      </div>
  );
}
