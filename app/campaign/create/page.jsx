"use client"
import { useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { UserContext } from '@/app/layout'
import TextField from '@/components/inputs/TextField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import GetCompanies from '@/actions/GetCompanies'

export default function CreateCampaignPage() {
    // All hooks must be declared at the top level, before any conditional return
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companiesData = await GetCompanies();
                if (companiesData && companiesData.length > 0) {
                    setCompanies(companiesData);
                    if (companiesData.length === 1) {
                        setSelectedCompany(companiesData[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        if (user && user.userType === 1) {
            fetchCompanies();
        }
    }, [user]);

    // Validation function must be declared before useFormik
    const validate = values => {
        const errors = {};
        
        // 3. Campaign name is required
        if (!values.name) {
            errors.name = 'Campaign name is required.';
        }

        // 4. Description is required
        if (!values.description) {
            errors.description = 'Description is required.';
        }

        // 5. Maximum participants must be a positive integer
        if (!values.maxParticipants) {
            errors.maxParticipants = 'Maximum participants is required.';
        } else if (isNaN(values.maxParticipants) || Number(values.maxParticipants) <= 0) {
            errors.maxParticipants = 'Maximum participants must be greater than 0.';
        }

        // 6. Reward amount must be a positive number
        if (!values.rewardAmount) {
            errors.rewardAmount = 'Reward amount is required.';
        } else if (isNaN(values.rewardAmount) || Number(values.rewardAmount) <= 0) {
            errors.rewardAmount = 'Reward amount must be greater than 0.';
        }

        // 1. Start date cannot be in the past
        if (!values.startDate) {
            errors.startDate = 'Start date is required.';
        } else if (new Date(values.startDate) < new Date(new Date().toDateString())) {
            errors.startDate = 'Start date cannot be in the past.';
        }

        // 2. End date must be after start date
        if (!values.endDate) {
            errors.endDate = 'End date is required.';
        } else if (values.startDate && new Date(values.endDate) <= new Date(values.startDate)) {
            errors.endDate = 'End date must be after start date.';
        }
        
        return errors;
    };

    // All hooks must be declared before any conditional return
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            maxParticipants: "",
            startDate: "",
            endDate: "",
            budget: "",
            rewardAmount: "",
            image: null,
        },
        validate,
        onSubmit: values => {
            if (!selectedCompany) {
                toast.error('Please select a company first!');
                return;
            }
            
            console.log('📤 Creating campaign with company:', selectedCompany);
            
            const campaignData = {
                name: values.name,
                description: values.description,
                max_participants: parseInt(values.maxParticipants),
                start_date: values.startDate,
                end_date: values.endDate,
                reward_amount: parseInt(values.rewardAmount),
                // Always include calculated budget in the API request
                budget: parseInt(values.maxParticipants) * parseInt(values.rewardAmount),
                company_id: selectedCompany?.id,
            };
            
            console.log('📋 Campaign data to send:', campaignData);

            // Add image if present
            if (values.image) {
                campaignData.images = [
                    {
                        file: true,
                        data_url: values.image
                    }
                ];
            }

            axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns`,
                campaignData,
                { withCredentials: true }
            )
            .then(function (response) {
                console.log('✅ Campaign creation response:', response.data);
                toast.success('Campaign created successfully!')
                
                // Send invoice email automatically
                if (response.data && response.data.data && response.data.data.id) {
                  console.log('🔄 Redirecting to invoice page...');
                  router.push(`/campaign/${response.data.data.id}/invoice?sendEmail=true`);
                } else {
                  console.log('❌ No campaign ID in response');
                  router.push('/campaign');
                }
            })
            .catch(function (error) {
                console.error('❌ Campaign creation error:', error);
                console.error('❌ Error response:', error.response?.data);
                toast.error('Failed to create campaign. Please try again.')
            });
        },
    });

    // Helper function to calculate total budget
    const calculateBudget = () => {
        const max = Number(formik.values.maxParticipants);
        const reward = Number(formik.values.rewardAmount);
        if (!isNaN(max) && !isNaN(reward) && max > 0 && reward > 0) {
            return max * reward;
        }
        return '';
    };

    // Conditional return must come after all hooks
    if (!user || user.userType !== 1) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-white">
                <h1 className="text-2xl font-bold text-red-500">Only business users can create campaigns.</h1>
            </div>
        );
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                formik.setFieldValue('image', reader.result);
                console.log('Image loaded as base64:', reader.result.substring(0, 50) + '...');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-white mt-[90px]'>
            <div><Toaster /></div>
            <form className="flex flex-col w-[90%] max-w-[800px] md:w-[800px] bg-white rounded-lg shadow-lg p-8" onSubmit={formik.handleSubmit}>
                <h1 className='text-black text-[40px] md:text-[48px] lg:text-[51px] mb-2 mt-16'>Create Campaign</h1>
                <p className='text-gray-600 text-[25px] mb-8'>Create a new <span className='text-[#FCD33B] mx-2'>event</span> campaign</p>
                
                <div className="space-y-8">
                    {/* Company Selection - Top Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select Company</h2>
                        <div className="relative">
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCD33B] focus:border-transparent"
                                onChange={(e) => {
                                    const company = companies.find(c => c.id === parseInt(e.target.value));
                                    setSelectedCompany(company);
                                }}
                                value={selectedCompany?.id || ''}
                            >
                                <option value="">Select a company...</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.company_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Selected Company Card */}
                        {selectedCompany && (
                            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex items-start space-x-4">
                                    {selectedCompany.company_logo && (
                                        <img 
                                            src={selectedCompany.company_logo} 
                                            alt={selectedCompany.company_name}
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{selectedCompany.company_name}</h3>
                                        <p className="text-sm text-gray-600">Email: {selectedCompany.email}</p>
                                        <p className="text-sm text-gray-600">Phone: {selectedCompany.phone}</p>
                                        <p className="text-sm text-gray-600">Address: {selectedCompany.address}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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

                    {/* Campaign Image */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Campaign Image</h2>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                            {previewImage ? (
                                <div className="relative h-48 w-full mb-4">
                                    <Image
                                        src={previewImage}
                                        alt="Campaign preview"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-100 p-8 rounded-lg mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <label className="flex flex-col items-center justify-center">
                                <span className="text-blue-500 font-semibold mb-2">Upload Image</span>
                                <span className="text-gray-500 text-sm mb-4">Click to browse or drag and drop</span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                />
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="border-[#FCD33B] text-black hover:bg-[#FCD33B]/10"
                                    onClick={() => document.querySelector('input[type="file"]').click()}
                                >
                                    Select Image
                                </Button>
                            </label>
                        </div>
                    </div>

                    {/* Campaign Period */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Campaign Period</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <h2 className="text-xl font-semibold mb-4">Budgets and Participants</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Reward Amount */}
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

                            {/* Maximum Participants */}
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

                            {/* Total Budget (display as styled text, not input) */}
                            <div className="flex flex-col justify-center items-start h-full">
                                <span className="text-gray-500 text-[15px] mb-1">Total Budget (USD)</span>
                                <span className="text-2xl font-bold text-[#FCD33B]">
                                    {calculateBudget() ? `$${calculateBudget().toLocaleString()}` : '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Campaign Description</h2>
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCD33B] focus:border-transparent resize-none"
                                placeholder="Describe your campaign..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description ? 
                                <div className="absolute top-[140px] text-red-600 text-sm">{formik.errors.description}</div>
                            : null}
                    </div>

                </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="pt-4 flex gap-4">
                    <Button 
                            type="submit"
                            className="flex-1 bg-[#FCD33B] text-black hover:bg-[#FCD33B]/90 font-semibold py-3 text-lg"
                            disabled={formik.isSubmitting}
                    >
                            {formik.isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
                    </Button>
                    <Button 
                            type="button"
                            variant="outline"
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 text-lg"
                            onClick={() => router.push('/campaign')}
                            disabled={formik.isSubmitting}
                    >
                            Cancel
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    )
} 