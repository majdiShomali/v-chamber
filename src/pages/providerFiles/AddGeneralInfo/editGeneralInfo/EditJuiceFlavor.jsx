import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { mdiFileEdit, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { fetchRelatedItem } from "../../../../actions/related/GetRelatedItems";
import { UserContext } from "../../../../context/userContext";
import { useContext } from "react";

import { useDispatch } from "react-redux";
import { fetchJuiceFlavorByCategory } from "../../../../actions/juice/GetJuiceFlavorByCategory";
import { useEffect } from "react";

const EditJuiceFlavor = ({item,ItemData}) => {
    const ApiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(UserContext);
  
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
  
    const [Flavor, setFlavor] = useState("");
    useEffect(() =>{
        if(item){
            setFlavor(item.flavor)
        }
       },[item])

    const handleSubmit = async (e) => {
      e.preventDefault();
  
    
      const data ={
        flavor:Flavor,
      }
      axios
        .put(`${ApiUrl}/updateJuiceFlavor/${item._id}`, data)
        .then(function () {
          dispatch(fetchRelatedItem(ItemData._id));
         dispatch(fetchJuiceFlavorByCategory(ItemData._id));
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

  return (
    <div className="w-full">
    <div className="flex items-center justify-start">
      <Icon
        onClick={handleOpen}
        className="cursor-pointer"
        path={mdiFileEdit}
        size={1}
        color="blue"
      />
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex flex-col w-full h-full ">
          <div className="flex flex-col">
            <div className="flex items-center my-5 mx-5 gap-5">
              <Input
                className=" "
                type="text"
                label="Flavor"
                value={Flavor}
                required
                onChange={(e) => setFlavor(e.target.value)}
              />
            </div>

          </div>

          <Button
            onClick={handleSubmit}
            className=" mx-5 my-1 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
            variant="text"
          >
            Edit
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

export default EditJuiceFlavor