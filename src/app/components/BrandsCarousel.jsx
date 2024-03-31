import React from "react";
import "../styles/BrandsCarousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrandsCarousel = ({ arr }) => {
  // console.log(arr);

  const router = useRouter();

  return (
    <div
      className="brandCarousel-container"
      onClick={() => router.push("/products")}
    >
      {arr?.map((item, index) => (
        <Image
          className="brands-images"
          src={item}
          alt="brands"
          key={index}
          width={300}
          height={400}
        />
      ))}
    </div>
  );
};

export default BrandsCarousel;
