import { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function ImageImporter({ images, setImages }) {
    const [onHover, setOnHover] = useState(false);
    const [imageName, setImageName] = useState('');
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        setOnHover(false)
    };

    useEffect(() => {
        if (images[0]?.file) {

            const newImages = images.filter((item, index) => item.file.name != imageName);
            setImages(newImages)
        } else {

            const newImages = images.filter((item, index) => item.data_url.slice(50, 70) != imageName);
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
                        onClick={(e) => {
                            if (e.target.id == 'image-loader' || e.target.id == 'image-loaded') {
                                onImageUpload()
                            }
                        }}
                        {...dragProps}
                    >

                        <button onClick={() => onImageUpload()} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[10px] lg:px-[30px] lg:mt-10 '>
                            <div className='flex items-center gap-3'>
                                <AddRoundedIcon fontSize='medium' />
                                <p className='style_banner_button_text font-medium'>Add Image</p>
                            </div>

                        </button>



                    </div>
                )}
            </ImageUploading>
        </div>
    );
}