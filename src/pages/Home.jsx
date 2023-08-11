import React from 'react'
import HeroSection from '../components/HeroSection'
import TopProducts from '../components/home/TopProducts'
import Brand from '../components/home/Brand'
import SalesProducts from '../components/home/SalesProducts'
import Categories from '../components/Categories'
const Home = () => {


  return (
    <>
    <HeroSection/>
    <Categories/>
 



    <TopProducts/>

    {/* <SalesProducts/> */}
    <Brand/>
    </>
  )
}

export default Home