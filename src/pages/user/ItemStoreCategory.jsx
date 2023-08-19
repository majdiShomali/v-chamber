import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedItem } from "../../actions/related/GetRelatedItems";
import ItemCard from "../../components/cards/ItemCard";
import StoreFilterByCategory from "../../components/filters/StoreFilterByCategory";
import ItemCardSkelaton from "../../components/cards/ItemCardSkelaton";
const ItemStoreCategory = () => {

    // const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

    const { id } = useParams();

    const [selectedFilterdItems, setSelectedFilterdItems] = useState([]);
    const handleSelectChange = (value) => {
      setSelectedFilterdItems(value);
    };
  
    const {
      loading: isRelatedItemLoading,
      data: AllRelatedItemData,
      // error: fetchAllRelatedItemError,
    } = useSelector((state) => state.fetchRelatedItems);

    const dispatch = useDispatch();
  
    useEffect(() => {
      if (id !== undefined) {
        dispatch(fetchRelatedItem(id));
      }
    }, [dispatch, id]);

        useEffect(() => {
         setSelectedFilterdItems(AllRelatedItemData)      
       }, [AllRelatedItemData]);
  

  return (
    <>
{id !== undefined ?
  <StoreFilterByCategory ProductItems={AllRelatedItemData} categoryId={id} updateFilteredArray={handleSelectChange} />
: null}

{isRelatedItemLoading ? 
<ItemCardSkelaton/>
: 
<div className=" lg:min-h-[50vh] flex  flex-col">
<ItemCard Items={selectedFilterdItems} />
</div>

}
   
  
      
    </>
  )
}

export default ItemStoreCategory