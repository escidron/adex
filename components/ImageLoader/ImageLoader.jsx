import ImageUploading from "react-images-uploading";
import MultiImage from "../multiImage/MultiImage";
import GalleryModal from "../modals/GalleryModal";
import axios from "axios";

import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";

export default function ImageLoader({ images, setImages, selectedCompany, setImportFromGallery }) {
    const [onHover, setOnHover] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [openGalleryModal, setOpenGalleryModal] = useState(false);
    const [imageName, setImageName] = useState('');
    const [gallery, setGallery] = useState([]);
    const [selected, setSelected] = useState([]);
    const [finishSelection, setFinishSelection] = useState([]);

    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        setOnHover(false)
        if (selectedCompany) {

            setImportFromGallery(false)
        }
    };

    useEffect(() => {
        console.log('entrou no efect',imageName)
        if (images[0]?.file) {
            const newImages = images.filter((item, index) => item.data_url.slice(50, 70) != imageName);
            setImages(newImages)
        }else  if (images[0]?.data_url.includes('http')) {
            const newImages = images.filter((item, index) => item.data_url != imageName);
            setImages(newImages)
        } else {
            const newImages = images.filter((item, index) => item.data_url.slice(50, 70) != imageName);
            setImages(newImages)

        }

    }, [imageName]);

    useEffect(() => {
        setOpenGalleryModal(false)
        setShowOptions(false)
        setSelected([])
        if (selected.length > 0) {
            const newImages = gallery[0].company_gallery.filter((item, index) => selected.includes(index));
            setImages(newImages)
        }

    }, [finishSelection]);

    useEffect(() => {

        const getGallery = () => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-image-gallery`,
                {
                    //id: selectedCompany,
                },
                {
                    withCredentials: true,
                })
                .then(function (response) {
                    setGallery(response.data.galleryWithImages)
                })
                .catch(function (error) {
                    console.log(error)
                });

        }
        getGallery()
    }, [selectedCompany]);
    return (
        <div className="w-full h-full">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", 'JPEG','GIF']}
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
                        className={`relative shadow-sm h-full rounded-lg flex justify-center items-center cursor-pointer bg-slate-100 ${imageList.length == 0 ? 'hover:bg-gray-200' : ''}  ${isDragging ? 'bg-gray-200' : ''}`}
                        onClick={(e) => {
                            if (e.target.id == 'image-loader' || e.target.id == 'image-loaded') {
                                // if (gallery.length > 0) {
                                //     setShowOptions(true)
                                // } else {
                                //     onImageUpload()
                                // }
                                onImageUpload()
                            }
                        }}
                        {...dragProps}
                    >
                        {images.length === 0 ? (
                            // <ImagePlus size={25} onClick={() => gallery.length > 0 ? setShowOptions(true) : onImageUpload()}/>
                            <ImagePlus size={25} onClick={() =>  onImageUpload()}/>
                        ) : (
                            <MultiImage images={imageList.length > 0 ? imageList : images} setImageName={(name) => setImageName(name)} height={'160px'} remove={true} />
                        )}

                        {/* {
                            showOptions && (
                                <div className="absolute bg-black h-full w-full rounded-lg z-[10] min-w-[350px]">
                                    <h1 className="text-white w-full mt-4 text-center">Import the images from:</h1>
                                    <div onClick={() => setShowOptions(false)} className='absolute top-1 right-1 text-white hover:bg-slate-200 hover:text-black p-1 rounded-md cursor-pointer'>
                                        <X />
                                    </div>
                                    <div className="flex justify-between w-[80%] items-center mx-auto mt-4">
                                        <div
                                            onClick={() => setOpenGalleryModal(true)}
                                            className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] px-[20px] rounded-md  font-[600] text-black hover:scale-[1.1]  text-md'>
                                            ADEX gallery
                                        </div>
                                        <div
                                            onClick={() => {
                                                onImageUpload()
                                                setShowOptions(false)
                                            }}
                                            className='mt-6 cursor-pointer flex justify-center items-center bg-[#FCD33B] py-[8px] px-[20px] rounded-md  font-[600] text-black  hover:scale-[1.1]  text-md'>
                                            Your device
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            openGalleryModal && (
                                <GalleryModal
                                    selectedCompany={selectedCompany}
                                    openGalleryModal={openGalleryModal}
                                    setOpenGalleryModal={(toggle) => setOpenGalleryModal(toggle)}
                                    gallery={gallery}
                                    setGallery={(gallery) => setGallery(gallery)}
                                    selected={selected}
                                    setSelected={(selected) => setSelected(selected)}
                                    setFinishSelection={(toggle) => setFinishSelection(toggle)}
                                    finishSelection={finishSelection}
                                    setImportFromGallery={setImportFromGallery}

                                />
                            )
                        } */}

                    </div>
                )}
            </ImageUploading>
        </div>
    );
}