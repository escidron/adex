
import AdDetails from '@/app/market-place/details/page'
import axios from 'axios';


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

    console.log('id',id)
    const data = await getData(id)
    try{
        console.log('data',data)
        return (
            <>
                <meta property="og:url" content="https://adexconnect.com/my-listing/sharing-listing" />
                <meta property="fb:app_id" content="1611678826026608" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={data?.title || ''} />
                <meta property="og:description" content={data?.address || ''} />
                <meta property="og:image" content="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" />
                <main>
                    <div className='mt-[120px]'>
                        {/* <AdDetails /> */}
                        <h1>idddddddddddd{id}</h1>
                    </div>
                </main>
    
            </>
        )
    } catch (error) {
        console.error(error);
      }
}
