import { useContext } from 'react'
import { Input } from '@/components/ui/input'

export default function CampaignPeriodForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleStartDate = (value) => {
        setListingProperties({ ...listingProperties, start_date: value })
    }

    const handleEndDate = (value) => {
        setListingProperties({ ...listingProperties, end_date: value })
    }

    return (
        <div className='w-full flex flex-col items-center gap-6'>
            <div className='text-center'>
                <h1 className='text-[28px] md:text-[32px]'>Campaign Period</h1>
                <p className='text-[15px] md:text-[18px] text-gray-500'>When will your campaign run?</p>
            </div>
            
            <div className='w-full max-w-[500px] space-y-6'>
                <div>
                    <label className='block text-sm font-medium mb-2'>Campaign Start Date</label>
                    <Input
                        type="date"
                        value={listingProperties.start_date || ''}
                        onChange={(e) => handleStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full"
                    />
                    <p className='text-sm text-gray-500 mt-1'>When should the campaign start? Must be today or later.</p>
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
                    <p className='text-sm text-gray-500 mt-1'>When should the campaign end? Must be after the start date.</p>
                </div>

                {/* Campaign Duration Summary */}
                {listingProperties.start_date && listingProperties.end_date && (
                    <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
                        <h3 className='font-semibold text-lg mb-2 text-blue-800'>Campaign Duration</h3>
                        <div className='text-sm text-blue-700'>
                            <p><strong>Duration:</strong> {Math.ceil((new Date(listingProperties.end_date) - new Date(listingProperties.start_date)) / (1000 * 60 * 60 * 24))} days</p>
                            <p className='mt-1'><strong>From:</strong> {new Date(listingProperties.start_date).toLocaleDateString()}</p>
                            <p><strong>To:</strong> {new Date(listingProperties.end_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}