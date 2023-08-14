import React from 'react'
import { Button } from "@material-tailwind/react";
import { HashLink } from 'react-router-hash-link';

const HeroImageTwo = () => {
  return (
    <div className='relative h-full w-full object-cover'>

    <section className="bg-gray-50 h-full w-full object-cover bg-cover bg-no-repeat bg-[url(https://images.pexels.com/photos/9694216/pexels-photo-9694216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] ">
<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
  <div className="mx-auto max-w-xl text-center">
    <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
      V-Chamber.
      <strong className="font-extrabold text-purple-500 sm:block">
        Increase Conversion.
      </strong>
    </h1>
    <p className="mt-4 text-white sm:text-xl/relaxed">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
      tenetur fuga ducimus numquam ea!
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
          <HashLink smooth={true} to="#TopProducts" >
           <Button
            className=" mb-10 border-solid border-purple-500 border-2 text-white hover:bg-purple-500 hover:text-[#ffffff]"
            variant="text"
          >
            Products
          </Button>
          </HashLink>
          <HashLink smooth={true} to="#SaleProducts">
          <Button
            className="mb-10 border-solid border-purple-500 border-2  bg-purple-500 hover:bg-purple-500 hover:scale-105 text-[#ffffff]"
            variant="text"
          >
            
            Top Sale
          </Button>
          </HashLink>
      {/* <a
        className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
        href="/about"
      >
        Learn More
      </a> */}

    </div>
  </div>
</div>
</section>
      
    </div>
  )
}

export default HeroImageTwo