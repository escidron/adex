import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function MultiImage({ images, setImageName, height, remove }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };
    const listItems = images.map((item, index) =>

        <div key={index} className='w-full h-full relative rounded-[16px]'>
            <Image
                src={item.data_url}
                alt="Adex item"
                id='image-loaded'
                width={2000}
                height={2000}
                className={`rounded-[16px] w-full h-[${height}] object-cover aspect-square`}
            />
            {
                remove && (

                    <div onClick={() => setImageName(item.file?item.file.name:item.data_url.slice(50,70))} id='delete-image' className="w-8 h-8 absolute top-2 right-2 z-[99] bg-black opacity-90 hover:opacity-75 rounded-full p-2 flex justify-center items-center">
                        <DeleteForeverIcon
                            id='delete-image'
                            fontSize="small"
                            sx={{ color: 'white' }} />
                    </div>
                )
            }
        </div>
    );
    return (
        <div className='w-full h-full'>
            <Slider {...settings}>
                {listItems}
            </Slider>
        </div>
    )
}



