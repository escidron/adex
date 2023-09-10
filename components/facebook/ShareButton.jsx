import { FacebookProvider, ShareButton } from 'react-facebook';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function ShareButtonFacebook({id}) {

  return (
    <>
      <FacebookProvider appId="1611678826026608" >
        <ShareButton
          href={`adexconnect.com/my-listing/sharing-listing?id=${id}`}
        >
          <div className='flex gap-3 border p-3 mt-2 bg-white shadow-sm rounded-lg cursor-pointer hover:border-black'>
            <FacebookIcon sx={{ color: 'blue' }} />
            <p>Facebook</p>
          </div>
        </ShareButton>
      </FacebookProvider>
    </>
  );
}