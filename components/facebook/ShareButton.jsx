'use client'
import {  ShareButton } from 'react-facebook';
import { Facebook } from 'lucide-react';

export default function ShareButtonFacebook({ id }) {

  return (
    <>
      <ShareButton  href={`https://adexconnect.com/my-listing/sharing-listing/${id}`}>
        <div className='w-[180px] flex gap-3 border p-3 mt-2 bg-white shadow-sm rounded-lg cursor-pointer hover:border-black'>
          <Facebook />
          <p>Facebook</p>
        </div>
      </ShareButton>
    </>
  );
}


