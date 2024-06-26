'use client'
import Banner from '../sections/banner/Banner.jsx'
import HaveSpace from '@/sections/haveSpace/HaveSpace'
import AnyPerson from '@/sections/anyPerson/AnyPerson'
import CustomerComents from '@/sections/customerComments/CustomerComments'
import Footer from '@/components/footer/Footer'
import Categories from '@/sections/categories/Categories.jsx'
import Graphic from '@/sections/graphic/Graphic.jsx'

export default function Home() {
  return (
    <main>
      <Banner />
      <HaveSpace />
      <AnyPerson />
      {/* <CustomerComents /> */}
      <Graphic />
      <Categories />
      <Footer />
    </main>
  )
}


