import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const DynamicSearch = ({ onSelectChange, SearchedArray }) => {
    const [searchTerm, setSearchTerm] = useState('');



    const handleSearchChange = (search) => {
        setSearchTerm(search);
        if (SearchedArray && searchTerm ) {
          const filteredArray = SearchedArray?.filter((order) => {
            return order.email.includes(searchTerm)    
          });
        onSelectChange(filteredArray);

        }
      };


  return (
    <div className="relative  ">
    <input
      type="text"
      id="search"
      className="block p-4 text-sm w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search"
      required
      value={searchTerm}
      onChange={(e) => {
        handleSearchChange(e.target.value)
      }}
    />
  </div>
  )
}

export default DynamicSearch