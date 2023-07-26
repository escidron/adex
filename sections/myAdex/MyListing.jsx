
'use client'
import Card from './Card'
import { useState, useEffect, useContext } from 'react';
import { Inter } from 'next/font/google'
import BookingModal from '@/components/modals/BookingModal';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import SecondaryButton from '@/components/buttons/SecondaryButton';
import BlackButton from '@/components/buttons/BlackButton';
import axios from 'axios';
import { RefreshContext } from './MyAdex';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export default function MyListing({ data, status }) {
  const [currentStatus, setCurrentStatus] = useState('1');
  const [advertisementId, setAdvertisementId] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext)

  if (data.length === 0) {
    return (
      <>
        <h1 className='text-[20px]'>There are not exist any Listing yet</h1>
        <p className='text-gray-600'>Go to Listing for getting your first one.</p>
      </>
    )
  }
  const handleCurrentStatus = (e) => {
    const id = e.currentTarget.id
    if (id !== currentStatus) {
      setCurrentStatus(id);
    }
  }
  const deleteAdvertisement = () => {
    console.log('advertisementId', advertisementId)
    axios.post('http://3.132.48.54:5000/api/advertisements/delete-advertisement',
      { id: advertisementId }, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response)
        setAdvertisementId('')
        setRefresh(prev => (!prev))
        toast.success('Advertisement deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  return (
    <div className='flex flex-col items-center '>
      <div><Toaster /></div>
      <div className=" mt-2 w-full flex gap-4">
        <div className={`w-full`}>
          <div className="flex gap-2">
            <div
              type="text"
              id="1"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Available</p>
              <p>|</p>
              <p className='pl-1'>{status.available}</p>
            </div>

            <div
              type="text"
              id="2"
              name="running"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Running</p>
              <p>|</p>
              <p className='pl-1'>{status.running}</p>
            </div>

            <div
              type="text"
              id="3"
              name="finished"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Finished</p>
              <p>|</p>
              <p className='pl-1'>{status.finished}</p>
            </div>

            <div
              type="text"
              id="4"
              name="available"
              onClick={(e) => handleCurrentStatus(e)}
              className={`w-[150px] py-2  px-4 flex justify-between items-center cursor-pointer rounded-[50px] outline-none ${currentStatus == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
            >
              <p className={`flex items-center h-[20px] pr-1`}>Pending</p>
              <p>|</p>
              <p className='pl-1'>{status.pending}</p>
            </div>
          </div>
        </div>
      </div>
      {
        data.map((item, index) => {
          console.log(item)
          if (item.status == currentStatus) {
            console.log('item status',item.status+item.id)
            return (
              <>
                <section key={item.id + index} className='w-full flex gap-4 items-center'>
                  <Link href={`/my-listing${item.status == 4?'':'/edit-advertisement'}/?id=${item.id}`} 
                      className='cursor-pointer'>
                    <Card item={item} setBookingModalOpen={(isOpen) => setBookingModalOpen(isOpen)} />
                  </Link>
                  {
                    item.status == 1 ? (
                      <div onClick={() => setAdvertisementId(item.id)} className='rounded-full bg-black w-10 h-10 flex justify-center items-center text-white p-2 cursor-pointer hover:bg-[#FCD33B] hover:text-black'>
                        <DeleteIcon sx={{ fontSize: '25px', "&:hover": { color: "black" } }} />
                      </div>
                    ) : ('')
                  }
                </section>
                {
                  bookingModalOpen && (
                    <BookingModal setBookingModalOpen={(isOpen) => setBookingModalOpen(isOpen)} item={item} key={item.id + index} />
                  )
                }
              </>
            )
          }
          return (
            // <div key={item.id} className='mt-8 w-full'>
            //   <p className='text-[20px] text-center'>No data found</p>
            //   <p className='text-[16px] text-center font-thin'>
            //     {
            //      currentStatus == 1?'No Available Listing found':
            //      currentStatus == 2?'No Running   Listing found':
            //      currentStatus == 3?'No Finished  Listing found':
            //      currentStatus == 4?'No Pending   Listing found':''
            //     }
            //   </p>
            // </div>
            null
          )
        })
      }

      {
        advertisementId != '' && (
          <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center' onClick={() => setAdvertisementId('')}>
            </div>
            <div className='card-payment-modal px-[60px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[400px]'>
              <h1 className='text-[25px]'>
                Are you sure you want to delete this listing?
              </h1>
              <div className='flex items-center justify-between mt-2 w-full'>
                <div onClick={() => setAdvertisementId('')}>
                  <SecondaryButton label='Cancel' dark={true} />
                </div>
                <div onClick={deleteAdvertisement}>
                  <BlackButton label='Delete' />
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
