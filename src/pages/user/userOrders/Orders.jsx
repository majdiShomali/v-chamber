
import React, { useContext, useEffect, useState } from 'react'
import UserPendingOrders from './UserPendingOrders'
import UserStartedOrders from './UserStartedOrders'
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/userContext";
import {fetchUserOrdersPending} from "../../../actions/orders/userOrders/GetUserOrdersPending"
import {fetchUserOrdersStarted} from "../../../actions/orders/userOrders/GetUserOrdersStarted"
import {fetchUserOrdersDone} from "../../../actions/orders/userOrders/GetUserOrdersDone"

import TrakingBar from "./TrackingBar";

const Orders = () => {
  const ImagesUrl= process.env.REACT_APP_IMAGES_URL

  const { user } = useContext(UserContext);
  const {
    // loading: isOneRelatedItemLoading,
    data: UserPendingOrdersData,
    // error: fetchOneRelatedItemError,
  } = useSelector((state) => state.fetchUserOrdersPending);

  const {
    // loading: isUserStartedOrdersDataLoading,
    data: UserStartedOrdersData,
    // error: fetchUserStartedOrdersError,
  } = useSelector((state) => state.fetchUserOrdersStarted);

  const {
    // loading: isUserDoneOrdersDataLoading,
    data: UserDoneOrdersData,
    // error: fetchUserDoneOrdersError,
  } = useSelector((state) => state.fetchUserOrdersDone);

// console.log(UserPendingOrdersData)
console.log(UserStartedOrdersData)
// console.log(UserDoneOrdersData)
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email !== undefined) {
      dispatch(fetchUserOrdersPending(user?.email));
      dispatch(fetchUserOrdersStarted(user?.email));
      dispatch(fetchUserOrdersDone(user?.email));
    }
  }, [dispatch,user]);



  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="flex flex-col w-full ">
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
          <h4 className="text-xl text-gray-900 font-bold">Orders</h4>
          <div className="m-5">
      

<TrakingBar
 UserPendingOrdersData={UserPendingOrdersData}
  UserStartedOrdersData={UserStartedOrdersData} 
  UserDoneOrdersData={UserDoneOrdersData}
  />

 


          </div>
          {/* <div className="mt-4">
            <canvas
              id="verticalBarChart"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: 414,
                width: 828,
              }}
              width={1656}
              height={828}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
