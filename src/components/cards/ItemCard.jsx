import React from "react";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedItems } from "../../actions/related/GetAllRelatedItems";
import { updateFavItems } from "../../actions/related/FavoriteItems";
import { fetchFavItems } from "../../actions/related/FavoriteItems";
import { UserContext } from "../../context/userContext";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Card } from "@material-tailwind/react";
const ItemCard = ({Items}) => {

  const ApiUrl = process.env.REACT_APP_API_URL;
  const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const { user, setUser } = useContext(UserContext);
const [filterItems,setFilterItems]=useState([])
const [allIdsInCart, setItemsAllIdsInCart] = useState([]);
  const {
    loading: isLoading,
    data: itemsData,
    error: fetchError,
  } = useSelector((state) => state.fetchAllRelatedItems);
  const {
    loading: isFavLoading,
    data: itemsFavData,
    error: fetchFavError,
  } = useSelector((state) => state.FavoriteItems);
  const {
    loading: isCartLoading,
    data: itemsCartData,
    error: fetchCartError,
  } = useSelector((state) => state.fetchItemsCart);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRelatedItems());
    if(user){
      dispatch(fetchFavItems(user._id));
    }
  }, [dispatch]);

  useEffect(() => {
  setFilterItems(itemsData)
  
  }, [itemsData]);
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      dispatch(fetchItemsCart(JSON.parse(storedItems)));
      setItemsAllIdsInCart(JSON.parse(storedItems))
    }
  }, []);

  const handleAddToCart = (card) => {
    const storedItems = localStorage.getItem("items")   ? JSON.parse(localStorage.getItem("items"))   :   [];                                          
    const storedItemsQ = localStorage.getItem("itemsQ") ? JSON.parse(localStorage.getItem("itemsQ"))  :   [];                                          
    const existingCard = storedItems.includes(card._id);
    if (existingCard) {
      const allCardsIds = storedItems.filter((itemId) => { return itemId !== card._id});
      dispatch(fetchItemsCart(allCardsIds)) 
      setItemsAllIdsInCart(allCardsIds)
      localStorage.setItem("items", JSON.stringify(allCardsIds));

      const updatedItems = storedItemsQ.filter((item) => item._id !== card._id);
      localStorage.setItem("itemsQ", JSON.stringify(updatedItems));


    } else {
      const allCardsIds = [...storedItems, card._id];
      dispatch(fetchItemsCart(allCardsIds)) 
      setItemsAllIdsInCart(allCardsIds)
      localStorage.setItem("items", JSON.stringify(allCardsIds));


      const allCards = [...(Array.isArray(storedItemsQ) ? storedItemsQ : []), { ...card, quantity: 1 }];
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
        UserId:user._id,
      };

      dispatch(updateFavItems(UpdatedData)).then(() => {
        dispatch(fetchAllRelatedItems());
        dispatch(fetchFavItems(user._id));
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

const navigate =useNavigate();
  const handleShowItem = (item) => {
    console.log(item);
    navigate(`/ProductPage/${item.categoryId}/${item._id}`)
  }
  return (
    <>  
    <div 
    className="w-full flex flex-wrap gap-3 justify-center">   
    {Items?.map((card) => {
            return (
              <Card
                key={card._id}
                className=" cursor-pointer flex flex-col items-center justify-center mx-2 h-96 w-72 mb-5 hover:scale-105"

            >
                <div className="container">
                  <div className=" w-full bg-gray-900  rounded-xl p-6">
                    <div className="flex flex-col ">
                      <div className="">
                        <div className="relative h-56 w-full mb-3">
                          {localStorage.auth !== undefined ? (
                            <>
                              {card.UsersIdFavorite?.indexOf(user?._id) !== -1 ? (
                                <div
                                  className="absolute flex flex-col top-0 right-0 p-3"
                                  onClick={() => handleFAv(card)}
                                >
                                  <button className="transition ease-in duration-300 bg-gray-800  text-purple-500 shadow hover:shadow-md  rounded-full w-8 h-8 text-center p-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="absolute flex flex-col top-0 right-0 p-3"
                                  onClick={() => handleFAv(card)}
                                >
                                  <button className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </>
                          ) : null}

                          <img
                            src={`${ImagesUrl}/${card.image}`}
                            alt="Just a flower"
                            className=" w-full  h-full  object-fill  rounded-2xl "
                          />
                        </div>
                        <div className="flex-auto justify-evenly">
                          <div className="flex flex-wrap ">
                            <div className="w-full flex-none text-sm flex items-center text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-500 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-gray-400 whitespace-nowrap mr-3">
                               {card.rating}
                              </span>
                              <span className="mr-2 text-gray-400">India</span>
                            </div>

                            <div className="flex items-center w-full justify-between min-w-0 ">
                              <h2 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">
                                {card.Name}
                              </h2>
                              {card.totalQuantity !==0 ? 
                                <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                INSTOCK
                              </div>
                              :
                              <div className="flex items-center bg-red-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                              OUT OF STOCK
                            </div>
                              }
                            
                            </div>
                          </div>

                          {card.price > card.salePrice ? 
                          <div className="flex items-center">
                          <span className="text-xl  font-semibold line-through text-gray-500 mr-3">{card.price} $</span>
                          <span className="text-xl text-white font-bold">{card.salePrice} $</span>
                          </div>
                          
                          :
                          <div className="text-xl text-white font-semibold mt-1">
                          {card.price} $
                           </div>                         
                          }
                         
          
                          <div className="flex space-x-2 text-sm font-medium justify-between mt-2">
                          <button
                            onClick={()=>handleShowItem(card)}
                            
                            className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className=""
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>

                          {card.totalQuantity !==0 ? <>
                            { allIdsInCart.includes(card._id)    ? (
                              <button
                                onClick={() => handleAddToCart(card)}
                                className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
                              >
                                <span>remove Cart</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleAddToCart(card)}
                                  className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
                                >
                                  <span>Add Cart</span>
                                </button>
                              </>
                            )}
                          
                          </>: 
                          
                          null
                         }
       
                        
                 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>   
    </>
  )
}

export default ItemCard