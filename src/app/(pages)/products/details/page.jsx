"use client";
import { useEffect, useState } from "react";
import "../../../styles/ProductDetails.css";
import {
  FaExchangeAlt,
  FaHeart,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { addToWishlist, getCart, updateCart } from "@/lib/features/cartSlice";
import { productQuery } from "@/lib/features/productSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [wish, setWish] = useState(false);
  const { selectedProduct } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((state) => state.carts);
  const { userData } = useAppSelector((state) => state.users);
  // console.log("userId :", userId);
  const { userId, token } = userData;

  const successNotify = () =>
    toast.success("Product successfully added to cart ", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const router = useRouter();

  const discount = Math.floor(
    ((selectedProduct?.mrp - selectedProduct?.price) / selectedProduct?.mrp) *
      100
  );

  const dispatch = useAppDispatch();

  const handleSize = (e, size) => {
    setSelectedSize(size);
  };

  const handleWishlist = (item) => {
    if (item) {
      dispatch(addToWishlist(item));
    }
  };
  const REQUEST_URL = process.env.NEXT_PUBLIC_REQUEST_URL;

  const handleCart = async (item) => {
    if (item && !loading) {
      try {
        setLoading(true);
        const response = await fetch(`${REQUEST_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: { ...item }, userId: userId }),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(updateCart(data));
          setTimeout(() => {
            successNotify();
          }, 500);
        } else {
          console.error("Error:", response.statusText);
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
  };

  // Session if page reload
  // const storedSelectedProduct = sessionStorage.getItem("selectedProduct");
  // const initialSelectedProduct = storedSelectedProduct
  //   ? JSON.parse(storedSelectedProduct)
  //   : null;

  // useEffect(() => {
  //   if (initialSelectedProduct) {
  //     dispatch(productQuery(initialSelectedProduct));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //
  useEffect(() => {
    const storedSelectedProduct = sessionStorage.getItem("selectedProduct");
    const initialSelectedProduct = storedSelectedProduct
      ? JSON.parse(storedSelectedProduct)
      : null;
    if (initialSelectedProduct) {
      dispatch(productQuery(initialSelectedProduct));
    }
  }, [dispatch]);

  useEffect(() => {
    if (wishlist.find((item) => selectedProduct?.id === item.id)) {
      setWish(true);
    } else {
      setWish(false);
    }
  }, [selectedProduct?.id, wishlist]);

  return (
    <div className="productDetails-container">
      <div className="productDetails-imageSection">
        {selectedProduct?.image?.map((img, index) => {
          return (
            <Image
              src={img}
              key={index}
              className="productDetails-productImages"
              width={300}
              height={400}
              alt="product"
              priority="high"
            />
          );
        })}
      </div>
      <div className="productDetails-contentSection">
        <p className="productDetails-produtBrand">{selectedProduct?.brand}</p>
        <p className="productDetails-produtTitle">{selectedProduct?.title}</p>
        <div className="productDetails-produtRatingBox">
          <p className="productDetails-produtRatings">
            {`${selectedProduct?.rating?.rate} ★  | ${selectedProduct?.rating?.count}  Ratings`}
          </p>
        </div>

        <hr />
        <div className="productDetails-produtPriceBox">
          <span className="productDetails-produtPrice">
            ₹{selectedProduct?.price}
          </span>
          <span className="productDetails-produtMRP">
            MRP ₹ {selectedProduct?.mrp}
          </span>
          <span className="productDetails-produtDiscount">
            {`( ${discount}% OFF)`}
          </span>
        </div>
        <p className="productDetails-produtTex">inclusive of all taxes</p>
        <div className="productDetails-produtSizeBox">
          <p className="productDetails-produtSelectSize">Select Size</p>
          <div className="productDetails-sizeButtonsBox">
            <div
              className={`productDetails-sizeButtons ${
                selectedSize === "S" ? `selectedSizeButton` : ""
              }`}
              onClick={(e) => handleSize(e, "S")}
            >
              S
            </div>
            <div
              className={`productDetails-sizeButtons ${
                selectedSize === "M" ? `selectedSizeButton` : ""
              }`}
              onClick={(e) => handleSize(e, "M")}
            >
              M
            </div>
            <div
              className={`productDetails-sizeButtons ${
                selectedSize === "L" ? `selectedSizeButton` : ""
              }`}
              onClick={(e) => handleSize(e, "L")}
            >
              L
            </div>
            <div
              className={`productDetails-sizeButtons ${
                selectedSize === "XL" ? `selectedSizeButton` : ""
              }`}
              onClick={(e) => handleSize(e, "XL")}
            >
              XL
            </div>
          </div>
        </div>
        <div className="productDetails-produtAddtoCartButtonBox">
          <button
            className="productDetails-addToCartBtn"
            onClick={() => handleCart(selectedProduct)}
            disabled={loading}
          >
            <FaShoppingCart size={20} />
            Add To Cart
          </button>
          <button
            className="productDetails-addToCartBtn"
            onClick={() => handleWishlist(selectedProduct)}
          >
            <FaHeart color={wish ? "red" : "white"} size={20} />
            WISHLIST
          </button>
        </div>
        <hr />
        <div className="productDetails-produtDetails">
          <h3>PRODUCT DETAILS</h3>

          <p>{selectedProduct?.description}</p>
        </div>
        <hr />
        <div className="productDetails-produtDelivery">
          <p className="productDetails-produtDeliveryHeading">
            DELIVERY OPTIONS <FaTruck />
          </p>
          <div className="productDetails-pincodeBox">
            <input
              type="number"
              className="productDetails-pincode"
              maxLength={2}
            />
            <span
              className="productDetails-pincodeCheckBtn"
              onClick={() => setPincode((prev) => !prev)}
            >
              {pincode ? "Change" : "Check"}
            </span>
          </div>

          {pincode ? (
            <div className="productDetails-productDeliveryTime">
              <p className="productDetails-productDeliveryDetails">
                <TbTruckDelivery size={30} />
                Get it with in {Math.floor(Math.random() * 4) + 2} Days{" "}
              </p>
              <p className="productDetails-productDeliveryDetails">
                {" "}
                <GiPayMoney size={30} />
                Pay on delivery available{" "}
              </p>
              <p className="productDetails-productDeliveryDetails">
                <FaExchangeAlt size={30} />
                Easy 14 days return & exchange available{" "}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
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
  );
};

export default ProductDetails;
