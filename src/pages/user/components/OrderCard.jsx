import React, { useEffect, useState } from "react";

const OrderCard = ({ Orders }) => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const [selectedImage, setSelectedImage] = useState("");

  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if (Orders?.itemsCartDataLocal?.length > 0) {
      setSelectedProduct(Orders?.itemsCartDataLocal[0]);
      setSelectedImage(Orders?.itemsCartDataLocal[0]?.image);
    }
  }, [Orders]);

  return (
    <>
      <>
        <div
          key={Orders?._id}
          className="bg-gray-100 py-8  flex items-center justify-center flex-col lg:flex-row"
        >
          <div className="max-w-2xl ">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:flex-1 px-4">
                <div className=" rounded-lg bg-gray-300 ">
                  <img
                    className="w-full h-full object-cover"
                    src={`${ImagesUrl}/${selectedImage}`}
                    alt="ProductImage"
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct?.Name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt.
                </p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700">Price:</span>
                    <span className="text-gray-600">
                      ${selectedProduct?.price}
                    </span>
                  </div>
                </div>
                {selectedProduct?.color ? (
                  <>
                    <div className="mb-4">
                      <span className="font-bold text-gray-700">
                        Select by Color:
                      </span>
                      <div className="flex items-center mt-2">
                        {Orders?.itemsCartDataLocal?.map((product) => {
                          return (
                            <button
                              key={product?._id}
                              onClick={() => {
                                setSelectedProduct(product);
                                setSelectedImage(product.image);
                              }}
                              className="w-5 h-5  m-1 rounded-full"
                              style={{ backgroundColor: product.color }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}

                <div>
                  <span className="font-bold text-gray-700">
                    Product Description:
                  </span>
                  <p className="text-gray-600 text-sm mt-2">
                    {selectedProduct?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default OrderCard;
