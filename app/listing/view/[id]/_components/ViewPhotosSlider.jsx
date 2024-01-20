'use client'

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";
import GetBase64Images from "@/actions/GetBase64Images";

export default function ViewPhotosSlider({ images, id }) {
const [sliderImages, setSliderImages] = useState([]);

    useEffect(() => {

        async function getInfo() {
            const images = await GetBase64Images(id)
            const sliderImagesArray = []
            images.map((image) => {
                sliderImagesArray.push({
                    original: image,
                    thumbnail: image,
                    originalClass: "custom-slider-image",

                })
            })
            setSliderImages(sliderImagesArray)
        }
        getInfo();

    }, []);
    return (
        <ImageGallery items={sliderImages} />
    )

}
