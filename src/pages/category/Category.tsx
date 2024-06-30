import { useEffect } from "react";
import { addItem } from "../../redux/features/cart/cartSlice";
import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryBasedProducts,
  fetchProducts,
} from "../../redux/features/products/productSlice";
import { AppDispatch, RootState } from "../../redux/store";
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

// Define the structure of Offer type

type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
};

type Category = {
  _id: string;
  name: string;
  imageUrl: string;
  __v?: number;
};

type Rating = {
  // Define properties for the rating object if any
};

type Product = {
  category: Category;
  createdAt?: string;
  description?: string;
  imageURL: string;
  manufacturer?: string;
  name: string;
  price: string;
  quantityInStock: number;
  ratings?: Rating[];
  __v?: number;
  _id: string;
};

type CartItem = {
  _id: any;
  name: string;
  cost: number;
  quantity: number;
};

// Component for rendering the banner

const Banner = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Box className="banner__container">
          {/* Semi-transparent overlay */}
          <Box className="banner__background"></Box>

          {/* Main text - "Brand Fiesta" */}
          <Typography component={"p"} className="banner__title">
            BRAND FIESTA
          </Typography>

          {/* Subtitle - "Top Brands, Top Choices" */}
          <Typography className="banner__subtitle" component={"p"}>
            Top Brands, Top Choices
          </Typography>

          {/* Image */}
          <img
            src={require("../../images/shopping.jpg")}
            style={{ height: "500px", objectFit: "cover" }}
            alt="Banner"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

// Component for rendering categories and products

const Category = () => {
  // Extracting state and dispatch
  const {
    products: productListInCategory,
    status: productFetchStatus,
    error: productFetchError,
    hasFetched,
  } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch<AppDispatch>();

  // Fetching products on initial render if not already fetched

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchProducts());
    }
  }, [hasFetched]);

  // Handler for adding items to the cart

  const handleAddtoCart = (item: CartItem) => {
    console.log(item);
    dispatch(addItem(item));
  };

  // List of categories

  const categoryList = [
    {
      _id: "650865054ed7eae3f59e8932",
      category: "Fruits",
      url: require("../../images/fruits (1).png"),
    },
    {
      _id: "6508652e4ed7eae3f59e8934",
      category: "Vegetables",
      url: require("../../images/vegetable.png"),
    },

    {
      _id: "650865a04ed7eae3f59e893a",
      category: "Baby Products",
      url: require("../../images/baby-boy.png"),
    },
    {
      _id: "650865d44ed7eae3f59e893c",
      category: "Health & Nutrition",
      url: require("../../images/organic-product.png"),
    },
    {
      _id: "650865444ed7eae3f59e8936",
      category: "Snacks & Biscuits",
      url: require("../../images/nachos.png"),
    },
    {
      _id: "6508657e4ed7eae3f59e8938",
      category: "Bath & Body",
      url: require("../../images/body-wash.png"),
    },
  ];

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Banner />
      <br />
      <br />
      <Typography gutterBottom>Categories</Typography>
      <br />
      <Grid container>
        {categoryList.map((category, index) => (
          <Grid item md={1} key={index}>
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={() => dispatch(fetchCategoryBasedProducts(category._id))}
            >
              <img
                src={category.url}
                alt={category.category}
                className="category__images"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      {/* Conditional rendering based on fetch status */}
      {productFetchStatus === "loading" ? (
        "Loading...."
      ) : productFetchStatus === "failed" ? (
        "Cannot fetch data..."
      ) : productListInCategory?.length > 0 ? (
        <Grid container spacing={3}>
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
      ) : (
        "No Data found"
      )}
    </Box>
  );
};

export default Category;
