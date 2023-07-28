import { useEffect, useState } from 'react'
import PaymentMethodItem from './PaymentMethodItem'
import axios from 'axios';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function PaymentMethodList({ refetch,setRefetch }) {
    const [data, setData] = useState([]);
    const [checkDefault, setCheckDefault] = useState(false);
    useEffect(() => {

        axios.post('https://test.adexconnect.com/api/payments/my-cards',
            {}, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                setData(response.data.data)
                setRefetch(false)
                setCheckDefault(false)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, [refetch,checkDefault]);
    return (
        <div className={`mt-4 ${inter.className} flex flex-col gap-2`}>
            {data.map((item) => 
                <PaymentMethodItem key={item.id} item={item} setCheckDefault={(d)=>setCheckDefault(d)}/>
            
            )}

        </div>
    )
}
