import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";

//--------------------none--------------------------//
import NoPage404 from "./pages/NoPage404";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
//---------------------user-------------------------//
import Home from "./pages/landing/pages/Home";
import StickyNavbar from "./components/StickyNavbar";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import UserProfile from "./pages/user/UserProfile";
import CartPage from "./pages/user/CartPage";
import ForgetPassword from "./pages/registration/ForgetPassword"
import Payment from "./pages/user/Payment";
import PaymentCash from "./pages/user/PaymentCash";
import ItemsStore from "./pages/user/ItemsStore";
import ProductPage from "./pages/user/ProductPage";
import AllCategories from "./pages/user/AllCategories";
import ItemStoreCategory from "./pages/user/ItemStoreCategory";
import UserPdfBill from "./pages/user/pdf/UserPdfBill";
import PayPalPayment from "./pages/user/PayPalPayment";
import TrackSection from "./pages/user/components/TrackSection";
//---------------------provider-------------------------//

import ProviderHome from "./pages/providerFiles/ProviderHome";
import ProviderProfile from "./pages/providerFiles/ProviderProfile";
import ProviderOrders from "./pages/providerFiles/orders/ProviderOrders";
// import ProductPageSkeleton from "./components/Skeleton/ProductPageSkeleton";
import ProductPageProvider from "./pages/providerFiles/ProductPageProvider";
import ProviderNavBar from "./pages/providerFiles/components/ProviderNavBar";
import AllProductsProvider from "./pages/providerFiles/productsAdd/linkProducts/pages/AllProductsProvider";

import PdfTest from "./pages/providerFiles/CreatePDF/PdfTest";
// import axios from "axios";



function App() {
  const [hideRouterUser, setHideRouterUser] = useState(false);
  const [hideRouterProvider, setHideRouterProvider] = useState(true);
  const [hideRouterAdmin, setHideRouterAdmin] = useState(true);

  const [render, setRender] = useState(false);

  // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const role =
        user.role === 0
          ? [false, true, true]
          : user.role === 2
          ? [true, false, true]
          : [true, true, false];
      setHideRouterUser(role[0]);
      setHideRouterProvider(role[1]);
      setHideRouterAdmin(role[2]);
      setRender(true)
    }else{
      setRender(true)
    }
  }, [user]);

  const AppRouter1 = () => {
    return (
      <Router>
        <StickyNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/PayPalPayment/:deliveryAddress" element={<PayPalPayment />} />
          <Route path="/TrackSection" element={<TrackSection />} />
          <Route path="/Signup/:type" element={<SignUp />} />
           <Route index element={<Home />} />
           <Route path="/AboutUs" element={<AboutUs />} />
           <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/ProductPage/:id/:relatedId" element={<ProductPage />} />
          <Route path="/ItemStoreCategory/:id/:relatedId" element={<ItemStoreCategory />} />
        <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/AllCategories" element={<AllCategories />} />
         <Route path="/Store" element={<ItemsStore />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/PaymentCash" element={<PaymentCash />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/UserPdfBill/:orderId" element={<UserPdfBill />} />
        {/*     <Route path="/ProductPageSkeleton" element={<ProductPageSkeleton />} /> */}
          <Route path="/*" element={<NoPage404 />} /> 
        </Routes>
        <Footer/>
      </Router>
    );
  };
  const AppRouter2 = () => {
    return (
      <Router>
        <ProviderNavBar />
        <Routes>
          <Route index element={<ProviderHome />} />
           <Route path="/AboutUs" element={<AboutUs />} />
           <Route path="/AllProductsProvider" element={<AllProductsProvider />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/UserProfile" element={<ProviderProfile />} />
          <Route path="/ProviderOrders" element={<ProviderOrders />} />
          <Route path="/ProductPageProvider/:id/:relatedId" element={<ProductPageProvider />} />
          <Route path="/PdfTest/:orderId" element={<PdfTest />} />
          <Route path="/UserPdfBill/:orderId" element={<UserPdfBill />} />

          <Route path="/*" element={<NoPage404 />} /> 
        </Routes>
      </Router>
    );
  };
  const AppRouter3 = () => {
    return (
      <Router>
        <StickyNavbar />
        <Routes>
          {/* <Route index element={<Home />} />
          <Route path="/*" element={<NoPage404 />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} /> */}
        </Routes>
      </Router>
    );
  };


  // useEffect(() => {
  //   const fetchProtectedData = async () => {
  //     try {
  //       const token = localStorage.getItem("auth");
  //       if (token) {
  //         const response = await axios.post(
  //           "http://localhost:5000/api/testPost",
  //           null, // No data to send in the request body
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error?.response.data);
  //     }
  //   };
  //   fetchProtectedData();
  // }, []); 

  // useEffect(() => {
  //   const fetchProtectedData = async () => {
  //     try {
  //       const token = localStorage.getItem("auth");
  //       if (token) {
  //         const response = await axios.get(
  //           "http://localhost:5000/api/testGet",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error?.response.data);
  //     }
  //   };
  //   fetchProtectedData();
  // }, []); 

  return (
    <>

    {render ? 
    
    <>
    
    {hideRouterUser ? null : (
        <>
          <AppRouter1 />
        </>
      )}
      {hideRouterProvider ? null : (
        <>
          <AppRouter2 />
        </>
      )}
      {hideRouterAdmin ? null : (
        <>
          <AppRouter3 />
        </>
      )}
    
    
    </>
    
    
    : null}
      
    </>
  );
}

export default App;
