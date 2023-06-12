import React from 'react'
import PersonForm from './PersonForm'
import PlaceForm from './PlaceForm'
import ThingForm from './ThingForm'

export default function ListingForm({ categoryId, typeId,isPeriodic,setSelectedStep }) {
    return (
        <div>
            {categoryId === 1 ? (<PersonForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
            {categoryId === 2 ? (<PlaceForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
            {categoryId === 3 ? (<ThingForm typeId={typeId} isPeriodic={isPeriodic} setSelectedStep={(step) => setSelectedStep(step)}/> ) : null}
        </div>
    )
}
