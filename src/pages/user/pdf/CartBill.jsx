import React from 'react';
// import { generatePDF } from './pdfUtils';
import { Card ,Button} from '@material-tailwind/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {fetchOrder}  from "../../../actions/orders/GetOrder"
import { useState } from 'react';

const CartBill = ({items}) => {
const [Subtotal ,setSubtotal]=useState(Number(""))

useEffect(()=>{
  const totalCost = items?.reduce((acc, product) => acc + (product.salePrice * product.quantity), 0);
  setSubtotal(totalCost)
},[items])

  return (
   
     <Card id='SectionToPrint' className="w-full  my-3 ">
       <article className="overflow-hidden">
         <div className="bg-[white] rounded-b-md">
   
  
           <div className="px-9  h-96 overflow-y-scroll">
             <div className="flex flex-col mx-0 mt-8">
               <table className="min-w-full divide-y divide-slate-500">
                 <thead>
                   <tr>
                     <th
                       scope="col"
                       className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                     >
                       Description
                     </th>
                     <th
                       scope="col"
                       className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                     >
                       Quantity
                     </th>
                     <th
                       scope="col"
                       className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                     >
                       Price/item
                     </th>
                     <th
                       scope="col"
                       className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                     >
                        Price * quantity
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                  {items?.map((order)=>{
                 return(
   
                   <tr className="border-b border-slate-200">
                   <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                     <div className="font-medium text-slate-700">
                       {order.Name}
                     </div>
                     <div className="mt-0.5 text-slate-500 sm:hidden">
                       1 unit at ${order.salePrice}
                     </div>
                   </td>
                   <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                     {order.quantity}
                   </td>
                   <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                     ${order.salePrice} USD
                   </td>
                   <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                     ${order.salePrice*order.quantity} USD
                   </td>
                 </tr>
   
                 )
   
                  })}
                 
                
                 </tbody>
                 <tfoot>
                   <tr>
                     <th
                       scope="row"
                       colSpan={3}
                       className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                     >
                       Subtotal
                     </th>
                     <th
                       scope="row"
                       className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                     >
                       Subtotal
                     </th>
                     <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                       ${Subtotal}
                     </td>
                   </tr>
                   <tr>
                     <th
                       scope="row"
                       colSpan={3}
                       className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                     >
                       Discount
                     </th>
                     <th
                       scope="row"
                       className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                     >
                       Discount
                     </th>
                     <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                       $0.00
                     </td>
                   </tr>
                   <tr>
                     <th
                       scope="row"
                       colSpan={3}
                       className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                     >
                       Shipping
                     </th>
                     <th
                       scope="row"
                       className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                     >
                       Shipping
                     </th>
                     <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                       $0.00
                     </td>
                   </tr>
                   <tr>
                     <th
                       scope="row"
                       colSpan={3}
                       className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                     >
                       Tax
                     </th>
                     <th
                       scope="row"
                       className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                     >
                       Tax
                     </th>
                     <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                       $0.00
                     </td>
                   </tr>
                   <tr>
                     <th
                       scope="row"
                       colSpan={3}
                       className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                     >
                       Total
                     </th>
                     <th
                       scope="row"
                       className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                     >
                       Total
                     </th>
                     <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                       $0.00
                     </td>
                   </tr>
                 </tfoot>
               </table>
             </div>
           </div>
 
         </div>
       </article>
     </Card>
  )
}

export default CartBill