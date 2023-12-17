import { formatPrice } from '@/utils/format'

export default function ListingHeaderPrice({ hasPaymentBox, price, advertisementType, otherType, subCategory }) {
    return (
        <div>                {
            !hasPaymentBox && (
                <div className='flex gap-1 items-center'>
                    <p className='text-[24px] md:text-[32px]'>{formatPrice(price)}</p>
                    {
                        otherType ? (
                            <>
                                {
                                    otherType == 2 && (
                                        <p className='mt-1'>/Unit</p>
                                    )
                                }
                                {
                                    otherType == 0 && (
                                        <p className='mt-1'>/Month</p>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                {
                                    subCategory === 17 && (
                                        <p className='mt-1'>/Unit</p>
                                    )
                                }
                                {
                                    advertisementType == 0 && (
                                        <p className='mt-1'>/Month</p>
                                    )
                                }
                            </>
                        )
                    }

                </div>
            )
        }</div>
    )
}
