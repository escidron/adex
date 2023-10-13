import { useEffect, useState } from 'react'
import PaymentMethodItem from './PaymentMethodItem'
import axios from 'axios';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import toast from 'react-hot-toast';



export default function PaymentMethodList({ refetch,setRefetch }) {
    const [data, setData] = useState([]);
    const [checkDefault, setCheckDefault] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletedId, setDeleteId] = useState('');

    useEffect(() => {

        axios.post('https://test.adexconnect.com/api/payments/my-cards',
            {}, {
            withCredentials: true,

        })
            .then(function (response) {
                setData(response.data.data)
                setRefetch(false)
                setCheckDefault(false)
                console.log('response',response)

            })
            .catch(function (error) {
                console.log(error)
            });
    }, [refetch,checkDefault]);

    const deleteElement = () => {
        setShowDeleteModal(false)
        axios.post('https://test.adexconnect.com/api/payments/delete-card',
            { cardId: deletedId }, {
            withCredentials: true,
        })
            .then(function (response) {
                setCheckDefault(true)
                toast.success(response.data.message)
            })
            .catch(function (error) {
                toast.error(error.response.data.error, {
                    duration: 10000
                })

            });
    }
    return (
        <div className={`mt-4  flex flex-col gap-2`}>
            {data.map((item) => 
                <PaymentMethodItem 
                    key={item.id} 
                    item={item} 
                    setCheckDefault={(d)=>setCheckDefault(d)}
                    setShowDeleteModal={(toggle)=>setShowDeleteModal(toggle)}
                    setDeleteId={(id)=>setDeleteId(id)}
                    />
            )}
            {showDeleteModal && (
                <DeleteConfirmationModal 
                label='Payment Method'
                setShowDeleteModal={(toggle)=>setShowDeleteModal(toggle)}
                deleteElement={deleteElement}
                />
            )}
        </div>
    )
}
