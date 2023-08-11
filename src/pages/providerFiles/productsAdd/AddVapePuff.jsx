import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedItem } from "../../../actions/related/GetRelatedItems";

const AddVapePuff = ({item}) => {
    const ApiUrl = process.env.REACT_APP_API_URL;

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


    
      const dispatch = useDispatch();
    
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
      const [productImage, setProductImage] = useState(null);
      const [Quantity, setQuantity] = useState(0);
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice] = useState(0);
      const [salePrice, setSalePrice] = useState(0);
    
      const handleProductImageChange = (event) => {
        setProductImage(event.target.files[0]);
      };
    
      const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
      const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
      };
    
      const [selectedVapePuff, setSelectedVapePuff] = useState(0);
      const handleVapePuffChange = (event) => {
        setSelectedVapePuff(event.target.value);
      };
    

  
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("category", item?.category);
        formData.append("categoryId", item?._id);
        formData.append("image", productImage);
        formData.append("price", price);
        formData.append("salePrice", salePrice);
        formData.append("description", description);
        formData.append("totalQuantity", Quantity);
        formData.append("color", selectedColor);  
        formData.append("selectedColor", selectedColor);   
        formData.append("vapePuff", selectedVapePuff);
    
        axios
          .post(`${ApiUrl}/addRelatedItem`, formData)
          .then(function (response) {
            dispatch(fetchRelatedItem(item._id));
            handleClose();
          })
          .catch(function (error) {
            console.log(error);
          });
      };


  return (

    <div className="w-full">
    <Icon
      onClick={handleOpen}
      className="cursor-pointer"
      path={mdiPlus}
      size={1}
    />

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex flex-col w-full h-full ">
         
    <div className="flex flex-col">
    <Input
      className=" "
      type="text"
      label="name"
      value={name}
      required
      onChange={(e) => setName(e.target.value)}
    />

    <div className="flex items-center my-5 mx-5 gap-5">
  
        <Input
          className=" "
          size="all"
          type="number"
          label="vape-puff"
          value={selectedVapePuff}
          onChange={handleVapePuffChange}
          required
        />
     

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
      <Input
        className="file-upload-input"
        label="image"
        type="file"
        name="image"
        onChange={handleProductImageChange}
        accept="image/*"
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

  <Button
              onClick={handleSubmit}
              className=" mx-5 my-1 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
              variant="text"
            >
              Add
            </Button>
            <Button
              className=" mx-5 my-1  border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
              variant="text"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddVapePuff