import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliverdOrders } from '../../../actions/orders/GetDeliverdOrders' 
import Icon from "@mdi/react";
import { mdiCloudPrintOutline, mdiDelete } from "@mdi/js";
// import Pagination from "@mui/material/Pagination";
// import {fetchOrder}  from "../../../actions/orders/GetOrder"
import { mdiCarOutline } from '@mdi/js';
import DynamicPagenation from "../../../components/pagenation/DynamicPagenation";

import { useNavigate } from 'react-router-dom';
import TimeFilter from '../components/inputs/ordersFilters/TimeFilter';
import DynamicSearch from '../../../components/search/DynamicSearch';
const ProviderDeliveredOrders = () => {

 const navigate =useNavigate()
    const dispatch =useDispatch();

    const {
       // loading: isOrdersLoading,
       data: DeliverdOrdersData,
       // error: fetchAllOrdersError,
     } = useSelector((state) => state.fetchDeliverdOrders);
   
     useEffect(() =>{
      dispatch(fetchDeliverdOrders())
     },[dispatch])



const [currentTimeSelectedData, setCurrentTimeSelectedData] = useState([]);
useEffect(() =>{
  setCurrentTimeSelectedData(DeliverdOrdersData)
},[DeliverdOrdersData])



const handleCurrentTimeSelected = (time) => {
  setCurrentTimeSelectedData(time);
};

const handleUpdate = (order) =>{
navigate(`/PdfTest/${order._id}`)
}
const handleBill = (orderId) =>{
  navigate(`/UserPdfBill/${orderId}`)     
  }

  const [arrayToPagenation, setArrayToPagenation] = useState([]);
  
  const UpdateArrayToPagenation = (value) => {
    setArrayToPagenation(value)
  }

  const handleCurrentSearch = (search) => {
    setArrayToPagenation(search)
  };

  return (
    <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(50vh)]   ">
    <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Done orders
      </div>
    </div>

    <div className='flex items-center w-full justify-between'>
      <div className="relative w-full ">
 <      DynamicSearch onSelectChange={handleCurrentSearch} SearchedArray={DeliverdOrdersData}/>
      </div>
      <TimeFilter  onSelectChange={handleCurrentTimeSelected} DeliverdOrdersData={DeliverdOrdersData}/>
    </div>

    <div className="mt-8 overflow-x-scroll xl:overflow-hidden ">
      <table role="table" className="w-full">
        <thead>
          <tr role="row">
            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">NAME</p>
            </th>
            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">email</p>
            </th>
            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">phone</p>
            </th>
            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">amount</p>
            </th>


            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">Start Drive</p>
            </th>

            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">Show Bill</p>
            </th>
          </tr>
        </thead>
        <tbody>
        {arrayToPagenation?.map((e) => {
          return (
            
              <tr
              key={e._id}
              role="row">
                <td
                  className="pt-[21px] pb-[18px] sm:text-[14px] flex items-center"
                  role="cell"
                >
                  <div className="h-[30px] w-[30px] rounded-full">
                    <img
                      src={`http://localhost:5000/${e.img}`}
                      className="h-full w-full rounded-full"
                      alt=""
                    />
                  </div>

                  <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                    {e.cardholder}
                  </p>
                </td>
                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full text-xl">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {e.phone}
                  </p>
                </td>
                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {e.amount}$ usd
                  </p>
                </td>
            

                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <button
                    // onClick={() => handleUpdate(e)}
                  >
                   
                  <Icon  color="blue" path={mdiCarOutline} size={1.5} />

                  </button>
                </td>

                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <button
                  onClick={() => handleBill(e._id)}
                  >
                    
                    <Icon color="green" path={mdiCloudPrintOutline} size={1.5} />
                  </button>
                </td>
              </tr>
           
          );
        })}
         </tbody>
      </table>


      <DynamicPagenation
      itemsPerPageD= {3}
      items={currentTimeSelectedData}
      UpdateArrayToPagenation={UpdateArrayToPagenation}
      />









      {/* <div className="flex w-full justify-center mt-5">
        {
          <Pagination
            count={totalPagesUsers}
            page={currentPageUsers}
            onChange={handlePageChangeUsers}
          />
        }
      </div> */}
    </div>
  </div>
  )
}

export default ProviderDeliveredOrders