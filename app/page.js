'use client'
import Banner from '../sections/banner/Banner.jsx'
import HaveSpace from '@/sections/haveSpace/HaveSpace'
import AnyPerson from '@/sections/anyPerson/AnyPerson'
import CustomerComents from '@/sections/customerComments/CustomerComments'
import Footer from '@/components/footer/Footer'
export default function Home() {
  return (
    <main>
      <Banner />
      <HaveSpace />
      <AnyPerson />
      {/* <CustomerComents /> */}
      <Footer />
    </main>
  )
}


