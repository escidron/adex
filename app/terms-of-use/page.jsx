import React from 'react'

export default function TermsOfUseModal() {
    return (
        <div className='fixed z-[99] top-0 left-0 w-full h-[100vh]'>
            <object width="100%" height="100%"
                data="/ADEX_Terms of Use.pdf"
                type="application/pdf">
            </object>
        </div>
    )
}