"use client";

import { useState } from "react";
import "../../styles/Login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUserDetails } from "@/lib/features/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const REQUEST_URL = process.env.NEXT_PUBLIC_REQUEST_URL;
  const successNotify = () =>
    toast.success("😏 Login successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const errorNotify = () =>
    toast.error("🫢 Wrong credentials", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.users);
  // console.log("userData :", userData);
  const postFormData = async () => {
    try {
      const response = await fetch(`${REQUEST_URL}/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        console.log(data);
        successNotify();
        dispatch(setUserDetails(data));
        setTimeout(() => {
          router.push("/products");
        }, [2000]);
      } else {
        console.error("Error:", response.statusText);
        errorNotify();
      }
    } catch (error) {
      console.log(error);
      errorNotify();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    postFormData();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const router = useRouter();
  return (
    <div className="login-container">
      <div className="login-parentBox">
        <span className="login-heading">Login</span>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-inputLabel">Email</label>
          <input
            type="email"
            name="email"
            className="login-input"
            onChange={handleChange}
            required
          />

          <label className="login-inputLabel">Password</label>
          <div className="login-passwordBox">
            <input
              type={show ? "text" : "password"}
              name="password"
              className="login-input"
              onChange={handleChange}
              required
            />
            {show ? (
              <IoIosEyeOff
                className="login-password-eye"
                onClick={handleShow}
              />
            ) : (
              <IoIosEye className="login-password-eye" onClick={handleShow} />
            )}
          </div>
          <button type="submit" className="login-button">
            Submit
          </button>
          <span className="login-bottomText">
            Already have an account?{" "}
            <span onClick={() => router.push("/signup")}>SignUp</span>
          </span>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default Login;
