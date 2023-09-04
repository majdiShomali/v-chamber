import ItemCard from '../../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryItems } from "../../../actions/category/GetCategoryItems";
import { fetchAllRelatedItems } from "../../../actions/related/GetAllRelatedItems";
import { Button } from '@material-tailwind/react';
// import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import NewCard from '../../../components/cards/NewCard';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
AOS.init();
const TopProducts = () => {

    const dispatch = useDispatch();
    const  [topProducts,setTopProducts] = useState([]);
    
    // const {
      // loading: isLoading,
      // data: itemsData,
      // error: fetchError,
    // } = useSelector((state) => state.fetchCategories);
  
    const {
      // loading: isAllRelatedLoading,
      data: AllRelatedItemsData,
      // error: fetchAllRelatedError,
    } = useSelector((state) => state.fetchAllRelatedItems);
  
    useEffect(() => {
      dispatch(fetchCategoryItems());
      dispatch(fetchAllRelatedItems());
    }, [dispatch]);
  
    useEffect(() => {
      const TopItemsRelated=AllRelatedItemsData.slice(-4);
      setTopProducts(TopItemsRelated)
    }, [AllRelatedItemsData]);
  
  return (
    <>


          <div id='TopProducts' 
          
          className="py-5 lg:min-h-[100vh] flex justify-center items-center flex-col  ">
      <div className=" max-w-xl text-center">
      <h1 className="text-3xl text-purple-500 font-extrabold sm:text-5xl">
       Top Products
      </h1>
      <p className="mt-4 text-black sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
      </div>
    </div>
    {/* <ItemCard 
    Items={topProducts}
    /> */}
      <div data-aos="fade-up" data-aos-duration="1000" className=" w-full flex  flex-wrap gap-5 justify-center items-center">

    <NewCard
     Items={topProducts}
    />
       </div>

    <div className='w-full flex items-center justify-center'>
      <HashLink smooth={true} to="/Store#">

            <Button
              className=" mt-10 border-solid border-purple-500 border-2  bg-purple-500 hover:bg-purple-500 hover:scale-105 text-[#ffffff]"
              variant="text"
            >
              
              All Products
            </Button>
            </HashLink>
    </div>
    </div>
    </>
  )
}

export default TopProducts