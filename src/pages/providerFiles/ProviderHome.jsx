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
  const [description, setDescription] = useState("");
  const [OptionType, setOptionType] = useState("");



  const [item, setItem] = useState([])
  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };



  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("ProviderId", user._id);
    formData.append("category", OptionType);

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
      <section className=" w-full h-[100vh] bg-gray-100 flex justify-center  ">
     
     
      <Card color="" 
      className="my-10 h-96"
      >
          
        <form onSubmit={handleAddItem} className=" p-10 ">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />


            <textarea
              className="border border-2"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              size="lg"
              type="file"
              name="image"
              label="image"
              onChange={handleProductImageChange}
              accept="image/*"
              required
            />

            <select
              className="px-4 py-3 w-full  rounded-md bg-gray-100  border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance "
              value={OptionType}
              required
              onChange={(e) => {
                setOptionType(e.target.value);
              }}
            >
              <option value=""> default</option>
              <option value="vapePuff">vape Puff</option>
              <option value="chargeVape">charge vape</option>
            </select>



          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Create Product
          </Button>
        </form>

       

      </Card>

     
    </section>
    
    
{/*     
    <ItemCardProvider
      Items={item}
      /> */}
    </>
  
  );
};

export default ProviderHome;
