import { useState } from "react";
import ImageUploading from "react-images-uploading";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from "next/image";

export default function ImageLoader({ images,setImages }) {
    const [onHover, setOnHover] = useState(true);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        setOnHover(false)
    };
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
                        onMouseOver={() => { images.length > 0 ? setOnHover(true) : null }}
                        onMouseOut={() => { images.length > 0 ? setOnHover(false) : null }}
                        className={`bg-gray-100  h-full rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-200 ${isDragging ? 'bg-gray-200' : ''}`}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        {images.length === 0 ? (
                            <AddAPhotoIcon fontSize="large" className="hover:scale-[1.1] " />
                        ) : (null)}
                        {imageList.map((image, index) => (
                            <div key={index} className="w-full h-full relative">
                                {onHover ? (
                                    <div className="w-full h-full absolute top-0 z-[99] bg-black opacity-60 rounded-lg p-4">
                                        <DeleteForeverIcon
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onImageRemove(index)
                                            }}
                                            fontSize="large"
                                            sx={{ color: 'white', position: 'absolute', right: '10px' }} />
                                        <p className="text-white">{image.file.name}</p>
                                    </div>
                                ) : null}
                                <Image
                                    src={image.data_url}
                                    alt="Adex Logo"
                                    width={200}
                                    height={200}
                                    className='w-full h-full object-contain rounded-lg'
                                />
                            </div>
                        ))
                        }
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}