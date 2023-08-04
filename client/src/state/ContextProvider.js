import React, { useState } from "react";
import UserContext from "./UserContext";

const ContextProvider = (props) => {
  const [user, setuser] = useState({});
  const [token, settoken] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const setUser = (user) => {
    setuser(user);
  };
  const setToken = (token) => {
    settoken(token);
  };
  const setAuth = (isAuthenticated) => {
    setisAuthenticated(isAuthenticated);
  };
  const logout = () => {
    settoken("");
    setuser({});
    setisAuthenticated(false);
  };
  const newState = {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    setAuth,
  };
  return (
    <UserContext.Provider value={newState}>
      {props.children}
    </UserContext.Provider>
  );
};
export default ContextProvider;
