import React from 'react'
import PaymentComponent from './components/PaymentComponent'
import SneekPeeks from "../../components/SneekPeeks";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const PayPalPayment = () => {

  return (      
  <>
  <SneekPeeks />

    <div className='w-full flex items-top justify-center min-h-screen'>
{localStorage.auth ? 
   <PaymentComponent/>

:
  <Link to="/login">
             <button
             type="button"
             className="mt-5 w-96 bg-purple-500 tracking-wide font-semibold text-white  py-4 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
           >
             <span className="ml-3">please log-in to proceed</span>
           </button>
           </Link>
}

    </div>
    </>
  )
}

export default PayPalPayment