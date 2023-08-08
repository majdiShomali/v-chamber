import React from "react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <div
      className="bg-cover bg-center h-screen "
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/9694216/pexels-photo-9694216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        height: "400px",
      }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>

          <nav className="text-white mb-8">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-amber-500">
                  Home
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
              <li>About Us</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
