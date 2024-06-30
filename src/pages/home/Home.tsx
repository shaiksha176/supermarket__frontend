import React from "react";
import "./page.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import { Box, Grid, Stack, Typography } from "@mui/material";

// Define the structure of Category type
type Category = {
  category: string;
  url: string;
};

// Define the structure of Offer type
type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
};

const Home: React.FC = () => {
  // List of categories
  const categoryList: Category[] = [
    { category: "Fruits", url: require("../../images/fruits (1).png") },
    { category: "Vegetables", url: require("../../images/vegetable.png") },
    { category: "Gadgets", url: require("../../images/headphones.png") },
    { category: "Baby Products", url: require("../../images/baby-boy.png") },
    {
      category: "Health & Nutrition",
      url: require("../../images/organic-product.png"),
    },
    { category: "Snacks & Biscuits", url: require("../../images/nachos.png") },
    { category: "Bath & Body", url: require("../../images/body-wash.png") },
  ];

  // List of offers
  const offerList: Offer[] = [
    {
      url: require("../../images/lays.png"),
      title: "Lay's",
      description: "Original Lays Potato Chip, 150g",
      cost: 3.99,
      id: 1,
    },
    {
      url: require("../../images/lays.png"),
      title: "Lay's",
      description: "Original Lays Potato Chip, 150g",
      cost: 3.99,
      id: 2,
    },
  ];

  const dispatch = useDispatch();

  // Function to handle adding an item to the cart
  // const handleAddtoCart = (item: Offer) => {
  //   dispatch(addItem(item));
  // };

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Grid container>
        <Grid item sm={12}>
          <div className="banner__container">
            {/* Semi-transparent overlay */}
            <div className="banner__background"></div>
            {/* Highlighted translucent text */}
            <p className="banner__text">GREAT OFFERS!</p>
            <img
              src={require("../../images/banner.jpg")}
              style={{ height: "500px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
        </Grid>
      </Grid>

      <Box sx={{ my: 3 }}>
        <Typography className="category__list__title">Category List</Typography>
        <Stack direction="row" flexWrap={"wrap"} gap={8} sx={{ mt: 3 }}>
          {categoryList.map((category, index) => (
            <Box key={index} sx={{ background: "white" }}>
              <Stack>
                <img
                  src={category.url}
                  style={{ width: "80px", margin: "0 auto" }}
                  alt={category.category}
                />
                <p className="category__name">{category.category}</p>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
