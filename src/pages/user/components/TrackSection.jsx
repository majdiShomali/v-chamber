import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {fetchUserOrdersPending} from "../../../actions/orders/userOrders/GetUserOrdersPending"
import {fetchUserOrdersStarted} from "../../../actions/orders/userOrders/GetUserOrdersStarted"
import {fetchUserOrdersDone} from "../../../actions/orders/userOrders/GetUserOrdersDone"

import TrakingBar from '../userOrders/TrackingBar';

const TrackSection = () => {
  const ImagesUrl= process.env.REACT_APP_IMAGES_URL
  const {
    // loading: isOneRelatedItemLoading,
    data: UserPendingOrdersData,
    // error: fetchOneRelatedItemError,
  } = useSelector((state) => state.fetchUserOrdersPending);

  const {
    // loading: isUserStartedOrdersDataLoading,
    data: UserStartedOrdersData,
    // error: fetchUserStartedOrdersError,
  } = useSelector((state) => state.fetchUserOrdersStarted);

  const {
    // loading: isUserDoneOrdersDataLoading,
    data: UserDoneOrdersData,
    // error: fetchUserDoneOrdersError,
  } = useSelector((state) => state.fetchUserOrdersDone);


  const dispatch = useDispatch();



  const [email,setEmail]=useState("")
  const [emailFound,setEmailFound]=useState(false)
  const handleSearch = () => {
   console.log(email)
   dispatch(fetchUserOrdersPending(email));
   dispatch(fetchUserOrdersStarted(email));
   dispatch(fetchUserOrdersDone(email));
   console.log(UserDoneOrdersData)
  }
useEffect(()=>{
   if(UserDoneOrdersData.length > 0 || UserStartedOrdersData.length > 0 || UserPendingOrdersData.length >0){
    setEmailFound(true)
   }else{
    setEmailFound(false)
   }

},[UserDoneOrdersData,UserStartedOrdersData,UserPendingOrdersData])
  return (
    <>
       <section id="Track" className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        Payments tool for software companies
      </h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        From checkout to global sales tax compliance, companies around the world
        use Flowbite to simplify their payment stack.
      </p>
      <form>
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      id="default-search"
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search Mockups, Logos..."
      required=""
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
    />
    <button
      type="button"
     onClick={handleSearch}
      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>
</form>

    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
        alt="mockup"
      />
    </div>
  </div>
</section>
    
{emailFound ?    <TrakingBar
 UserPendingOrdersData={UserPendingOrdersData}
  UserStartedOrdersData={UserStartedOrdersData} 
  UserDoneOrdersData={UserDoneOrdersData}
  />: null}
 
    
    </>
 

  )
}

export default TrackSection