import Image from 'next/image'

export default function CategoryCard({ item,selected,setListingProperties }) {
    return (
        <div 
            onClick={()=>setListingProperties(item.id)} 
            className={`flex flex-col items-center justify-center w-full  max-h-[150px] ${selected ? 'bg-gray-600' : 'bg-black'}  px-4 py-[24px] rounded-lg hover:opacity-80 cursor-pointer`}>
            <div className='h-[54px] md:h-[74px] aspect-square'>
                <Image
                    src={'/'+item.image}
                    alt={'/'+item.image}
                    width={70}
                    height={70}
                    priority
                />
            </div>
            <h1 className='text-[#FCD33B] flex justify-center items-center text-center mt-1'>{item.name}</h1>
        </div>
    )
}
