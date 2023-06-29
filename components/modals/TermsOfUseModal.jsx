import React from 'react'

export default function TermsOfUseModal() {
    return (
        <div className='fixed z-[99] top-0 left-0 w-full h-full'>
            <object width="100%" height="400"
                data="/ADEX_Terms of Use_v2.pdf"
                type="application/pdf">
            </object>
        </div>
    )
}
