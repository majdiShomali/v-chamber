import React from "react";

const ProductPageSkeleton = () => {
  return (
    <div className=" animate-puls bg-gray-100 w-full py-8 min-h-[90vh] flex items-center justify-center flex-col lg:flex-row">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className=" relative rounded-lg bg-gray-500 mb-4 w-96 h-96">
              <div class="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  class="w-24 h-24 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>

              {/* <div className="absolute top-3 right-3">
        {localStorage.auth && user?._id && selectedProduct?._id ? (
          <CardRating
            Item={selectedProduct}
            CardId={selectedProduct?._id}
            UserId={user?._id}
          />
        ) : null}
      </div>
       */}
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[15rem] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 min-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="text-gray-600">In Stock</span>
              </div>
            </div>

            <div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>

              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>

            <span className="font-bold text-gray-700">Related Products</span>

            <div className="w-full flex flex-wrap  items-center ">
              <>
                <div className="mt-5">
                  <div class="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full  dark:bg-gray-700">
                    <svg
                      class="w-5 h-5 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              </>
            </div>

            <div className="flex -mx-2 my-10">
              <div className="w-1/2 px-2">
                <>
                  <div class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </>
              </div>
              <div className="w-1/2 px-2">
                <>
                  <div class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
