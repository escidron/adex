'use client'
import { useEffect, useState } from 'react'
import PersonForm from './PersonForm'
import PlaceForm from './PlaceForm'
import ThingForm from './ThingForm'

export default function ListingForm({ categoryId, typeId, isPeriodic, setSelectedStep, selectedCompany }) {
  const [hasPayout, setHasPayout] = useState(false);
  useEffect(() => {
    async function hasPayoutMethod() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/external-account`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const res = await response.json()
        if (res.data) {
          setHasPayout((prev) => (true));
        }
      }
    }
    hasPayoutMethod();
  }, []);
  return (
    <div>
      {categoryId === 1 ? (<PersonForm selectedCompany={selectedCompany} typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)} hasPayout={hasPayout} />) : null}
      {categoryId === 2 ? (<PlaceForm selectedCompany={selectedCompany} typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)} hasPayout={hasPayout} />) : null}
      {categoryId === 3 ? (<ThingForm selectedCompany={selectedCompany} typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)} hasPayout={hasPayout} />) : null}
    </div>
  )
}
