import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import React from 'react'

export default function PreferencesCards({ preferences, handleDeletePreference, isViewOnly }) {
    return (
        <div className='flex gap-1 mt-4 flex-col sm:flex-row sm:flex-wrap'>
            {
                preferences.map(preference => (
                    <Badge key={preference} className='bg-black p-2 gap-2 flex justify-between items-center'>
                        <p className='text-[15px]'>{preference}</p>
                        {
                            !isViewOnly && (
                                <X size={16} className='cursor-pointer' onClick={() => handleDeletePreference(preference)} />
                            )
                        }
                    </Badge>

                ))
            }
        </div>
    )
}
