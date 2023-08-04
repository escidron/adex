import { useState,useEffect } from "react";
import ImageUploading from "react-images-uploading";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from "next/image";
import MultiImage from "../multiImage/MultiImage";

export default function ImageLoader({ images, setImages }) {
    const [onHover, setOnHover] = useState(false);
    const [imageName, setImageName] = useState('');
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        setOnHover(false)
    };

    useEffect(() => {
        if(images[0]?.file){

            const newImages = images.filter((item,index) => item.file.name != imageName);
            console.log(newImages)
            setImages(newImages)
        }else{
            console.log('entrou no else',imageName)

            const newImages = images.filter((item,index) => item.data_url.slice(50,70) != imageName);
            console.log(newImages)
            setImages(newImages)

        }

    }, [imageName]);
    return (
        <div className="w-full h-full">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", 'JPEG']}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <div
                        id="image-loader"
                        onMouseOver={() => { images.length > 0 ? setOnHover(true) : null }}
                        onMouseOut={() => { images.length > 0 ? setOnHover(false) : null }}
                        className={` shadow-md h-full rounded-lg flex justify-center items-center cursor-pointer ${imageList.length == 0?'hover:bg-gray-200':''}  ${isDragging ? 'bg-gray-200' : ''}`}
                        onClick={(e)=>{
                            if(e.target.id == 'image-loader' || e.target.id == 'image-loaded'){
                                onImageUpload()
                            }
                        }}
                        {...dragProps}
                    >
                        {images.length === 0 ? (
                            <AddAPhotoIcon fontSize="large" className="hover:scale-[1.1] opacity-60" onClick={()=>onImageUpload()}/>
                        ) : (
                            <MultiImage images={imageList.length >0?imageList:images} setImageName={(name)=>setImageName(name)} height={'160px'} remove={true}/>
                        )}


                    </div>
                )}
            </ImageUploading>
        </div>
    );
}