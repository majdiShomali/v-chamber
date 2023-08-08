import React from 'react'
import Card1 from '../components/cards/Card1'
import Card2 from '../components/cards/Card2'
import Card3 from '../components/cards/Card3'
import HeroSection from '../components/HeroSection'
import TopProducts from '../components/home/TopProducts'
import Brand from '../components/home/Brand'
import SalesProducts from '../components/home/SalesProducts'
const Home = () => {
  return (
    <>
    <HeroSection/>
    {/* <Card1/>
    <Card2/> */}
    {/* <Card3/> */}
    <TopProducts/>

    <SalesProducts/>
    <Brand/>
    </>
  )
}

export default Home