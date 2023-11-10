import { cookies } from 'next/headers';

export default function GetToken() {
    const token = cookies().get('jwt')?.value
    return token
  }