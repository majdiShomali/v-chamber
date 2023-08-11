import ItemCard from '../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../actions/category/GetItems";
import { fetchAllRelatedItems } from "../../actions/related/GetAllRelatedItems";
import { Button, Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const TopProducts = () => {

    const dispatch = useDispatch();
    const  [topProducts,setTopProducts] = useState([]);
    const {
      loading: isLoading,
      data: itemsData,
      error: fetchError,
    } = useSelector((state) => state.fetchItems);
  
    const {
      loading: isAllRelatedLoading,
      data: AllRelatedItemsData,
      error: fetchAllRelatedError,
    } = useSelector((state) => state.fetchAllRelatedItems);
  
    useEffect(() => {
      dispatch(fetchItems());
      dispatch(fetchAllRelatedItems());
    }, [dispatch]);
  
    useEffect(() => {
      const TopItems=itemsData.slice(-4);
      const TopItemsRelated=AllRelatedItemsData.slice(-4);
      setTopProducts(TopItemsRelated)
      console.log(AllRelatedItemsData)
    }, [AllRelatedItemsData]);
  

  return (
    <>


          <div id='TopProducts'
          
          className="py-5 lg:h-[100vh] flex justify-center items-center flex-col ">
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
    <ItemCard
    Items={topProducts}
    />

    <div className='w-full flex items-center justify-center'>
      <Link to="/Store">
            <Button
              className=" mt-10 border-solid border-purple-500 border-2  bg-purple-500 hover:bg-purple-500 hover:scale-105 text-[#ffffff]"
              variant="text"
            >
              
              All Products
            </Button>
            </Link>
    </div>
    </div>
    </>
  )
}

export default TopProducts