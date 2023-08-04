import React, { useState } from "react";
import Logo from "../../src/assets/logo.svg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../state/UserContext";

function Login() {
  const Ctx = useContext(UserContext);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const formValidation = () => {
    if (values.email === "" || values.password === "") {
      toast.error("All fields are required.", toastOptions);
      return false;
    } else if (!values.email.includes("@")) {
      toast.error("Invalid Email.", toastOptions);
      return false;
    } else {
      return true;
    }
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast.error("Invalid Credentials.", toastOptions);
        return;
      }
      const data = await response.json();
      if (response.status === 200) {
        Ctx.setUser(data.user);
        Ctx.setToken(data.token);
        Ctx.setAuth(true);
        toast.success("Login Successful.", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      setValues({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#131324]">
      <form
        className="flex flex-col gap-5 items-center w-[28%] px-12 py-12 bg-[#00000076] rounded-3xl"
        onSubmit={formSubmitHandler}
      >
        <div className="flex gap-3 items-center justify-center ">
          <img src={Logo} alt="logo" width={50} height={50} />
          <h1 className="font-extrabold text-white text-2xl">SNAPPY</h1>
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          className="px-2 py-2 w-full bg-transparent border border-[#4e0eff] rounded-md text-white outline-none focus:border-[#997af0]"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          className="px-2 py-2 w-full bg-transparent border border-[#4e0eff] rounded-md text-white outline-none focus:border-[#997af0]"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <button className="w-full py-2 bg-[#4e0eff] text-white rounded-md">
          Login
        </button>
        <p className="text-white">
          Don't have an account?{" "}
          <span className="text-[#4e0eff] cursor-pointer">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </form>
      <ToastContainer {...toastOptions} />
    </div>
  );
}

export default Login;
