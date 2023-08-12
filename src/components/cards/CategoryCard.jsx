import React from 'react'

const CategoryCard = ({category}) => {
    const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  return (
    <div
    className=" w-96 h-72  p-4 hover:scale-110 hover:cursor-pointer">
    <div className="relative rounded-lg overflow-hidden">
      <img
        className="w-full h-full object-cover object-center"
        src={`${ImagesUrl}/${category?.image}`}
        alt="vegetables" />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
          {category?.category}
          
           
            </h2>
          <button
            className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
         
          >
          Show Products
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CategoryCard