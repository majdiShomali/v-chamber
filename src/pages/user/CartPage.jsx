import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SneekPeeksShipping from "../../components/SneekPeeksShipping";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsCart } from "../../actions/related/GetItemsCart";
import CartBill from "./pdf/CartBill";
import {CartContext} from "../../context/cartContext"
// import PaymentComponent from "./components/PaymentComponent";

const CartPage = () => {
  // const ApiUrl= process.env.REACT_APP_API_URL
  // const ReactUrl= process.env.REACT_APP_API_REACT_URL
  const ImagesUrl= process.env.REACT_APP_IMAGES_URL
  const {cartNavRefresh ,setCartNavRefresh}=useContext(CartContext)

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
        return parseInt(item.salePrice, 10) * item.quantity;
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

    const totalQuantity = updatedItems.reduce((acc, product) => acc + product.quantity, 0);
    setCartNavRefresh(totalQuantity)

    setItems(updatedItems);
  };

  const handleDec = (itemId) => {
    const updatedItems = items.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
    const totalQuantity = updatedItems.reduce((acc, product) => acc + product.quantity, 0);
    setCartNavRefresh(totalQuantity)
    setItems(updatedItems);
  };

  const handleRemove = (itemId) => {

     const storedItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items"))  : [];                                          
     const storedItemsQ = localStorage.getItem("itemsQ") ? JSON.parse(localStorage.getItem("itemsQ"))  :   [];                                          

     const allCardsIds = storedItems.filter((ItemId) => { return ItemId !== itemId});
     console.log(allCardsIds)
     localStorage.setItem("items", JSON.stringify(allCardsIds));

     const updatedItems = storedItemsQ.filter((item) => item._id !== itemId);
     localStorage.setItem("itemsQ", JSON.stringify(updatedItems));
     const totalQuantity = updatedItems.reduce((acc, product) => acc + product.quantity, 0);
     setCartNavRefresh(totalQuantity)
     dispatch(fetchItemsCart(allCardsIds)) 

  };
// const navigate =useNavigate()

// const handlePayment = () =>{

//   navigate(`/Payment/${ItemId}/${item.quantity}`)
// }


  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [addressError, setAddressError] = useState('');

 const navigate = useNavigate()
const handlePaymentRequest =(e)=>{
  e.preventDefault()
  if (!deliveryAddress.trim()) {
    setAddressError('Please provide a delivery address');
    return;
  }else{
  localStorage.setItem('deliveryAddress', deliveryAddress)
 navigate(`/PayPalPayment/${deliveryAddress}`)

  }
}

useEffect(()=>{
  if (localStorage.deliveryAddress){
    setDeliveryAddress(localStorage.deliveryAddress)
  }
},[])

  return (
    <>

    
 
      <SneekPeeksShipping />
      <div className="flex p-5 flex-col lg:flex-row bg-gray-50">
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
                      <p className="mt-1 text-xs text-gray-700">{item.salePrice}$ usd</p>
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
                          {item.salePrice * item.quantity}$ usd
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
        <div className="flex flex-col w-full lg:w-1/2 lg:p-5 lg:m-5">
        <div >
          <p className="text-xl font-medium">Payment Methods</p>
          <p className="text-gray-400">enter the delivery address to pay</p>

          <form
      className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6  flex flex-col justify-center items-center"
    >
      <Input
        label="Delivery Address"
        size="1.5"
        required
        onChange={(e) => setDeliveryAddress(e.target.value)}
        value={deliveryAddress}
      />
      {addressError && <p className="text-red-500">{addressError}</p>}
      <Button
        type="submit"
        className="bg-[#2c2e2f] normal-case w-full text-xl hover:scale-105 hover:shadow-none text-white"
        onClick={handlePaymentRequest}
      >
        Payment
      </Button>
    </form>  
   
       
      
       
      
         

          
        </div>
<CartBill
items={items}

/>
       
        </div>
      </div>
    </>
  );
};

export default CartPage;
