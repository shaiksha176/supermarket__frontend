import React from "react";
import "./Page.css";
const Orders = () => {
  return (
    <div className="order__container">
      <h2>Orders</h2>
      <div className="orders">
        <div className="order">
          <div className="order__details">
            <div>
              <p className="title">Order Placed</p>
              <p className="subtitle">23 Dec, 2023</p>
            </div>
            <div>
              <p className="title">Total</p>
              <p className="subtitle">3000</p>
            </div>
            <div>
              <p className="title">Status</p>
              <p className="subtitle">shipped</p>
            </div>
            <div className="last__item">
              <p className="title">Order ID</p>
              <p className="subtitle">123456799</p>
            </div>
          </div>
          <div className="order__items">
            <div className="items">
              <img
                src={require("../../images/ginger.png")}
                className="ordered__item"
              />
              <img
                src={require("../../images/lays.png")}
                className="ordered__item"
              />
              <p>2 more items...</p>
            </div>
            <div>
              <button className="repeat__order__btn">Repeat Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
