import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchCategoryItems} from "../../../actions/category/GetCategoryItems"
const AllCategoryInput = ({ onSelectChange }) => {
  const dispatch = useDispatch()

  const {
    // loading: isCategoriesDataLoading,
    data: CategoriesData,
    // error: fetchCategoriesDataError,
  } = useSelector((state) => state.fetchCategories);

  useEffect(() =>{
    const data ={
      itemsPerPage:"20",
      CurrentPage:"1"
    }
    dispatch(fetchCategoryItems(data));
  },[dispatch])

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedCategory(selectedValue);
      onSelectChange(selectedValue); 
    };
  return (
    <select
    className="px-4 py-3 w-full rounded-md bg-gray-100 border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance"
    value={selectedCategory}
    onChange={handleCategoryChange}
  >
     <option 
        value="">All categories</option>
 
  {CategoriesData?.data?.map((category) => {
    return (
      <option
        key={category._id}
        value={category.category}
      >
        {category.category}
      </option>
    );
  })}

  

  </select>
  )
}

export default AllCategoryInput