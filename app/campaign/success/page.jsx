"use client"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function ParticipationSuccessPage() {
    const router = useRouter()

    const handleBackToEvents = () => {
        router.push('/campaign')
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-[600px] bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle size={80} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Participation Complete!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Your campaign participation has been successfully submitted. Rewards will be sent after admin review.
                </p>
                <div className="flex flex-col space-y-4">
                    <Button 
                        onClick={handleBackToEvents}
                        variant="secondary"
                        className="w-full bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black py-3 text-lg"
                    >
                        Back to Events
                    </Button>
                </div>
            </div>
        </div>
    )
} 