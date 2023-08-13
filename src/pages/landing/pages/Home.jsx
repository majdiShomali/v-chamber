import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import TopProducts from "../components/TopProducts";
import Brand from "../components/Brand";
// import SalesProducts from '../components/home/SalesProducts'
import Categories from "../components/Categories";
const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <TopProducts />
      {/* <SalesProducts/> */}
      <Brand />
    </>
  );
};

export default Home;
