import ItemCard from '../../components/cards/ItemCard'

import React from "react";
import { useState,useEffect,useContext } from "react";
import { CartContext } from "../../context/cartContext";
import axios from "axios";
const Store = () => {
  const [items,setItems] = useState([])
  const [allItems,setItemsAllItems] = useState([])
const {cartNavRefresh,setCartNavRefresh} =useContext(CartContext)
 
const getAll = async() =>{
  try {
    const response = await axios.get('http://localhost:5000/api/allItems')
    setItemsAllItems(response.data)
    localStorage.setItem('Allitems', JSON.stringify(response.data))  
  } catch (error) {
    console.log(error.message)
  }
  
    }
  
    useEffect(() => {
      getAll()
      const storedItems = localStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    }, []);
  return (
    <>
    <ItemCard
    Items={allItems}
    />
    </>
  )
}

export default Store