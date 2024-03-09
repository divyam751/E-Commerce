"use client";

import { useState } from "react";
import "../styles/Navbar.css";
import logo from "../../public/asset/logo.png";

import { FaHeart, FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchQuery } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Navbar = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { cart, wishlist } = useAppSelector((state) => state.products);

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    const delayedDispatch = () => {
      dispatch(searchQuery(value));
    };

    const debouncedDispatch = debounce(delayedDispatch, 2000);

    debouncedDispatch();
  };

  const handleHamburger = () => {
    setOpenHamburger((prev) => !prev);
  };

  return (
    <div
      className={`navbar-container${
        openHamburger ? ` navbar-hamburger-open` : ""
      }`}
    >
      <div className="navbar">
        <Image src={logo} alt="logo" className="logo" />
        <div className="navbar-linksBox">
          <span onClick={() => router.push("/home")} className="nav-links">
            Home
          </span>
          <span onClick={() => router.push("/products")} className="nav-links">
            Products
          </span>

          <div className="nav-search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search in E-Market"
              className="nav-search"
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="navbar-buttons">
          <span onClick={() => router.push("/login")} className="nav-links">
            <FaUserAlt />
          </span>
          <span onClick={() => router.push("/wishlist")} className="nav-links">
            <div className="navbar-cartBox">
              <FaHeart />

              <div className="navbar-cartBedge">
                {wishlist?.length !== 0 ? wishlist?.length : 0}
              </div>
            </div>
          </span>
          <span onClick={() => router.push("/cart")} className="nav-links">
            <div className="navbar-cartBox">
              <FaShoppingCart />
              <div className="navbar-cartBedge">
                {cart?.length !== 0 ? cart?.length : 0}
              </div>
            </div>
          </span>

          <div className="navbar-hamburger" onClick={handleHamburger}>
            {openHamburger ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </div>

      <div className="navbar-Hamburger-linksBox">
        <span onClick={() => router.push("/")} className="nav-links">
          Home
        </span>
        <span onClick={() => router.push("/products")} className="nav-links">
          Products
        </span>
        <div className="nav-search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search in E-Market"
            className="nav-search"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
