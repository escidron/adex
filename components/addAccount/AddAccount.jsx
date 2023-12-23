import { useState, useEffect } from 'react'
import BankAccountList from './BankAccountList'
import AddAccountModals from './AddAccountModals';
import AddAccountNote from './AddAccountNote';
import { Separator } from '../ui/separator';

export default function AddAccount({ companyId, companyName }) {
  const [refetch, setRefetch] = useState(false);

  return (
    <div>
      <AddAccountNote />
      <AddAccountModals setRefetch={setRefetch} selectedCompanyId={companyId} selectedCompany={companyName} />
      <Separator className='my-4' />
      <BankAccountList refetch={refetch} setRefetch={setRefetch} companyId={companyId} />
    </div>
  )
}
