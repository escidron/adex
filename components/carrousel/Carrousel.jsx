import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Link from 'next/link';
const data = [
    { id:1,
      photo :require('../../public/image 29.png'),
      comment:'It was incredibly easy to post the unused apartment above my garage for rent and have since been paying my mortgage with the proceeds.'
      
    },
    { id:2,
      photo :require('../../public/image 30.png'),
      comment:'It was incredibly easy to post the unused apartment above my garage for rent and have since been paying my mortgage with the proceeds.'

    },
    { id:3,
      photo :require('../../public/image 31.png'),
      comment:'It was incredibly easy to post the unused apartment above my garage for rent and have since been paying my mortgage with the proceeds.'

    },
    { id:4,
      photo :require('../../public/image 29.png'),
      comment:'It was incredibly easy to post the unused apartment above my garage for rent and have since been paying my mortgage with the proceeds.'

    }

  ]

export default function Carrousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            
            slidesToShow: 2
            }
        },
        {
            breakpoint: 780,
            settings: {
            
            slidesToShow: 1
            }
        },
        {
            breakpoint: 500,
            settings: {
            
            slidesToShow: 1,
            slidesToScroll:1
            }
        }
        ]

    };
    const listItems = data.map((item) =>
    
    <li key={item.id} className='flex flex-col justify-center items-center mt-8'>
      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-full flex justify-center p-4'>
          <Image
                  src={item.photo}
                  alt="Adex item"
                  width={100}
                  height={100}
                  className='rounded-full '
                  />
        </div>
        <p className='w-[80%]'>{item.comment}</p>
      </div>
    </li>
  );
  return (
    <div className='w-[80%]'>
      <Slider {...settings}>
        {listItems}
      </Slider>
  </div>
  )
}


