import { useEffect, useState } from 'react'
import BankAccountItem from './BankAccountItem'
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';



export default function BankAccountList({ refetch,setRefetch }) {
    const [data, setData] = useState([]);
    const [checkDefault, setCheckDefault] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletedId, setDeleteId] = useState('');

    useEffect(() => {

        axios.post('https://test.adexconnect.com/api/payments/my-bank-accounts',
            {}, {
            withCredentials: true,
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

    const deleteElement = () => {
        setShowDeleteModal(false)
        axios.post('https://test.adexconnect.com/api/payments/delete-bank-account',
            { bankAccountId:deletedId }, {
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
                <BankAccountItem 
                key={item.id} 
                item={item} 
                setCheckDefault={(d)=>setCheckDefault(d)}
                setShowDeleteModal={(toggle)=>setShowDeleteModal(toggle)}
                setDeleteId={(id)=>setDeleteId(id)}
                />
            
            )}
            {showDeleteModal && (
                <DeleteConfirmationModal 
                label='Payout Method'
                setShowDeleteModal={(toggle)=>setShowDeleteModal(toggle)}
                deleteElement={deleteElement}
                />
            )}
        </div>
    )
}
