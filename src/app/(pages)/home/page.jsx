"use client";
import { getProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import "../../../styles/Home.css";
import { getAsset } from "@/lib/features/assetSlice";

const Home = () => {
  const { apiData, loading } = useAppSelector((state) => state.products);
  const { assetData } = useAppSelector((state) => state.assets);
  console.log(assetData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAsset());
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
