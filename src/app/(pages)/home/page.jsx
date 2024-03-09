"use client";
import { getProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

const Home = () => {
  const { apiData, loading } = useAppSelector((state) => state.products);
  console.log(apiData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <h1>Real Landing Page</h1>
    </div>
  );
};

export default Home;
