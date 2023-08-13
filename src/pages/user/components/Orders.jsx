import OrderCard from "./OrderCard";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem } from "../../../actions/category/GetOneItem";
import { fetchRelatedItem } from "../../../actions/related/GetRelatedItems";
import { fetchOneRelatedItem } from "../../../actions/related/GetOneRelatedItem";
import { updateFavItems } from "../../../actions/related/FavoriteItems";
import { UserContext } from "../../../context/userContext";
import { fetchItemsCart } from "../../../actions/related/GetItemsCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../../../actions/orders/GetUserOrders";

const Orders = () => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  const { user } = useContext(UserContext);

  const {
    loading: isItemLoading,
    data: AllRelatedItemData,
    // error: fetchAllRelatedItemError,
  } = useSelector((state) => state.fetchRelatedItems);
  const {
    // loading: isOneRelatedItemLoading,
    data: OneRelatedItemData,
    // error: fetchOneRelatedItemError,
  } = useSelector((state) => state.fetchOneRelatedItem);

  const {
    // loading: isOneRelatedItemLoading,
    data: UserOrdersData,
    // error: fetchOneRelatedItemError,
  } = useSelector((state) => state.fetchUserOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email !== undefined) {
      dispatch(fetchUserOrders(user?.email));
    }
  }, [dispatch]);

  const [selectedImage, setSelectedImage] = useState("");

  // const { user, setUser } = useContext(UserContext);
  const [allIdsInCart, setItemsAllIdsInCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="flex flex-col w-full ">
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
          <h4 className="text-xl text-gray-900 font-bold">Orders</h4>
          <div className="m-5">
            {/* <ItemCard
          Items={favoriteItems}
                   /> */}
            {UserOrdersData?.map((order) => {
              return <OrderCard key={order._id} Orders={order} />;
            })}
          </div>
          <div className="mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
