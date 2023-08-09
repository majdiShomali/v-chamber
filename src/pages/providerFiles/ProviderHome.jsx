import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";

import axios from "axios";

import ItemCardProvider from "../../components/cards/ItemCardProvider"

const ProviderHome = () => {
  const { user, setUser } = useContext(UserContext);
  const [productImage, setProductImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [OptionType, setOptionType] = useState("none");



  

  const [item, setItem] = useState([])
  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [isColorChecked, setIsColorChecked] = useState(false);
  const handleCheckboxColorChange = () => {
    setIsColorChecked(!isColorChecked);
    if(isColorChecked){
      setSelectedColor('#000000')
    }
  };
 

 
  const [selectedSize, setSelectedSize] = useState('');
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  const [isSizeChecked, setIsSizeChecked] = useState(false);
  const handleCheckboxSizeChange = () => {
    setIsSizeChecked(!isSizeChecked);
    if(isSizeChecked){
      setSelectedSize('')
    }
  };
  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("price", price);
    formData.append("salePrice", salePrice);
    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("ProviderId", user._id);
    formData.append("totalQuantity", Quantity);
    formData.append("category", OptionType);
    formData.append("isColorChecked", isColorChecked);
    formData.append("isSizeChecked", isSizeChecked);
    formData.append("selectedColor", selectedColor);
    formData.append("selectedSize", selectedSize);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/items",
        formData
      );
      setItem([response.data])
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className="w-full   mt-10">
      <Card color="transparent" >
        {/* <Typography variant="h4" color="blue-gray">
          Add new Product
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter Product details.
        </Typography> */}
        <div className="flex w-full justify-center gap-10">
        <form onSubmit={handleAddItem} className="mt-8 mb-2 w-1/3">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex w-full">
              <Input
                size="md"
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                size="md"
                label="sale Price"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>

            <Input
              size="lg"
              label="Quantity"
              value={Quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />

            <textarea
              className="border border-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="file-upload-input mx-auto"
              type="file"
              name="image"
              onChange={handleProductImageChange}
              accept="image/*"
              required
            />

            <select
              className="px-4 py-3 w-full  rounded-md bg-gray-100  border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance "
              value={OptionType}
              onChange={(e) => {
                setOptionType(e.target.value);
              }}
            >
              <option value="none"> default</option>
              <option value="colors">Colors</option>
              <option value="size">Size</option>
            </select>
            {OptionType === "colors" ? (
              <Input
                type="color"
                variant="h6"
                component="h2"
                className="-py-0  m-0"
                value={selectedColor}
                onChange={handleColorChange}
              />
            ) : null}

{OptionType === "size" ? (

<div>
      <h2>Select Size:</h2>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="sm"
            checked={selectedSize === 'sm'}
            onChange={handleSizeChange}
            className="form-radio text-sm"
          />
          <span className="ml-2">Small (sm)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="md"
            checked={selectedSize === 'md'}
            onChange={handleSizeChange}
            className="form-radio text-md"
          />
          <span className="ml-2">Medium (md)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="xl"
            checked={selectedSize === 'xl'}
            onChange={handleSizeChange}
            className="form-radio text-xl"
          />
          <span className="ml-2">Extra Large (xl)</span>
        </label>
      </div>
    </div>
): null}


          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Create Product
          </Button>
        </form>

        <form onSubmit={handleAddItem} className="mt-8 mb-2 w-1/3">
          <div className="mb-4 flex flex-col gap-6">
 

    
       <div>
      <h2>Select Color:</h2>
      <div className="flex space-x-4 flex-col">
    
        <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={isColorChecked}
          onChange={handleCheckboxColorChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
          <span className="ml-2">add color</span>
        </label>
        {isColorChecked ? 
          <label className="inline-flex items-center">
          <Input
          type="color"
          variant="h6"
          component="h2"
          className="-py-0  m-0"
          value={selectedColor}
          onChange={handleColorChange}
        />
  </label>
         : null}
      
      </div>
    </div>



<div>
      <h2>Select Size:</h2>
      <div className="flex space-x-4 flex-col">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={isSizeChecked}
          onChange={handleCheckboxSizeChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
          <span className="ml-2">add size</span>
        </label>

        {isSizeChecked ? 
        
        <>
            <label className="inline-flex items-center">
          <input
            type="radio"
            value="sm"
            checked={selectedSize === 'sm'}
            onChange={handleSizeChange}
            className="form-radio text-sm"
          />
          <span className="ml-2">Small (sm)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="md"
            checked={selectedSize === 'md'}
            onChange={handleSizeChange}
            className="form-radio text-md"
          />
          <span className="ml-2">Medium (md)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="xl"
            checked={selectedSize === 'xl'}
            onChange={handleSizeChange}
            className="form-radio text-xl"
          />
          <span className="ml-2">Extra Large (xl)</span>
        </label>
        
        </>
        
        
        : null}
    
      </div>
    </div>



          </div>

      
        </form>
        </div>

      </Card>

     
    </section>
    
    
    
    <ItemCardProvider
      Items={item}
      />
    </>
  
  );
};

export default ProviderHome;
