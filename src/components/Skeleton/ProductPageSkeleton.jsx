import React from 'react'

const ProductPageSkeleton = () => {
  return (
       <div className="animate-pulse bg-gray-100 py-8 min-h-[90vh] flex items-center justify-center flex-col lg:flex-row">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap items-center mb-5">
                <li className="mr-6">
                  <a
                    className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
                    href="#"
                  >
                    <span>Home</span>
                    <svg
                      className="ml-6"
                      width={4}
                      height={7}
                      viewBox="0 0 4 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mr-6">
                  <a
                    className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
                    href="#"
                  >
                    <span>Store</span>
                    <svg
                      className="ml-6"
                      width={4}
                      height={7}
                      viewBox="0 0 4 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
                    
                  >
                    
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <div className="flex items-center justify-center w-96 h-full bg-gray-300 rounded  dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                 
                    <button
                     
                      className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
                    >
                      
                    </button>
                 
                </div>
                <div className="w-1/2 px-2">
                 
                    <button
                      
                      className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
                    >
                      
                    </button>
                
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></h2>
              <p className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[600px] mb-2.5">
                
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></span>
                  <span className="text-gray-600"></span>
                </div>
                <div>
                  <span className="fh-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></span>
                  <span className="text-gray-600"></span>
                </div>
              </div>
              <div className="mb-4">
                <span className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></span>
                <div className="flex items-center mt-2">
                  <button className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  <button className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  <button className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  <button className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                </div>
              </div>
       
              <div>
                <span className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">
                 
                </span>
                <p className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5">
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductPageSkeleton