import React from 'react';
import Cookies from 'js-cookie';

const CookieComponent = () => {
      // Set a cookie
  const setCookie = () => {
    Cookies.set('exampleCookie', 'cookieValue', { expires: 7 }); // Expires in 7 days
  };

  // Get a cookie
  const getCookie = () => {
    const cookieValue = Cookies.get('exampleCookie');
    console.log('Cookie Value:', cookieValue);
  };
  return (
    <div className="p-4">
    <button onClick={setCookie} className="bg-blue-500 text-white px-4 py-2 rounded">
      Set Cookie
    </button>
    <button onClick={getCookie} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
      Get Cookie
    </button>
  </div>
  )
}

export default CookieComponent