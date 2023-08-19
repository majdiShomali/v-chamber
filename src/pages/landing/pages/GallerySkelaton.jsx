import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GallerySkelaton = () => {
  return (
    <div className=" w-full h-full animate-pulse  ">
    <Carousel
      showThumbs={false}
    >
        <div className=' w-full h-96 flex items-center justify-center '>
     
        <svg class="w-52 h-52 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
        
        </div>

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
  )
}

export default GallerySkelaton