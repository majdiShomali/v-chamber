import ItemCard from "../../components/cards/ItemCard";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedItems } from "../../actions/related/GetAllRelatedItems";
// import { Card } from "@material-tailwind/react";
// import Pagination from "@mui/material/Pagination";
import StoreFilter from "../../components/filters/StoreFilter";
import DynamicPagenation from "../../components/pagenation/DynamicPagenation";
import ItemCardSkelaton from "../../components/cards/ItemCardSkelaton";
import axios from "axios";
const itemsPerPage =20;
const ItemsStore = () => {

  const [selectedFilterdItems, setSelectedFilterdItems] = useState([]);
  const [arrayToPagenation, setArrayToPagenation] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [CurrentPageNum, setCurrentPageNum] = useState(0);
  const handleSelectChange = (value) => {
    setSelectedFilterdItems(value);
  };

  const UpdateArrayToPagenation = (value) => {
    setArrayToPagenation(value)
  }
  const UpdateCurrentPage = (value) => {
    setCurrentPage(value)
  }
  const UpdateCurrentPageNum = (value) => {
    setCurrentPageNum(value)
  }

  return (
    <>
      <StoreFilter  updateFilteredArray={handleSelectChange} CurrentPage={CurrentPage} UpdateCurrentPageNum={UpdateCurrentPageNum} itemsPerPage={itemsPerPage} />

      <div className=" lg:min-h-[50vh] flex  flex-col">       
        <ItemCard Items={arrayToPagenation} />      
      </div>

      <DynamicPagenation
      itemsPerPageD= {itemsPerPage}
      items={selectedFilterdItems}
      UpdateArrayToPagenation={UpdateArrayToPagenation}
      UpdateCurrentPage={UpdateCurrentPage}
      CurrentPageNum={CurrentPageNum}
      />

    </>
  );
};

export default ItemsStore;
