"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@/components/inputs/TextField';
import { useFormik } from 'formik';
import PlacesAutocomplete from '@/components/placesAutocomplete/PlacesAutocomplete';
import { MapCoordinatesContext } from '@/app/market-place/page';
import ImageLoader from '@/components/ImageLoader/ImageLoader';
import { ThreeDots } from 'react-loader-spinner'
import toast, { Toaster } from "react-hot-toast";
import DropDownButton from '@/components/dropdown/DropdownButton';
import HelpIcon from '@mui/icons-material/Help';
import { industries } from '@/utils/industries';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AddCompany from '@/actions/AddCompany';


export default function AddCompanyModal({ setAddCompany, setRefetch, editCompany }) {
    const [selected, setSelected] = useState(null);
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([]);
    const [isPending, setIsPending] = useState(false)
    const [dropDownSelected, setDropDownSelected] = useState('')
    const [hasPhysicalSpace, setHasPhysicalSpace] = useState('')
    const [showTip, setShowTip] = useState(false)

    const [coords, setCoords] = useState({
        lat: -3.745,
        lng: -38.523
    });

    useEffect(() => {

        if (editCompany) {
            setDropDownSelected(editCompany.industry)
            setHasPhysicalSpace(editCompany.has_physical_space)
            setAddress(editCompany.address)
            if (editCompany.company_logo) {

                const currentImages = [{ data_url: editCompany.company_logo }]
                setImages(currentImages)
            }
        }
    }, []);
    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.phone) {
            errors.phone = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (dropDownSelected == '') {
            errors.industry = 'Required';
        }
        if (hasPhysicalSpace == '') {
            errors.hasSpace = 'Required';
        }

        if (selected === null && hasPhysicalSpace === '2') {
            errors.address = 'Required';
        }
        return errors;
    };


    const formik = useFormik({
        initialValues: {
            name: editCompany ? editCompany.company_name : '',
            phone: editCompany ? editCompany.phone : '',
            email: editCompany ? editCompany.email : '',
            image: images,
            address: editCompany ? editCompany.address : address,
            industry: editCompany ? 99 : dropDownSelected,
            hasSpace: editCompany ? editCompany.has_physical_space : hasPhysicalSpace
        },
        validate,
        onSubmit: async values => {
            setIsPending(true)
            const returnMessage = await AddCompany(
                values.name,
                values.phone,
                values.email,
                images.length > 0 ? images[0].data_url : '',
                address,
                dropDownSelected,
                hasPhysicalSpace,
                editCompany ? true : false,
                editCompany ? editCompany.id : ''
            )
            if (returnMessage) {
                setIsPending(false)
                setRefetch((prev) => !prev)
                toast.success(returnMessage)
            }
            setAddCompany(false)
        },
    });


    const handleHasSpace = (e) => {
        const id = e.currentTarget.id
        if (id !== hasPhysicalSpace) {
            setHasPhysicalSpace(id);
        } else {
            setHasPhysicalSpace('')
        }
    }

    return (
        <>

            <form onSubmit={formik.handleSubmit} className={`w-full flex justify-center`}>
                <div className='max-w-[500px]' >
                    <div className='flex justify-center items-center mb-[20px] w-full'>
                        <h1 className='text-[25px]'>Register your Business</h1>
                    </div>
                    <div className='flex justify-between items-center flex-col mb-[20px] '>
                        <div className="relative mt-6 w-full  text-black ">
                            <TextField
                                id='name'
                                label='Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name}
                            />

                            {formik.touched.name && formik.errors.name ? <div className="absolute text-[12px] top-[55px] text-red-600 font-bold">{formik.errors.name}</div> : null}
                        </div>
                        <div className="relative mt-6 w-full text-black">
                            <TextField
                                id='phone'
                                label='Phone Number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                errors={formik.errors.phone}
                            />
                            {formik.touched.phone && formik.errors.phone ? <div className="absolute text-[12px] top-[55px] text-red-600 font-bold">{formik.errors.phone}</div> : null}
                        </div>
                        <div className="relative mt-6 w-full text-black">
                            <TextField
                                id='email'
                                label='Email Address'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                errors={formik.errors.email}
                            />
                            {formik.touched.email && formik.errors.email ? <div className="absolute text-[12px] top-[55px] text-red-600 font-bold">{formik.errors.email}</div> : null}
                        </div>
                        <div className='relative w-full mt-6 h-[55px] '>
                            <DropDownButton
                                label='Industry'
                                itens={industries}
                                dropDownSelected={dropDownSelected}
                                setDropDownSelected={(selected) => setDropDownSelected(selected)}
                            />
                            {formik.touched.industry && formik.errors.industry ? <div className="absolute text-[12px] top-[55px] text-red-600 font-bold">{formik.errors.industry}</div> : null}

                        </div>
                        <div className='relative w-full mt-6'>
                            <div className='flex items-center gap-2'>
                                <div onMouseOver={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
                                    <HelpIcon fontSize='small' className='cursor-pointer opacity-80 ' />
                                </div>
                                <p>Does this business have a physical location?</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <div
                                    type="text"
                                    id="1"
                                    name="account-1"
                                    onClick={(e) => handleHasSpace(e)}
                                    className={`w-[50%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${hasPhysicalSpace == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                                >No
                                </div>
                                <div
                                    type="text"
                                    id="2"
                                    name="account-2"
                                    onClick={(e) => handleHasSpace(e)}
                                    className={`w-[50%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${hasPhysicalSpace == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                                >Yes
                                </div>
                            </div>
                            {
                                showTip && (
                                    <div className='absolute bg-black top-8 py-2 left-0 w-[360px] h-[50px] rounded-lg  text-white'>
                                        <p className='text-[14px] p-2 text-center'>
                                            If this a home-based business, please check &quot;No&quot;
                                        </p>
                                    </div>
                                )
                            }
                            {formik.touched.hasSpace && formik.errors.hasSpace ? <div className="absolute text-[12px] top-[80px] text-red-600 font-bold">{formik.errors.hasSpace}</div> : null}

                        </div>
                        {
                            hasPhysicalSpace === '2' && (

                                <div className="w-full mt-4 relative">
                                    <MapCoordinatesContext.Provider value={[coords, setCoords]}>
                                        <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center">
                                            <PlacesAutocomplete
                                                setSelected={setSelected}
                                                setAddress={(ad) => setAddress(ad)}
                                                currentLocation={address}
                                            />
                                        </div>
                                    </MapCoordinatesContext.Provider>
                                    {formik.touched.address && formik.errors.address ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.address}</div> : null}

                                </div>
                            )
                        }

                        <div className=" mt-6 w-full relative">
                            <p>Profile Photo</p>
                            <div className={`w-full rounded-lg outline-none h-[160px] resize-none `}>
                                <ImageLoader
                                    images={images}
                                    setImages={(image) => setImages(image)}
                                />
                            </div>
                            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.image}</div> : null}
                        </div>
                        <div className={`w-full flex ${editCompany ? 'justify-center' : 'justify-between'} items-center mt-3`}>
                            {!editCompany && (
                                <Button disabled={isPending} variant='outline' onClick={() => setAddCompany(false)} className='flex gap-2 items-center'>
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" disabled={isPending} className='flex gap-2 items-center'>
                                {
                                    isPending && (
                                        <Loader2 size={18} className='animate-spin' />
                                    )
                                }
                                {editCompany ? 'Done' : 'Register'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};