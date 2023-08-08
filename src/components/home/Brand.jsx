import React from "react";

const Brand = () => {
  return (
    <>
      {/* ====== Brands Section Start */}
      <section className="bg-white w-full   ">
      
        <div className=" flex flex-col h-[40vh] justify-center items-center w-full">  
        <p className="text-5xl text-wrap text-center mb-20"> most popular companies</p>        
          <div className="flex flex-wrap ">
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://cdn.tailgrids.com/1.0/assets/images/brands/graygrids.svg"
                />
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://cdn.tailgrids.com/1.0/assets/images/brands/lineicons.svg"
                />
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://cdn.tailgrids.com/1.0/assets/images/brands/uideck.svg"
                />
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://cdn.tailgrids.com/1.0/assets/images/brands/ayroui.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Brands Section End */}
    </>
  );
};

export default Brand;

const SingleImage = ({ href, imgSrc, Alt }) => {
  return (
    <>
      <a
        href={href}
        className="mx-4 flex w-[150px] items-center justify-center  2xl:w-[180px]"
      >
        <img src={imgSrc} alt={Alt} className="w-full h-10" />
      </a>
    </>
  );
};
