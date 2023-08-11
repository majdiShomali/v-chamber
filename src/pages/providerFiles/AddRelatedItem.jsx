import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { Input, Button } from "@material-tailwind/react";
// import axios from "axios";
// import { useState } from "react";
// // import { useNavigate } from "react-router";
// // import { UserContext } from "../../context/userContext";
// import { mdiPlus } from "@mdi/js";
// import Icon from "@mdi/react";
// // import { fetchOneItem } from "../../actions/category/GetOneItem";
// import { useDispatch } from "react-redux";
// // import { fetchRelatedItem } from "../../actions/related/GetRelatedItems";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   border: " solid #f2f2f2",
//   boxShadow: 3,
//   p: 2,
// };
const AddRelatedItem = () => {
  // const ApiUrl= process.env.REACT_APP_API_URL
  // const ReactUrl= process.env.REACT_APP_API_REACT_URL
 
  // const [isColorChecked, setIsColorChecked] = useState(false);
  // const [isSizeChecked, setIsSizeChecked] = useState(false);
  // const [isVapePuffChecked, setIsVapePuffChecked] = useState(false);
  // const [isChargeVapeChecked, setIsChargeVapeChecked] = useState(false);
  // const [isJuiceChecked, setIsJuiceChecked] = useState(false);

  // useEffect(() => {
  //   switch (item?.category) {
  //     case "vapePuff":
  //       setIsVapePuffChecked(true);
  //       setIsSizeChecked(true);
  //       setIsChargeVapeChecked(false);
  //       setIsJuiceChecked(false);
  //       break;
  //     case "chargeVape":
  //       setIsChargeVapeChecked(true);
  //       setIsSizeChecked(true);
  //       setIsVapePuffChecked(false);
  //       setIsJuiceChecked(false);
  //       break;
  //     case "juice":
  //       setIsJuiceChecked(true);
  //       setIsSizeChecked(true);
  //       setIsVapePuffChecked(false);
  //       setIsChargeVapeChecked(false)
  //       break;

  //     default:
  //   }
  // }, [item]);

  // const {
  //   loading: isItemLoading,
  //   data: itemData,
  //   error: fetchItemError,
  // } = useSelector((state) => state.fetchOneItem);

  // const dispatch = useDispatch();

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const [productImage, setProductImage] = useState(null);
  // const [Quantity, setQuantity] = useState(0);
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [salePrice, setSalePrice] = useState(0);

  // const handleProductImageChange = (event) => {
  //   setProductImage(event.target.files[0]);
  // };

  // const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  // const handleColorChange = (event) => {
  //   setSelectedColor(event.target.value);
  // };

  // const [selectedVapePuff, setSelectedVapePuff] = useState(0);
  // const handleVapePuffChange = (event) => {
  //   setSelectedVapePuff(event.target.value);
  // };

  // const [selectedSize, setSelectedSize] = useState("");
  // const handleSizeChange = (event) => {
  //   setSelectedSize(event.target.value);
  // };
  // const [selectedChargeVape, setSelectedChargeVape] = useState("");
  // const handleChargeVapeChange = (event) => {
  //   setSelectedChargeVape(event.target.value);
  // };

  // const [selectedJuice, setSelectedJuice] = useState("");
  // const handleJuiceChange = (event) => {
  //   setSelectedJuice(event.target.value);
  // };

  // const handleSubmit = async (e) => {
    // e.preventDefault();

    // const formData = new FormData();
    // formData.append("category", item?.category);
    // formData.append("itemId", item?._id);
    // formData.append("image", productImage);
    // formData.append("Name", name);
    // formData.append("price", price);
    // formData.append("salePrice", salePrice);
    // formData.append("description", description);
    // formData.append("totalQuantity", Quantity);
    // formData.append("selectedChargeVape", selectedChargeVape);

    // formData.append("selectedColor", selectedColor);
    // formData.append("isColorChecked", isColorChecked);

    // formData.append("selectedVapePuff", selectedVapePuff);
    // formData.append("isVapePuffChecked", isVapePuffChecked);

    // formData.append("selectedSize", selectedSize);
    // formData.append("isSizeChecked", isSizeChecked);

    // formData.append("selectedJuice", selectedJuice);
    // formData.append("isJuiceChecked", isJuiceChecked);


    // axios
    //   .post(`${ApiUrl}/addRelatedItem`, formData)
      // .then(function () {
      //   // dispatch(fetchOneItem(item._id));
      //   dispatch(fetchRelatedItem(item._id));

      //   handleClose();
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  // };

  //   const showSuccessAlert = (message) => {
  //     Swal.fire({
  //       title: message,
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     }).then(() => {});
  //   };
 

  return (
    <></>
    // <div className="w-full">
    //   <Icon
    //     onClick={handleOpen}
    //     className="cursor-pointer"
    //     path={mdiPlus}
    //     size={1}
    //   />

    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //       <div className=" flex flex-col w-full h-full ">
           
    //         <div className="flex flex-col">
    //           <Input
    //             className=" "
    //             type="text"
    //             label="name"
    //             value={name}
    //             required
    //             onChange={(e) => setName(e.target.value)}
    //           />

    //           <div className="flex items-center my-5 mx-5 gap-5">
    //             {isVapePuffChecked ? (
    //               <Input
    //                 className=" "
    //                 size="all"
    //                 type="number"
    //                 label="vape-puff"
    //                 value={selectedVapePuff}
    //                 onChange={handleVapePuffChange}
    //                 required
    //               />
    //             ) : null}
    //             {isJuiceChecked ? (
    //               <Input
    //                 className=" "
    //                 size="all"
    //                 type="text"
    //                 label="Juice"
    //                 value={selectedJuice}
    //                 onChange={handleJuiceChange}
    //                 required
    //               />
    //             ) : null}

    //             {isChargeVapeChecked ? (
    //               <select
    //                 className="px-4 py-3 w-full  rounded-md bg-gray-100  border-2 focus:border-gray-600 focus:bg-white focus:ring-0 text-sm appearance "
    //                 value={selectedChargeVape}
    //                 onChange={(e) => {
    //                   handleChargeVapeChange(e);
    //                 }}
    //               >
    //                 <option value="none"> default</option>
    //                 <option value="color">Colors</option>
    //                 <option value="size">Size</option>
    //                 <option value="vapePuff">vape Puff</option>
    //                 <option value="chargeVape">charge vape</option>
    //               </select>
    //             ) : null}

    //             <Input
    //               className=""
    //               label="Quantity"
    //               value={Quantity}
    //               type="number"
    //               onChange={(e) => setQuantity(e.target.value)}
    //               required
    //             />
    //           </div>

    //           <div className="flex my-5 mx-5 items-center gap-5">
    //             <Input
    //               label="Price"
    //               type="number"
    //               value={price}
    //               onChange={(e) => setPrice(e.target.value)}
    //               required
    //             />
    //             <Input
    //               label="sale Price"
    //               type="number"
    //               value={salePrice}
    //               onChange={(e) => setSalePrice(e.target.value)}
    //               required
    //             />
    //           </div>

    //           <div className="flex my-5 mx-5 items-center gap-5">
    //             <Input
    //               className=""
    //               label="color"
    //               id="name"
    //               type="color"
    //               value={selectedColor}
    //               onChange={handleColorChange}
    //               required
    //             />
    //             <Input
    //               className="file-upload-input"
    //               label="image"
    //               type="file"
    //               name="image"
    //               onChange={handleProductImageChange}
    //               accept="image/*"
    //               required
    //             />
    //           </div>
    //           {isSizeChecked ? (
    //             <div className="flex gap-5 w-full items-center justify-center my-2 ">
    //               <label className="flex items-center">
    //                 <input
    //                   type="radio"
    //                   value="sm"
    //                   checked={selectedSize === "sm"}
    //                   onChange={handleSizeChange}
    //                   className="form-radio text-sm"
    //                 />
    //                 <span className="ml-2">Small (sm)</span>
    //               </label>
    //               <label className=" items-center">
    //                 <input
    //                   type="radio"
    //                   value="md"
    //                   checked={selectedSize === "md"}
    //                   onChange={handleSizeChange}
    //                   className="form-radio text-md"
    //                 />
    //                 <span className="ml-2">Medium (md)</span>
    //               </label>
    //               <label className="inline-flex items-center">
    //                 <input
    //                   type="radio"
    //                   value="xl"
    //                   checked={selectedSize === "xl"}
    //                   onChange={handleSizeChange}
    //                   className="form-radio text-xl"
    //                 />
    //                 <span className="ml-2">Extra Large (xl)</span>
    //               </label>
    //             </div>
    //           ) : null}

    //           <textarea
    //             className="border border-2 my-1 mx-5"
    //             placeholder="description"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //           />
    //         </div>

    //         <Button
    //           onClick={handleSubmit}
    //           className=" mx-5 my-1 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
    //           variant="text"
    //         >
    //           Add
    //         </Button>
    //         <Button
    //           className=" mx-5 my-1  border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
    //           variant="text"
    //           onClick={handleClose}
    //         >
    //           Cancel
    //         </Button>
    //       </div>
    //     </Box>
    //   </Modal>
    // </div>
  );
};

export default AddRelatedItem;
