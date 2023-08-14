import React, { useState,useEffect } from "react";
import axios from "axios";
// import TotalRating from "./TotalRating";
import Swal from "sweetalert2";

// import { useParams } from "react-router-dom";
// import { UserContext } from "../../context/userContext";


const CardRating = ({Item,CardId,UserId}) => {
    // const { id } = useParams();
    // const { user, setUser } = useContext(UserContext);
    const starCount = 5; // Total number of stars
    const [filledStars, setFilledStars] = useState(0);
    const [RatingStatus, setRatingStatus] = useState(false);
    // const { AllDataGet,setAllDataGet} = useContext(AllContext);
    // const {UserAllData, setUserAllData} = useContext(AllContext);
    //   const { RecipeRatedRefresh, setRecipeRatedRefresh } = useContext(RecipeContext);
    //   const {favRefresh,updateFavRefresh} =useContext(AllContext)
  
  useEffect(()=>{
    if(Item?.UsersIdRate?.includes(UserId)){
      setRatingStatus(true)
    }else(
      setRatingStatus(false)
    )
  },[filledStars,Item,UserId])
  

  
  const showSuccessAlert = (message) => {
    Swal.fire({
      title: `Thank you for rate `,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
    });
  };
  
    const handleStarClick = async (starIndex) => {
      setFilledStars(starIndex + 1);
  
      let ids = Item.UsersIdRate.length > 0 ?  [...Item.UsersIdRate,UserId]  : [UserId]
      let newrate =Item.rate.length  > 0   ? [...Item.rate,starIndex + 1]      :    [starIndex + 1]  
      const  sum=   Item.rate.length === 0 ? (5+newrate[0]) :  newrate?.reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0);
      const  avg = Item.rate.length === 0 ? 2 :newrate?.length
  
      try {
        const updatedProduct = {
          UsersIdRate:ids,
          rate:newrate,
          rating:(sum/avg).toFixed(1)
        };
     
      // const NupdatedRecipe= 
        await axios.put(`http://localhost:5000/api/updateProductRate/${CardId}`, updatedProduct);
        showSuccessAlert(newrate)
        setRatingStatus(true)
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

  return (
    <>   
    {RatingStatus ? 
    <p className="text-black">Thanks for rating</p>
    :
    <div className="flex items-center"> 
    <p>Rate</p>
    {Array(starCount)
      .fill()
      .map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          className={`w-5 h-5 ${
            index < filledStars
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleStarClick(index)}
        >
          <title>
            {index + 1 <= filledStars ? "Filled star" : "Empty star"}
          </title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
  </div>
    }
   
  
  
    </>
  )
}

export default CardRating