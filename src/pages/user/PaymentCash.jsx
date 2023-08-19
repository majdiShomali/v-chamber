import React, { useEffect, useState } from 'react'
import SneekPeeks from '../../components/SneekPeeks'
import { Card } from '@material-tailwind/react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";
import {CartContext} from "../../context/cartContext"
import Swal from "sweetalert2";

import axios from 'axios';
const PaymentCash = () => {
  const ApiUrl = process.env.REACT_APP_API_URL;

  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0.5);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  
  const {
    // loading: isCartLoading,
    data: itemsCartData,
    // error: fetchCartError,
  } = useSelector((state) => state.fetchItemsCart);

  useEffect(() => {
    if (localStorage.items) {
      const itemsId = JSON.parse(localStorage.getItem("items"));
      dispatch(fetchItemsCart(itemsId));
      const items = JSON.parse(localStorage.getItem("itemsQ"));
      const price = items.map((item) => {
        return parseInt(item.salePrice * item.quantity, 10);
      });
      const sum = price.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalPrice(sum);
      setItems(JSON.parse(localStorage.getItem("itemsQ")));
    }
  }, [dispatch]);


  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [loading ,setLoading] = useState(false)

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const updateItem = async (item) => {
    try {
      // const response =
      await axios.put(`${ApiUrl}/updateProductQuantity/${item._id}`, item);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handlePay = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {


      // Send payment information to your server using Axios
      const response = await axios.post(`${ApiUrl}/chargeCash`, {
        paymentMethodId: "0000",
        email: userEmail.toLowerCase(),
        phone:userPhone,
        country: country ,
        state:  state ,
        address: address  ,
        amount: totalPrice, 
        itemsCartData:itemsCartData,
        itemsCartDataLocal:JSON.parse(localStorage.getItem("itemsQ")),
      });

      console.log(response.data)

      items.map((item) => {
        updateItem(item);
        return true;
      });
      // localStorage.removeItem("items");
      // localStorage.removeItem("itemsQ");
      // // const cartIds =JSON.parse(localStorage.getItem('items'))
      // dispatch(fetchItemsCart([]));
      //     setCartNavRefresh([])
      // // If payment is successful, show success message
      showAlert("Payment successful!", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
  }finally{
    setLoading(false);

  }
}

const showAlert = (message, icon) => {
  Swal.fire({
    title: icon === "success" ? "Success" : "Error",
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
};
  return (
    <>
    <SneekPeeks />
    {itemsCartData?.length > 0 ? (
      <>
        <Card className="my-10 w-8/12 mx-auto bg-gray-50 px-4 pt-8 lg:mt-5">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form onSubmit={handlePay} className="">
            {/* Email input */}
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              {/* ... */}
            </div>
            <div>
    {/* Phone input */}
    <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">
      Phone Number
    </label>
    <div className="relative">
      <PhoneInput
        id="phone"
        name="phone"
        value={userPhone}
        onChange={setUserPhone}
        placeholder="Enter phone number"
        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
      required
      />
      {/* ... */}
    </div>
  </div>

  <div className="space-y-4">
      <label htmlFor="country" className="block font-medium">
        Country:
      </label>
      <input
        type="text"
        id="country"
        className="w-full border rounded-lg p-2"
        value={country}
        onChange={handleCountryChange}
      />
      <label htmlFor="state" className="block font-medium">
        State:
      </label>
      <input
        type="text"
        id="state"
        className="w-full border rounded-lg p-2"
        value={state}
        onChange={handleStateChange}
      />

      <label htmlFor="address" className="block font-medium">
        Address Line:
      </label>
      <input
        type="text"
        id="address"
        className="w-full border rounded-lg p-2"
        value={address}
        onChange={handleAddressChange}
      />
            </div> 
            <div className="relative">
      
            </div>
            {/* ... */}
       
        
                    {loading ?  
              
              <button
              disabled=""
              type="button"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
              
              : 
              <button
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
              }
 
          </form>
        </Card>
      </>
    ) : (
      <Card className="my-10 w-8/12 h-[50vh] mx-auto bg-gray-50 px-4 pt-8 lg:mt-5">
        <p className="text-center">No Products in your Cart</p>
      </Card>
    )}
  </>
  )
}

export default PaymentCash