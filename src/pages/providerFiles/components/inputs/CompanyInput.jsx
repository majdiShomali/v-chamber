import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchCompanyItems} from "../../../../actions/company/GetCompanies"
import { fetchCompaniesByCategory } from "../../../../actions/company/GetCompaniesByCategory";

const CompanyInput = ({ onSelectChange,categoryId,valueEd }) => {

  const dispatch = useDispatch()

  // const {
  //   // loading: isCategoriesDataLoading,
  //   data: CompanyData,
  //   // error: fetchCategoriesDataError,
  // } = useSelector((state) => state.fetchCompanyItems);

  const { data: allCompaniesByCategory  } = useSelector(
    (state) => state.fetchCompaniesByCategory
  );
  useEffect(() =>{
    dispatch(fetchCompanyItems())
    if (categoryId !== undefined) {
      dispatch(fetchCompaniesByCategory(categoryId));
    }
  },[dispatch,categoryId])

  useEffect(() =>{
    if (valueEd) {
      setSelectedChargeVape(valueEd)
    }
  },[valueEd])



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
        {allCompaniesByCategory?.map((company)=>{
        return(
        <option 
        key={company._id}
        value={company.Name}>{company.Name}</option>
      )
    })}

    </select>
  );
};

export default CompanyInput;