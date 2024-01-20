import { useState } from 'react'
import PaymentMethodItem from './PaymentMethodItem'
import toast from 'react-hot-toast';
import RemovePaymentMethod from '@/actions/RemovePaymentMethod';



export default function PaymentMethodList({ setRefetch, data }) {
    const [checkDefault, setCheckDefault] = useState(false);

    const deleteElement = async (id) => {
        const message = await RemovePaymentMethod(id)
        if (message) {
            toast.success(message)
            setRefetch(prev => !prev)
        } else {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className={`mt-4  flex flex-col gap-2`}>
            {data.map((item) =>
                <PaymentMethodItem
                    key={item.id}
                    item={item}
                    setRefetch={(toggle) => setRefetch(toggle)}
                    deleteElement={(id) => deleteElement(id)}

                />
            )}
        </div>
    )
}
