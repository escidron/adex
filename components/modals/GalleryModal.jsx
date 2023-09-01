'use client'
import GalleryImage from '../gallery-image/GalleryImage'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function GalleryModal({ setOpenGalleryModal,gallery,selected,setSelected,setFinishSelection,finishSelection,setImportFromGallery }) {

    return (
        <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center'
                onClick={() => setOpenGalleryModal(false)}>
            </div>
            <div className='card-payment-modal px-[60px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[1000px]'>
                <div className='w-full flex justify-end'>
                    <CloseIcon
                        onClick={() => setOpenGalleryModal(false)}
                        sx={{ "&:hover": { color: "#FCD33B" } }} />
                </div>
                <div className='w-full max-h-[600px] overflow-y-scroll p-4 mt-2'>
                    <GalleryImage 
                        gallery={gallery} 
                        isSelectable={true}
                        selected={selected}
                        setSelected={setSelected}
                        setImportFromGallery={setImportFromGallery}
                    />
                </div>
                <div className='w-full flex justify-end mt-4'>
                    <div onClick={()=>setFinishSelection(!finishSelection)} className={`flex gap-2 justify-center items-center  bg-black text-[#FCD33B] hover:bg-[#FCD33B] hover:text-black py-[8px] px-[30px] rounded-md  text-lg`}>
                        <h1>{`Selected (${selected.length})`}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
