import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import TopProducts from "../components/TopProducts";
import Brand from "../components/Brand";
// import SalesProducts from '../components/home/SalesProducts'
import Categories from "../components/Categories";
import ProductOfTheWeek from "../components/ProductOfTheWeek";
// import Gallery from './Gallery';
import CookieComponent from "../../../CookieComponent";
import AlertModal from "../components/AlertModal";
import { useState } from "react";

const Home = () => {

  const [isAlertOpen, setAlertOpen] = useState(true);

  const handleConfirm = (value) => {
 console.log(value)
 if(value){
  localStorage.setItem("DOB","+18")
  setAlertOpen(false)
 }else{
  window.location.href = "https://www.google.com";
  setAlertOpen(false)
}

  };
  return (
    <>
{localStorage.DOB === "+18" ? null :

<div>
<AlertModal
  isOpen={isAlertOpen}
  // onClose={() => handleConfirm(false)}
  onConfirm={() => handleConfirm(true)}
  onDecline={() => handleConfirm(false)}
/>
</div>




}











    {/* <Gallery/> */}
       {/* <CookieComponent/> */}
      <HeroSection /> 
      <Categories />
      <TopProducts />
      {/* <SalesProducts/> */}
     {/* <ProductOfTheWeek/> */}
      {/* <Brand /> */}
      </>
  );
};

export default Home;
