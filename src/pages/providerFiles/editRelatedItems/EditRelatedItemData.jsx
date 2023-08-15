import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
// import { useNavigate } from "react-router";
import { UserContext } from "../../../context/userContext";
import Icon from '@mdi/react';
import { mdiFileEdit } from '@mdi/js';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchRelatedItem } from "../../../actions/related/GetRelatedItems";

import CompanyInput from "../components/inputs/CompanyInput";
import JuiceSizeInput from "../components/inputs/JuiceSizeInput";
import JuiceNikotinInput from "../components/inputs/JuiceNikotinInput";
import JuiceTypeInput from "../components/inputs/JuiceTypeInput";
import JuiceFlavorInput from "../components/inputs/JuiceFlavorInput"
import {
    // Card,
    Input,
    // Checkbox,
    Button,
    Textarea,
    // Typography,
  } from "@material-tailwind/react";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: " solid #f2f2f2",
    boxShadow: 3,
    p: 2,
  };
const EditRelatedItemData = ({item}) => {
    const ApiUrl= process.env.REACT_APP_API_URL
  const dispatch =useDispatch()
    const [Quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);


    const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
    const handleColorChange = (event) => {
      setSelectedColor(event.target.value);
    };

    const [selectedCompany, setSelectedValue] = useState("");
    const handleSelectChange = (value) => {
      setSelectedValue(value);
    };
  
    const [selectedSize, setSelectedSizeValue] = useState("");
    const handleSelectSizeChange = (value) => {
      setSelectedSizeValue(value);
    };
  
    const [selectedNikotin, setSelectedNikotinValue] = useState("");
    const handleSelectNikotinChange = (value) => {
      setSelectedNikotinValue(value);
    };
  
    const [selectedType, setSelectedTypeValue] = useState("");
    const handleSelectTypeChange = (value) => {
      setSelectedTypeValue(value);
    };
    const [selectedFlavor, setSelectedFlavorValue] = useState("");
    const handleSelectFlavorChange = (value) => {
      setSelectedFlavorValue(value);
    };
  


   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 

   useEffect(()=>{
     
      setQuantity(item.totalQuantity)
      setName(item.Name)
      setDescription(item.description)
      setPrice(item.price)
      setSalePrice(item.salePrice)
      setSelectedColor(item.color)
      handleSelectChange(item.company)
      setSelectedSizeValue(item.size)
      setSelectedNikotinValue(item.nikotin)
      setSelectedTypeValue(item.type)
      setSelectedFlavorValue(item.flavor)

   },[])
  
   const showSuccessAlert = (message) => {
       Swal.fire({
         title: message,
         icon: "success",
         confirmButtonText: "OK",
       }).then(() => {});
     };
 
   const handleSubmit = async (e) => {
       e.preventDefault();
      const UpdatedData={ 
            totalQuantity:Quantity,
            Name:name,
            description:description,
            price:price,
            salePrice:salePrice,
            color:selectedColor,
            company:selectedCompany,
            size:selectedSize,
            nikotin:selectedNikotin,
            type:selectedType,
            flavor:selectedFlavor,
             }
             console.log(UpdatedData)
       try {
         const response = await axios.put(`${ApiUrl}/updateRelatedItemData/${item._id}`,{UpdatedData});
         console.log(response.data);
         dispatch(fetchRelatedItem(item.categoryId))
         handleClose()
         showSuccessAlert(response.data.Name)
       } catch (error) {
         console.error(error);
       }
  
     }
  return (
    <div className="w-full">

    <Icon
    onClick={handleOpen}
    color={"blue"} path={mdiFileEdit} size={1.5}  className='absolute top-5 right-5 z-10 hover:scale-110 hover:cursor-pointer'/>
   
       <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
         <Box sx={style}>
         <form onSubmit={handleSubmit} className="  ">
         <div className="flex flex-col">

<div className="flex items-center my-5 mx-5 gap-5">

  <JuiceSizeInput onSelectChange={handleSelectSizeChange} categoryId={item?.categoryId} valueEd={selectedSize}/>
  <JuiceNikotinInput onSelectChange={handleSelectNikotinChange} categoryId={item?.categoryId} valueEd={selectedNikotin}/>
  <JuiceTypeInput onSelectChange={handleSelectTypeChange} categoryId={item?.categoryId} valueEd={selectedType}/>
  <JuiceFlavorInput onSelectChange={handleSelectFlavorChange} categoryId={item?.categoryId} valueEd={selectedFlavor}/>
  </div>


  <div className="flex items-center my-5 mx-5 gap-5">
    <Input
      className=" "
      type="text"
      label="name"
      value={name}
      required
      onChange={(e) => setName(e.target.value)}
    />
    <CompanyInput onSelectChange={handleSelectChange} categoryId={item?.categoryId} valueEd={selectedCompany} />
  </div>

  <div className="flex items-center my-5 mx-5 gap-5">
    {/* <Input
      className=" "
      size="all"
      type="text"
      label="Juice Flavor"
      value={selectedJuice}
      onChange={handleJuiceChange}
      required
    /> */}

    <Input
      className=""
      label="Quantity"
      value={Quantity}
      type="number"
      onChange={(e) => setQuantity(e.target.value)}
      required
    />
  </div>

  <div className="flex my-5 mx-5 items-center gap-5">
    <Input
      label="Price"
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
    />
    <Input
      label="sale Price"
      type="number"
      value={salePrice}
      onChange={(e) => setSalePrice(e.target.value)}
      required
    />
  </div>

  <div className="flex my-5 mx-5 items-center gap-5">
    <Input
      className=""
      label="color"
      id="name"
      type="color"
      value={selectedColor}
      onChange={handleColorChange}
      required
    />

  </div>

  <textarea
    className="border border-2 my-1 mx-5"
    placeholder="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>
   
      
               <br></br>
               <div className="flex justify-between">
             <Button
               type="submit"
               className=" w-28 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
               variant="text"
             >
               Edit
             </Button>
             <Button
               className=" w-28 border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
               variant="text"
               onClick={handleClose}
             >
               Cancel
             </Button>
             </div>
             </form>
         </Box>
       </Modal>
     </div>
  )
}

export default EditRelatedItemData