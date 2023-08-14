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

import { fetchCompaniesByCategory } from "../../../actions/company/GetCompaniesByCategory";
import { useDispatch } from "react-redux";

const AddCompany = ({ item }) => {
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

  const [productImage, setProductImage] = useState(null);
  const [name, setName] = useState("");

  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("category", item?.category);
    formData.append("categoryId", item?._id);
    formData.append("ProviderId", user?._id);
    formData.append("image", productImage);

    axios
      .post(`${ApiUrl}/addCompany`, formData)
      .then(function () {
        dispatch(fetchRelatedItem(item._id));
        dispatch(fetchCompaniesByCategory(item?._id));
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
        <p>Add Company</p>
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
                  label="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex my-5 mx-5 items-center gap-5">
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
  );
};

export default AddCompany;
