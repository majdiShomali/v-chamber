import React from 'react'

const Orders = () => {
  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          
    <div className="flex flex-col w-full ">
 
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">Orders</h4>
        <div className="m-5">
        {/* <ItemCard
          Items={favoriteItems}
                   /> */}
        </div>
        <div className="mt-4">
          <canvas
            id="verticalBarChart"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: 414,
              width: 828,
            }}
            width={1656}
            height={828}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Orders