import ItemCard from '../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../actions/category/GetItems";
import { Button, Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const SalesProducts = () => {
    const dispatch = useDispatch();
    const [saleItems,setSaleItems] = useState([])
    const {
      loading: isLoading,
      data: itemsData,
      error: fetchError,
    } = useSelector((state) => state.fetchItems);
  
    useEffect(() => {
      dispatch(fetchItems());
    }, [dispatch]);
  
    useEffect(() => {
      const filteredItems = itemsData.filter((item)=>{return  item.price > item.salePrice})
      setSaleItems(filteredItems)
    }, [saleItems]);
  
 
  return (

    <div id='SaleProducts'
          
    className="py-5 lg:min-h-[100vh] flex justify-center items-center flex-col bg-blue-gray-50">
{/* <div className=" max-w-xl text-center">
<h1 className="text-3xl text-purple-500 font-extrabold sm:text-5xl">
 Sales
</h1>
<p className="mt-4 text-black sm:text-xl/relaxed">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
  tenetur fuga ducimus numquam ea!
</p>
<div className="mt-8 flex flex-wrap justify-center gap-4">
</div>
</div> */}

<div className="px-6 py-12 text-center md:px-12 lg:text-left bg-blue-gray-50">
    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
      <div className="grid items-center lg:grid-cols-2">
        <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
            <h1 className="mt-2 mb-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>
            <Link to="/Store">
      <Button
        className="  border-solid border-purple-500 border-2  bg-purple-500 hover:bg-purple-500 hover:scale-105 text-[#ffffff]"
        variant="text"
      >
        
        All Products
      </Button>
      </Link>
        
          </div>
        </div>
        <div className="md:mb-12 lg:mb-0">
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            className="w-full h-1/2 rounded-lg shadow-lg dark:shadow-black/20"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
<ItemCard
Items={saleItems}
/>

{/* <div className='w-full flex items-center justify-center'>
<Link to="/Store">
      <Button
        className=" mt-10 border-solid border-purple-500 border-2  bg-purple-500 hover:bg-purple-500 hover:scale-105 text-[#ffffff]"
        variant="text"
      >
        
        All Products
      </Button>
      </Link>
</div> */}
</div>

  )
}

export default SalesProducts