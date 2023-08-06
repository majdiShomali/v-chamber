import React from 'react'
import { Link } from "react-router-dom";

const ContactHero = () => {
  return (
    <div
    className="bg-cover bg-center h-screen"
    style={{
      backgroundImage:
        'url("https://media.istockphoto.com/id/1323765737/photo/close-up-of-a-businessman-using-a-laptop-computer-and-a-mobile-phone.jpg?b=1&s=612x612&w=0&k=20&c=dMQ9OWLgVWXir9KBH-vHDkp68s2dodEiEqEVjTf6rF4=")',
      height: "400px",
    }}
  >
    <div className="flex items-center justify-center h-full  bg-opacity-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white font-bold mb-4">
          Contact Us
        </h1>

        <nav className="text-white mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" style={{ color: "#219D80" }}>
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
            <li>Contact Us</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default ContactHero