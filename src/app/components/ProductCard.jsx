"use client";
import React from "react";
import "../styles/ProductCard.css";
import Badge from "./Badge";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { productQuery } from "@/lib/features/productSlice";
import Image from "next/image";
const ProductCard = ({ item }) => {
  const discount = Math.floor(((item.mrp - item.price) / item.mrp) * 100);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (item) => {
    dispatch(productQuery(item));
    router.push("/products/details");
    // console.log(item);
  };
  return (
    <div className="productCard-container" onClick={() => handleClick(item)}>
      {item.badge !== null ? (
        <Badge title={item.badge} />
      ) : (
        <div className="badge-container"></div>
      )}
      <div className="productCard-parent">
        <Image
          className="productCard-image"
          src={item.image[0]}
          alt={item.brand}
          width={300}
          height={350}
          priority
        />

        <div className="productCard-productRatingBox">
          <span className="productCard-productRating">{`${item.rating.rate} ★  | ${item.rating.count} `}</span>
        </div>
        <div className="productCard-info">
          <div className="productCard-wishlistBox">
            <button className="productCard-wishlistBtn">♡ WISHLIST</button>
          </div>
          <p className="productCard-productName">{item.brand}</p>
          <p className="productCard-productDesc">{item.title}</p>
          <div className="productCard-productPriceContainer">
            <span className="productCard-productPrice">Rs. {item.price}</span>
            <span className="productCard-productCutOfPrice">
              Rs. {item.mrp}
            </span>
            <span className="productCard-productDiscount">
              {`(${discount + `% OFF`})`}
            </span>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ProductCard;
