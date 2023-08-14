import React, { useState } from 'react';
import { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Gallery = ({AllRelatedItemData,setSelectedProduct,selectedProduct}) => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
    setSelectedProduct(AllRelatedItemData[index]);
  };
  useEffect(() =>{
    const index0 = AllRelatedItemData?.findIndex(item => item._id === selectedProduct?._id);

    if (index0 !== -1) {
      console.log(`Index of object with _id ${selectedProduct?._id}: ${index0}`);
      setActiveIndex(index0)
    } else {
      console.log(`Object with _id ${selectedProduct?._id} not found.`);
    }
  },[AllRelatedItemData,selectedProduct])

  return (
    <div className="max-w-[15rem] min-h-[25rem] ">
      <Carousel
        showThumbs={false}
        selectedItem={activeIndex}
        onChange={handleSlideChange}
      >

        {AllRelatedItemData?.map((item)=>{
          return(
        <>
        
        <div className=''>
          <div className="w-full aspect-w-1 aspect-h-1 ">
            <img
            src={`${ImagesUrl}/${item.image}`}   
           alt={item.image}
              className="w-full h-full object-cover "
            />
          </div>
        </div>
        
        
        </>

          )
        })}
 
      </Carousel>
    </div>
  );
}

export default Gallery;
