import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryItems } from "../../../actions/category/GetCategoryItems";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";


import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
AOS.init();

const Categories = () => {
  const navigate = useNavigate();
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;
  const [topCategories, setTopCategories] = useState([]);
  function handleKitchenTypeSelection(id) {
    navigate(`/ItemStoreCategory/${id}/0`);
  }

  const dispatch = useDispatch();
  const {
    // loading: isLoading,
    data: itemsData,
    // error: fetchError,
  } = useSelector((state) => state.fetchCategories);

  useEffect(() => {
    const data ={
      itemsPerPage:"6",
      CurrentPage:"1"
    }
    dispatch(fetchCategoryItems(data));
  }, [dispatch]);

  useEffect(() => {
    setTopCategories(itemsData.data);
  }, [itemsData]);

  return (
    <div className="bg-white mt-3 shadow-lg">
      <section id="category">
        <br />
        <h2 className=" text-4xl mb-8 tracking-tight font-extrabold text-black  text-center capitalize">
          All categories
        </h2>
        <div className="flex flex-wrap items-center justify-center mb-10 lg:mx-0 gap-5"  
      data-aos="fade-up" data-aos-duration="1000"
        >
          {topCategories?.map((category) => {
            return (
              <div
                key={category._id}
                onClick={() => handleKitchenTypeSelection(category._id)}
                className="lg:w-1/4 sm:w-1/4 md:w-1/3  hover:scale-110 hover:cursor-pointer"
             
            >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    className="lg:w-full w-36 h-28 lg:h-64 object-cover object-center"
                    src={`${ImagesUrl}/${category.image}`}
                    alt="category"
                  />
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-1xl font-semibold text-white uppercase lg:text-4xl">
                        {category.category}
                      </h2>
                      <button className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg">
                        Show Products
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="flex justify-center">
        <HashLink smooth={true} to="/AllCategories#">
          <Button
            className=" mb-10 border-solid border-amber-600 border-2 text-amber-600 hover:bg-amber-600 hover:text-[#ffffff]"
            variant="text"
          >
            Show all Categories
          </Button>
        </HashLink>
      </div>
    </div>
  );
};

export default Categories;
