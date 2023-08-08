import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
     <footer className="w-full bg-gray-100 p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img src="https://images.assetsdelivery.com/compings_v2/bsd555/bsd5551807/bsd555180701753.jpg" alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
          <Link to="/">
            <Typography
              as="a"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </Typography>
            </Link>
          </li>
          <li>
            <Link to="/Store">
            <Typography
              as="a"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Store
            </Typography>
            </Link>
          </li>
          <li>
            <Link to="/AboutUs">
            <Typography
              as="a"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
            </Link>
          </li>
          <li>
          <Link to="/ContactUs">
            <Typography
              as="a"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 V-Chamber
      </Typography>
    </footer>
    </>
  );
};

export default Footer;




