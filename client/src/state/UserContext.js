import React from "react";
const UserContext = React.createContext({
  user: {},
  token: "",
  setUser: () => {},
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
  setAuth: () => {},
});
export default UserContext;
