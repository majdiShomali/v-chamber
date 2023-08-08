import ItemCard from '../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../actions/GetItems";
import { Card } from '@material-tailwind/react';
import Pagination from "@mui/material/Pagination";

const ItemsStore = () => {
  const dispatch = useDispatch();

  const {
    loading: isLoading,
    data: itemsData,
    error: fetchError,
  } = useSelector((state) => state.fetchItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);


  const [currentPageMeals, setCurrentPageMeals] = useState(1);

  let totalItemsMeals;

  let totalPagesMeals;

  let slicedArrayMeals;

  const itemsPerPage = 4;

  totalItemsMeals = itemsData?.length;

  totalPagesMeals = Math.ceil(totalItemsMeals / itemsPerPage);

  const startIndexMeals = (currentPageMeals - 1) * itemsPerPage;

  const endIndexMeals = startIndexMeals + itemsPerPage;

  slicedArrayMeals = itemsData?.slice(startIndexMeals, endIndexMeals);
  const handlePageChangeMeals = (event, pageNumber) => {
    setCurrentPageMeals(pageNumber);
  };

  return (
    <>

 
  <div className="px-6 py-12 text-center md:px-12 lg:text-left bg-blue-gray-100">
    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
      <div className="grid items-center lg:grid-cols-2">
        <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
            <h1 className="mt-2 mb-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>
 
        
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













  <div className="flex justify-center py-8 mx-5 ">
        <Card className="w-full md:w-full mx-8  px-5 rounded-lg bg-white  transform transition duration-300 ">
       
        <div className='flex items-center justify-between flex-col lg:flex-row'>


        <div className="relative flex  w-full  ">
            <div className="absolute flex items-center ml-2 h-full">
              <svg
                className="w-4 h-4 fill-current text-primary-gray-dark"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
              </svg>
            </div>
            
            <input
              type="text"
              placeholder="Search by listing, location, bedroom number..."
              className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              // value={searchTermUsers}
              // onChange={(e) => {
              //   setSearchTermUsers(e.target.value);
              //   filterDataByNameUsers(e.target.value);
              // }}
            />

          
          


              
           



          </div>






        <div className='flex my-5'>
               <select
                className="px-4 py-3 ml-2 w-40 md:w-60 rounded-md bg-gray-100 border-[#E8AA42] border-2 focus:border-yellow-600 focus:bg-white focus:ring-0 text-sm appearance mr-5"
                // value={yourSelectedStateValueType}
                // onChange={(e) => {
                //   setOptionType(e.target.value);
                //   handleFilterChange(
                //     e.target.value,
                //     yourSelectedStateValueAddress
                //   );
                // }}
              >
                <option value=""> All Recipes</option>
                <option value="Meal">Meals</option>
                <option value="Drink">Drinks</option>
                <option value="Sweet">Sweets</option>
              </select>
              
                <select
                  className="px-4 py-3 w-40 md:w-60 rounded-md bg-gray-100 border-[#E8AA42] border-2 focus:border-[#E8AA42] focus:bg-white focus:ring-0 text-sm appearance"
                  // value={yourSelectedStateValueAddress}
                  // onChange={(e) => {
                  //   setOptionAddress(e.target.value);
                  //   handleFilterChange(
                  //     yourSelectedStateValueType,
                  //     e.target.value
                  //   );
                  // }}
                >
                  <option value="">all nations</option>
                  <option value="jordanian">jordanian</option>
                  <option value="egyptian ">egyptian </option>
                </select>


</div>
        </div>
      
       
       
        </Card>
      </div>


      

      <div 
          
       className=" lg:min-h-[50vh] flex  flex-col">
   
    <ItemCard
    Items={slicedArrayMeals}
    />
     </div>

     <div className="w-full flex items-center justify-center">
          {
            <Pagination
              count={totalPagesMeals}
              page={currentPageMeals}
              onChange={handlePageChangeMeals}
            />
          }
        </div>
    </>
  )
}

export default ItemsStore