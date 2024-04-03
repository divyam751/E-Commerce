import { updateCart, updateCartQty } from "@/lib/features/cartSlice";
import "../styles/CartProductCard.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const CartProductCard = ({ item, userData }) => {
  const dispatch = useAppDispatch();
  const { userId, token } = userData;
  const REQUEST_URL = process.env.NEXT_PUBLIC_REQUEST_URL;

  const handleIncrease = () => {
    dispatch(updateCartQty({ payload: item, action: "ADD" }));
  };
  const handleDecrease = () => {
    dispatch(updateCartQty({ payload: item, action: "SUB" }));
  };

  const handleRemove = async () => {
    console.log("remove calls");
    try {
      const response = await fetch(`${REQUEST_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          itemId: item._id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      const responseData = await response.json();
      console.log("response=>", responseData);
      // return responseData;
      dispatch(updateCart(responseData));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const discount = Math.floor(((item?.mrp - item?.price) / item?.mrp) * 100);
  return (
    <div className="cartProductCard-container">
      <Image
        src={item.image[0]}
        alt="Product Image"
        className="cartProductCard-productImg"
        width={300}
        height={100}
        priority="high"
      />

      <div className="cartProductCard-contentBox">
        <h3>{item.brand}</h3>
        <p className="cartProductCard-contentTitle">{item.title}</p>
        <div className="cartProductCard-priceBox">
          <p>{`Rs.${item.price} `}</p>
          <p>{`( ${discount}% OFF)`}</p>
        </div>

        <div className="cartProductCard-numBox">
          <label className="cartProductCard-sizes">
            Size :
            <select name="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </label>
          <label className="cartProductCard-quantity">
            Qty :
            <div className="cartProductCard-qtyCounter">
              <button onClick={handleDecrease} disabled={item.quantity < 2}>
                -
              </button>
              <h4> {item.quantity} </h4>
              <button onClick={handleIncrease}> + </button>
            </div>
          </label>
        </div>
        <div className="cartProductCard-buttonBox">
          <button
            className="cartProductCard-removeBtn"
            onClick={() => handleRemove()}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
