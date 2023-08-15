import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
// import { useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";
import Icon from '@mdi/react';
import { mdiImageEdit  } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderItems } from "../../actions/category/GetProviderItems";
import { fetchCategoryItems } from "../../actions/category/GetCategoryItems";

import {
    Card,
    Input,
    // Checkbox,
    Button,
    Textarea,
    // Typography,
  } from "@material-tailwind/react";
  import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: " solid #f2f2f2",
  boxShadow: 3,
  p: 4,
};

const EditCategoryImageProvider = ({category}) => {
    const ApiUrl= process.env.REACT_APP_API_URL
    const { user } = useContext(UserContext);

    const dispatch = useDispatch();
      


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [productImage, setProductImage] = useState(null);
    const handleProductImageChange = (event) => {
      setProductImage(event.target.files[0]);
    };
  
    const showSuccessAlert = (message) => {
        Swal.fire({
          title: message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {});
      };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData()
      formData.append('image',productImage)
  
      axios
        .put(`${ApiUrl}/updateItemImage/${category._id}`,
        formData
        )
        .then(function (response) {
          console.log(response);
          showSuccessAlert(response.data.Name)
          dispatch(fetchProviderItems(user._id));
          dispatch(fetchCategoryItems());
          handleClose()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  return (
    <div className="w-full">

 <Icon
 onClick={handleOpen}
 color={"blue"} path={mdiImageEdit } size={1.5}  className='absolute top-16 right-5 z-10 hover:scale-110 hover:cursor-pointer'/>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <form onSubmit={handleSubmit} className="  ">
            <div className="mb-4 flex flex-col gap-6">
         
      

              <Input
                size="lg"
                type="file"
                name="image"
                label="image"
                onChange={handleProductImageChange}
                accept="image/*"
                required
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

export default EditCategoryImageProvider