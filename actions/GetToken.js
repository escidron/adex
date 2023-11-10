import { cookies } from 'next/headers';

export default async  function GetToken() {
    const token = cookies().get('jwt')?.value
    console.log('get token',token)
    return token
  }