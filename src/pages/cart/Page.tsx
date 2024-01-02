import React from "react";
import "./Page.css";

const Cart = () => {
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
        <tbody>
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
        </tbody>
      </table>
      <div id="cart__update__container">
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
      </div>
    </div>
  );
};

export default Cart;
