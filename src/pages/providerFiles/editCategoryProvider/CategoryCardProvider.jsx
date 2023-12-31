import { useNavigate } from 'react-router-dom';
// import { Button } from "@material-tailwind/react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchItems } from "../actions/GetItems";
import { useContext } from 'react'
import { UserContext } from "../../../context/userContext";


import EditCategoryCardProvider from './EditCategoryCardProvider';
import EditCategoryImageProvider from './EditCategoryImageProvider';
const CategoryCardProvider = ({itemsData}) => {
  const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  
    function handleKitchenTypeSelection(id) {
      navigate(`/ProductPageProvider/${id}/0`);
    }



  return (
    <div className="bg-white mt-3 shadow-lg">
    <section id="food">
      <br />
      <h2 className=" text-4xl mb-8 tracking-tight font-extrabold text-black  text-center capitalize">
        All categories 
      </h2>

      <div id="edit-category" className="flex flex-wrap items-center justify-center mb-10 mx-20">
        
        {itemsData?.map((category)=>{
       return (
          <div
          key={category._id}
          
            className="w-full sm:w-1/2 md:w-1/3 p-4 hover:scale-105   relative">
           {/* {category?.ProviderId === user?._id ? */}
           <>
                   <EditCategoryCardProvider
            category={category}           
            />
            <EditCategoryImageProvider
            category={category}
            />
           
           </>
           
           {/* : null
           } */}

    
          
          <div className="relative rounded-lg overflow-hidden"
          onClick={() => handleKitchenTypeSelection(category._id)}>
            <img
              className="w-full h-64 object-cover object-center"
              src={`${ImagesUrl}/${category.image}`}
              alt="vegetables" />
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                {category.category}
                
                 
                  </h2>
                <button
                  className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
               
                >
                Show Products
                </button>
              </div>
            </div>
          </div>
        </div>
       )
        })}
        



      </div>
    </section>
  
  </div>
  )
}

export default CategoryCardProvider