import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedItem } from "../../actions/related/GetRelatedItems";
import { fetchOneRelatedItem } from "../../actions/related/GetOneRelatedItem";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import ProductPageSkeleton from "../../components/Skeleton/ProductPageSkeleton";
import CardRating from "../../components/cards/CardRating";
import { fetchCustomizedItems } from "../../actions/related/GetCustomizedProducts";
import { CartContext } from "../../context/cartContext";
import ProductPageSneek from "./components/ProductPageSneek";

const ProductPage = () => {
  const { cartNavRefresh, setCartNavRefresh } = useContext(CartContext);

  // const ApiUrl = process.env.REACT_APP_API_URL;
  // const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const { id, relatedId } = useParams();

  const {
    loading: isItemLoading,
    data: AllRelatedItemData,
    // error: fetchAllRelatedItemError,
  } = useSelector((state) => state.fetchRelatedItems);

  const {
    loading: isOneRelatedItemLoading,
    data: OneRelatedItemData,
    // error: fetchOneRelatedItemError,
  } = useSelector((state) => state.fetchOneRelatedItem);

  // const {
  //   loading: isProductStikersLoading,
  //   data: ProductStikersData,
  //   // error: fetchProductStikersError,
  // } = useSelector((state) => state.fetchProductStikers);

  const {
    loading: isCustomizedItemsLoading,
    data:  CustomizedItemsData,
    // error: fetchCustomizedItemsError,
  } = useSelector((state) => state.fetchCustomizedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchRelatedItem(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (relatedId !== undefined && relatedId !== "0") {
      dispatch(fetchOneRelatedItem(relatedId));
    } else if (relatedId !== undefined && relatedId === "0") {
      setSelectedProduct(AllRelatedItemData[0]);
      setSelectedImage(AllRelatedItemData[0]?.image);
    }
  }, [dispatch, relatedId, AllRelatedItemData]);

  const [selectedImage, setSelectedImage] = useState("");

  const { user } = useContext(UserContext);
  const [allIdsInCart, setItemsAllIdsInCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if (OneRelatedItemData?.image) {
      setSelectedProduct(OneRelatedItemData);
      setSelectedImage(OneRelatedItemData?.image);
      setItemsAllIdsInCart(JSON.parse(localStorage.getItem("items")));
    }
  }, [OneRelatedItemData]);

  useEffect(() => {
    if (selectedProduct?._id && selectedProduct ) {
      const data={
        id:selectedProduct?._id,
        customizedToId:selectedProduct?.customizedToId} 
        dispatch(fetchCustomizedItems(data))
    }
  }, [selectedProduct]);



  // useEffect(() => {
  //   if (selectedProduct._id) {
  //     dispatch(fetchProductStikers(selectedProduct._id));
  //   }
  // }, [dispatch, selectedProduct]);

  // useEffect(() => {
  //   if (ProductStikersData.length > 0 && selectedProduct) {
  //     setSelectedProductSticker({ ...selectedProduct });
  //     setProductStikersDataState([selectedProduct, ...ProductStikersData]);
  //   } else if (ProductStikersData.length === 0 && selectedProduct) {
  //     setSelectedProductSticker({ ...selectedProduct });
  //     setProductStikersDataState([{ ...selectedProduct }]);
  //   }
  // }, [ProductStikersData, selectedProduct]);

  // const updateSelectedProductSticker = (value) => {
  //   setSelectedProductSticker(value);
  // };

  const handleAddToCart = (card) => {
    const storedItems = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    const storedItemsQ = localStorage.getItem("itemsQ")
      ? JSON.parse(localStorage.getItem("itemsQ"))
      : [];
    const existingCard = storedItems.includes(card._id);
    if (existingCard) {
      const allCardsIds = storedItems.filter((itemId) => {
        return itemId !== card._id;
      });
      // dispatch(fetchItemsCart(allCardsIds));
      setItemsAllIdsInCart(allCardsIds);
      localStorage.setItem("items", JSON.stringify(allCardsIds));
      const updatedItems = storedItemsQ.filter((item) => item._id !== card._id);

      const totalQuantity = updatedItems.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      setCartNavRefresh(totalQuantity);
      localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
    } else {
      const allCardsIds = [...storedItems, card._id];
      // dispatch(fetchItemsCart(allCardsIds));
      setItemsAllIdsInCart(allCardsIds);
      localStorage.setItem("items", JSON.stringify(allCardsIds));

      const allCards = [
        ...(Array.isArray(storedItemsQ) ? storedItemsQ : []),
        { ...card, quantity: 1 },
      ];

      const totalQuantity = allCards.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      setCartNavRefresh(totalQuantity);
      localStorage.setItem("itemsQ", JSON.stringify(allCards));
    }
  };

  const [localFavId,setLocalId]=useState([])
  const handleFAv = async (card) => {
    const UsersIdFavorite = JSON.parse(localStorage.getItem("itemsIdFav")) || [];
    const UsersFavorite = JSON.parse(localStorage.getItem("itemsFav")) || [];
    const indexToRemove = UsersIdFavorite.indexOf(card._id);

    if (indexToRemove !== -1) {
      UsersIdFavorite.splice(indexToRemove, 1);
      UsersFavorite.splice(indexToRemove, 1);
      showSuccessAlert("removed from favorites");
    } else {
      UsersIdFavorite.push(card._id);
      UsersFavorite.push(card);
      showSuccessAlert("added to favorites");
    }
    setLocalId(UsersIdFavorite)
    localStorage.setItem("itemsIdFav", JSON.stringify(UsersIdFavorite));
    localStorage.setItem("itemsFav", JSON.stringify(UsersFavorite));
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };

  return (
    <>
{ isItemLoading && isOneRelatedItemLoading   ? 

<ProductPageSkeleton/>

:
<>
<div className="bg-gray-100 py-8 min-h-[90vh] flex items-center justify-center flex-col lg:flex-row">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


<ProductPageSneek
selectedProduct={selectedProduct}
/>


  <div className="flex flex-col md:flex-row -mx-4">
    <div className="md:flex-1 px-4">


      
      <div className=" relative rounded-lg bg-gray-500 mb-4 w-96 h-96">
                 
 

  <img className="w-full h-full"
  alt="aa"
  src={`${ImagesUrl}/${selectedProduct.image}`}
  />
    
  

  

      {/* <div className="absolute top-3 right-3">
        {localStorage.auth && user?._id && selectedProduct?._id ? (
          <CardRating
            Item={selectedProduct}
            CardId={selectedProduct?._id}
            UserId={user?._id}
          />
        ) : null}
      </div>
       */}
    </div>
      

   
    
    </div>
    <div className="md:flex-1 px-4">
      <h2 className="text-2xl font-bold mb-2">
        {selectedProduct?.Name}
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        sed ante justo. Integer euismod libero id mauris malesuada
        tincidunt.
      </p>
      <div className="flex mb-4">
        <div className="mr-4">
          <span className="font-bold text-gray-700">Price:</span>
          <span className="text-gray-600">
            ${selectedProduct?.salePrice}
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-700">
            Availability:
          </span>
          <span className="text-gray-600">In Stock</span>
        </div>
      </div>


      <div>
        <span className="font-bold text-gray-700">
          Product Description:
        </span>
        <p className="text-gray-600 text-sm mt-2">
          {selectedProduct?.description}
        </p>
      </div>





      <span className="font-bold text-gray-700">
              Related Products
            </span>

<div className="w-full flex flex-wrap  items-center ">

{selectedProduct?.image ? (
        <>
          <div className="mt-5">
           
            <div className="flex flex-wrap items-center mt-2">
              {CustomizedItemsData?.map((product) => {
                return (
                  <img
                    src={`${ImagesUrl}/${product.image}`}
                    alt={product.image}
                    className="w-20 mx-3 h-20 rounded-full shadow-md object-cover hover:scale-105 cursor-pointer "
                    onClick={() => {
                      // setProductStikersDataState([product])
                      setSelectedProduct(product);
                      // setSelectedImage(product.image);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : null}
</div>











  <div className="flex -mx-2 my-10">
        <div className="w-1/2 px-2">
          {selectedProduct?.totalQuantity !== 0 ? (
            <>
              {allIdsInCart?.includes(selectedProduct?._id) ? (
                <button
                  onClick={() =>
                    handleAddToCart(selectedProduct)
                  }
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAddToCart(selectedProduct)
                  }
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              )}
            </>
          ) : (
            <>
              <div className="w-full bg-red-400 text-center text-white py-2 px-4 rounded-full font-bold ">
                OUT OF STOCK
              </div>
            </>
          )}
        </div>
        <div className="w-1/2 px-2">
          {localStorage.auth !== undefined ? (
            <>
              { localFavId?.indexOf( selectedProduct?._id)
               !== -1
        
              ? (
                <button
                  onClick={() => handleFAv(selectedProduct)}
                  className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
                >
                  remove from Wishlist
                </button>
              ) : (
                <button
                  onClick={() => handleFAv(selectedProduct)}
                  className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
                >
                  Add to Wishlist
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>


    </div>
  </div>
</div>
</div>
</>

}


    

   

  


     

    </>
  );
};

export default ProductPage;
