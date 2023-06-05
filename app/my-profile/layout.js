import NavBar from '@/components/NavBar/NavBar';
import ProfileHeader from '@/components/profileHeader/ProfileHeader';
import { Abel } from 'next/font/google';

const abel = Abel({ subsets: ['latin'],weight:['400'] })

export default function userProfileLayout({ children }) {

    return (
        <div>
          <ProfileHeader/>
          {children}
        </div>
    )
  }
