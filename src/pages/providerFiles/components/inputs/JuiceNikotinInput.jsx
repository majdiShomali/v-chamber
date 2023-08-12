import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchJuiceNikotin} from "../../../../actions/juice/GetJuiceNikotin"
const JuiceNikotinInput = ({onSelectChange}) => {

    const dispatch = useDispatch()

  const {
    // loading: isCategoriesDataLoading,
    data: JuiceNikotinData,
    // error: fetchCategoriesDataError,
  } = useSelector((state) => state.fetchJuiceNikotin);

  useEffect(() =>{
    dispatch(fetchJuiceNikotin())
  },[dispatch])

  const [selectedChargeVape, setSelectedChargeVape] = useState('');

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
      {JuiceNikotinData?.map((nikotin)=>{
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