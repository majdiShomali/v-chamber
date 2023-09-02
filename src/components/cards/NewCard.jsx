import React from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedItems } from "../../actions/related/GetAllRelatedItems";
import { updateFavItems } from "../../actions/related/FavoriteItems";
import { fetchFavItems } from "../../actions/related/FavoriteItems";
import { UserContext } from "../../context/userContext";

import { fetchItemsCart } from "../../actions/related/GetItemsCart";
import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
AOS.init();
const NewCard = ({Items}) => {
    const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

    const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      dispatch(fetchFavItems(user._id));
    }
  }, [dispatch,user]);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      dispatch(fetchItemsCart(JSON.parse(storedItems)));
      // setItemsAllIdsInCart(JSON.parse(storedItems))
    }
  }, [dispatch]);
  const navigate = useNavigate();
  function ShowVideosMeals(cardId,categoryId) {
    navigate(`/ProductPage/${categoryId}/${cardId}#`);
  }
  return (
    // <div
    //   className="min-h-[40rem] py-3 bg-gray-100 flex flex-col justify-center items-center"
    //   data-aos="fade-down"
    //   data-aos-duration="1000"
    // >
    //   <h2 className=" text-4xl mb-8 tracking-tight font-extrabold text-black  text-center capitalize">
    //     افضل الوصفات
    //   </h2>

      <div className=" w-full flex  flex-wrap gap-5 justify-center items-center">
        {Items?.map((card) => {
          const imgUrl =`${ImagesUrl}/${card?.image}`
          return (
            <div key={card._id} className="relative w-48 h-64 ">
              <div className="bg-white w-48 h-64 shadow-lg absolute right-0 top-0 rotate-6"></div>

              <div className="bg-white w-48 h-64 shadow-lg absolute right-0 top-0 p-5">
                <div className="group h-full w-full ">
                  <img
                    src={imgUrl}
                    alt={card.Name} // Provide a meaningful alt text
                    className="w-full h-full object-cover "
                  />
                  
                  <div className="flex flex-col justify-around items-center group h-full w-full absolute right-0 top-0">
                    <div className="w-full bg-[#b39f3b81] trans text-center py-2 hidden group-hover:block translate-y-4 duration-300 ease-in-out fade-in-button">
                      <div className="flex items-center justify-between w-full px-5">
                       
                      <div className="flex">
                        <svg
                          className="w-4 h-4 text-purple-500 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>

                        <p className=" text-sm font-bold text-black dark:text-white">
                          {card.rating}
                        </p>
                        </div>

                        <div className="text-sm ml-5 font-medium text-black underline hover:no-underline dark:text-white">
                          {card?.UsersIdRate?.length} reviews
                        </div>

                      </div>
                      <h3 className=" text-2xl font-extrabold  ">
                        {card.Name}
                      </h3>

                      <div className="flex justify-center">
                      {card?.price > card?.salePrice ? 
                          <p className="flex items-center  ">
                          <span className="text-md  font-semibold line-through text-black mr-3">{card?.price} $</span>
                          <span className="text-md text-white font-bold">${card?.salePrice}  </span>
                          </p>                      
                          :
                          <p className="text-md text-white font-semibold mt-1">
                          ${card?.price} 
                           </p>                         
                          }
                       </div>


                    </div>
             
                    <Button
                      className="hidden text-md group-hover:block translate-y-4 duration-300 ease-in-out mb-10 border-solid border-purple-500 border-2 bg-purple-500 hover:bg-purple-500 text-[#ffffff] fade-in-button"
                      variant="text"
                      onClick={() => ShowVideosMeals(card._id,card.categoryId)}
                    >
                        View
                </Button>

            
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
       </div>
    // </div>
  );
};

export default NewCard;