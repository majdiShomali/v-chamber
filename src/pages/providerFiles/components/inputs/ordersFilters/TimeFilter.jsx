import React, { useEffect, useState } from 'react';

const TimeFilter = ({ onSelectChange, DeliverdOrdersData }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
    // onSelectChange(selectedTime);
  };

  useEffect(() => {
    if (DeliverdOrdersData && selectedTime) {
      const currentDate = new Date();
      const filteredOrders = DeliverdOrdersData.filter((order) => {
        const deliveredDate = new Date(order.deliveredTime);
        const timeDifference = currentDate - deliveredDate;

        if (selectedTime === '1h') {
          return timeDifference <= 3600000; // 1 hour in milliseconds
        } else if (selectedTime === '1d') {
          return timeDifference <= 86400000; // 1 day in milliseconds
        } else if (selectedTime === '1w') {
          return timeDifference <= 604800000; // 1 week in milliseconds
        } else if (selectedTime === '1m') {
          return timeDifference <= 2592000000; // 1 month in milliseconds
        }

        return true; // Return true for 'all' option
      });
      if(selectedTime !== 'all') {
        onSelectChange(filteredOrders);
        setFilteredOrders(filteredOrders);
      }else{
        onSelectChange(DeliverdOrdersData);
        setFilteredOrders(DeliverdOrdersData);
      }

    }
  }, [DeliverdOrdersData, selectedTime]);

  return (
    <div>
      <select
        className="px-4 py-3  rounded-md bg-gray-100 border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm"
        value={selectedTime}
        onChange={handleTimeChange}
      >
        <option value="all">all</option>
        <option value="1h">1h</option>
        <option value="1d">1d</option>
        <option value="1w">1w</option>
        <option value="1m">1m</option>
      </select>
      
      {/* Display filtered orders */}
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id}>{/* Render order information here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeFilter;
