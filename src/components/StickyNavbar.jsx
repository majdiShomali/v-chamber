import React from "react";
import {
  Navbar,
  // MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
} from "@material-tailwind/react";

import {
  LifebuoyIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import { mdiCartArrowDown } from "@mdi/js";
// import { CartContext } from "../context/cartContext";
import { useState, useEffect,useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import {CartContext} from "../context/cartContext"


export default function StickyNavbar() {
 const {cartNavRefresh ,setCartNavRefresh}=useContext(CartContext)

  // const ApiUrl = process.env.REACT_APP_API_URL;
  const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  // const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  const dispatch = useDispatch();

  const [itemsCartLocal , setItemsCartLocal]=useState([])
  useEffect(() => {
    if (localStorage.items) {
      const itemsCart = JSON.parse(localStorage.getItem("itemsQ")) || [];
      
      const totalQuantity = itemsCart.reduce((acc, product) => acc + product.quantity, 0);
      setItemsCartLocal(totalQuantity)
    
    } 
    },[dispatch] )
  

  const [openNav, setOpenNav] = React.useState(false);
  const [itemsStat, setItemsStat] = useState(false);
  // const { cartNavRefresh, setCartNavRefresh } = useContext(CartContext);


  useEffect(() => {
    setTimeout(() => {
      setItemsStat(true);
    }, 2000);
    setItemsStat(false);
  }, [cartNavRefresh]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <HashLink
          onClick={() => setOpenNav(false)}
          to="/#"
          smooth={true}
          className="flex items-center"
        >
          Home
        </HashLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <HashLink
          onClick={() => setOpenNav(false)}
          to="/Store#"
          smooth={true}
          className="flex items-center"
        >
          Store
        </HashLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <HashLink
          onClick={() => setOpenNav(false)}
          to="/AboutUs#"
          smooth={true}
          className="flex items-center"
        >
          About
        </HashLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <HashLink
          onClick={() => setOpenNav(false)}
          to="/ContactUs#"
          smooth={true}
          className="flex items-center"
        >
          Contact
        </HashLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <HashLink
          onClick={() => setOpenNav(false)}
          to="/TrackSection#"
          smooth={true}
          className="flex items-center"
        >
          Track 
        </HashLink>
      </Typography>
    </ul>
  );

  const profileMenuItems = [
    {
      label: "Profile",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const closeMenu = (label) => {
      setIsMenuOpen(false);
      if (label === "Sign Out") {
        localStorage.removeItem("auth");
        window.location.href = `${ReactUrl}/`;
        console.log(label);
      } else if (label === "Profile") {
        navigate("/UserProfile");
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto hidden lg:flex "
          >
            <svg
              xmlns="https://source.unsplash.com/MP0IUfwrn0A"
              className="h-7 w-7 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform text-black ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu(label);
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Navbar className="max-h-[768px] max-w-[100%] w-[100%]  px-10 sticky top-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            V-Chamber
          </Typography>
        </Link>
        <div className="mr-4 hidden lg:block">{navList}</div>

        <div className="flex items-center gap-4">
          <>
            <Link to="/CartPage">
              {itemsStat ? (
                <div className="relative p-1">
                  <Icon path={mdiCartOutline} size={1.5} className="mr-2" />

                  <div className=" absolute right-0 top-0  bg-purple-500 rounded-full w-6 h-6 text-center items-center">
                    {cartNavRefresh}
                  </div>
                </div>
              ) : (
                <div className="relative p-1 animate-bounce">
                  <Icon path={mdiCartArrowDown} size={1.5} className="mr-2" />
                  <div className=" absolute right-0 top-0  bg-purple-500 rounded-full w-6 h-6 text-center items-center">
                    {cartNavRefresh}
                  </div>
                </div>
              )}
            </Link>
          </>

          {localStorage.auth ? (
            <>
              <ProfileMenu />
            </>
          ) : (
            <>
              <Link to="login">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block "
                  color="purple"
                >
                  <span>login</span>
                </Button>
              </Link>
            </>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {localStorage.auth !== undefined ?  
        <Link to="/UserProfile">
          <Button
          onClick={() => setOpenNav(false)}
          variant="gradient"
          size="sm"
          fullWidth
          className="mb-2"
          color="purple"
        >
          <span>Profile</span>
        </Button>
        </Link>
        
        
        :
        
        <Link to="/login">
        <Button
        onClick={() => setOpenNav(false)}
        variant="gradient"
        size="sm"
        fullWidth
        className="mb-"
        color="purple"
      >
        <span>Login</span>
      </Button>
      </Link> 
        
        }

      </Collapse>
    </Navbar>
  );
}
