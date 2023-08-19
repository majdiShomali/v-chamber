import React, { useState } from 'react';
import { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Gallery = ({ProductStikersData,updateSelectedProductSticker,selectedProductSticker}) => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
 if(ProductStikersData.length === 1){
  setActiveIndex(0)
 }
  },[ProductStikersData])
  const handleSlideChange = (index) => {
    setActiveIndex(index);
    updateSelectedProductSticker(ProductStikersData[index]);
  };
  // useEffect(() =>{
  //   const index0 = ProductStikersData?.findIndex(item => item._id === ProductStikersData[activeIndex]?._id);

  //   if (index0 !== -1) {
  //     console.log(`Index of object with _id ${selectedProductSticker?._id}: ${index0}`);
  //     setActiveIndex(index0)
  //   } else {
  //     console.log(`Object with _id ${selectedProductSticker?._id} not found.`);
  //   }
  // },[ProductStikersData,selectedProductSticker])

  return (
    <div className=" w-full h-full">
    <Carousel
      showThumbs={false}
      selectedItem={activeIndex}
      onChange={handleSlideChange}
    >
      {ProductStikersData?.map((item) => (
        <div key={item.id} className=" w-full h-full ">
          <div className="w-full h-full  ">
            <img
              src={`${ImagesUrl}/${item.image}`}
              alt={item.image}
              className="w-full h-full  "
            />
          </div>
        </div>
      ))}
    </Carousel>
  
    <style>
      {`
        .carousel .control-prev.control-arrow,
        .carousel .control-next.control-arrow {
          background-color: blue;
          color: white;
          border-radius: 5%;
          padding: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
        }
  
        .carousel .control-prev.control-arrow {
          left: 0;
        }
  
        .carousel .control-next.control-arrow {
          right: 0;
        }
  
        .carousel .control-arrow:hover {
          background-color: gray; // Change the hover background color if needed
        }
      `}
    </style>
  </div>
  
  
  
  );
}

export default Gallery;
