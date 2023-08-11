import React, { useState } from 'react';

const CompanyInput = ({ onSelectChange }) => {
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
      <option value="">default</option>
      <option value="vgod">vgod</option>
      <option value="nasty">nasty</option>

    </select>
  );
};

export default CompanyInput;