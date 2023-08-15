import React from "react";
import {createContext, useState,useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
const UserProvider = ( {children} ) => {
  const ApiUrl= process.env.REACT_APP_API_URL

    const [user ,setUser] = useState(null)
    const [userUpdateRefresh ,setUpdateRefresh] = useState(null)

    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (token) {
          const response = await axios.get(`${ApiUrl}/userData`, {
            headers: {
              Authorization: token,
            },
          });
          setUser(response.data[0])
        }
      } catch (error) {
        console.error(error);
        // localStorage.removeItem("auth");
        // window.location.href = "http://localhost:3000/Login";
      } finally {
        // console.log(false);
      }
    };
  
  
  useEffect(()=>{
    if(localStorage.auth !== undefined){   
      fetchProtectedData()
    }
  },[userUpdateRefresh])
 

  return (
        <>
            <UserContext.Provider
                value={{
                    user,setUser,
                    userUpdateRefresh,setUpdateRefresh
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
 export default UserProvider;