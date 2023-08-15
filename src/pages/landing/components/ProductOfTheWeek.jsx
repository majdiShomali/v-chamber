import React, { useEffect, useState } from 'react'
// import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import { useDispatch,useSelector } from 'react-redux';
import {fetchAllRelatedItems} from "../../../actions/related/GetAllRelatedItems"
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../../components/cards/ItemCard';
const ProductOfTheWeek = () => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const [productOfTheWeek,setProductOfTheWeek] =useState({})
  const {data:AllRelatedItems} =useSelector((state)=> state.fetchAllRelatedItems)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllRelatedItems())
  },[])

  useEffect(()=>{

const highestRated = AllRelatedItems.reduce((highest, current) => {
  if (parseFloat(current.rating) > parseFloat(highest.rating)) {
    return current;
  } else {
    return highest;
  }
}, AllRelatedItems[0]); 

setProductOfTheWeek(highestRated)
  },[AllRelatedItems]);

  const navigate =useNavigate()
  const handleShowProduct =() =>{
    console.log( `/ProductPage/${productOfTheWeek.categoryId}/${productOfTheWeek._id}`)
    navigate(`/ProductPage/${productOfTheWeek.categoryId}/${productOfTheWeek._id}`)
  }
  return (
    <div
     
     className="px-6  text-center md:px-12 lg:text-left bg-gray-50 py-10 mx-5">
    <div className=" mx-auto sm:max-w-1xl md:max-w-3xl lg:max-w-3xl xl:max-w-5xl xl:px-32"
    data-aos="zoom-in" >
      <div
      onClick={()=>handleShowProduct()}
      className="grid items-center lg:grid-cols-2  cursor-pointer"  
      >
        <div
        
        className="mb-12 md:mt-12 lg:mt-0 lg:mb-0 ">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-2 py-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-16 backdrop-blur-[30px]">
            <h1 className="mt-2 mb-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
              Product <br />
              <span className="text-primary">Of the Week</span>
            </h1>
          </div>
        </div>
        <div className="md:mb-12 lg:mb-0">
          {/* <img
           src={`${ImagesUrl}/${productOfTheWeek?.image}`}      
             className="w-80 h-96  rounded-lg shadow-lg dark:shadow-black/20"
            alt={productOfTheWeek?.image}
          /> */}
          <ItemCard
          Items={[productOfTheWeek]}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductOfTheWeek