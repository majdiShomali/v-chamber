import ItemCard from "../../../../../components/cards/ItemCard";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedItems } from "../../../../../actions/related/GetAllRelatedItems";
// import { Card } from "@material-tailwind/react";
// import Pagination from "@mui/material/Pagination";
import StoreFilter from "../../../../../components/filters/StoreFilter";
import DynamicPagenation from "../../../../../components/pagenation/DynamicPagenation";
import ItemCardSkelaton from "../../../../../components/cards/ItemCardSkelaton";
import CardsToLink from "../components/CardsToLink";
import Icon from "@mdi/react";
import { mdiLinkBoxVariant } from "@mdi/js";
import axios from "axios";

const itemsPerPage = 20;
const AllProductsProvider = () => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  const ApiUrl = process.env.REACT_APP_API_URL;

  const [selectedFilterdItems, setSelectedFilterdItems] = useState([]);
  const [arrayToPagenation, setArrayToPagenation] = useState([]);
  const handleSelectChange = (value) => {
    setSelectedFilterdItems(value);
  };

  const UpdateArrayToPagenation = (value) => {
    setArrayToPagenation(value);
  };

  // const dispatch = useDispatch();

  // const {
  //   loading: isAllRelatedItemsLoading,
  //   data: AllRelatedItems,
  //   // error: fetchAllRelatedItemsError,
  // } = useSelector((state) => state.fetchAllRelatedItems);

  // useEffect(() => {
  //   const data ={
  //     itemsPerPage:"6",
  //     CurrentPage:"1"
  //   }
  //   dispatch(fetchAllRelatedItems(data));
  // }, [dispatch]);

  // useEffect(() => {
  //   setSelectedFilterdItems(AllRelatedItems);
  //   console.log(AllRelatedItems)
  // }, [AllRelatedItems]);

  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);

  const handleLink = async (item) => {
    let item2;
    if (!selectedItem1 && !selectedItem2) {
      setSelectedItem1(item);
      return false;
    }

    if (selectedItem1 && !selectedItem2) {
      setSelectedItem2(item);
      item2 = item;
      try {
        const linkedProductsItem1 = selectedItem1?.linkedProducts
          ? [...selectedItem1?.linkedProducts, item2._id]
          : [item2._id];

        const linkedProductsItem2 = item2?.linkedProducts
          ? [...item2?.linkedProducts, selectedItem1._id]
          : [selectedItem1._id];
        const response = await axios.put(
          `${ApiUrl}/LinkProduct/${selectedItem1._id}/${item2._id}`,
          {
            linkedProductsItem1: linkedProductsItem1,
            linkedProductsItem2: linkedProductsItem2,
          }
        );
        console.log(response.data);
        getLinked(selectedItem1._id);
        setSelectedItem1(null);
        setSelectedItem2(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [LinkedItems, setLinkedItems] = useState([]);

  const getLinked = async (id) => {
    try {
      const response = await axios.get(`${ApiUrl}/getLinkProduct/${id}`);
      setLinkedItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [CurrentPage, setCurrentPage] = useState(0);
  const [CurrentPageNum, setCurrentPageNum] = useState(0);

  const UpdateCurrentPage = (value) => {
    setCurrentPage(value);
  };
  const UpdateCurrentPageNum = (value) => {
    setCurrentPageNum(value);
  };

  return (
    <>
      <StoreFilter
        updateFilteredArray={handleSelectChange}
        CurrentPage={CurrentPage}
        UpdateCurrentPageNum={UpdateCurrentPageNum}
        itemsPerPage={itemsPerPage}
      />

      <div className=" lg:min-h-[50vh] flex  flex-col">
        {/* <CardsToLink Items={arrayToPagenation} /> */}

        <>
          <div className="w-full flex flex-wrap justify-center">
            {arrayToPagenation.map((item) => {
              return (
                <>
                  `
                  <div className=" relative w-56 mx-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="rounded-t-lg h-48 w-56"
                      src={`${ImagesUrl}/${item?.image}`}
                      alt="product image"
                    />

                    {!item._id.includes(selectedItem1?._id) &&
                    !item.linkedProducts.includes(selectedItem1?._id) ? (
                      <Icon
                        onClick={() => handleLink(item)}
                        color={"blue"}
                        path={mdiLinkBoxVariant}
                        size={1.5}
                        className="absolute top-5 right-5 z-10 hover:scale-110 hover:cursor-pointer"
                      />
                    ) : null}

                    <div className=" pb-5">
                      <h5 className="px-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.Name}
                      </h5>

                      <div className="flex px-2 items-center mt-2.5 mb-5">
                        <svg
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                          {item?.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mx-">
                        {item?.price > item?.salePrice ? (
                          <div className="flex items-center">
                            <span className="text-xl  font-semibold line-through text-gray-500 mr-3">
                              ${item?.price}{" "}
                            </span>
                            <span className="text-xl text-black font-bold">
                              ${item?.salePrice}{" "}
                            </span>
                          </div>
                        ) : (
                          <div className="text-xl text-black font-semibold mt-1">
                            ${item?.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="relative">
                    <img
                      className="w-32 h-32"
                      src={`${ImagesUrl}/${item?.image}`}
                    />
                    {!item._id.includes(selectedItem1?._id) &&
                    !item.linkedProducts.includes(selectedItem1?._id) ? ( 
                      <Icon
                        onClick={() => handleLink(item)}
                        color={"blue"}
                        path={mdiLinkBoxVariant}
                        size={1.5}
                        className="absolute top-5 right-5 z-10 hover:scale-110 hover:cursor-pointer"
                      />
                    ) : null} 
                  </div> */}
                </>
              );
            })}
          </div>
        </>

        {/* <p>{selectedIdToLink}</p> */}
      </div>

      {LinkedItems?.map((product) => {
        return (
          <img className="w-32 h-32" src={`${ImagesUrl}/${product?.image}`} />
        );
      })}

      <DynamicPagenation
        itemsPerPageD={itemsPerPage}
        items={selectedFilterdItems}
        UpdateArrayToPagenation={UpdateArrayToPagenation}
        UpdateCurrentPage={UpdateCurrentPage}
        CurrentPageNum={CurrentPageNum}
      />
    </>
  );
};

export default AllProductsProvider;
