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
    // const images = [
    //     {
    //         original: "https://picsum.photos/id/1018/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1018/250/150/",
    //         originalClass :'custom-image'
    //     },
    //     {
    //         original: "https://picsum.photos/id/1015/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1015/250/150/",
    //         originalClass :'custom'
    //     },
    //     {
    //         original: "https://picsum.photos/id/1019/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1019/250/150/",
    //         originalClass :'custom'
    //     },
    // ];
    console.log('asd',sliderImages)
    return (
            <ImageGallery items={sliderImages} />
    )
}
