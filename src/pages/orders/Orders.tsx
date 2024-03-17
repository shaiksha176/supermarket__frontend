import React, { useEffect } from "react";
import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchOrders } from "../../redux/features/orders/orderSlice";

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();
  const { hasFetched, orders } = useSelector((state: any) => state.orders);
  console.log(orders);
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchOrders());
    }
  }, []);
  if (!orders.length) return <div className="order__container">Loading...</div>;
  return (
    <div className="order__container">
      <h2>Orders</h2>
      <div className="orders">
        {orders.map((order: any, index: any) => (
          <div className="order">
            <div className="order__details">
              <div>
                <p className="title">Order Placed</p>
                <p className="subtitle">{order.orderDate}</p>
              </div>
              <div>
                <p className="title">Total</p>
                <p className="subtitle">{order.totalAmount}</p>
              </div>
              <div>
                <p className="title">Status</p>
                <p className="subtitle">{order.status}</p>
              </div>
              <div className="last__item">
                <p className="title">Order ID</p>
                <p className="subtitle">{order._id}</p>
              </div>
            </div>

            <div className="order__items">
              <div className="items">
                {order.items.map((item: any) => (
                  <img src={item.product.imageURL} className="ordered__item" />
                ))}
              </div>
              <div>
                <button className="repeat__order__btn">Repeat Order</button>
              </div>
            </div>
          </div>
        ))}
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
