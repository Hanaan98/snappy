import React, { useState } from "react";
import Logo from "../../src/assets/logo.svg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
function Register() {
  const socket = io("http://localhost:5000");
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const formValidation = () => {
    if (
      values.email === "" ||
      values.password === "" ||
      values.confirmpassword === ""
    ) {
      toast.error("All fields are required.", toastOptions);
      return false;
    } else if (values.name === "" || values.name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (!values.email.includes("@")) {
      toast.error("Invalid Email.", toastOptions);
      return false;
    } else if (values.password.length < 6) {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else {
      return true;
    }
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        toast.error("Username or Email Already Exists", toastOptions);
      }
      if (response.status === 200) {
        toast.success("Registered Successfully", toastOptions);
      }
      setValues({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
          type="text"
          placeholder="Username"
          name="name"
          value={values.name}
          className="px-2 py-2 w-full bg-transparent border border-[#4e0eff] rounded-md text-white outline-none focus:border-[#997af0]"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          value={values.confirmpassword}
          className="px-2 py-2 w-full bg-transparent border border-[#4e0eff] rounded-md text-white outline-none focus:border-[#997af0]"
          onChange={(e) =>
            setValues({ ...values, confirmpassword: e.target.value })
          }
        />
        <button className="w-full py-2 bg-[#4e0eff] text-white rounded-md">
          Register
        </button>
        <p className="text-white">
          Already have an account?{" "}
          <span className="text-[#4e0eff] cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
      <ToastContainer {...toastOptions} />
    </div>
  );
}

export default Register;
