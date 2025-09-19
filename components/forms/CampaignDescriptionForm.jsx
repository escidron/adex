import { useContext } from 'react'
import { TextAreaEditor } from '../textarea/TextAreaEditor';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default function CampaignDescriptionForm({ ListingContext }) {
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    const handleDescription = (description) => {
        //quill component render this when is empty
        if(description == '<p><br></p>'){
            setListingProperties({ ...listingProperties, description: '' })
        }else{
            setListingProperties({ ...listingProperties, description: description })
        }
    }

    return (
        <div className='w-full flex flex-col items-center lg:flex-row lg:justify-around lg:items-start max-w-[1200px] mx-auto'>
            {/* Mobile Note Card - Top */}
            <Card className='w-full max-w-[450px] mb-4 lg:hidden'>
                <CardHeader>
                    <CardTitle className='flex gap-2 items-center'>
                        <div className='w-[50px]'>
                            <Image
                                src='/note.png'
                                alt="note icon"
                                priority
                                width={2000}
                                height={2000}
                                className='w-full'
                            />
                        </div>
                        Campaign Description
                    </CardTitle>
                    <CardDescription className='mt-2'>
                        For campaigns, please provide as much detail as possible to include:
                        <ul className='list-disc list-inside mt-2 text-sm'>
                            <li>What the campaign for</li>
                            <li>What you'd like the participant to do</li>
                            <li>What the reward is</li>
                        </ul>
                        
                        Example: 
                        <ul className='list-disc list-inside mt-2 text-sm'>
                            <li>Company X is celebrating its 5th year in business. </li>
                            <li>We want to celebrate and give back to our loyal customers.</li>
                            <li>Post a pic or video with your favorite Company X product to your social media.</li>
                            <li>Upload the post link here on ADEX.</li>
                            <li>Receive a $50 reward of your choosing.  </li>

                        </ul>
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Main Form Section */}
            <div className='w-full sm:w-[500px] flex flex-col items-center justify-center'>
                <div className='w-full'>
                    <div className='flex flex-col mb-4'>
                        <h1 className='text-[28px] md:text-[32px]'>Campaign Description</h1>
                        <p className='text-[15px] md:text-[18px] text-gray-500'>
                            Describe your campaign goals and participant requirements
                        </p>
                    </div>
                    <div className='mt-4'>
                        <TextAreaEditor
                            value={listingProperties.description}
                            onChange={(description) => handleDescription(description)}
                            placeholder="Example: Participants will create and share a social media post featuring our product. The post must include our campaign hashtag #YourHashtag and tag our official account @YourAccount. After posting, participants will submit the link to their post for verification..."
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Note Card - Side */}
            <Card className='hidden lg:flex w-full max-w-[500px] mt-[50px] lg:mt-0'>
                <CardHeader>
                    <CardTitle className='flex gap-2 items-center'>
                        <div className='w-[50px]'>
                            <Image
                                src='/note.png'
                                alt="note icon"
                                priority
                                width={2000}
                                height={2000}
                                className='w-full'
                            />
                        </div>
                        Campaign Description
                    </CardTitle>
                    <CardDescription className='mt-2'>
                        For campaigns, please provide as much detail as possible to include:
                        <ul className='list-disc list-inside mt-2 text-sm'>
                            <li>What the campaign for</li>
                            <li>What you'd like the participant to do</li>
                            <li>What the reward is</li>
                        </ul>

                        Example:
                        <ul className='list-disc list-inside mt-2 text-sm'>
                            <li>Company X is celebrating its 5th year in business. </li>
                        </ul>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}