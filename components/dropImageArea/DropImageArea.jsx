import Image from "next/image";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from "react";
import { Eye, ImagePlus, Plus, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import GalleryModal from "../modals/GalleryModal";

export default function DropImageArea({ images, setImages, selectedCompany, setRefetch, isInPersonalProfile, setRemove }) {
    const [showOptions, setShowOptions] = useState(false);
    const [openGalleryModal, setOpenGalleryModal] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [selected, setSelected] = useState([]);
    const [finishSelection, setFinishSelection] = useState([]);
    const [importFromGallery, setImportFromGallery] = useState(false);

    const maxNumber = 20;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        if (isInPersonalProfile) {

            setRefetch((prev) => !prev)
        }
    };

    useEffect(() => {
        setOpenGalleryModal(false)
        setShowOptions(false)
        setSelected([])
        if (selected.length > 0) {
            const newImages = gallery[0].company_gallery.filter((item, index) => selected.includes(index));
            const newImagesWithFlag = newImages.map((image) => {
                return { ...image, isFromGallery: true };
            });
            const allImages = [...images, ...newImagesWithFlag]
            setImages(allImages)
            if (isInPersonalProfile) {

                setRefetch((prev) => !prev)
            }
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

    const removeImage = (id) => {
        const newImages = images.filter((item, index) => index != id);
        setImages(newImages)
        if (isInPersonalProfile) {
            setRefetch((prev) => !prev)
            setRemove(images[id])
        }
    }

    return (
        <div className="w-full h-full">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            // acceptType={["jpg", "png", 'JPEG']}
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
                    <>
                        {
                            images.length > 0 && (
                                <div className="flex gap-2 items-center">
                                    <Button onClick={onImageUpload}>
                                        Add from device
                                    </Button>
                                    {
                                        !isInPersonalProfile && (
                                            <Button onClick={() => setOpenGalleryModal(true)}>
                                                Add from ADEX Gallery
                                            </Button>

                                        )
                                    }
                                </div>
                            )
                        }
                        <div
                            id="image-loader"
                            className={`mt-3 relative  shadow-sm h-full rounded-lg flex justify-center items-center cursor-pointer bg-slate-100  ${isDragging && 'bg-slate-300'}`}
                            {...dragProps}
                        >
                            {
                                !isDragging && (
                                    <>
                                        {images.length === 0 ? (
                                            <div className="w-full flex flex-col items-center gap-3">
                                                <ImagePlus className="opacity-60" size={45} onClick={() => gallery.length > 0 ? setShowOptions(true) : onImageUpload()} />
                                                <p className="font-[600]">Drop your images here</p>
                                                <p>or</p>
                                                <p className="font-[600]">Import images from :</p>
                                                <div className=" h-full w-full max-w-[400px] rounded-lg ">
                                                    <div className={`flex ${gallery.length > 0 ? 'justify-between' : 'justify-center'}  w-[80%] items-center mx-auto mt-4`}>
                                                        {
                                                            gallery.length > 0 && (
                                                                <Button variant='secondary' onClick={() => setOpenGalleryModal(true)}>
                                                                    ADEX gallery
                                                                </Button>
                                                            )
                                                        }
                                                        <Button variant='secondary' onClick={() => {
                                                            onImageUpload()
                                                            setShowOptions(false)
                                                        }}>
                                                            Your device
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`w-full h-[400px] ${images.length > 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                                                {
                                                    images.map((image, index) => (
                                                        <div key={index} className={`${index == 0 ? 'col-span-full' : 'h-[250px]'} relative`}>
                                                            <Image
                                                                src={image.data_url}
                                                                alt="Listing images"
                                                                width={2000}
                                                                height={2000}
                                                                className={`w-full max-h-[400px] object-cover rounded-lg ${index == 0 ? 'col-span-full ' : 'h-[250px] '}`}
                                                            />
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <div className="absolute top-3 right-3 flex justify-center items-center p-1 bg-slate-100  text-black hover:bg-black hover:text-white rounded-lg">
                                                                        <Trash size={20} />
                                                                    </div>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently delete this image.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => removeImage(index)}>Continue</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                            <Dialog className='max-w-[90%]'>
                                                                <DialogTrigger >
                                                                    <div className="absolute top-3 right-12 flex justify-center items-center p-1 bg-slate-100  text-black hover:bg-black hover:text-white rounded-lg">
                                                                        <Eye size={20} />
                                                                    </div>
                                                                </DialogTrigger>
                                                                <DialogContent className='max-w-[90%]'>
                                                                    <div>
                                                                        <Image
                                                                            src={image.data_url}
                                                                            alt="Listing images"
                                                                            width={2000}
                                                                            height={2000}
                                                                            className={`w-full object-contain max-h-[800px]`}
                                                                        />
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    ))
                                                }
                                                <div onClick={onImageUpload} className="w-full h-[250px] rounded-lg bg-slate-200 flex items-center justify-center">
                                                    <Plus size={40} />
                                                </div>
                                            </div>
                                        )}
                                    </>
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
                            }
                        </div>
                    </>
                )}
            </ImageUploading>
        </div>
    );
}