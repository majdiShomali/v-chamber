import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import TopProducts from "../components/TopProducts";
import Brand from "../components/Brand";
// import SalesProducts from '../components/home/SalesProducts'
import Categories from "../components/Categories";
import ProductOfTheWeek from "../components/ProductOfTheWeek";



const Home = () => {
  return (
    <div className="">
    
      <HeroSection /> 
     <ProductOfTheWeek/>
      <Categories />
      <TopProducts />
      {/* <SalesProducts/> */}
      <Brand />
    </div>
  );
};

export default Home;
