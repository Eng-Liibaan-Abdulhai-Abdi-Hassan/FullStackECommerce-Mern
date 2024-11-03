import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const Context = createContext();
const useusercontext = () => {
  return useContext(Context);
};

const UserProvider = ({ children }) => {
  let [authlogin, setauthlogin] = useState(
    JSON.parse(localStorage.getItem("authlogin"))
  );
  const [socket, setsocket] = useState(null);
  const [Online, setOnline] = useState([]);

  useEffect(() => {
    const socket = io("https://fullstackecommerce-mern.onrender.com", {
      query: { UserID: authlogin?._id || "" },
      withCredentials: true,
    });
    setsocket(socket);
    socket.on("Online", (data) => {
      setOnline(data);
    });

    return () => socket.close();
  }, [authlogin?._id]);

  return (
    <Context.Provider value={{ Online, socket, authlogin, setauthlogin }}>
      {children}
    </Context.Provider>
  );
};

export { UserProvider, useusercontext };
