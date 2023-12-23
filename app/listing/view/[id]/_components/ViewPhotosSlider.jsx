'use client'

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function ViewPhotosSlider({ images }) {
    
    const sliderImages = []
    images.map((image)=>{
        sliderImages.push({
            original:image.data_url,
            thumbnail:image.data_url,
            originalClass:"custom-slider-image",

        })
    })
    return (
            <ImageGallery items={sliderImages} />
    )
}
