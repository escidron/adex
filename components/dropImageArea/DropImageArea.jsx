import Image from "next/image";
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from "react";
import { ImagePlus, Plus, Trash, X } from "lucide-react";
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

export default function DropImageArea({ images, setImages, selectedCompany, setImportFromGallery }) {
    const [showOptions, setShowOptions] = useState(false);
    const [openGalleryModal, setOpenGalleryModal] = useState(false);
    const [gallery, setGallery] = useState([]);
    const maxNumber = 20;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const removeImage = (id) => {
        const newImages = images.filter((item, index) => index != id);
        setImages(newImages)
    }

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
                    <>
                        {
                            images.length > 0 && (
                                <Button onClick={onImageUpload}>
                                    Add Image
                                </Button>
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
                                                    <div className="flex justify-between w-[80%] items-center mx-auto mt-4">
                                                        <Button variant='secondary' onClick={() => setOpenGalleryModal(true)}>
                                                            ADEX gallery
                                                        </Button>
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
                                            <div className={`w-full max-h-[400px] ${images.length > 0 ? 'grid grid-cols-2 gap-4' : ''}`}>
                                                {
                                                    images.map((image, index) => (
                                                        <div key={index} className={`${index == 0 ? 'col-span-full' : 'h-[250px]'} relative`}>
                                                            <Image
                                                                src={image.data_url}
                                                                alt="Listing images"
                                                                width={2000}
                                                                height={2000}
                                                                className={`w-full max-h-[400px] rounded-lg object-cover ${index == 0 ? 'col-span-full' : 'h-[250px]'}`}
                                                            />
                                                            <AlertDialog>
                                                                <AlertDialogTrigger>
                                                                    <div className="absolute top-3 right-3 flex justify-center items-center p-1 hover:bg-slate-100  hover:text-black text-white rounded-lg">
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
                        </div>
                    </>
                )}
            </ImageUploading>
        </div>
    );
}