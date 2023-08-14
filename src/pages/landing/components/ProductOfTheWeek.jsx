import React from 'react'
// import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
const ProductOfTheWeek = () => {
  return (
    <div data-aos="fade-left" className="px-6 py-12 text-center md:px-12 lg:text-left bg-gray-50 my-5 mx-5">
    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
      <div className="grid items-center lg:grid-cols-2">
        <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
            <h1 className="mt-2 mb-5 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>
          </div>
        </div>
        <div className="md:mb-12 lg:mb-0">
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            className="w-full h-1/2 rounded-lg shadow-lg dark:shadow-black/20"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductOfTheWeek