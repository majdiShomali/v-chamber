import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import TopProducts from "../components/TopProducts";
import Brand from "../components/Brand";
// import SalesProducts from '../components/home/SalesProducts'
import Categories from "../components/Categories";
import ProductOfTheWeek from "../components/ProductOfTheWeek";
// import Gallery from './Gallery';
import CookieComponent from "../../../CookieComponent";

const Home = () => {
  return (
    <>
    {/* <Gallery/> */}
       {/* <CookieComponent/> */}
      <HeroSection /> 
      <Categories />
      <TopProducts />
      {/* <SalesProducts/> */}
     <ProductOfTheWeek/>
      <Brand />
      </>
  );
};

export default Home;
