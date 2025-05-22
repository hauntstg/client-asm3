import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

const REST_API = process.env.REACT_APP_API;
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${REST_API}/users/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUser(data);
        setIsLogged(true);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  useEffect(() => {
    // const fetchProfile = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5000/users/profile", {
    //       method: "GET",
    //       credentials: "include",
    //     });

    //     if (res.ok) {
    //       const data = await res.json();
    //       console.log(data);
    //       setUser(data);
    //       setIsLogged(true);
    //     } else {
    //       setUser(null);
    //       setIsLogged(false);
    //     }
    //   } catch (error) {
    //     console.error("Lỗi khi fetch profile:", error);
    //     setUser(null);
    //   }
    // };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogged, user, setIsLogged, setUser, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
