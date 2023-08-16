import ItemCard from "../../components/cards/ItemCard";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedItems } from "../../actions/related/GetAllRelatedItems";
// import { Card } from "@material-tailwind/react";
// import Pagination from "@mui/material/Pagination";
import StoreFilter from "../../components/filters/StoreFilter";
import DynamicPagenation from "../../components/pagenation/DynamicPagenation";
const ItemsStore = () => {

  const [selectedFilterdItems, setSelectedFilterdItems] = useState([]);
  const [arrayToPagenation, setArrayToPagenation] = useState([]);
  const handleSelectChange = (value) => {
    setSelectedFilterdItems(value);
  };

  const UpdateArrayToPagenation = (value) => {
    setArrayToPagenation(value)
  }

  const dispatch = useDispatch();

  const {
    // loading: isAllRelatedItemsLoading,
    data: AllRelatedItems,
    // error: fetchAllRelatedItemsError,
  } = useSelector((state) => state.fetchAllRelatedItems);

  useEffect(() => {
    dispatch(fetchAllRelatedItems());
  }, [dispatch]);


  useEffect(() => {
      setSelectedFilterdItems(AllRelatedItems)
  }, [AllRelatedItems]);


  return (
    <>
      {/* <div className="px-6 py-12 text-center md:px-12 lg:text-left bg-blue-gray-100">
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
      </div> */}

      <StoreFilter ProductItems={AllRelatedItems} updateFilteredArray={handleSelectChange} />


      <div className=" lg:min-h-[50vh] flex  flex-col">
        <ItemCard Items={arrayToPagenation} />
      </div>

      <DynamicPagenation
      itemsPerPageD= {6}
      items={selectedFilterdItems}
      UpdateArrayToPagenation={UpdateArrayToPagenation}
      />

    </>
  );
};

export default ItemsStore;
