import ItemCard from '../../components/cards/ItemCard'
import React from "react";
import { useState,useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../actions/GetItems";

const ItemsStore = () => {
  const dispatch = useDispatch();

  const {
    loading: isLoading,
    data: itemsData,
    error: fetchError,
  } = useSelector((state) => state.fetchItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);


  return (
    <>
    <ItemCard
    Items={itemsData}
    />
    </>
  )
}

export default ItemsStore