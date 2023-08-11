import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import ProviderEditProfile from "./ProviderEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderItems } from "../../actions/category/GetProviderItems";
// import ItemCard from "../../components/cards/ItemCard"
// import ItemCardProvider from "../../components/cards/ItemCardProvider";
import CategoryCardProvider from "../../components/cards/CategoryCardProvider";
const ProviderProfile = () => {

    const { user } = useContext(UserContext);
    const [ProviderItems,setProviderItems] =useState([])
      const {
        // loading: isProviderLoading,
        data: itemsProviderData,
        // error: fetchProviderError,
      } = useSelector((state) => state.fetchProviderItems);
    
    
      const dispatch = useDispatch();
    
    
    
      useEffect(() => {
        if(user){
          dispatch(fetchProviderItems(user._id));
        }
      }, [dispatch,user]);
    
      useEffect(() => {    
        setProviderItems(itemsProviderData)
      }, [itemsProviderData]);


  return (
    <>
    <div className="h-full bg-gray-200 p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
            alt="profileimage"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          {false === true ? (
            <div class="flex items-center justify-center w-40 h-40 bg-gray-300 rounded-full dark:bg-gray-700">
              <svg
                class="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          ) : (
            <img
              src={user?.img !== undefined ? `http://localhost:5000/${user?.img}` : " " }
              className="w-40 h-40 border-4 border-white rounded-full"
              alt="userimage"
            />
          )}

          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{user?.userName}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
          <p className="text-gray-700">Welcome to V-Cahmber</p>
          <p className="text-sm text-gray-500">
            {user?.role === 0 ? "User" : "Provider"}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <ProviderEditProfile />
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
       
        <div className="flex flex-col w-full ">
       
         
        
                       <CategoryCardProvider
                       itemsData={ProviderItems}
                       />
        
    
        </div>
      </div>
    </div>
  </>
  )
}

export default ProviderProfile