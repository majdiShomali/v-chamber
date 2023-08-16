import React, { useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { useState } from 'react';

const DynamicPagenation = ({itemsPerPageD,items,UpdateArrayToPagenation}) => {

    const [currentPage, setCurrentPage] = useState(1);

    let totalItems;
    let totalPages;
    const itemsPerPage = itemsPerPageD;
    totalItems = items?.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
      };

      useEffect(() => {
        UpdateArrayToPagenation(items?.slice(startIndex, endIndex))
      },[items,startIndex,endIndex])
 
  return (
    <div className="w-full flex items-center justify-center mt-5">
    {
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    }
  </div>
  )
}

export default DynamicPagenation