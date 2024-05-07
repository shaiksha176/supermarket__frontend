import React from "react";
import "./Footer.css";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { COLORS, FONT_FAMILIES } from "../../utils/constants";
const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: COLORS.BLACK_SHADE,
        py: 3,
      }}
    >
      <Grid container sx={{ width: "80%", margin: "0 auto" }}>
        <Grid item md={4}>
          <Typography
            sx={{
              color: "tomato",
              textAlign: "left",
              fontFamily: FONT_FAMILIES.BEBASE_NEUE,
              fontSize: "40px",
            }}
          >
            EASY CART
          </Typography>
          <Typography
            sx={{
              color: "white",
              textAlign: "left",
              fontFamily: FONT_FAMILIES.POPPINS,
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Sit magna eiusmod duis cillum. Consequat mollit dolore exercitation
            aliqua fugiat aliquip irure. Aute elit culpa reprehenderit aute do
            et quis officia laboris incididunt et reprehenderit aliquip veniam.
            Est non laborum exercitation ex mollit. Dolor amet incididunt
            proident proident. Exercitation anim nulla est adipisicing amet
            laboris fugiat in ullamco ipsum.
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: "white",
              fontFamily: FONT_FAMILIES.BEBASE_NEUE,
              fontSize: "30px",
              fontWeight: 500,
            }}
          >
            Company
          </Typography>
          <Stack direction="column">
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Home
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              About us
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Delivery
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Privacy Policy
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: "white",
              fontFamily: FONT_FAMILIES.BEBASE_NEUE,
              fontSize: "30px",
              fontWeight: 500,
            }}
          >
            GET IN TOUCH
          </Typography>
          <Stack direction="column">
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              +45 6789 123456
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: FONT_FAMILIES.POPPINS,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              info@easy-cart.com
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "1px",
          width: "80%",
          margin: "12px auto ",
          background: "white",
        }}
      ></Box>
      <Typography sx={{ color: "white" }}>
        Copyright 2024 easycart.com - All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
