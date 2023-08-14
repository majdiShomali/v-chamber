import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem } from "../../actions/category/GetOneItem";
import { fetchRelatedItem } from "../../actions/related/GetRelatedItems";
import { fetchCategoryItems } from "../../actions/category/GetCategoryItems";
// import Swal from "sweetalert2";
// import ProductPageSkeleton from "../../components/Skeleton/ProductPageSkeleton";
import { Link } from "react-router-dom";
// import AddRelatedItem from "./AddRelatedItem";
// import ItemCard from "../../components/cards/ItemCard"

// import AddVapePuff from "./productsAdd/AddVapePuff";
// import AddChargeVape from "./productsAdd/AddChargeVape";
import AddJuice from "./productsAdd/AddJuice";
// import CategoryCard from "../../components/cards/CategoryCard";
import CategoryEditSection from "./components/CategoryEditSection";
const ProductPageProvider = () => {
  // const ApiUrl = process.env.REACT_APP_API_URL;
  // const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const { id } = useParams();

  const {
    loading: isRelatedItemLoading,
    data: RelatedItemData,
    // error: fetchRelatedItemError,
  } = useSelector((state) => state.fetchRelatedItems);

  const {
    loading: isItemLoading,
    data: ItemData,
    // error: fetchItemError,
  } = useSelector((state) => state.fetchOneItem);
  const {
    loading: isCategoriesLoading,
    // data: CategoriesData,
    // error: fetchItemError,
  } = useSelector((state) => state.fetchCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchRelatedItem(id));
      dispatch(fetchOneItem(id));
      dispatch(fetchCategoryItems());
    }
  }, [dispatch, id]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if (ItemData?.image) {
      setSelectedProduct(ItemData);
      setSelectedImage(ItemData?.image);
    }
    if (RelatedItemData?.length > 0) {
      setSelectedProduct(RelatedItemData[0]);
      setSelectedImage(RelatedItemData[0]?.image);
    }
  }, [RelatedItemData, ItemData]);

  return (
    <>








      {isRelatedItemLoading && isCategoriesLoading && isItemLoading ? (
        // <ProductPageSkeleton />
        <>
        loading...
        </>
      ) : (
<> 
        <div className="bg-gray-100 py-8 min-h-[50vh] w-full ">
        <CategoryEditSection
        ItemData={ItemData}
        />
        </div>



        <div className="bg-gray-100 py-8 min-h-[90vh] w-full flex items-center justify-center flex-col lg:flex-row">
      
          <div className="max-w-6xl  px-4 sm:px-6 lg:px-8">
          
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
                      {ItemData?.Name}
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
                    alt="ProductImage"
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                {/* {ItemData?.category === CategoriesData[0]?.category ? (
                  <AddVapePuff item={ItemData} />
                ) : ItemData?.category === CategoriesData[1]?.category? (
                  <AddChargeVape item={ItemData} />
                ) : ItemData?.category === CategoriesData[2]?.category ? (
                  <AddJuice item={ItemData} />
                ) : null} */}
                  <AddJuice item={ItemData} />

                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct?.Name}
                </h2>

                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700">Price:</span>
                    <span className="text-gray-600">
                      ${selectedProduct?.price}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">
                      Availability:
                    </span>
                    <span className="text-gray-600">
                      In Stock : {selectedProduct?.totalQuantity}
                    </span>
                  </div>
                </div>

                {RelatedItemData[0]?.color ? (
                  <>
                    <div className="mb-4">
                      <span className="font-bold text-gray-700">
                        Select Color:
                      </span>
                      <div className="flex items-center mt-2">
                        {RelatedItemData?.map((item) => {
                          return (
                            <button
                              key={item._id}
                              onClick={() => {
                                setSelectedImage(item.image);
                                setSelectedProduct(item);
                              }}
                              className="w-5 h-5  m-1 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}

                {RelatedItemData[0]?.vapePuff ? (
                  <>
                    <div className="mb-4">
                      <span className="font-bold text-gray-700">
                        Select Vape Puff:
                      </span>
                      <div className="flex items-center mt-2">
                        {RelatedItemData?.map((item) => {
                          return (
                            <button
                              key={item.image}
                              onClick={() => {
                                setSelectedImage(item.image);
                                setSelectedProduct(item);
                              }}
                              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
                            >
                              {item.vapePuff}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}

                {RelatedItemData[0]?.size ? (
                  <div className="mb-4">
                    <span className="font-bold text-gray-700">
                      Select Size:
                    </span>
                    <div className="flex items-center mt-2">
                      {RelatedItemData?.map((item) => {
                        return (
                          <button
                            key={item.image}
                            onClick={() => {
                              setSelectedImage(item.image);
                              setSelectedProduct(item);
                            }}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
                          >
                            {item.size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <div>
                  <span className="font-bold text-gray-700">
                    Product Description:
                  </span>
                  <p className="text-gray-600 text-sm mt-2">
                    {selectedProduct?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}


    </>
  );
};

export default ProductPageProvider;
