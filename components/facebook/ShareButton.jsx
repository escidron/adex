import { FacebookProvider, ShareButton, useShare, Page, Feed } from 'react-facebook';
import Head from 'next/head';

export default function ShareButtonFacebook() {

  return (
    <>
      <FacebookProvider appId="1611678826026608" >
        <ShareButton
          href="https://adexconnect.com/my-listing/sharing-listing?id=265"
          className="my-classname"
          >
          Facebook
        </ShareButton>
      </FacebookProvider>
    </>
  );
}