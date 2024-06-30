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
import { createOrder } from "../../redux/features/orders/orderSlice";

import { useNavigate } from "react-router-dom";
import {
  Stack,
  Table,
  TableCell,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { API_URL, FONT_FAMILIES } from "../../utils/constants";
import { jwtDecode } from "jwt-decode";
import { Order, CartItem } from "../../utils/types";

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isSuccess);
  const user = useSelector((state: any) => state.auth.user);

  // Calculate subtotal for cart items
  // const calculateSubtotal = (cartItems: CartItem) => {
  //   // const total = cartItems.reduce(
  //   //   (total: number, item: any) => total + item.price * item.quantity,
  //   //   0,
  //   // );
  //   // return total;
  //   return 0;
  // };

  // Clear the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Remove item from the cart
  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  // Increment item quantity in the cart
  const handleIncrementItem = (id: number) => {
    console.log(id);
    dispatch(incrementQuantity(id));
  };

  // Decrement item quantity in the cart
  const handleDecrementItem = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  // Create an order from the cart items
  const handleOrderCreation = () => {
    if (!isLoggedIn) {
      toast.info("Please login");
      return navigate("/login");
    }
    const transformCartItemsToOrderFormat = () => {
      return cartItems.map((item: any) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      }));
    };
    const customerData = jwtDecode<{ customerId: string }>(user.token);
    const customerId = customerData.customerId;
    const order: Order = {
      customer: customerId,
      items: transformCartItemsToOrderFormat(),
      totalAmount: cartItems.reduce(
        (total, item: any) => total + item.quantity * parseInt(item.price),
        0
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

  // Render empty cart message if no items

  if (!cartItems.length) {
    return (
      <Stack direction="column" alignItems="center" sx={{ my: 10 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: FONT_FAMILIES.BEBASE_NEUE, fontSize: "40px" }}
        >
          Your shopping cart is empty!
        </Typography>
        <img
          src={require("../../images/empty-cart.png")}
          className="empty__cart__image"
        />
      </Stack>
    );
  }

  return (
    <Paper className="cart__container" elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartItems?.map((item: any, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="cart__item">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="cart__image"
                  />
                </div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{parseInt(item.price) * item.quantity}</TableCell>
              <TableCell className="last__item">
                <p onClick={() => handleRemoveItem(item._id)}>X</p>
                <p onClick={() => handleRemoveItem(item._id)}>Remove</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {cartItems?.length > 0 && (
        <div id="cart__update__container">
          <button className="place__order__btn" onClick={handleOrderCreation}>
            Place Order
          </button>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </Paper>
  );
};

export default Cart;
