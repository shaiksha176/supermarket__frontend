import { useEffect } from "react";
import { addItem } from "../../redux/features/cart/cartSlice";
import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import { AppDispatch } from "../../redux/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
};

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
              fontSize: "130px",
              fontWeight: "bold",
              opacity: 0.8,
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            BRAND FIESTA
          </p>

          {/* Subtitle - "Top Brands, Top Choices" */}
          <p
            style={{
              position: "absolute",
              top: "calc(50% + 100px)", // Adjust the distance below the main text
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              color: "#fff",
              fontSize: "36px",
              opacity: 0.8,
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Top Brands, Top Choices
          </p>

          {/* Image */}
          <img
            src={require("../../images/shopping.jpg")}
            style={{ height: "500px", objectFit: "cover" }}
            alt="Banner"
          />
        </div>
      </Grid>
    </Grid>
  );
};

const Category = () => {
  const {
    products: productListInCategory,
    status: productFetchStatus,
    error: productFetchError,
    hasFetched,
  } = useSelector((state: any) => state.products);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchProducts());
    }
    console.log(productListInCategory);
  }, [hasFetched]);

  useEffect(() => {}, []);

  const handleAddtoCart = (item: any) => {
    dispatch(addItem(item));
  };

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Banner />
      <br />
      <br />
      <Grid container spacing={3}>
        {" "}
        {productListInCategory.map((product: any, index: number) => (
          <Grid item sm={3}>
            <Card key={index}>
              <CardMedia
                sx={{ height: 200 }}
                image={product.imageURL}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom component="div">
                  {product.name.toString().toUpperCase()}
                </Typography>

                <Button
                  onClick={() => handleAddtoCart(product)}
                  sx={{
                    background: "orange",
                    width: "100%",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
