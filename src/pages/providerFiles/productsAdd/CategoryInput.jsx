import React, { useState } from 'react';

const CategoryInput = ({ onSelectChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedCategory(selectedValue);
      onSelectChange(selectedValue); 
    };

  return (
    <select
    className="px-4 py-3 w-full rounded-md bg-gray-100 border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance"
    value={selectedCategory}
    onChange={handleCategoryChange}
  >
    <option value="">default</option>
    <option value="vapePuff">vapePuff</option>
    <option value="juice">juice</option>

  </select>
  )
}

export default CategoryInput