import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordp, setpasswordp] = useState("");
  const [reset, setReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkMessage, setCheckMessage] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFind = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ForgetUsers",
        {
          email: email,
        }
      );

      setReset(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error inserting data:", error.response.data.error);
      setErrorMessage(error.response.data.error);
      setReset(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/check-pin", {
        email: email,
        pinCode: pinCode,
      });

      console.log(response.data.message);
      setErrorMessage("");
      setCheckMessage(true);
    } catch (error) {
      console.error("Error resetting password:", error.response.data.error);
      setErrorMessage("incorrect pin code");
    }
  };
  const handleResetPasswordNow = async () => {
    if(validatePassword(password)){

      try {
        const response = await axios.post(
          "http://localhost:5000/api/reset-password",
          {
            email: email,
            pinCode: pinCode,
            newPassword: password,
          }
        );
        window.location.href = "http://localhost:3000/";
      } catch (error) {
        console.error("Error resetting password:", error.response.data.error);
        setErrorMessage("error resetting password");
      }
      
    }
 
  };

  function validatePassword(userPassword){
    let password = userPassword;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setpasswordp("! Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character")
            return false;
          }else{
            setpasswordp("")
            return true;
           }
    }

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-xs">
        <p>Find your account</p>

        {checkMessage ? (
          <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
              <div>
              <p className="text-lg">Please enter your New password.
              <br/>
              
              {email}</p>
                </div>
              <div className="mb-4">
            
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500">{passwordp}</p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleResetPasswordNow}
                >
                  Reset Now
                </button>
              </div>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </>
        ) : (
          <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p>Please enter your email to search for your account.</p>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {reset ? (
                <>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Pin code send to your email{" "}
                      {/* <span className="text-blue-gray-600">{email}</span> */}
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="text"
                      placeholder="PIN code"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              ) : null}
              {errorMessage && <p>{errorMessage}</p>}
              <div className="flex items-center justify-between">
                {reset ? null : (
                  <>
                    {loading ? (
                      <>
                        <button
                          disabled=""
                          type="button"
                          className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 inline-flex items-center"
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Loading...
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={handleFind}
                        >
                          Find
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
