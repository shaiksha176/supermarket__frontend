import React, { useEffect, useState } from "react";
import "./Page.css";
import axios from "axios";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { COLORS, FONT_FAMILIES } from "../../utils/constants";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
const Banner = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <div style={{ position: "relative" }}>
          {/* Semi-transparent overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity (0.5 for example) for the dim effect
            }}
          ></div>

          {/* Main text - "Brand Fiesta" */}
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              color: "#fff",
              fontSize: "90px",
              fontWeight: "bold",
              opacity: 0.8,
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            SERVING 2000000 + PEOPLE A YEAR
          </p>

          {/* Subtitle - "Top Brands, Top Choices" */}
          <p
            style={{
              position: "absolute",
              top: "calc(50% + 150px)", // Adjust the distance below the main text

              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              color: "#fff",
              fontSize: "30px",
              opacity: 0.8,
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Orders delivered on time!
          </p>

          {/* Image */}
          <img
            src={require("../../images/van.jpg")}
            style={{ height: "500px", objectFit: "cover" }}
            alt="Banner"
          />
        </div>
      </Grid>
    </Grid>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      console.log(jwtDecode(user.token));
      const customerData = jwtDecode<any>(user.token);
      const customerId = customerData.customerId;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/orders/customer/${customerId}`,
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
      <Typography
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "green",
          fontSize: "50px",
          fontFamily: "Ananda Black, sans-serif",
        }}
      >
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
                    <Box>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#e3c2c1",
                          fontSize: "14px",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        Order Placed
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#eae2e2",
                          fontWeight: "700",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        {/* {order.orderDate} */}
                        24 Mar
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#e3c2c1",
                          fontSize: "14px",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        Total
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#eae2e2",
                          fontWeight: "700",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        {order.totalAmount}
                      </Typography>
                    </Box>
                    <Box flex={1}>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#e3c2c1",
                          fontSize: "14px",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        Status
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#eae2e2",
                          fontWeight: "700",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        {order.status}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#e3c2c1",
                          fontSize: "14px",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        Order ID
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "#eae2e2",
                          fontWeight: "700",
                          fontFamily: FONT_FAMILIES.POPPINS,
                        }}
                      >
                        {order._id}
                      </Typography>
                    </Box>
                  </Stack>

                  <div className="order__items">
                    <div className="items">
                      {order.items.map((item: any) => (
                        <img
                          src={item.product.imageURL}
                          className="ordered__item"
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

export default Orders;
