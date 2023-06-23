import Image from 'next/image';
import TabsComponent from '@/components/tabs/TabsComponent';
import AddCard from '@/components/addCard/AddCard';
import AddAccount from '@/components/addAccount/AddAccount';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function MyWallet() {


  return (
    <div className={`w-full flex flex-col items-center ${inter.className}`}>
      <div>
        <h1 className='text-[30px] mt-8'>Payments & payouts</h1>
      </div>
      <div className='flex mt-4 w-[80%] items-center'>
        <div className='w-[60%]'>
          <TabsComponent>
            <AddCard label='Payments' />
            <AddAccount label='Payouts' />
          </TabsComponent>
        </div>
      </div>
    </div>
  );
}
