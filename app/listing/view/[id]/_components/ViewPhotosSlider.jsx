'use client'

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useState, useEffect } from 'react';

export default function ViewPhotosSlider({ images }) {

    const [base64Image, setBase64Image] = useState(null);

    useEffect(() => {
      const imageUrl = 'http://test.adexconnect.com/images/1699034873274.png';
  
      const fetchImage = async () => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const reader = new FileReader();
          
          reader.onloadend = () => {
            const base64String = reader.result;
            setBase64Image(base64String);
          };
          
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error('Erro ao carregar a imagem:', error);
        }
      };
  
      fetchImage();
    }, []);

    const sliderImages = []
    images.map((image) => {
        sliderImages.push({
            // original:image.data_url,
            // thumbnail:image.data_url,
//http://test.adexconnect.com/images/1699034873274.png
            original: base64Image,
            thumbnail: base64Image,

            originalClass: "custom-slider-image",

        })
    })
    return (
        <ImageGallery items={sliderImages} />
    )
}
