"use client"
import { useState } from 'react';
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



export default function AddCompanyModal({ setAddCompany, setRefetch,refetch }) {
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

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
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
        console.log(errors)
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            image: images,
            address: address,
            industry: dropDownSelected,
            hasSpace: hasPhysicalSpace
        },
        validate,
        onSubmit: values => {
            setIsPending(true)
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/add-company`,
                {
                    name: values.name,
                    image: images.length > 0 ? images[0].data_url : '',
                    address: address,
                    industry: dropDownSelected,
                    hasPhysicalSpace: hasPhysicalSpace
                }, {
                withCredentials: true,
            })
                .then(function (response) {
                    setIsPending(false)
                    setRefetch(!refetch)
                    toast.success(response.data.message)

                })
                .catch(function (error) {
                    console.log('error', error)
                    if (error.response.status === 400) {
                        toast.error(error.response.data.message, {
                            duration: 6000,
                            style: {
                                width: 'auto',
                                padding: '16px',
                                minWidth: '450px',
                                fontWeight: 500

                            }
                        })
                    } else {
                        toast.error(error.response.data.message, {
                            duration: 6000,
                            style: {
                                padding: '8px',
                                fontWeight: 500

                            }
                        })
                    }
                })
                .finally(function (response) {
                    setAddCompany(false)
                })
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

            <form onSubmit={formik.handleSubmit} className={`flex justify-center `}>
                <div className=' px-[30px] py-[15px]  bg-white rounded-xl w-[450px]'>
                    <div className='flex justify-center items-center mb-[20px] w-full'>
                        <h1 className='text-[25px]'>Register your Business</h1>
                    </div>
                    <div className='flex justify-between items-center flex-col mb-[20px] relative'>
                        <div className=" mt-6 w-full  text-black ">
                            <TextField
                                id='name'
                                label='Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name}
                            />

                            {formik.touched.name && formik.errors.name ? <div className="absolute text-[12px] top-[80px] text-red-600 font-bold">{formik.errors.name}</div> : null}
                        </div>
                        <div className=' w-full mt-6 h-[55px] relative'>
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
                                            <PlacesAutocomplete setSelected={setSelected} setAddress={(ad) => setAddress(ad)} />
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
                        <button type="submit" className={`flex gap-2 mt-4 justify-center items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg`}>
                            <div className='style_banner_button_text font-semibold text-[18px]'>
                                {isPending ? (
                                    <ThreeDots
                                        height="30"
                                        width="40"
                                        radius="9"
                                        color="#FCD33B"
                                        ariaLabel="three-dots-loading"
                                        visible={true}
                                    />
                                ) : 'Register'}
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};