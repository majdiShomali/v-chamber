import React, { useContext, useEffect } from 'react'
import { mdiCarConnected, mdiDelete ,mdiCloudPrintOutline, mdiEyeOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from 'react-router-dom';
import {fetchUserOrdersStarted} from "../../../actions/orders/userOrders/GetUserOrdersStarted"
const UserStartedOrders = () => {
  const { user } = useContext(UserContext);

  const {
    // loading: isUserStartedOrdersDataLoading,
    data: UserStartedOrdersData,
    // error: fetchUserStartedOrdersError,
  } = useSelector((state) => state.fetchUserOrdersStarted);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.email !== undefined) {
      dispatch(fetchUserOrdersStarted(user?.email));
    }
  }, [dispatch,user]);

  const navigate =useNavigate()
  const handleUpdate = (orderId) =>{
    navigate(`/UserPdfBill/${orderId}`)     
    }
  return (
    <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(50vh)]   ">
    <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Pending Orders
      </div>
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
              <p className="text-xs tracking-wide text-gray-600">downlaod bill</p>
            </th>

            <th
              colSpan={1}
              role="columnheader"
              title="Toggle SortBy"
              className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
              style={{ cursor: "pointer" }}
            >
              <p className="text-xs tracking-wide text-gray-600">Show order</p>
            </th>
          </tr>
        </thead>

       
            <tbody
            
           >
               {UserStartedOrdersData?.map((e) => {
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
                    onClick={() => handleUpdate(e._id)}
                  >
                   
                  <Icon  color="blue" path={mdiCloudPrintOutline} size={1.5} />

                  </button>
                </td>

                <td
                  className="pt-[14px] pb-[18px] sm:text-[14px]"
                  role="cell"
                >
                  <button
                  //   onClick={() => handleDelete(e._id, e.firstName)}
                  >
                    <Icon color="green" path={mdiEyeOutline} size={1.5} />
                  </button>
                </td>
              </tr>
                 );
                })}
            </tbody>
       
      </table>
{/* 
      <div className="flex w-full justify-center mt-5">
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

export default UserStartedOrders