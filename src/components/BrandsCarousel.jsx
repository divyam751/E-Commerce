import React from "react";
import "../app/styles/BrandsCarousel.css";
import Image from "next/image";

const BrandsCarousel = ({ arr }) => {
  console.log(arr);

  return (
    <div className="brandCarousel-container">
      {arr.map((item, index) => (
        <Image className="brands-images" src={item} alt="brands" key={index} />
      ))}
    </div>
  );
};

export default BrandsCarousel;
