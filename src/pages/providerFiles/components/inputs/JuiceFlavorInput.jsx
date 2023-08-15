import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchJuiceFlavorByCategory} from "../../../../actions/juice/GetJuiceFlavorByCategory"
const JuiceFlavorInput = ({onSelectChange,categoryId,valueEd}) => {

    const dispatch = useDispatch()

    const { data: allJuiceFlavorByCategory  } = useSelector(
      (state) => state.fetchJuiceFlavorByCategory
    );
  useEffect(() =>{
    if (categoryId !== undefined) {
      dispatch(fetchJuiceFlavorByCategory(categoryId));
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

       <option value="">All Flavor</option>
      {allJuiceFlavorByCategory?.map((Flavor)=>{
      return(
      <option 
      key={Flavor._id}
      value={Flavor.flavor}>{Flavor.flavor}</option>
    )
  })}

  </select>
  )
}

export default JuiceFlavorInput