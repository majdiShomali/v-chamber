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
import { HashLink } from "react-router-hash-link";

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
    const data ={
      itemsPerPage:"6",
      CurrentPage:"1"
    }
    dispatch(fetchCategoryItems(data));
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


<section className="bg-gray-100 dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        Add New Or Edit category
      </h1>
    

      <HashLink
        smooth={true} to="#create-category"
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Add new category
        </HashLink>
      <HashLink
        smooth={true} to="#edit-category"
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Edit category
        </HashLink>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="https://www.destinationsforteens.com/wp-content/uploads/Teens-and-Vaping_-What-You-Need-to-Know-About-Nicotine-Addiction-650x433.jpeg"
        alt="mockup"
      />
    </div>
  </div>
</section>

      <section id="create-category" className=" w-full h-[90vh] lg:h-[70vh] bg-gray-100 flex justify-center  ">
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

      <CategoryCardProvider itemsData={allItemData.data} />
      {/*     
    <ItemCardProvider
      Items={item}
      /> */}
    </>
  );
};

export default ProviderHome;
