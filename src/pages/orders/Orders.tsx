import React, { useEffect, useState } from "react";
import "./Page.css";
import axios from "axios";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { API_URL, COLORS, FONT_FAMILIES } from "../../utils/constants";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { RootState } from "../../redux/store";

function formatDate(inputDate: any) {
  // Parse the date string
  const parsedDate = moment(inputDate, moment.ISO_8601, true);

  // Check if the parsed date is valid
  if (parsedDate.isValid()) {
    // Format the date in the desired format
    return parsedDate.format("hh:mm A, DD MMM, YYYY");
  } else {
    return "invalid";
  }
}

const Banner = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Box className="banner__container">
          {/* Semi-transparent overlay */}
          <Box className="banner__background"></Box>

          <p className="banner__title">SERVING 2000000 + PEOPLE A YEAR</p>

          <p className="banner__subtitle">Orders delivered on time!</p>

          {/* Image */}
          <img
            src={require("../../images/van.jpg")}
            style={{ height: "500px", objectFit: "cover" }}
            alt="Banner"
          />
        </Box>
      </Grid>
    </Grid>
  );
};
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      console.log(jwtDecode(user.token));
      const customerData = jwtDecode<any>(user.token);
      const customerId = customerData.customerId;
      try {
        const { data } = await axios.get(
          `${API_URL}/orders/customer/${customerId}`
        );
        console.log(data);
        setOrders(data);
      } catch (error) {
        setError("Unable to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerOrders();
  }, []);

  if (loading) return <div className="order__container">Loading...</div>;
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Banner />
      <br />
      <br />
      <Typography gutterBottom className="orders__header">
        Your Orders
      </Typography>
      <Box>
        {!orders || orders.length === 0 ? (
          <Box>No Orders</Box>
        ) : (
          <Box sx={{ width: "50%", margin: "0 auto" }}>
            <Box className="orders">
              {orders.map((order: any, index: any) => (
                <Box className="order">
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={2}
                    sx={{ background: COLORS.PRIMARY_COLOR, padding: "10px" }}
                  >
                    <OrderDetail
                      label="Order Placed"
                      value={formatDate(order.orderDate)}
                    />
                    <OrderDetail label="Total" value={order.totalAmount} />
                    <OrderDetail label="Status" value={order.status} flex={1} />
                    <OrderDetail label="Order ID" value={order._id} />
                  </Stack>

                  <div className="order__items">
                    <div className="items">
                      {order.items.map((item: any) => (
                        <img
                          src={item.product.imageURL}
                          // className="ordered__item"
                          style={{
                            objectFit: "cover",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      ))}
                    </div>
                    {/* <div>
                <Button
                  variant="contained"
                  sx={{
                    background: COLORS.PRIMARY_COLOR,
                    boxShadow: "none",
                    fontFamily: FONT_FAMILIES.POPPINS,
                  }}
                >
                  Repeat Order
                </Button>
              </div> */}
                  </div>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const OrderDetail: React.FC<{
  label: string;
  value: string | number;
  flex?: number;
}> = ({ label, value, flex }) => (
  <Box flex={flex}>
    <Typography
      sx={{
        textAlign: "left",
        color: "#e3c2c1",
        fontSize: "14px",
        fontFamily: FONT_FAMILIES.POPPINS,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        textAlign: "left",
        color: "#eae2e2",
        fontWeight: "700",
        fontFamily: FONT_FAMILIES.POPPINS,
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default Orders;
