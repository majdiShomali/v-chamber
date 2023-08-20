import React, { useContext, useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import {CartContext} from "../../../context/cartContext"
import { useDispatch, useSelector } from "react-redux";
import { fetchPrice } from "../../../actions/calculatePrice/GetPrice";

function PaymentComponent() {
  const sandboxClientId = process.env.REACT_APP_PAYPAL_SANDBOX_CLIENT_ID;
  const ApiUrl = process.env.REACT_APP_API_URL;
  const {cartNavRefresh ,setCartNavRefresh}=useContext(CartContext)
  const dispatch = useDispatch();

  const {
    data: fetchPriceData,
  } = useSelector((state) => state.fetchPrice);

  useEffect(() => {
    if (localStorage.items) {
      const items = JSON.parse(localStorage.getItem('itemsQ'));
      if (items.length > 0) {
        dispatch(fetchPrice(items));
      }
    }
  }, [dispatch]); 

  useEffect(() => {
    if (fetchPriceData) {
     localStorage.setItem('fetchPriceData',fetchPriceData.truePrice)
     localStorage.setItem('itemsCartData',JSON.stringify(fetchPriceData.trueProducts))
    }
  }, [fetchPriceData]); 

  const createOrder = (data, actions) => {
    const PriceNew = localStorage.getItem('fetchPriceData');
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: PriceNew,
          }
        }
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const captureDetails = await actions.order.capture();
      console.log("Payment successful:", captureDetails);
      const response = await axios.post(`${ApiUrl}/charge`, {
        captureDetails:captureDetails,
        amount: (localStorage.getItem('fetchPriceData')), 
        itemsCartData:(JSON.parse(localStorage.getItem('itemsCartData'))),

      });
      console.log("Backend response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Payment error:", error);
    }
  };

  const onError = (error) => {
    // Handle errors
    console.error("Payment error:", error);
  };

  return (
    <div className='z-10 w-96'>
      <h2>Pay with PayPal</h2>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        options={{
          'client-id': sandboxClientId,
          currency: 'USD',
        }}
      />
    </div>
  );
}

export default PaymentComponent;
