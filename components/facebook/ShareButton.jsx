import { FacebookProvider, ShareButton, useShare, Page, Feed } from 'react-facebook';
import Head from 'next/head';

export default function ShareButtonFacebook() {

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:url" content='http://localhost:3000' />
        <meta property="og:type" content="website" />
        <meta property="og:title" content='Your Page Title' />
        <meta property="og:description" content='desciption' />
        <meta property="og:image" content='https://media.istockphoto.com/id/1402485839/photo/green-blurred-nature-background.webp?b=1&s=612x612&w=0&k=20&c=f4HpyXYygEoZ3lmU6I8OF8RyuWfanZovKTFQNjOIlx4=' />
        {/* Optional: Set the image dimensions for better rendering */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <FacebookProvider appId="1611678826026608" >
        <ShareButton
          href="https://adexconnect.com/my-listing/sharing-listing"
          className="my-classname"
          >
          Facebook
        </ShareButton>
      </FacebookProvider>
    </>
  );
}