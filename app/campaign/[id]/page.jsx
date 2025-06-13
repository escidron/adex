"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { UserContext } from '@/app/layout'
import ReactMarkdown from 'react-markdown'

export default function EventDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [campaign, setCampaign] = useState(null)
    const [snsUrl, setSnsUrl] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchCampaignDetails()
    }, [params.id])

    const fetchCampaignDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}`,
                { withCredentials: true }
            )
            console.log('캠페인 상세 응답:', response.data)
            setCampaign(response.data.data)
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to load campaign details', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!user.isLogged) {
            router.push('/login')
            return
        }

        if (!snsUrl) {
            toast.error('Please enter your Instagram post URL', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
            return
        }

        setIsSubmitting(true)
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/participate`,
                {
                    campaign_id: params.id,
                    sns_url: snsUrl
                },
                { withCredentials: true }
            )
            router.push('/campaign/success')
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to submit participation', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
            setIsSubmitting(false)
        }
    }

    if (isLoading || !campaign) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FCD33B]"></div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <div><Toaster /></div>
            <div className="w-full xl:w-[1100px] mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <button 
                        onClick={() => router.back()} 
                        className="text-gray-500 hover:text-black mr-4"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {campaign.name}
                    </h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative h-[400px] w-full">
                        <Image
                            src={
                                campaign.image_gallery
                                    ? `${process.env.NEXT_PUBLIC_SERVER_IP}/images/${campaign.image_gallery}`
                                    : "/no-image.png"
                            }
                            alt={campaign.name}
                            fill
                            className="object-cover"
                            priority
                            onError={(e) => {
                                console.error(`Failed to load image:`, campaign.image_gallery);
                                e.target.src = "/no-image.png";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                    {campaign.name}
                                </h1>
                                <div className="flex items-center text-white/80 text-sm">
                                <span className="bg-[#FCD33B] text-black px-3 py-1 rounded-full mr-3">
                                {(campaign.participant_count ?? 0)}/{campaign.max_participants} joined
                                </span>
                                    <span>
                                        {new Date(campaign.start_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                        {' '} - {' '}
                                        {new Date(campaign.end_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                                <div className="prose max-w-none mt-6">
                                    <ReactMarkdown>{campaign.description}</ReactMarkdown>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Campaign Period</h3>
                                    <div className="flex items-center text-gray-700">
                                        <span className="bg-[#FCD33B]/20 p-2 rounded-lg">
                                            {new Date(campaign.start_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                            {' '} - {' '}
                                            {new Date(campaign.end_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Reward Amount</h3>
                                    <div className="flex items-center text-gray-700">
                                        <span className="bg-[#FCD33B]/20 p-2 rounded-lg font-semibold">
                                            {`$ ${(Number(campaign.reward_amount)).toFixed(2)}`}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Maximum Participants</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="bg-[#FCD33B]/20 p-2 rounded-lg font-semibold">
                                            {Number(campaign.max_participants)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-xl font-semibold mb-4">Submit Your Entry</h3>
                                <p className="text-gray-600 mb-4">
                                    Share your Instagram post URL below to participate in this campaign. Your submission will be reviewed by our team.
                                </p>
                                <input 
                                    type="text" 
                                    value={snsUrl}
                                    onChange={(e) => setSnsUrl(e.target.value)}
                                    placeholder="Enter your Instagram post URL"
                                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                />
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white py-4 rounded-lg hover:bg-[#FCD33B] hover:text-black transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Entry'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 