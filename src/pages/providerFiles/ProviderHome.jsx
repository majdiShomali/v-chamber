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
const ProviderHome = () => {
    const { user, setUser } = useContext(UserContext);
    const [productImage, setProductImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [Quantity, setQuantity] = useState(null);
    const [description, setDescription] = useState("");

    const handleProductImageChange = (event) => {
      setProductImage(event.target.files[0]);
    };

    const handleAddItem= async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("price", price);
        formData.append("salePrice", salePrice);
        formData.append("description", description);
        formData.append("image", productImage);
        formData.append("ProviderId", user._id);
        formData.append("totalQuantity", Quantity);
         try {
            const response = await axios.post('http://localhost:5000/api/items',formData)
             } catch (error) {
            console.log(error.message)
             }
    }

  return (
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
          <Input size="lg" label="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />


          <div className='flex w-full'>
          <Input size="md" label="Price"
          type='number'
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          />
          <Input size="md" label="sale Price"
          type='number'
          value={salePrice}
          onChange={(e)=>setSalePrice(e.target.value)}
          />
          </div>
    
          <Input size="lg" label="Quantity"
          value={Quantity}
          type='number'
          onChange={(e)=>setQuantity(e.target.value)}
          />
                    <select
              className="px-4 py-3 w-full  rounded-md bg-gray-100 border-[#E8AA42] border-2 focus:border-yellow-600 focus:bg-white focus:ring-0 text-sm appearance "
              // value={yourSelectedStateValueType}
              // onChange={(e) => {
              //   setOptionType(e.target.value);
              //   handleFilterChange(
              //     e.target.value,
              //     yourSelectedStateValueAddress
              //   );
              // }}
            >
              <option value=""> All ingredients</option>
              <option value="vegetables">vegetables</option>
              <option value="fruit">fruit</option>
            </select>
          <textarea className='border border-2' 
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />
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
  )
}

export default ProviderHome