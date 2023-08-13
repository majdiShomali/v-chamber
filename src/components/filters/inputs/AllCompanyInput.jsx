import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchCompanyItems} from "../../../actions/company/GetCompanies"

const AllCompanyInput = ({ onSelectChange }) => {

  const dispatch = useDispatch()

  const {
    // loading: isCategoriesDataLoading,
    data: CompanyData,
    // error: fetchCategoriesDataError,
  } = useSelector((state) => state.fetchCompanyItems);
 
  useEffect(() =>{
    dispatch(fetchCompanyItems())

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

         <option value="">All Companies</option>
        {CompanyData?.map((company)=>{
        return(
        <option 
        key={company._id}
        value={company.Name}>{company.Name}</option>
      )
    })}

    </select>
  );
};

export default AllCompanyInput;