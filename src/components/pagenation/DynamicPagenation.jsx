import React, { useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { useState } from 'react';

const DynamicPagenation = ({itemsPerPageD,items,UpdateArrayToPagenation,UpdateCurrentPage,CurrentPageNum}) => {

    const [currentPage, setCurrentPage] = useState(1);

    let totalItems;
    let totalPages;
    const itemsPerPage = itemsPerPageD;
    totalItems = items?.length;
    // totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    totalPages = Math.ceil(CurrentPageNum / itemsPerPage);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        UpdateCurrentPage(pageNumber)
      };

      useEffect(() => {
        UpdateArrayToPagenation(items)
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