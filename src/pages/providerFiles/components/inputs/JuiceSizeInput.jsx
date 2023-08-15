import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchJuiceSize} from "../../../../actions/juice/GetJuiceSize"
import { fetchJuiceSizeByCategory } from "../../../../actions/juice/GetJuiceSizeByCategory";

const JuiceSizeInput = ({onSelectChange,categoryId,valueEd}) => {

    const dispatch = useDispatch()

  // const {
  //   // loading: isCategoriesDataLoading,
  //   data: JuiceSizeData,
  //   // error: fetchCategoriesDataError,
  // } = useSelector((state) => state.fetchJuiceSize);

  const { data: allJuiceSizeByCategory  } = useSelector(
    (state) => state.fetchJuiceSizeByCategory
  );
  useEffect(() =>{
    if (categoryId !== undefined) {
      dispatch(fetchJuiceSizeByCategory(categoryId));
    }
    dispatch(fetchJuiceSize())
  },[dispatch,categoryId])


  const [selectedChargeVape, setSelectedChargeVape] = useState('');

  useEffect(() =>{
    if (valueEd) {
      setSelectedChargeVape(valueEd)
    }
  },[valueEd])
  const handleChargeVapeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedChargeVape(selectedValue);
    onSelectChange(selectedValue); 
  };

  return (
    <select
    className="px-4 py-3 w-full rounded-md bg-gray-100 border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance"
    value={selectedChargeVape}
    onChange={handleChargeVapeChange}
  >

       <option value="">All size</option>
      {allJuiceSizeByCategory?.map((size)=>{
      return(
      <option 
      key={size._id}
      value={size.size}>{size.size}</option>
    )
  })}

  </select>
  )
}

export default JuiceSizeInput