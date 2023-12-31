import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchJuiceTypeByCategory } from "../../../../actions/juice/GetJuiceTypeByCategory";

const JuiceTypeInput = ({onSelectChange,categoryId,valueEd}) => {

    const dispatch = useDispatch()
    const { data: allJuiceTypeByCategory  } = useSelector(
      (state) => state.fetchJuiceTypeByCategory
    );

    useEffect(() =>{
      if (categoryId !== undefined) {
        dispatch(fetchJuiceTypeByCategory(categoryId));
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

       <option value="">All Type</option>
      {allJuiceTypeByCategory?.map((Type)=>{
      return(
      <option 
      key={Type._id}
      value={Type.type}>{Type.type}</option>
    )
  })}

  </select>
  )
}

export default JuiceTypeInput