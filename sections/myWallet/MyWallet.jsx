import { useState } from 'react';
import TabsComponent from '@/components/tabs/TabsComponent';
import AddCard from '@/components/addCard/AddCard';
import AddAccount from '@/components/addAccount/AddAccount';
import { useSearchParams } from 'next/navigation'

export default function MyWallet() {
  const searchParams = useSearchParams()
  const subTab = searchParams.get('sub-tab')
  const [value, setValue] = useState(subTab?parseInt(subTab):0);
  return (
    <div className={`w-full flex flex-col items-center `}>
      <div>
        <h1 className='text-[30px] mt-8'>Payments & payouts</h1>
      </div>
      <div className='flex mt-4 w-full items-center px-[20px]'>
        <div className='w-full md:w-[80%] lg:w-[60%]'>
          <TabsComponent value={value} setValue={(value)=>setValue(value)}>
            <AddCard label='Payments' />
            <AddAccount label='Payouts' />
          </TabsComponent>
        </div>
      </div>
    </div>
  );
}
