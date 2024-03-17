import { useEffect } from "react";
import { addItem } from "../../redux/features/cart/cartSlice";
import "./Page.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import { AppDispatch } from "../../redux/store";
type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
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
  }, [hasFetched]);

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
  const handleAddtoCart = (item: any) => {
    dispatch(addItem(item));
  };
  return (
    <div className="container">
      <div className="banner">
        <div className="titles">
          <p className="title">Brand Fiesta</p>
          <p className="subtitle">Top brands, fresh choices</p>
        </div>
        <img
          src={require("../../images/veggies.png")}
          className="category__image"
        />
      </div>
      <div className="offers">
        {productListInCategory.map((product: any, index: number) => (
          // <div key={index} className="offer">
          //   <img src={offer.url} className="offer__product__image" />
          //   <p className="offer__title">{offer.title}</p>
          //   <p className="offer__desc">{offer.description}</p>
          //   <button onClick={() => handleAddtoCart(offer)}>Add to Cart</button>
          // </div>
          <div key={index} className="offer">
            <img src={product.imageURL} className="offer__product__image" />
            <p className="offer__title">{product.name}</p>
            <p className="offer__desc">{product.description}</p>
            <button onClick={() => handleAddtoCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
