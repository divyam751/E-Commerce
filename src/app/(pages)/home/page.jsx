"use client";
import { getProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import "../../../styles/Home.css";

const Home = () => {
  const { apiData, loading } = useAppSelector((state) => state.products);
  console.log(apiData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="home-container">
      {/* <Carousel arr={posters} /> */}
      <div className="home-brands-container">
        <p className="home-heading">MEDAL WORTHY BRANDS</p>
        <div className="home-brandsCarousel">
          {/* <BrandsCarousel arr={brands} /> */}
        </div>
        <p className="home-heading">GRAND GLOBAL BRANDS</p>
        <div className="home-brandsCarousel">
          {/* <BrandsCarousel arr={glowalBrands} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
