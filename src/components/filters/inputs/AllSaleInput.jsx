import React, { useState } from 'react';

const AllSaleInput = ({onSelectChange}) => {
    const [selectedSale, setSelectedSale] = useState('');

    const handleSale = (event) => {
      const selectedSaleValue = event.target.value;
      setSelectedSale(selectedSaleValue);
      onSelectChange(selectedSaleValue); 
    };
  return (
    <select
    className="px-4 py-3 w-full rounded-md bg-gray-100 border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance"
    value={selectedSale}
    onChange={handleSale}
  >
    <option value="">all</option>
    <option value="sale">sale</option>
  </select>
  )
}

export default AllSaleInput