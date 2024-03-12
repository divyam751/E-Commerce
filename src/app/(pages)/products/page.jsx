"use client";
import { useEffect, useState } from "react";

import "../../styles/Product.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getProducts,
  setCustomFilter,
  sortByQuery,
} from "@/lib/features/productSlice";
import ProductCard from "@/app/components/ProductCard";

const Product = () => {
  const dispatch = useAppDispatch();
  const { apiData, loading, filteredProducts } = useAppSelector(
    (state) => state.products
  );
  // console.log("filteredProducts", filteredProducts);

  const [filters, setFilters] = useState({
    men: false,
    women: false,
    kids: false,
    "T-shirt": false,
    "Casual Shirt": false,
    "Formal Shirt": false,
    trousers: false,
    kurta: false,
    roadster: false,
    hrx: false,
    "U.S.": false,
    "Tommy Hilfiger": false,
    "here&now": false,
    highlander: false,
    hancock: false,
  });

  const handleGenderFilter = (e) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setFilters({ ...filters, [name]: checked });
  };

  const handleSortBy = (e) => {
    dispatch(sortByQuery(e.target.value));
    // console.log(e.target.value);
  };
  // console.log(filters);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(setCustomFilter(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(setCustomFilter(filters));
    const productSortBy = document.getElementById("productSortBy");
    productSortBy.value = "Recommended";
  }, [dispatch, filters]);

  // console.log(apiData);

  return (
    <div className="productPage-container">
      {loading && "Loading..."}

      <div className="productPage-sortingSection">
        <h1>FILTERS</h1>
        <label className="productPage-sortingBox">
          Sort by :
          <select
            name="sort"
            id="productSortBy"
            className="productPage-sortFilter"
            onChange={handleSortBy}
          >
            <option value="Recommended">Recommended</option>
            <option value="HighToLow">Price - High to Low</option>
            <option value="LowToHigh">Price - Low to High</option>
          </select>
        </label>
      </div>

      <div className="productPage-Parent">
        <div className="productPage-filterSection">
          <div className="productPage-brandFilter">
            <h3>GENDER</h3>
            <label className="filter-label">
              <input type="checkbox" name="men" onChange={handleGenderFilter} />
              Men
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="women"
                onChange={handleGenderFilter}
              />
              Women
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="kids"
                onChange={handleGenderFilter}
              />
              Kids
            </label>
          </div>
          <div className="productPage-categoryFilter">
            <h3>CATEGORIES</h3>
            <label className="filter-label">
              <input
                type="checkbox"
                name="T-shirt"
                onChange={handleGenderFilter}
              />
              T-shirt
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="Casual Shirt"
                onChange={handleGenderFilter}
              />
              Casual Shirt
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="Formal Shirt"
                onChange={handleGenderFilter}
              />
              Formal Shirt
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="trousers"
                onChange={handleGenderFilter}
              />
              Trousers
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="kurta"
                onChange={handleGenderFilter}
              />
              Kurta
            </label>
          </div>
          <div className="productPage-brandFilter">
            <h3>Brands</h3>
            <label className="filter-label">
              <input
                type="checkbox"
                name="roadster"
                onChange={handleGenderFilter}
              />
              Roadster
            </label>
            <label className="filter-label">
              <input type="checkbox" name="hrx" onChange={handleGenderFilter} />
              HRX
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="U.S."
                onChange={handleGenderFilter}
              />
              U.S. Polo
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="Tommy Hilfiger"
                onChange={handleGenderFilter}
              />
              Tommy Hilfiger
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="here&now"
                onChange={handleGenderFilter}
              />
              HERE&NOW
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="highlander"
                onChange={handleGenderFilter}
              />
              HIGHLANDER
            </label>
            <label className="filter-label">
              <input
                type="checkbox"
                name="hancock"
                onChange={handleGenderFilter}
              />
              Hancock
            </label>
          </div>
        </div>

        <div className="productPage-productListingSection">
          {(filteredProducts.length !== 0 ? filteredProducts : apiData).map(
            (item) => {
              return <ProductCard key={item.id} item={item} />;
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
