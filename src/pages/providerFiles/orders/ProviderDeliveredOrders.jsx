import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliverdOrders } from '../../../actions/orders/GetDeliverdOrders' 
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import {fetchOrder}  from "../../../actions/orders/GetOrder"
import { mdiCarOutline } from '@mdi/js';

import { useNavigate } from 'react-router-dom';

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


//-----------------------search------------------------//


// const [persons, setPersons] = useState([]);
// const [FilterDataUsers, setFilterDataUsers] = useState([]);




// const filterDataByNameUsers = (searchTermUsers) => {
//   const filteredDataUsers = persons.filter((item) =>
//     item.firstName.toLowerCase().includes(searchTermUsers.toLowerCase())
//   );
//   setFilterDataUsers(filteredDataUsers);
//   console.log(filteredDataUsers);
//   setCurrentPageUsers(1);
// };

const [currentPageUsers, setCurrentPageUsers] = useState(1);
let totalItemsUsers;

let totalPagesUsers;

let slicedArrayUsers;

const itemsPerPage = 2;

totalItemsUsers = DeliverdOrdersData.length;

totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;

const endIndexUsers = startIndexUsers + itemsPerPage;

slicedArrayUsers = DeliverdOrdersData.slice(startIndexUsers, endIndexUsers);

const handlePageChangeUsers = (event, pageNumber) => {
  setCurrentPageUsers(pageNumber);
};



const handleUpdate = (order) =>{
navigate(`/PdfTest/${order._id}`)

}


  return (
    <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(50vh)]   ">
    <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Done orders
      </div>
    </div>

    <form>
      <div className="relative mt-5">
        <input
          type="text"
          id="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required=""
          // value={searchTermUsers}
          // onChange={(e) => {
          //   setSearchTermUsers(e.target.value);
          //   filterDataByNameUsers(e.target.value);
          // }}
        />
      </div>
    </form>

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
              <p className="text-xs tracking-wide text-gray-600">DELETE</p>
            </th>
          </tr>
        </thead>

        {slicedArrayUsers?.map((e) => {
          return (
            <tbody
            key={e._id}
            role="rowgroup">
              <tr role="row">
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
                    onClick={() => handleUpdate(e)}
                  >
                   
                  <Icon  color="blue" path={mdiCarOutline} size={1.5} />

                  </button>
                </td>

                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <button
                  //   onClick={() => handleDelete(e._id, e.firstName)}
                  >
                    <Icon color="red" path={mdiDelete} size={1} />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div className="flex w-full justify-center mt-5">
        {
          <Pagination
            count={totalPagesUsers}
            page={currentPageUsers}
            onChange={handlePageChangeUsers}
          />
        }
      </div>
    </div>
  </div>
  )
}

export default ProviderDeliveredOrders