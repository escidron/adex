"use client"
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import TextField from '@/components/inputs/TextField';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateCampaignPage() {
    const router = useRouter();

    const validate = values => {
        const errors = {};
        
        if (!values.name) {
            errors.name = 'Please enter campaign name';
        }
        if (!values.description) {
            errors.description = 'Please enter campaign description';
        }
        if (!values.maxParticipants) {
            errors.maxParticipants = 'Please enter maximum participants';
        }
        if (!values.startDate) {
            errors.startDate = 'Please select start date';
        }
        if (!values.endDate) {
            errors.endDate = 'Please select end date';
        }
        if (!values.budget) {
            errors.budget = 'Please enter budget';
        }
        if (!values.rewardAmount) {
            errors.rewardAmount = 'Please enter reward amount';
        }
        
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            maxParticipants: "",
            startDate: "",
            endDate: "",
            budget: "",
            rewardAmount: "",
        },
        validate,
        onSubmit: values => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns`,
                {
                    name: values.name,
                    description: values.description,
                    max_participants: parseInt(values.maxParticipants),
                    start_date: values.startDate,
                    end_date: values.endDate,
                    budget: parseInt(values.budget),
                    reward_amount: parseInt(values.rewardAmount),
                }, {
                    withCredentials: true,
                })
                .then(function (response) {
                    toast.success('Campaign created successfully!')
                    router.push('/event-market')
                })
                .catch(function (error) {
                    console.log('error', error)
                    toast.error('Failed to create campaign. Please try again.')
                });
        },
    });

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-white'>
            <div><Toaster /></div>
            <form className="flex flex-col w-[90%] max-w-[800px] md:w-[800px] bg-white rounded-lg shadow-lg p-8" onSubmit={formik.handleSubmit}>
                <h1 className='text-black text-[40px] md:text-[48px] lg:text-[51px] mb-2'>Create Campaign</h1>
                <p className='text-gray-600 text-[25px] mb-8'>Create a new <span className='text-[#FCD33B] mx-2'>event</span> campaign</p>
                
                <div className="space-y-8">
                    {/* Basic Info */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="relative">
                            <TextField
                                id='name'
                                label='Campaign Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name}
                            />
                            {formik.touched.name && formik.errors.name ? 
                                <div className="absolute top-[50px] text-red-600 text-sm">{formik.errors.name}</div> 
                            : null}
                        </div>
                    </div>

                    {/* Campaign Period */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Campaign Period</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <Input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.startDate}
                                    className="w-full"
                                />
                                {formik.touched.startDate && formik.errors.startDate ? 
                                    <div className="absolute top-[74px] text-red-600 text-sm">{formik.errors.startDate}</div>
                                : null}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <Input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.endDate}
                                    className="w-full"
                                />
                                {formik.touched.endDate && formik.errors.endDate ? 
                                    <div className="absolute top-[74px] text-red-600 text-sm">{formik.errors.endDate}</div>
                                : null}
                            </div>
                        </div>
                    </div>

                    {/* Budget & Participants */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Budget & Participants</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="relative">
                                <TextField
                                    id='budget'
                                    label='Total Budget (USD)'
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.budget}
                                    errors={formik.errors.budget}
                                />
                                {formik.touched.budget && formik.errors.budget ? 
                                    <div className="absolute top-[50px] text-red-600 text-sm">{formik.errors.budget}</div>
                                : null}
                            </div>

                            <div className="relative">
                                <TextField
                                    id='rewardAmount'
                                    label='Reward Amount (USD)'
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.rewardAmount}
                                    errors={formik.errors.rewardAmount}
                                />
                                {formik.touched.rewardAmount && formik.errors.rewardAmount ? 
                                    <div className="absolute top-[50px] text-red-600 text-sm">{formik.errors.rewardAmount}</div>
                                : null}
                            </div>

                            <div className="relative">
                                <TextField
                                    id='maxParticipants'
                                    label='Maximum Participants'
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.maxParticipants}
                                    errors={formik.errors.maxParticipants}
                                />
                                {formik.touched.maxParticipants && formik.errors.maxParticipants ? 
                                    <div className="absolute top-[50px] text-red-600 text-sm">{formik.errors.maxParticipants}</div>
                                : null}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                placeholder='Enter campaign description and participation requirements...'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                className="w-full border p-3 rounded-lg outline-none h-[200px] resize-none"
                            />
                            {formik.touched.description && formik.errors.description ? 
                                <div className="absolute top-[210px] text-red-600 text-sm">{formik.errors.description}</div>
                            : null}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 w-full mt-8">
                    <Button 
                        type='submit' 
                        variant='secondary'
                        className='flex-1 text-lg font-[600] bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black'
                    >
                        Create Campaign
                    </Button>
                    <Button 
                        type='button' 
                        variant='outline'
                        className='flex-1 text-lg font-[600] border-[#FCD33B] text-black hover:bg-[#FCD33B]/10'
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
} 