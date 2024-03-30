import { FacebookProvider, ShareButton, useFacebook } from 'react-facebook';
import { Facebook } from 'lucide-react';

export default function ShareButtonFacebook({ id }) {
  const { isLoading, init, error } = useFacebook();

  async function handleClick() {
    const api = await init();

    const response = await api.login();
    const FB = await api.getFB(); // Get original FB object

    try {
      const scrapeResponse = await new Promise((resolve, reject) => {
        FB.api('https://graph.facebook.com/', 'post', {
          id: `https://adexconnect.com/my-listing/sharing-listing/${id}?timestamp=${Date.now()}`,
          scrape: true
        }, function (response) {
          if (!response || response.error) {
            reject(response.error || 'Erro desconhecido ao fazer scraping');
          } else {
            resolve(response);
          }
        });
      });

      console.log('Resposta do scraping:', scrapeResponse);
    } catch (error) {
      console.error('Erro ao fazer scraping:', error);
    }
  }

  return (
    <>
        <ShareButton href={`https://adexconnect.com/my-listing/sharing-listing/${id}?timestamp=${Date.now()}`}>
          <div className='w-[180px] flex gap-3 border p-3 mt-2 bg-white shadow-sm rounded-lg cursor-pointer hover:border-black'>
            <Facebook />
            <p>Facebook</p>
          </div>
        </ShareButton>
    </>
  );
}


