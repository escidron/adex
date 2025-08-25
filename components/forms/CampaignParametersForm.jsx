import { useContext } from 'react'
import TextField from '../inputs/TextField'
import { Input } from '@/components/ui/input'

export default function CampaignParametersForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleMaxParticipants = (value) => {
        setListingProperties({ ...listingProperties, max_participants: value })
    }

    const handleRewardAmount = (value) => {
        setListingProperties({ ...listingProperties, reward_amount: value })
    }

    const handleStartDate = (value) => {
        setListingProperties({ ...listingProperties, start_date: value })
    }

    const handleEndDate = (value) => {
        setListingProperties({ ...listingProperties, end_date: value })
    }

    return (
        <div className='w-full flex flex-col items-center gap-6'>
            <div className='text-center'>
                <h1 className='text-[28px] md:text-[32px]'>Campaign Parameters</h1>
                <p className='text-[15px] md:text-[18px] text-gray-500'>Set the campaign participation details and rewards.</p>
            </div>
            
            <div className='w-full max-w-[500px] space-y-6'>
                <div>
                    <TextField
                        label='Maximum Participants'
                        placeholder='Enter maximum number of participants'
                        type='number'
                        min='1'
                        value={listingProperties.max_participants || ''}
                        onChange={(e) => handleMaxParticipants(e.target.value)}
                    />
                    <p className='text-sm text-gray-500 mt-1'>How many people can join this campaign?</p>
                </div>

                <div>
                    <TextField
                        label='Reward Amount per Participant ($)'
                        placeholder='Enter reward amount per participant'
                        type='number'
                        min='0'
                        step='0.01'
                        value={listingProperties.reward_amount || ''}
                        onChange={(e) => handleRewardAmount(e.target.value)}
                    />
                    <p className='text-sm text-gray-500 mt-1'>How much will each participant receive?</p>
                </div>

                {/* Campaign Period */}
                <div>
                    <label className='block text-sm font-medium mb-2'>Campaign Start Date</label>
                    <Input
                        type="date"
                        value={listingProperties.start_date || ''}
                        onChange={(e) => handleStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full"
                    />
                    <p className='text-sm text-gray-500 mt-1'>When should the campaign start?</p>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-2'>Campaign End Date</label>
                    <Input
                        type="date"
                        value={listingProperties.end_date || ''}
                        onChange={(e) => handleEndDate(e.target.value)}
                        min={listingProperties.start_date || new Date().toISOString().split('T')[0]}
                        className="w-full"
                    />
                    <p className='text-sm text-gray-500 mt-1'>When should the campaign end?</p>
                </div>

                {/* Budget Summary */}
                {listingProperties.max_participants && listingProperties.reward_amount && (
                    <div className='mt-6 p-4 bg-gray-50 rounded-lg border'>
                        <h3 className='font-semibold text-lg mb-2'>Budget Summary</h3>
                        <div className='space-y-1 text-sm'>
                            <div className='flex justify-between'>
                                <span>Campaign Budget:</span>
                                <span>${(Number(listingProperties.max_participants) * Number(listingProperties.reward_amount)).toLocaleString()}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Service Fee (10%):</span>
                                <span>${((Number(listingProperties.max_participants) * Number(listingProperties.reward_amount)) * 0.1).toLocaleString()}</span>
                            </div>
                            <div className='flex justify-between font-semibold text-base border-t pt-1 mt-2'>
                                <span>Total Amount:</span>
                                <span>${((Number(listingProperties.max_participants) * Number(listingProperties.reward_amount)) * 1.1).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}