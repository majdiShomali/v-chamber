import React from 'react'
import AllJuiceTypeInput from './inputs/AllJuiceTypeInput';
import AllSaleInput from './inputs/AllSaleInput';
import AllCategoryInput from './inputs/AllCategoryInput';
import AllCompanyInput from './inputs/AllCompanyInput';
import { useState,useEffect } from 'react';
import axios from 'axios';

const StoreFilter = ({updateFilteredArray,CurrentPage,UpdateCurrentPageNum,itemsPerPage}) => {


    const [selectedCompany, setSelectedCompanyValue] = useState("");
    const handleSelectCompanyChange = (value) => {
      setSelectedCompanyValue(value);
    };
  
    const [selectedCategory, setSelectedCategoryValue] = useState("");
    const handleSelectCategoryChange = (value) => {
      setSelectedCategoryValue(value);
    };
  
    const [selectedSale, setSelectedSaleValue] = useState("");
    const handleSelectSaleChange = (value) => {
      setSelectedSaleValue(value);
    };
  
    const [selectedType, setSelectedTypeValue] = useState("");
    const handleSelectTypeChange = (value) => {
      setSelectedTypeValue(value);
    };


    const [searchTermProduct, setSearchTermProduct] = useState("");
 


  useEffect(() => {
      getBy(selectedCategory,selectedCompany,selectedType,selectedSale)
  }, [selectedCategory, selectedCompany,selectedSale,selectedType,CurrentPage,searchTermProduct]);

  const ApiUrl= process.env.REACT_APP_API_URL

 const getBy = async(selectedCategory,selectedCompany,selectedType,selectedSale) =>{
  try {
        console.log(selectedCategory,selectedCompany,selectedType,selectedSale)
           const data = {
            category:selectedCategory,
            company:selectedCompany,
            type:selectedType,
            sale:selectedSale,
            searchWord:searchTermProduct,
            CurrentPage:CurrentPage ? CurrentPage :1 ,
            itemsPerPage:itemsPerPage,
           }
        const response = await axios.post(`${ApiUrl}/allRelatedItemsBy`,data)
              updateFilteredArray(response.data.data);
              UpdateCurrentPageNum(response.data.totalItems)
              console.log(response.data)

  } catch (error) {
    console.log(error.message)
  }
 }

  return (
    <div className="flex justify-center py-8 mx-5 ">
    <div className="w-full md:w-full mx-8  px-5 rounded-lg bg-white  transform transition duration-300 ">
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <div className="relative flex  w-1/2  ">
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
            value={searchTermProduct}
            onChange={(e) => {
              setSearchTermProduct(e.target.value);
            }}
          />
        </div>

        <div className="flex my-5 w-full lg:w-1/2">
          <AllCompanyInput onSelectChange={handleSelectCompanyChange} />
          <AllCategoryInput onSelectChange={handleSelectCategoryChange} />
          <AllSaleInput onSelectChange={handleSelectSaleChange} />
          <AllJuiceTypeInput onSelectChange={handleSelectTypeChange} />
   
        </div>
      </div>
    </div>
  </div>
  )
}

export default StoreFilter