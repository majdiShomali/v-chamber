import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem } from "../../actions/category/GetOneItem";
import { fetchRelatedItem } from "../../actions/related/GetRelatedItems";
import { fetchOneRelatedItem } from "../../actions/related/GetOneRelatedItem";
import { updateFavItems } from "../../actions/related/FavoriteItems";
import { UserContext } from "../../context/userContext";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";
import Swal from "sweetalert2";
import ProductPageSkeleton from "../../components/Skeleton/ProductPageSkeleton";
import CardRating from "../../components/cards/CardRating";
import { Link } from "react-router-dom";


const ProductPage = () => {
  // const ApiUrl = process.env.REACT_APP_API_URL;
  // const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const { id,relatedId } = useParams();
 

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchRelatedItem(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (relatedId !== undefined && relatedId !=="0") {
      dispatch(fetchOneRelatedItem(relatedId));
    }else if(relatedId !== undefined && relatedId ==="0"){
      setSelectedProduct(AllRelatedItemData[0])
      setSelectedImage(AllRelatedItemData[0]?.image)
    }
  }, [dispatch, relatedId,AllRelatedItemData]);


  const [selectedImage , setSelectedImage]=useState("")

  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [allIdsInCart, setItemsAllIdsInCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});

useEffect(()=>{
if(OneRelatedItemData?.image){
  setSelectedProduct(OneRelatedItemData)
  setSelectedImage(OneRelatedItemData?.image)
  setItemsAllIdsInCart(JSON.parse(localStorage.getItem('items')))
}

},[OneRelatedItemData])

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
      dispatch(fetchItemsCart(allCardsIds));
      setItemsAllIdsInCart(allCardsIds);
      localStorage.setItem("items", JSON.stringify(allCardsIds));
      const updatedItems = storedItemsQ.filter((item) => item._id !== card._id);
      localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
    } else {
      const allCardsIds = [...storedItems, card._id];
      dispatch(fetchItemsCart(allCardsIds));
      setItemsAllIdsInCart(allCardsIds);
      localStorage.setItem("items", JSON.stringify(allCardsIds));

      const allCards = [
        ...(Array.isArray(storedItemsQ) ? storedItemsQ : []),
        { ...card, quantity: 1 },
      ];
      localStorage.setItem("itemsQ", JSON.stringify(allCards));
    }
  };

  const handleFAv = async (card) => {
    let UsersIdFavorite = [...(card.UsersIdFavorite || [])];
    const indexToRemove = UsersIdFavorite.indexOf(user._id);
    if (indexToRemove !== -1) {
      UsersIdFavorite.splice(indexToRemove, 1);
      showSuccessAlert("removed from favorites");
    } else {
      UsersIdFavorite.push(user._id);
      showSuccessAlert("added to favorites");
    }
    try {
      const UpdatedData = {
        UsersIdFavorite: UsersIdFavorite,
        CardId: card._id,
        UserId: user._id,
      };

        dispatch(updateFavItems(UpdatedData)).then(() => {
        dispatch(fetchOneItem(id));
      });
    } catch (error) {}
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
    {isItemLoading ? 
    <ProductPageSkeleton/>
    :
    
    <div className="bg-gray-100 py-8 min-h-[90vh] flex items-center justify-center flex-col lg:flex-row">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap items-center mb-5">
                <li className="mr-6">
                  <Link to="/"
                    className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
                    
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
                  <Link to="/Store"
                    className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
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
                  <Link to="/"
                    className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                  >
                    {selectedProduct?.Name}
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
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                {selectedProduct?.totalQuantity !==0 ?  <>
                
                  {allIdsInCart?.includes(selectedProduct?._id) ? (
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                  )}
                </>: <>
                <div className="w-full bg-red-400 text-center text-white py-2 px-4 rounded-full font-bold ">
                              OUT OF STOCK
                            </div>
                
                </>}
     
                </div>
                <div className="w-1/2 px-2">
                  {localStorage.auth !== undefined ?
                  <>
                  {selectedProduct?.UsersIdFavorite?.indexOf(user?._id) !== -1 ? (
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
                  :null}
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">{selectedProduct?.Name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt.
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600">${selectedProduct?.price}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Availability:</span>
                  <span className="text-gray-600">In Stock</span>
                </div>
              </div>
              {selectedProduct?.color ? 
              
              <>
              <div className="mb-4">
                  <span className="font-bold text-gray-700">Select by Color:</span>
              <div className="flex items-center mt-2">
                    {AllRelatedItemData?.map((product)=>{
                      return(
                        <button
                        key={product?._id}
                        onClick={()=>{
                          setSelectedProduct(product)
                          setSelectedImage(product.image)}}
                        className="w-5 h-5  m-1 rounded-full" style={{ backgroundColor: product.color }} />
                      )
                    })}
                     
               
              </div>
              </div>
              </>
              :
              null
            }
       
       {  selectedProduct?.size ?
              <>
              <div className="mb-4 flex flex-col">
                <span className="font-bold text-gray-700">Select by Size:</span>
                <div className="flex items-center mt-2">
                      {AllRelatedItemData?.map((product) =>{
                        return(
                          <button 
                          key={product.image}
                          onClick={()=>
                           { setSelectedProduct(product)
                            setSelectedImage(product.image)}
                          }
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                          {product.size}
                        </button> 
                        )
                      })}         
                                         
                </div>
              </div>
              </>
              :null}

                {selectedProduct?.vapePuff ? (
                  <>
                    <div className="mb-4">
                      <span className="font-bold text-gray-700">
                        Select by Vape Puff:
                      </span>
                      <div className="flex items-center mt-2">
                      {AllRelatedItemData?.map((product) =>{
                        return(
                          <button
                          key={product.image}
                          onClick={() =>   { setSelectedProduct(product)
                            setSelectedImage(product.image)}}
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
                        >
                          {product.vapePuff}
                        </button>
                        )})}
                                              
                      </div>
                    </div>
                  </>
                ) : null}

              <div>
                <span className="font-bold text-gray-700">
                  Product Description:
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  {selectedProduct?.description}
                </p>
              </div>
              {localStorage.auth  ? 


              <CardRating
              Item={selectedProduct}
              CardId={relatedId}
              UserId={user?._id}
              />
              :
              null
              }
              
            </div>
          </div>
        </div>
      </div>
    
    }
      
    </>
  );
};

export default ProductPage;
