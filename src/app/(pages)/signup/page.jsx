"use client";

import { useState } from "react";
import "../../styles/Signup.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const postFormData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Account created successfully");
        console.log(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
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
    <div className="signup-container">
      <div className="signup-parentBox">
        <span className="signup-heading">Signup</span>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-inputLabel">Full Name</label>
          <input
            type="text"
            name="name"
            className="signup-input"
            onChange={handleChange}
            required
          />
          <label className="signup-inputLabel">Email</label>
          <input
            type="email"
            name="email"
            className="signup-input"
            onChange={handleChange}
            required
          />

          <label className="signup-inputLabel">Password</label>
          <div className="signup-passwordBox">
            <input
              type={show ? "text" : "password"}
              name="password"
              className="signup-input"
              onChange={handleChange}
              required
            />
            {show ? (
              <IoIosEyeOff
                className="signup-password-eye"
                onClick={handleShow}
              />
            ) : (
              <IoIosEye className="signup-password-eye" onClick={handleShow} />
            )}
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <span className="signup-bottomText">
            Already have an account?{" "}
            <span onClick={() => router.push("/login")}>Login</span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
