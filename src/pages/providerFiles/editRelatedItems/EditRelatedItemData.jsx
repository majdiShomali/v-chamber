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
  width: 400,
  bgcolor: "background.paper",
  border: " solid #f2f2f2",
  boxShadow: 3,
  p: 4,
};
const EditRelatedItemData = ({card}) => {
    const ApiUrl= process.env.REACT_APP_API_URL
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [OptionType, setOptionType] = useState("");
    const { user } = useContext(UserContext);

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 

   useEffect(()=>{
       setName(card.Name) 
       setDescription(card.description) 
       setOptionType(card.category) 
   },[card])

  
   const showSuccessAlert = (message) => {
       Swal.fire({
         title: message,
         icon: "success",
         confirmButtonText: "OK",
       }).then(() => {});
     };
 
   const handleSubmit = async (e) => {
       e.preventDefault();
    //   const UpdatedData={ 
    //         Name:name,
    //         description :description,
    //         category  :OptionType,
    //          }
    //    try {
    //      const response = await axios.put(`${ApiUrl}/updateItemData/${card._id}`,{UpdatedData});
    //      console.log(response.data);
    //      handleClose()
    //      showSuccessAlert(response.data.Name)
    //    } catch (error) {
    //      console.error(error);
    //    }
  
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
               <div className="mb-4 flex flex-col gap-6">
                 <Input
                   size="lg"
                   label="Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                 />
                 <Input
                   size="lg"
                   type="text"
                   label="Category"
                   value={OptionType}
                   onChange={(e) => setOptionType(e.target.value)}
                   required
                 />
   
   
   
                 <Textarea
                   size="lg"
                   label="description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
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

export default EditRelatedItemData