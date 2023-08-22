import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Signup() {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const ApiUrl = process.env.REACT_APP_API_URL;
  const ReactUrl = process.env.REACT_APP_API_REACT_URL;

  const { type } = useParams();

  const [name, setName] = useState("");
  const [namep, setNamep] = useState("");

  const [email, setemail] = useState("");
  const [emailp, setemailp] = useState("");

  const [phone, setphone] = useState("");
  const [phonep, setphonep] = useState("");

  const [password, setpassword] = useState("");
  const [passwordp, setpasswordp] = useState("");

  const [Pin, setPin] = useState("");
  const [Pinp, setPinp] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(true);
  const [user, setUser] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateName(name);
    validatePassword(password);
    validateEmail(email.toLowerCase());
    // validatePhone(phone);

    if (
      validateName(name) &&
      validatePassword(password) &&
      validateEmail(email.toLowerCase())
      // validatePhone(phone)
    ) {
      const userData = {
        userName: name,
        email: email.toLowerCase(),
        password: password,
        phone: phone,
        DateOfBirth:selectedDate,
        role: type === "user" ? 0 : 2,
      };
      console.log(userData);
      try {
        // Send the data to the server using an HTTP POST request
        const response = await axios.post(`${ApiUrl}/users`, userData);
        setVerifyEmail(false);
        setemail(response.data.email);
        setUser(response.data);
        // setemailp(response.data.error)
        // localStorage.setItem("auth", response.data.token);
        // window.location.href = `${ReactUrl}/`;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  };

  function validateName(name) {
    if (name === "") {
      setNamep(" !please enter your name");
      return false;
    } else {
      setNamep("");
      return true;
    }
  }

  function validateEmail(userEmail) {
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setemailp("! E-mail must be in a valid format such as example@gmail.com");
      return false;
    } else {
      setemail("");
      return true;
    }
  }
  function validatePhone(userphone) {
    if (!/^07[0-9]{8}$/.test(userphone)) {
      setphonep("! Phone number must be 10 digits starting with 07");
      return false;
    }
    setphonep("");
    return true;
  }

  function validatePassword(userPassword) {
    let password = userPassword;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setpasswordp(
        "! Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character"
      );
      return false;
    } else {
      setpasswordp("");
      return true;
    }
  }

  const handleVerify = async () => {
    try {
      const response = await axios.put(`${ApiUrl}/verifyEmail`, {
        Pin: Pin,
        PinCode: user.pinCode,
        userId: user._id,
      });
      localStorage.setItem("auth", response.data.token);
      window.location.href = `${ReactUrl}/`;
    } catch (error) {
      console.error(error.response.data.error);
      setPinp(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">
          <div>
            <img
              src="https://www.drupal.org/files/project-images/reg_confirm_email_with_button_0.png"
              className="w-32 mx-auto"
              alt="signupimage"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign-Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                 
                {verifyEmail ? (
                    <>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <p className="text-red-500">{emailp}</p>
                 

                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p className="text-red-500">{namep}</p>

         <div className="">
         <DatePicker
  selected={selectedDate}
  required
  onChange={handleDateChange}
  placeholderText="date of Birth" 
  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
/>
    </div>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="tel"
                        placeholder="07xxxxxxxx"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                      <p className="text-red-500">{phonep}</p>

                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <p className="text-red-500">{passwordp}</p>
                    </>
                  ) : (
                    <>
                
                     <p className=" ">
                         PIN code sent to {email}
                      </p>
                      <input
                        className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                        type="number"
                        placeholder="Pin code"
                        value={Pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                      <p className="text-red-500">{Pinp}</p>
                  
                    </>
                  )}
                  {verifyEmail ? (
                    <>
                      <button
                        type="submit"
                        className="mt-5 bg-purple-500 tracking-wide font-semibold  text-white w-full py-4 rounded-lg hover:bg-purple-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign-Up</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="mt-5 bg-purple-500 tracking-wide font-semibold  text-white w-full py-4 rounded-lg hover:bg-purple-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        onClick={handleVerify}
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Confirm Pin</span>
                      </button>
                    </>
                  )}

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Have An Account?
                    <Link
                      to="/Login"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Sign-In Here
                    </Link>
                  </p>



                  
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex login_img bg-cover bg-center bg-no-repeat ">
          <img
            src="https://thecity.brightspotcdn.com/dims4/default/227a365/2147483647/strip/true/crop/2000x3000+0+0/resize/1024x1536!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FfB6R4e7cKfK1_UUnfOvbeMvzAXY%3D%2F0x0%3A2000x3000%2F2000x3000%2Ffilters%3Afocal%281000x1500%3A1001x1501%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24000309%2F090622_marijuana_shop_2.jpg"
            alt="signupimage"
          />
        </div>
      </div>
    </div>
  );
}
