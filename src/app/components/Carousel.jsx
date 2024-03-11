"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/Carousel.css";
import Image from "next/image";

const Carousel = ({ arr }) => {
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

  return (
    <div className="carousel-container">
      <Image
        className="carousel-images"
        src={posters[idx]}
        alt="poster"
        width={600}
        height={300}
      />
    </div>
  );
};

export default Carousel;
