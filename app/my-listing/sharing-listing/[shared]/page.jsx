
import dynamic from 'next/dynamic';
import axios from 'axios';

// Dynamically import the AdDetails component to ensure client-side rendering
const DynamicAdDetails = dynamic(() => import('@/app/market-place/details/page'), {
  ssr: false, // Disable server-side rendering for this component
});

async function getData(id) {
    try {
      const response = await axios.post('https://test.adexconnect.com/api/advertisements/shared-listing', {
        id: id,
      }, {
        withCredentials: true,
      });
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }


  export default async function SharingPage({params}) {
    const id = params.shared

    const data = await getData(id)
    try{
        return (
            <>
                <meta property="og:url" content={`https://adexconnect.com/my-listing/sharing-listing/${id}`} />
                <meta property="fb:app_id" content="1611678826026608" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={data?.title || ''} />
                <meta property="og:description" content={data?.address || ''} />
                <meta property="og:image" content="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" />
                <main>
                    <div className='mt-[120px]'>
                        <DynamicAdDetails sharedId={id}/>
                    </div>
                </main>
    
            </>
        )
    } catch (error) {
        console.error(error);
      }
}
