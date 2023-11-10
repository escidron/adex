import { cookies } from 'next/headers';

export default function GetToken() {
    const token = cookies().get('jwt')?.value
    console.log('get token',token)
    return token
  }