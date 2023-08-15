import React from "react";
import {
  Card,
  Input,
  // Checkbox,
  Button,
  Textarea,
  // Typography,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryItems } from "../../actions/category/GetCategoryItems";
import CategoryCardProvider from "./editCategoryProvider/CategoryCardProvider";
import axios from "axios";

// import ItemCardProvider from "../../components/cards/ItemCardProvider";

const ProviderHome = () => {
  const ApiUrl = process.env.REACT_APP_API_URL;

  const { user } = useContext(UserContext);
  const [productImage, setProductImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [OptionType, setOptionType] = useState("");

  const {
    // loading: isallItemLoading,
    data: allItemData,
    // error: fetchallItemError,
  } = useSelector((state) => state.fetchCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryItems());
  }, [dispatch]);

  // const [item, setItem] = useState([]);
  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("ProviderId", user._id);
    formData.append("category", OptionType);
    try {
      const response = await axios.post(`${ApiUrl}/items`, formData);
      // setItem([response.data]);
      dispatch(fetchCategoryItems());
      showSuccessAlert(response.data.Name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };

  return (
    <>
      <section className=" w-full h-[70vh] bg-gray-100 flex justify-center  ">
        <Card color="" className="my-10 h-auto">
          <form onSubmit={handleAddItem} className=" p-10 ">
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

              <Input
                size="lg"
                type="file"
                name="image"
                label="image"
                onChange={handleProductImageChange}
                accept="image/*"
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

            <Button type="submit" className="mt-6" fullWidth>
              Create Product
            </Button>
          </form>
        </Card>
      </section>

      <CategoryCardProvider itemsData={allItemData} />
      {/*     
    <ItemCardProvider
      Items={item}
      /> */}
    </>
  );
};

export default ProviderHome;
