"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { UserContext } from '@/app/layout'

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
            toast.success(response.data.message, {
                duration: 3000,
                style: { fontWeight: 500 }
            })
            setSnsUrl('')
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to submit participation', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
        } finally {
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                    {campaign.name}
                </h1>
                
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <div className="relative h-[400px] w-full mb-6">
                        <Image
                            src="/placeholder-event.jpg"
                            alt={campaign.name}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Event Details</h2>
                            <p className="text-gray-600">{campaign.description}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Campaign Information</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>Period: {campaign.start_date} ~ {campaign.end_date}</p>
                                <p>Participants: {campaign.participant_count}/{campaign.max_participants}</p>
                                <p>Reward: {campaign.reward_amount.toLocaleString()} KRW</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <input 
                                type="text" 
                                value={snsUrl}
                                onChange={(e) => setSnsUrl(e.target.value)}
                                placeholder="Enter your Instagram post URL"
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-3 rounded hover:bg-[#FCD33B] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Entry'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 