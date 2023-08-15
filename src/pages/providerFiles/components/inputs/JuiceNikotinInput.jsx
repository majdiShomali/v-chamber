import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchJuiceNikotinByCategory } from "../../../../actions/juice/GetJuiceNikotinByCategory";

const JuiceNikotinInput = ({onSelectChange,categoryId,valueEd}) => {

    const dispatch = useDispatch()

    const { data: allJuiceSizeByCategory  } = useSelector(
      (state) => state.fetchJuiceNikotinByCategory
    );
    useEffect(() =>{
      if (categoryId !== undefined) {
        dispatch(fetchJuiceNikotinByCategory(categoryId));
      }
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

       <option value="">All Nikotin</option>
      {allJuiceSizeByCategory?.map((nikotin)=>{
      return(
      <option 
      key={nikotin._id}
      value={nikotin.nikotin}>{nikotin.nikotin}</option>
    )
  })}

  </select>
  )
}

export default JuiceNikotinInput