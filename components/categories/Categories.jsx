'use client'
import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

export default function Categories({ selectedStep, setSelectedStep, categoryId, setCategoryId, typeId, setTypeId, setIsPeriodic,setCategoryList }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/list-property`)
        .then(function (response) {
          return response.json();
        }).then(function (data) {

          setData(data.data)
          setCategoryList(data.data)


        }).catch(function (err) {
          console.log('error', err)
        })
    }

    getData()
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {selectedStep === 1 ? (
        data.map((item) => {
          if (item.parent_id === 0) {
            return (
              <div key={item.id}>
                <CategoryCard
                  item={item}
                  setCategoryId={setCategoryId}
                  selectedStep={selectedStep}
                  setSelectedStep={setSelectedStep}
                  typeId={typeId}
                  setTypeId={setTypeId}
                />
              </div>
            )
          }
        })
      ) : (selectedStep === 2 ? (
        data.map((item) => {
          if (item.parent_id === categoryId) {
            return (
              <div key={item.id}  >
                <CategoryCard
                  item={item}
                  setCategoryId={(id) => setCategoryId(id)}
                  selectedStep={selectedStep}
                  setSelectedStep={setSelectedStep}
                  typeId={typeId}
                  setTypeId={setTypeId}
                  setIsPeriodic={setIsPeriodic}

                />
              </div>
            )
          }
        })
      ) : null)
      }
    </div>
  )
}
