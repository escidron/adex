"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { UserContext } from '@/app/layout'
import ReactMarkdown from 'react-markdown'
import validator from 'validator';
import SendChatMessage from '@/actions/SendChatMessage'
import { Button } from '@/components/ui/button'
import { SendHorizontal, Loader2 } from 'lucide-react'

export default function EventDetailPage({ params }) {
    const router = useRouter()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [campaign, setCampaign] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasParticipated, setHasParticipated] = useState(false)
    const [message, setMessage] = useState('')
    const [isSendingMessage, setIsSendingMessage] = useState(false)

    useEffect(() => {
        fetchCampaignDetails()
    }, [params.id, user.isLogged])

    const fetchCampaignDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}`,
                { withCredentials: true }
            )
            // Check if campaign has advertisement_id from backend integration
            const campaignData = response.data.data
            
            if (!campaignData.advertisement_id) {
                // If no advertisement_id, this might be an old campaign - using fallback ID
            }
            
            setCampaign(campaignData)

            // Check if user has already participated in this campaign
            if (user.isLogged) {
                await checkParticipationStatus()
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to load campaign details', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
        } finally {
            setIsLoading(false)
        }
    }

    const checkParticipationStatus = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/participated`,
                { withCredentials: true }
            )
            
            // Check if current campaign is in the participated campaigns list
            const participatedCampaigns = response.data.data || []
            const hasParticipated = participatedCampaigns.some(
                participation => {
                    const campaignId = participation.campaign_id || participation.campaign?.id
                    return campaignId === parseInt(params.id)
                }
            )
            
            setHasParticipated(hasParticipated)
        } catch (error) {
            console.error('Failed to check participation status:', error)
            // If API fails, assume not participated to allow registration attempt
            setHasParticipated(false)
        }
    }

    const handleRegister = async () => {
        if (!user.isLogged) {
            router.push('/login')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/participate`,
                {
                    campaign_id: params.id,
                    sns_url: '' // Empty for now, will be submitted later
                },
                { withCredentials: true }
            )
            toast.success('Successfully registered for the campaign! You can submit your SNS link from My Profile.', {
                duration: 4000,
                style: { fontWeight: 500 }
            })
            setHasParticipated(true)
            setTimeout(() => {
                router.push('/my-profile?tab=5&sub-tab=2')
            }, 2000)
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to register for campaign', {
                duration: 3000,
                style: { fontWeight: 500 }
            })
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
            return;
        }

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}`,
                { withCredentials: true }
            );
            toast.success('Campaign deleted successfully');
            router.push('/campaign');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to delete campaign', {
                duration: 3000,
                style: { fontWeight: 500 }
            });
        }
    };

    const handleSendMessage = async () => {
        if (!user.isLogged) {
            router.push('/login')
            return
        }

        if (!message.trim()) {
            toast.error('Please enter a message')
            return
        }

        setIsSendingMessage(true)
        try {
            // Use advertisement_id if available (backend integration), otherwise use fallback
            let messageId
            if (campaign.advertisement_id) {
                messageId = Number(campaign.advertisement_id)
            } else {
                // Use campaign ID directly as fallback
                messageId = parseInt(params.id)
            }
            
            await SendChatMessage(
                user.userId,           // sended_by
                campaign.created_by,   // seller_id (campaign creator)
                user.userId,          // buyer_id (person asking)
                messageId,            // advertisement_id or fallback ID
                message,
                []                    // no files for now
            )
            
            setMessage('')
            toast.success('Message sent successfully!')
            
            // Redirect to messages page to see the conversation
            const messageKey = `${messageId}${campaign.created_by}${user.userId}`
            router.push(`/messages?key=${messageKey}`)
        } catch (error) {
            toast.error('Failed to send message')
        } finally {
            setIsSendingMessage(false)
        }
    };

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
            <div className="w-full xl:w-[1100px] mx-auto px-4 py-8 mt-[90px]">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {campaign.name}
                    </h1>
                    <button 
                        onClick={() => router.back()} 
                        className="text-gray-500 hover:text-black"
                    >
                        &larr; Back
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative w-full mt-4 flex gap-1 h-[200px] md:h-[300px] lg:h-[400px]">
                        <div className="w-full rounded-lg">
                            <Image
                                src={
                                    campaign.image_gallery
                                        ? `${process.env.NEXT_PUBLIC_SERVER_IP}/images/${campaign.image_gallery}`
                                        : "/no-image.png"
                                }
                                alt={campaign.name}
                                width={2000}
                                height={2000}
                                className="w-full object-cover h-full rounded-lg"
                                priority
                                onError={(e) => {
                                    e.target.src = "/no-image.png";
                                }}
                            />
                        </div>
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

                            {/* Message Section - Similar to listing's "Have questions?" */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Have questions about this campaign?</h3>
                                <p className="text-gray-600 mb-4">
                                    Feel free to reach out to the campaign organizer via a message.
                                </p>
                                <div className="space-y-4">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ask about campaign requirements, rewards, or any other details..."
                                        className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:border-black"
                                        disabled={!user.isLogged}
                                    />
                                    <div className="flex justify-end">
                                        <Button 
                                            onClick={handleSendMessage}
                                            disabled={!user.isLogged || !message.trim() || isSendingMessage}
                                            className="px-6 py-2 flex items-center gap-2"
                                        >
                                        {isSendingMessage ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <SendHorizontal size={16} />
                                                Send Message
                                            </>
                                        )}
                                        </Button>
                                    </div>
                                    {!user.isLogged && (
                                        <p className="text-sm text-gray-500 text-center">
                                            Please log in to send a message to the campaign organizer.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Join Campaign Section - Moved to bottom */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                                {user.isLogged ? (
                                    // Logged in users see Register section
                                    <>
                                        <h3 className="text-xl font-semibold mb-4">Join This Campaign</h3>
                                        <p className="text-gray-600 mb-4">
                                            Register to participate in this campaign. After registration, you can submit your SNS post link from your profile page.
                                        </p>
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={handleRegister}
                                                disabled={isSubmitting || hasParticipated}
                                                className="px-8 py-2 bg-black text-white rounded-lg hover:bg-[#FCD33B] hover:text-black transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {hasParticipated ? 'Already Registered' : isSubmitting ? 'Registering...' : 'Register'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // Non-logged in users see Enter section
                                    <>
                                        <h3 className="text-xl font-semibold mb-4">Explore This Campaign</h3>
                                        <p className="text-gray-600 mb-4">
                                            Learn more about this campaign. Please log in to participate and register.
                                        </p>
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => {
                                                    toast.error("Please log in to participate in this campaign.", {
                                                        duration: 3000,
                                                        style: { fontWeight: 500 }
                                                    });
                                                    router.push('/login');
                                                }}
                                                className="px-8 py-2 bg-black text-white rounded-lg hover:bg-[#FCD33B] hover:text-black transition-colors font-semibold"
                                            >
                                                Enter
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 