import { Button } from "@material-tailwind/react";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SneekPeeksShipping from "../../components/SneekPeeksShipping";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";

const CartPage = () => {
  // const ApiUrl= process.env.REACT_APP_API_URL
  // const ReactUrl= process.env.REACT_APP_API_REACT_URL
  const ImagesUrl= process.env.REACT_APP_IMAGES_URL

  const dispatch = useDispatch();

  const {
    // loading: isCartLoading,
    data: itemsCartData,
    // error: fetchCartError,
  } = useSelector((state) => state.fetchItemsCart);


  useEffect(() => {
    if (localStorage.items) {
      const items = JSON.parse(localStorage.getItem("items"));
      if (items.length > 0) {
      dispatch(fetchItemsCart(items)) } 
      }
    },[dispatch] ) 

  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {

    // const newArray = itemsCartData?.map((item) => ({  //error on load
    //   quantity: item.quantity,
    //   _id: item._id
    // }));
    // localStorage.setItem("itemsQ", JSON.stringify(newArray));

    const storedItems = localStorage.getItem("itemsQ") ? JSON.parse(localStorage.getItem("itemsQ"))  : itemsCartData;                                          

    setItems(storedItems)

    if (localStorage.items) {
      const price = itemsCartData.map((item) => {
        return parseInt(item.price, 10);
      });
      const sum = price.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalPrice(sum);
    }

  }, [itemsCartData]);

  useEffect(() => {
    if (items) {
      const priceQ = items.map((item) => {
        return parseInt(item.price, 10) * item.quantity;
      });
      const sum = priceQ.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      setTotalPrice(sum);
    }
  }, [items]);

  const handleInc = (itemId) => {
    const updatedItems = items.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleDec = (itemId) => {
    const updatedItems = items.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleRemove = (itemId) => {

     const storedItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items"))  : [];                                          
     const storedItemsQ = localStorage.getItem("itemsQ") ? JSON.parse(localStorage.getItem("itemsQ"))  :   [];                                          

     const allCardsIds = storedItems.filter((ItemId) => { return ItemId !== itemId});
     console.log(allCardsIds)
     localStorage.setItem("items", JSON.stringify(allCardsIds));

     const updatedItems = storedItemsQ.filter((item) => item._id !== itemId);
     console.log(updatedItems)
     localStorage.setItem("itemsQ", JSON.stringify(updatedItems));

     dispatch(fetchItemsCart(allCardsIds)) 

  };
// const navigate =useNavigate()

// const handlePayment = () =>{

//   navigate(`/Payment/${ItemId}/${item.quantity}`)
// }


  return (
    <>

    
 
      <SneekPeeksShipping />
      <div className="flex p-5 flex-col lg:flex-row ">
        <div className=" w-full lg:w-1/2 lg:p-5 lg:m-5">
          <p className="text-xl font-medium">Order Summary {totalPrice}$</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6  overflow-y-auto">
            {items?.map((item) => {
              return (
                <div 
                key={item._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={`${ImagesUrl}/${item.image}`}
                    alt="productimage"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.Name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                      {item.quantity !== 1 ? 
                           <span
                           className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                           onClick={() => handleDec(item._id)}
                         >
                           {" "}
                           -{" "}
                         </span>
                      
                      : null}
                   
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          min={1}
                          readOnly
                        />
                        {item.quantity !== item.totalQuantity  ?  
                             <span
                             className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                             onClick={() => handleInc(item._id)}
                           >
                             {" "}
                             +{" "}
                           </span>                                        
                        :null }
                   
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {item.price * item.quantity} ₭
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => handleRemove(item._id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:p-5 lg:m-5">
          <p className="text-xl font-medium">Shipping Methods</p>
          <p className="text-gray-400">select a suitable shipping method.</p>

          <form className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6  flex flex-col justify-center items-center">
            <div className="relative w-full">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked=""
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative w-full">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                defaultChecked=""
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>

            <Button className="bg-[#ffc439] normal-case w-full lg:w-1/2 text-xl hover:scale-105 hover:shadow-none">  <span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span> </Button>
           <Link to="/Payment" className="w-full lg:w-1/2">
           <Button
           
           className="bg-[#2c2e2f] normal-case w-full  text-xl hover:scale-105 hover:shadow-none text-white">  Debit or Credit Card </Button>
           </Link>

          </form>
        </div>
      </div>
    </>
  );
};

export default CartPage;
