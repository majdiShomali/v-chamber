import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { fetchRelatedItem } from "../../../actions/related/GetRelatedItems";
import CompanyInput from "../components/inputs/CompanyInput";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import JuiceSizeInput from "../components/inputs/JuiceSizeInput";
import JuiceNikotinInput from "../components/inputs/JuiceNikotinInput";
import JuiceTypeInput from "../components/inputs/JuiceTypeInput";
const AddJuice = ({ item }) => {
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

  const [selectedJuice, setSelectedJuice] = useState("");
  const handleJuiceChange = (event) => {
    setSelectedJuice(event.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("category", item?.category);
    formData.append("categoryId", item?._id);
    formData.append("ProviderId", user?._id);
    formData.append("image", productImage);
    formData.append("price", price);
    formData.append("salePrice", salePrice);
    formData.append("description", description);
    formData.append("totalQuantity", Quantity);
    formData.append("color", selectedColor);
    formData.append("selectedColor", selectedColor);
    formData.append("juice", selectedJuice);
    formData.append("company", selectedCompany);
    formData.append("size", selectedSize);
    formData.append("nikotin", selectedNikotin);
    formData.append("type", selectedType);
    axios
      .post(`${ApiUrl}/addRelatedItem`, formData)
      .then(function () {
        dispatch(fetchRelatedItem(item._id));
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
        <p>Add Product</p>
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

              <JuiceSizeInput onSelectChange={handleSelectSizeChange} categoryId={item?._id}/>
              <JuiceNikotinInput onSelectChange={handleSelectNikotinChange} categoryId={item?._id}/>
              <JuiceTypeInput onSelectChange={handleSelectTypeChange} categoryId={item?._id}/>
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
                <CompanyInput onSelectChange={handleSelectChange} categoryId={item?._id} />
              </div>

              <div className="flex items-center my-5 mx-5 gap-5">
                <Input
                  className=" "
                  size="all"
                  type="text"
                  label="Juice Flavor"
                  value={selectedJuice}
                  onChange={handleJuiceChange}
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
  );
};

export default AddJuice;
