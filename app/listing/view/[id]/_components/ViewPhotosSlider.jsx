'use client'

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function ViewPhotosSlider({ images }) {

    const sliderImages = []
    console.log('images', images);
    images.map((image) => {
        sliderImages.push({
            // original:image.data_url,
            // thumbnail:image.data_url,
//http://test.adexconnect.com/images/1699034873274.png
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",

            originalClass: "custom-slider-image",

        })
    })
    return (
        <ImageGallery items={sliderImages} />
    )
}
