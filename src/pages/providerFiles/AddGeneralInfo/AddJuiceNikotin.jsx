import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { fetchRelatedItem } from "../../../actions/related/GetRelatedItems";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";

import { fetchJuiceNikotin } from "../../../actions/juice/GetJuiceNikotin";
import { useDispatch, useSelector } from "react-redux";

const AddJuiceNikotin = ({item}) => {

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
  
    const { data: allJuiceNikotin } = useSelector(
      (state) => state.fetchJuiceNikotin
    );
    console.log(allJuiceNikotin)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [nikotin, setNikotin] = useState("");
  

    const handleSubmit = async (e) => {
      e.preventDefault();
  
    
      const data ={
        nikotin:nikotin,
        category:item?.category,
        categoryId:item?._id,
        ProviderId:user?._id,

      }
      axios
        .post(`${ApiUrl}/addJuiceNikotin`, data)
        .then(function () {
          dispatch(fetchRelatedItem(item._id));
          dispatch(fetchJuiceNikotin());
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
        path={mdiPlus}
        size={1}
      />
      <p>Add Juice Nikotin</p>
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
                label="nikotin"
                value={nikotin}
                required
                onChange={(e) => setNikotin(e.target.value)}
              />
            </div>

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

export default AddJuiceNikotin