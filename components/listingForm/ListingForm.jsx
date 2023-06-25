'use client'
import {useEffect,useState} from 'react'
import PersonForm from './PersonForm'
import PlaceForm from './PlaceForm'
import ThingForm from './ThingForm'

export default function ListingForm({ categoryId, typeId,isPeriodic,setSelectedStep }) {
    const [hasPayout, setHasPayout] = useState(false);
    useEffect(() => {
        async function hasPayoutMethod() {
          const response = await fetch(
            "http://localhost:8000/api/users/external-account",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (response.status === 200) {
            const res = await response.json()
            console.log(res)
            if(res.data){
                setHasPayout((prev) => (true));
            }
          }
        }
        hasPayoutMethod();
      }, []);
      console.log('hasPayout',hasPayout)
    return (
        <div>
            {categoryId === 1 ? (<PersonForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
            {categoryId === 2 ? (<PlaceForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
            {categoryId === 3 ? (<ThingForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
        </div>
    )
}
