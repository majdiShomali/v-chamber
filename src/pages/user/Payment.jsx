import { Card } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import SneekPeeks from "../../components/SneekPeeks";

import { useDispatch, useSelector } from "react-redux";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// 4242424242424242
const stripePromise = loadStripe(
  "pk_test_51NdwltJlIK0RZcLUZ09Y52TRSDmUDQqqTQzWUU58DkB0e2V1Bn80K4rBqiC43EaFVSALScTuAx1MmrGKmL2vfpIA00zgMOkGw8"
);

const PaymentForm = () => {
  const ApiUrl = process.env.REACT_APP_API_URL;

  const stripe = useStripe();
  const elements = useElements();

  const [userEmail, setUserEmail] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [userPhone, setUserPhone] = useState('');

  const dispatch = useDispatch();
  const {
    // loading: isCartLoading,
    data: itemsCartData,
    // error: fetchCartError,
  } = useSelector((state) => state.fetchItemsCart);

  const [totalPrice, setTotalPrice] = useState(0.5);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (localStorage.items) {
      const itemsId = JSON.parse(localStorage.getItem("items"));
      dispatch(fetchItemsCart(itemsId));
      const items = JSON.parse(localStorage.getItem("itemsQ"));
      const price = items.map((item) => {
        return parseInt(item.price * item.quantity, 10);
      });
      const sum = price.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalPrice(sum);
      setItems(JSON.parse(localStorage.getItem("itemsQ")));
    }
  }, [dispatch]);

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

    if (!stripe || !elements) {
      return;
    }

    // Validate inputs...
    try {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardholder,
          email: userEmail,
        },
      });

      if (error) {
        showAlert(error.message, "error");
        return;
      }

      // Send payment information to your server using Axios
      const response = await axios.post(`${ApiUrl}/charge`, {
        paymentMethodId: paymentMethod.id,
        email: userEmail,
        phone:userPhone,
        cardholder:cardholder,
        amount: totalPrice, 
        itemsCartData:itemsCartData,
        itemsCartDataLocal:JSON.parse(localStorage.getItem("itemsQ")),
      });

      console.log(response.data)

      items.map((item) => {
        updateItem(item);
        return true;
      });
      localStorage.removeItem("items");
      localStorage.removeItem("itemsQ");
      // const cartIds =JSON.parse(localStorage.getItem('items'))
      dispatch(fetchItemsCart([]));

      // If payment is successful, show success message
      showAlert("Payment successful!", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

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
              {/* Card Holder input */}
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                  required
                />
                {/* ... */}
              </div>
              {/* ... */}
              <label
                htmlFor="card-details"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
              <button
                type="submit"
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
                Place Order
              </button>
            </form>
          </Card>
        </>
      ) : (
        <Card className="my-10 w-8/12 h-[50vh] mx-auto bg-gray-50 px-4 pt-8 lg:mt-5">
          <p className="text-center">No Products in your Cart</p>
        </Card>
      )}
    </>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
