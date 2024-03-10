"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/features/productSlice";
import { getAsset } from "@/lib/features/assetSlice";
import "../../styles/Home.css";
import BrandsCarousel from "@/components/BrandsCarousel";
import Carousel from "@/components/Carousel";
const Home = () => {
  const dispatch = useAppDispatch();
  const { apiData, loading } = useAppSelector((state) => state.products);
  const { assetData, assetLoading } = useAppSelector((state) => state.assets);
  const [posters, setPosters] = useState([]);
  const [brands, setBrands] = useState([]);
  const [glowalbrands, setGlowalBrands] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAsset());
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {}, [2000]);
  }, []);
  console.log(typeof assetData.posters);
  console.log(assetData.posters);
  return (
    <main className="app">
      <div className="home-container">
        <Carousel arr={assetData.posters} />
        <div className="home-brands-container">
          <p className="home-heading">MEDAL WORTHY BRANDS</p>
          <div className="home-brandsCarousel">
            <BrandsCarousel arr={assetData.brands} />
          </div>
          <p className="home-heading">GRAND GLOBAL BRANDS</p>
          <div className="home-brandsCarousel">
            <BrandsCarousel arr={assetData.glowalbrands} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
