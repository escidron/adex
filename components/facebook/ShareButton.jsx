import { FacebookProvider, ShareButton,Page } from 'react-facebook';

export default function ShareButtonFacebook() {
  return (
    <FacebookProvider appId="834219211688728">
      <ShareButton href="http://www.facebook.com" className="my-classname">
      Facebook
      </ShareButton>
    </FacebookProvider>
  );
}