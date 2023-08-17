import React from 'react'

const UserShowOrders = ({selectedOrder}) => {
    const ImagesUrl= process.env.REACT_APP_IMAGES_URL

  return (
    <>
   {selectedOrder.length > 0 ?
   
   <div className=" flex flex-wrap items-center justify-center  rounded-lg border bg-white px-2 py-4 sm:px-6  overflow-y-auto">
            {selectedOrder?.map((item) => {
              return (
                <div 
                key={item._id}
                className="justify-between w-80 h-52 mx-2 mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={`${ImagesUrl}/${item.image}`}
                    alt="productimage"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.Name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">{item.salePrice}$ usd</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
     
                   
                  
           
                   
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {item.salePrice * item.quantity}$ usd
                        </p>
               
                     
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
   
   : null}
    
          </>
  )
}

export default UserShowOrders