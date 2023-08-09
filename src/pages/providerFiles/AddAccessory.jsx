import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { fetchOneItem } from "../../actions/GetOneItem";
import { useDispatch, useSelector } from "react-redux";

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
const AddAccessory = ({ item }) => {
  const {
    loading: isItemLoading,
    data: itemData,
    error: fetchItemError,
  } = useSelector((state) => state.fetchOneItem);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productImage, setProductImage] = useState(null);

  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [selectedSize, setSelectedSize] = useState('md');
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("selectedSize", selectedSize);
    formData.append("selectedColor", selectedColor);
    formData.append("image", productImage);
    formData.append("itemAccessories", JSON.stringify(item.accessories));

    axios
      .put(`http://localhost:5000/api/updateProductAccessory/${item._id}`, formData)
      .then(function (response) {
        dispatch(fetchOneItem(item._id));
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
          <div className="flex flex-col">

          <>
            <label className="inline-flex items-center">
          <input
            type="radio"
            value="sm"
            checked={selectedSize === 'sm'}
            onChange={handleSizeChange}
            className="form-radio text-sm"
          />
          <span className="ml-2">Small (sm)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="md"
            checked={selectedSize === 'md'}
            onChange={handleSizeChange}
            className="form-radio text-md"
          />
          <span className="ml-2">Medium (md)</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="xl"
            checked={selectedSize === 'xl'}
            onChange={handleSizeChange}
            className="form-radio text-xl"
          />
          <span className="ml-2">Extra Large (xl)</span>
        </label>
        
        </>

            <br></br>

            <Input
              id="name"
              type="color"
              variant="h6"
              component="h2"
              className="m-5"
              value={selectedColor}
              onChange={handleColorChange}
            />

            <br></br>

            <input
              className="file-upload-input mx-auto"
              type="file"
              name="image"
              onChange={handleProductImageChange}
              accept="image/*"
              required
            />
            <br></br>

            <br></br>
            <Button
              onClick={handleSubmit}
              className=" m-5 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
              variant="text"
            >
              Add
            </Button>
            <Button
              className="m-5 border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
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

export default AddAccessory;
