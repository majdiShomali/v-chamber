import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem } from "../../actions/GetOneItem";
import { updateFavItems } from "../../actions/FavoriteItems";
import { UserContext } from "../../context/userContext";
import { fetchItemsCart } from "../../actions/GetItemsCart";
import Swal from "sweetalert2";
import ProductPageSkeleton from "../../components/Skeleton/ProductPageSkeleton";
import AddColor from "./AddColor";
import { Link } from "react-router-dom";
import AddSize from "./AddSize";
import AddAccessory from "./AddAccessory";
const ProductPageProvider = () => {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const { id } = useParams();
  const [item, setItem] = useState();
  const {
    loading: isItemLoading,
    data: itemData,
    error: fetchItemError,
  } = useSelector((state) => state.fetchOneItem);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchOneItem(id));
    }
  }, [dispatch, id]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setItem(itemData);
    setSelectedImage(itemData.image);
  }, [itemData]);

  //   const showSuccessAlert = (message) => {
  //     Swal.fire({
  //       title: message,
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     }).then(() => {});
  //   };

  return (
    <>
      {isItemLoading ? (
        <ProductPageSkeleton />
      ) : (
        <div className="bg-gray-100 py-8 min-h-[90vh] flex items-center justify-center flex-col lg:flex-row">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <ul className="flex flex-wrap items-center mb-5">
                  <li className="mr-6">
                    <Link
                      className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
                      to="/"
                    >
                      <span>Home</span>
                      <svg
                        className="ml-6"
                        width={4}
                        height={7}
                        viewBox="0 0 4 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
                      to="/Store"
                    >
                      <span>Store</span>
                      <svg
                        className="ml-6"
                        width={4}
                        height={7}
                        viewBox="0 0 4 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      to="/"
                    >
                      {item?.Name}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={`${ImagesUrl}/${selectedImage}`}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold mb-2">{item?.Name}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt.
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700">Price:</span>
                    <span className="text-gray-600">${item?.price}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">
                      Availability:
                    </span>
                    <span className="text-gray-600">In Stock</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-gray-700">Select Color:</span>
                  <div className="flex items-center mt-2">
                    
                    {item?.accessories?.map((item) => {
                      return (
                        <button
                          key={item.image}
                          onClick={() => setSelectedImage(item.image)}
                          className="w-5 h-5  m-1 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      );
                    })}

                    {/* <AddColor item={item} /> */}
                    <AddAccessory item={item}/>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-gray-700">Select Size:</span>
                  <div className="flex items-center mt-2">
                    {item?.accessories?.map((item) => {
                      return (
                        <button
                          key={item.image}
                          onClick={() => setSelectedImage(item.image)}
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
                        >
                          {item.size}
                        </button>
                      );
                    })}

                    {/* <AddSize item={item} /> */}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-700">
                    Product Description:
                  </span>
                  <p className="text-gray-600 text-sm mt-2">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPageProvider;
