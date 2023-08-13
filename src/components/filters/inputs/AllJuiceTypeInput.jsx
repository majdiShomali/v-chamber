import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchJuiceType } from "../../../actions/juice/GetJuiceType";

const AllJuiceTypeInput = ({onSelectChange,categoryId}) => {

    const dispatch = useDispatch()
    const { data: allJuiceType  } = useSelector(
      (state) => state.fetchJuiceType
    );

    useEffect(() =>{
        dispatch(fetchJuiceType());
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

       <option value="">All Type</option>
      {allJuiceType?.map((Type)=>{
      return(
      <option 
      key={Type._id}
      value={Type.type}>{Type.type}</option>
    )
  })}

  </select>
  )
}

export default AllJuiceTypeInput