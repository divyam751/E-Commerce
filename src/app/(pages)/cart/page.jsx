"use client";
import CartProductCard from "@/app/components/CartProductCard";
import "../../styles/Cart.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import emptyCart from "../../../../public/asset/empty-cart.svg";
import { useEffect } from "react";
import { getCart, loadLogout } from "@/lib/features/cartSlice";

const Cart = () => {
  const { cartData, cartPrice } = useAppSelector((state) => state.carts);
  const { userData } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCart(userData));
  }, [dispatch, userData]);
  return (
    <div className="cart-container">
      <div className="cart-statusBox">
        <p>CART ------ DELIVERY ------ PAYMENT</p>
      </div>
      <div className="cart-parentBox">
        <div className="cart-productsSection">
          {cartData?.length === 0 ? (
            <>
              <Image
                src={emptyCart}
                alt="empty-cart"
                width={400}
                height={400}
              />
              <h2> Your shoping Cart is empty! </h2>
            </>
          ) : (
            cartData?.map((item) => {
              return (
                <CartProductCard
                  key={item._id}
                  item={item}
                  userData={userData}
                />
              );
            })
          )}
        </div>
        <div className="cart-productAmountSection">
          <p className="cart-subHeadings">COUPONS</p>
          <div className="cart-couponsBox">
            <input type="text" placeholder="Apply Coupons" />
            <button className="cart-couponApplyBtn">APPLY</button>
          </div>
          <p className="cart-subHeadings">GIFTING & PERSONALISATION</p>
          <div className="cart-giftingSection">
            <Image
              src="https://constant.myntassets.com/checkout/assets/img/gift-big.webp"
              alt="ribbon"
              className="cart-giftingSection-ribbon"
              height={120}
              width={40}
            />

            <div className="cart-giftingText">
              <h3>Buying for a loved one?</h3>
              <p>Gift wrap and personalised message on cardd, Only for ₹ 25 </p>
              <h5>ADD GIFT WRAP</h5>
            </div>
          </div>
          <hr />
          <p className="cart-subHeadings">PRICE DETAILS</p>
          <div className="cart-priceDetailsParent">
            <div className="cart-priceDetailsChild">
              <span>Total MRP</span>
              <span>₹ {cartPrice.totalMrp.toLocaleString("en-IN")} </span>
            </div>
            <div className="cart-priceDetailsChild">
              <span>Discount on MRP</span>
              <span>- ₹ {cartPrice.totalDiscount.toLocaleString("en-IN")}</span>
            </div>
            <div className="cart-priceDetailsChild">
              <span>Coupon Discount</span>{" "}
              <span>
                - ₹ {cartPrice.couponDiscount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="cart-priceDetailsChild">
              <span>Platform Fee</span>{" "}
              <span> ₹ {cartPrice.platformFee.toLocaleString("en-IN")}</span>
            </div>
            <div className="cart-priceDetailsChild">
              <span>Shiping Fee</span>{" "}
              <span>
                {cartPrice.shipingFee === 0
                  ? "FREE"
                  : ` ₹ ${cartPrice.shipingFee.toLocaleString("en-IN")}`}
              </span>
            </div>
            <hr />

            <div className="cart-priceDetailsChild">
              <h4>Total Amount</h4>{" "}
              <h4> ₹ {cartPrice.totalAmount.toLocaleString("en-IN")}</h4>
            </div>
          </div>
          <button className="cart-placeOrderBtn">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
