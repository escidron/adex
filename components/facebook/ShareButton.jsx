import { FacebookProvider, ShareButton, useFacebook } from 'react-facebook';
import { Facebook } from 'lucide-react';

export default function ShareButtonFacebook({ id }) {
  const { isLoading, init, error } = useFacebook();

  async function handleClick() {
    const api = await init();
    console.log('api', api)
    try {
      // Realiza a solicitação de limpeza de cache
      await api.getFB().api(
        'https://graph.facebook.com/',
        'post',
        {
          id: `https://adexconnect.com/my-listing/sharing-listing/${id}?timestamp=${Date.now()}`,
          scrape: true
        }
      );
  
    } catch (error) {
      console.error('Erro ao limpar o cache do scraper do Facebook:', error);
    }
  }

  return (
    <>
        <ShareButton onClick={handleClick} href={`https://adexconnect.com/my-listing/sharing-listing/${id}?timestamp=${Date.now()}`}>
          <div className='w-[180px] flex gap-3 border p-3 mt-2 bg-white shadow-sm rounded-lg cursor-pointer hover:border-black'>
            <Facebook />
            <p>Facebook</p>
          </div>
        </ShareButton>
    </>
  );
}


