import React from "react";
import "./page.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

type Category = {
  category: string;
  url: string;
};

type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
};
const Home: React.FC = () => {
  const categoryList: Category[] = [
    {
      category: "Fruits",
      url: require("../../images/fruits (1).png"),
    },
    {
      category: "Vegetables",
      url: require("../../images/vegetable.png"),
    },

    {
      category: "Gadgets",
      url: require("../../images/headphones.png"),
    },
  ];

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
  const handleAddtoCart = (item: any) => {
    dispatch(addItem(item));
  };
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
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

            {/* Highlighted translucent text */}
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                color: "#fff",
                fontSize: "130px",
                fontWeight: "bold",
                opacity: 0.8,
                fontFamily: "Bebas Neue, sans-serif",
              }}
            >
              GREAT OFFERS!
            </p>

            <img
              src={require("../../images/banner.jpg")}
              style={{ height: "500px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
        </Grid>
      </Grid>

      <Box sx={{ my: 3 }}>
        <Typography
          sx={{
            textAlign: "left",
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "40px",
            color: "#28282B",
            // color: "white",
          }}
        >
          Category List
        </Typography>
        <Stack direction="row" flexWrap={"wrap"} gap={10} sx={{ mt: 3 }}>
          {categoryList.map((category, index) => (
            <Box key={index} sx={{ background: "white" }}>
              <Stack>
                <img src={category.url} style={{ width: "80px" }} />
                <p className="category__name">{category.category}</p>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      {/* <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Supersaver | Up to 50% off
        </Typography>
        <Stack direction="row" flexWrap={"wrap"} gap={3}>
          {offerList.map((offer, index) => (
            <Card sx={{ maxWidth: 345 }} elevation={0}>
              <CardMedia
                sx={{ height: 150, width: 100, margin: "0 auto" }}
                image={offer.url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {offer.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleAddtoCart(offer)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box> */}
    </Box>
  );
};

export default Home;
