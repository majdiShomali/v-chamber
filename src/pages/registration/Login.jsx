import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import DatePicker from "react-datepicker";
import { useEffect } from "react";

export default function LogIn() {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const ReactUrl = process.env.REACT_APP_API_REACT_URL;
  const [email, setemail] = useState("");
  const [emailp, setemailp] = useState("");
  const [password, setpassword] = useState("");
  const [passwordp, setpasswordp] = useState("");

  // const [user, setUser] = useState();

  const [isPinVerify, setIsPinVerify] = useState(false);
  const [Pin, setPin] = useState();
  const [Pinp, setPinp] = useState();
  // const [userGoogle, setUserGoogle] = useState([]);
  // const [errorG, setErrorG] = useState("");

  const [isGreater, setIsGreater] = useState(false);

  useEffect(() => {
    if (localStorage.selectedDate) {
      const selectedDateLocal = localStorage.getItem("selectedDate");

      // Create a date object for the given date
      const inputDate = new Date(selectedDateLocal);

      // Calculate the date 18 years ago from the current date
      const today = new Date();
      const eighteenYearsAgo = new Date(today);
      eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

      // Compare the input date with the calculated date
      if (inputDate < eighteenYearsAgo) {
        setIsGreater(true);
        localStorage.setItem("selectedDate", selectedDateLocal);
        localStorage.setItem("selectedDateStatus", true);
      } else {
        setIsGreater(false);
        localStorage.setItem("selectedDateStatus", false);
      }
    }
  }, []);

  const handleLogIn = () => {
    // Create a date object for the given date
    const inputDate = new Date(selectedDate);

    // Calculate the date 18 years ago from the current date
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

    // Compare the input date with the calculated date
    if (inputDate < eighteenYearsAgo) {
      setIsGreater(true);
      localStorage.setItem("selectedDate", selectedDate);
      localStorage.setItem("selectedDateStatus", true);
    } else {
      setIsGreater(false);
      localStorage.setItem("selectedDateStatus", false);
      alert("your under the age limit");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // setUserGoogle(codeResponse)

      getGoogleLogin(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getGoogleLogin = async (userGoogle) => {
    if (userGoogle.length !== 0) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogle.access_token}`,
              Accept: "application/json",
            },
          }
        );

        try {
          const newUserResponse = await axios.post(
            `${ApiUrl}/newUserGoogle`,
            response.data
          );
          localStorage.setItem("auth", newUserResponse.data.token);
          window.location.href = `${ReactUrl}/`;
        } catch (err) {
          console.log(err);
          setpasswordp(err.response.data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleVerify = async () => {
    console.log(Pin);
    try {
      const response = await axios.put(`${ApiUrl}/verifyOldEmail`, {
        Pin: Pin,
        email: email.toLowerCase(),
      });
      console.log(response.data);
      localStorage.setItem("auth", response.data.token);
      window.location.href = `${ReactUrl}/`;
    } catch (error) {
      console.error(error.response.data.error);
      setPinp(error.response.data.error);
    }
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email.toLowerCase(),
      password: password,
    };

    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.post(`${ApiUrl}/usersLogin`, userData);
      console.log(response.data.error);
      if (
        response.data.error !== "incorrect password" &&
        response.data.error === undefined
      ) {
        localStorage.setItem("auth", response.data.token);
        window.location.href = `${ReactUrl}/`;
        setpasswordp("");
        setemailp("");
      } else {
        setpasswordp(
          response.data.error === "incorrect password"
            ? "incorrect password"
            : ""
        );
        setemailp(
          response.data.error === "incorrect password"
            ? " "
            : response.data.error
        );

        if (response.data.error === "Check your pin code") {
          setIsPinVerify(true);
        }
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      console.log(error.message);
    }
  };

  const handleResetPin = async () => {
    try {
      await axios.post(`${ApiUrl}/ResendPinCode`, { email: email });
    } catch (error) {
      console.log(error);
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
              alt="loginimage"
            />
          </div>

          {!isGreater ? (
            <>
              <div className="flex items-center justify-center flex-col">
                <div className="my-5">
                  Please enter your Birthday Date To login
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  placeholderText="Date of Birth"
                  showYearDropdown
                  dateFormat="MM/dd/yyyy"
                  className="w-64 px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white custom-datepicker"
                />
                <button
                  className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
                  onClick={() => alert("You clicked the upcoming years button")}
                ></button>

                <button
                  type="button"
                  className="mt-5 w-60 bg-purple-500 tracking-wide font-semibold text-white  py-4 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleLogIn}
                >
                  <span className="">Go to logIn </span>
                </button>
                <Link to="/Signup/user">
                <button
                  type="button"
                  className="mt-5 w-60 bg-purple-500 tracking-wide font-semibold text-white  py-4 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="">Go to Sign-Up </span>
                </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign-In</h1>
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center ">
                    <button
                      id="google-sign-in"
                      className="w-full bg-white max-w-xs font-bold border border-2 border-purple-500 hover:bg-purple-500 hover:text-white  shadow-sm rounded-lg py-3 text-black flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      onClick={() => login()}
                    >
                      <div className="bg-gray-100 p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">Sign-In with Google</span>
                    </button>
                  </div>

                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign-In with e-mail
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                      <p className="text-red-500">{emailp}</p>

                      {isPinVerify ? (
                        <>
                          <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="number"
                            placeholder="Pin code"
                            value={Pin}
                            required
                            onChange={(e) => setPin(e.target.value)}
                          />

                          <p className="text-red-500">{Pinp}</p>
                          <p
                            onClick={handleResetPin}
                            className="text-blue-500 cursor-pointer"
                          >
                            ReSend PIN code
                          </p>

                          <button
                            type="button"
                            className="mt-5 bg-purple-500 tracking-wide font-semibold text-white w-full py-4 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            onClick={handleVerify}
                          >
                            <span className="ml-3">LogIn </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setpassword(e.target.value)}
                          />

                          <p className="text-red-500">{passwordp}</p>

                          <button
                            type="submit"
                            className="mt-5 bg-purple-500 tracking-wide font-semibold text-white w-full py-4 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                            <span className="ml-3">Sign-In</span>
                          </button>
                        </>
                      )}

                      <Link to="/ForgetPassword" className="text-blue-500">
                        forget password ?
                      </Link>

                      <p className="mt-6 text-xs text-gray-600 text-center">
                        No Account?
                        <Link
                          to="/Signup/user"
                          className="border-b border-gray-500 border-dotted"
                        >
                          Create one
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex imageSign bg-cover bg-center bg-no-repeat ">
          <img
            src="https://thecity.brightspotcdn.com/dims4/default/227a365/2147483647/strip/true/crop/2000x3000+0+0/resize/1024x1536!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FfB6R4e7cKfK1_UUnfOvbeMvzAXY%3D%2F0x0%3A2000x3000%2F2000x3000%2Ffilters%3Afocal%281000x1500%3A1001x1501%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24000309%2F090622_marijuana_shop_2.jpg"
            alt="loginimage"
          />
        </div>
      </div>
    </div>
  );
}
