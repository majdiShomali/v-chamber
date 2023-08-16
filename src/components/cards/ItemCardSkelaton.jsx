import { Card } from "@material-tailwind/react";
import React from "react";
const Items = [1, 2, 3];
const ItemCardSkelaton = () => {
  return (
    <>
      <div
        className="w-full flex flex-wrap gap-3 justify-center"

      >
        {Items?.map((card) => {
          return (
            <Card
              // onClick={()=>handleShowItem(card)}

              className=" cursor-pointer animate-pulse flex flex-col items-center justify-center mx-2 h-full w-72  hover:scale-105"
            >
              <div className="container">
                <div className=" w-full bg-gray-900  rounded-xl p-6">
                  <div className="flex flex-col ">
                    <div className="">
                      <div className="relative h-56 w-full mb-3">
                        <div class="flex items-center justify-center h-48 bg-gray-300 rounded  dark:bg-gray-700">
                          <svg
                            class="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-auto justify-evenly">
                        <div className="flex flex-wrap ">
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>

                          <div className="flex items-center w-full justify-between min-w-0 ">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 "></div>
                          </div>
                        </div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ItemCardSkelaton;
