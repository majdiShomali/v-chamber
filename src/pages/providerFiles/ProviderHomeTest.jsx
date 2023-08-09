import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState, useEffect, useContext } from "react";
  import { UserContext } from "../../context/userContext";

  import axios from 'axios';

const ProviderHomeTest = () => {


    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color
    const [productImage, setProductImage] = useState(null);
    const [data,setData]=useState([])

    const handleColorChange = (event) => {
      setSelectedColor(event.target.value);
    };
    
    const handleProductImageChange = (event) => {
        setProductImage(event.target.files[0]);
      };
    
      const handleAddItem= async (e)=>{
        e.preventDefault()
        setData(prev => [...prev,selectedColor ])
        console.log(productImage,selectedColor)
        // const formData = new FormData();
        // formData.append("Name", name);
        // formData.append("price", price);
        // formData.append("salePrice", salePrice);
        // formData.append("description", description);
        // formData.append("image", productImage);
        // formData.append("ProviderId", user._id);
        // formData.append("totalQuantity", Quantity);
        //  try {
        //     const response = await axios.post('http://localhost:5000/api/items',formData)
        //      } catch (error) {
        //     console.log(error.message)
        //      }
    }

  return (

    <>
    
    <section className='w-full flex justify-center mt-10'>

<Card color="transparent" shadow={false}>
  <Typography variant="h4" color="blue-gray">
    Add new Product
  </Typography>
  <Typography color="gray" className="mt-1 font-normal">
    Enter Product details.
  </Typography>
  <form onSubmit={handleAddItem} className="mt-8 mb-2 w-xl">
    <div className="mb-4 flex flex-col gap-6">
    


  

      {/* <Input size="lg" label="Quantity"
      value={Quantity}
      type='number'
      onChange={(e)=>setQuantity(e.target.value)}
      /> */}
     
     <div className="flex items-center">
    <input
      type="color"
      value={selectedColor}
      onChange={handleColorChange}
      className="mr-4"
    />
    <div
      style={{ backgroundColor: selectedColor }}
      className="w-16 h-16 rounded border border-gray-400"
    ></div>
  </div>
    

    
      <input
              className="file-upload-input mx-auto"
              type="file"
              name="image"
              onChange={handleProductImageChange}
              accept="image/*"
              required
            />
    </div>

    <Button type='submit' className="mt-6" fullWidth>
      Create Product
    </Button>
    
  </form>
</Card>
</section>
    
    
    
    </>




  )
}

export default ProviderHomeTest