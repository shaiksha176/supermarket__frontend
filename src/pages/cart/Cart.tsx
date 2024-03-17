import React from "react";
import "./Page.css";
import {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { Order, createOrder } from "../../redux/features/orders/orderSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isSuccess);
  const calculateSubtotal = (cartItems: any) => {
    const total = cartItems.reduce(
      (total: number, item: any) =>
        total + item.price["$numberDecimal"] * item.quantity,
      0,
    );
    return total;
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleIncrementItem = (id: number) => {
    console.log(id);
    dispatch(incrementQuantity(id));
  };

  const handleDecrementItem = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleOrderCreation = () => {
    if (!isLoggedIn) {
      toast("Please login");
      return navigate("/login");
    }
    const transformCartItemsToOrderFormat = () => {
      return cartItems.map((item: any) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price["$numberDecimal"],
      }));
    };

    const order: Order = {
      customer: "65b4dd1bc9cb161bb13ddfe4",
      items: transformCartItemsToOrderFormat(),
      totalAmount: cartItems.reduce(
        (total, item: any) =>
          total + item.quantity * Number(item.price["$numberDecimal"]),
        0,
      ),
      address: {
        city: "New York",
        state: "New York",
      },
      paymentDetails: {
        paymentMethod: "Cash on Delivery",
      },
      status: "Pending",
    };

    dispatch(createOrder(order));
    dispatch(clearCart());
  };

  if (!cartItems.length) {
    return (
      <div className="container empty__cart__container">
        <p>
          Your shopping cart is empty! Please add some items to your cart before
          proceeding with checkout
        </p>
        <img
          src={require("../../images/empty-cart.png")}
          className="empty__cart__image"
        />
      </div>
    );
  }

  return (
    <div className="container cart__container">
      <table className="cart__list">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>
              <div className="cart__item">
                <img
                  src={require("../../images/ginger.png")}
                  className="cart__image"
                />
                <p>Fresh Ginger, 100g</p>
              </div>
            </td>
            <td>
              <div className="qty">
                <div className="inc__dec__btn">-</div>
                <p>1</p>
                <div className="inc__dec__btn">+</div>
              </div>
            </td>
            <td>100</td>
            <td>200</td>
            <td className="last__item">
              <p>X</p>
              <p>Remove</p>
            </td>{" "}
          </tr>
          <tr>
            <td>
              <div className="cart__item">
                <img
                  src={require("../../images/ginger.png")}
                  className="cart__image"
                />
                <p>Fresh Ginger, 100g</p>
              </div>
            </td>
            <td>
              <div className="qty">
                <div className="inc__dec__btn">-</div>
                <p>1</p>
                <div className="inc__dec__btn">+</div>
              </div>
            </td>
            <td>100</td>
            <td>200</td>
            <td className="last__item">
              <p>X</p>
              <p>Remove</p>
            </td>
          </tr>
        </tbody> */}
        <tbody>
          {cartItems.map((item: any) => (
            <tr key={item.id}>
              <td>
                <div className="cart__item">
                  <img
                    src={item.imageURL}
                    className="cart__image"
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                </div>
              </td>
              <td>
                <div className="qty">
                  <div
                    className="inc__dec__btn"
                    onClick={() => handleDecrementItem(item._id)}
                  >
                    -
                  </div>
                  <p>{item.quantity}</p>
                  <div
                    className="inc__dec__btn"
                    onClick={() => handleIncrementItem(item._id)}
                  >
                    +
                  </div>
                </div>
              </td>
              <td>{item.price["$numberDecimal"]}</td>
              <td>
                {Math.round(
                  Number(item.price["$numberDecimal"] * item.quantity),
                )}
              </td>
              <td className="last__item">
                <p onClick={() => handleRemoveItem(item._id)}>X</p>
                <p onClick={() => handleRemoveItem(item._id)}>Remove</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div id="cart__update__container">
        <table>
          <tr>
            <td>Subtotal</td>
            <td>$400.00</td>
          </tr>
          <tr>
            <td>Delivery Fee</td>
            <td>400</td>
          </tr>
          <tr>
            <td>Grand Total</td>
            <td>400</td>
          </tr>
        </table>
        <button className="place__order__btn">Place Order</button>
      </div> */}
      {cartItems.length > 0 && (
        <div id="cart__update__container">
          <table>
            <tr>
              <td>Subtotal</td>
              <td>${calculateSubtotal(cartItems).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>400</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td>${calculateSubtotal(cartItems) + 400}</td>
            </tr>
          </table>
          <button className="place__order__btn" onClick={handleOrderCreation}>
            Place Order
          </button>
          {/* <button onClick={handleClearCart}>Clear Cart</button> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
