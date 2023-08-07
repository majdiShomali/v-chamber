import ItemCard from '../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../actions/GetItems";

const TopProducts = () => {

    const dispatch = useDispatch();

    const {
      loading: isLoading,
      data: itemsData,
      error: fetchError,
    } = useSelector((state) => state.fetchItems);
  
    useEffect(() => {
      dispatch(fetchItems());
    }, [dispatch]);
  

  return (
    <>
          <div id='TopProducts'
          
          className="py-5 lg:h-[100vh] flex justify-center items-center flex-col">
      <div className=" max-w-xl text-center">
      <h1 className="text-3xl text-red-700 font-extrabold sm:text-5xl">
      Products
      </h1>
      <p className="mt-4 text-black sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
      </div>
    </div>
    <ItemCard
    Items={itemsData}
    />
    </div>
    </>
  )
}

export default TopProducts