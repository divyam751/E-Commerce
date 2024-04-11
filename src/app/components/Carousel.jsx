"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/Carousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Carousel = ({ arr }) => {
  const router = useRouter();
  let posters = [];
  {
    arr?.map((item) => {
      posters.push(item);
    });
  }
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx((prev) => (prev === posters.length - 1 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [posters.length]);

  if (!arr || arr.length === 0) {
    // Handle the case where posters array is empty or undefined
    return null; // Render nothing or a placeholder
  }

  const src = arr[idx]; // Get the source for the current index

  if (!src) {
    // Handle the case where src is undefined
    return null; // Render nothing or a placeholder
  }

  return (
    <div
      className="carousel-container"
      onClick={() => router.push("/products")}
    >
      <Image
        className="carousel-images"
        // src={posters[idx]}
        src={src}
        alt="poster"
        width={600}
        height={300}
        priority
      />
    </div>
  );
};

export default Carousel;
