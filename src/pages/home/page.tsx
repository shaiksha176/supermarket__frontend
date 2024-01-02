import React from "react";
import "./page.css";

type Category = {
  category: string;
  url: string;
};

type Offer = {
  url: string;
  title: string;
  description: string;
  cost: string;
};

const Home: React.FC = () => {
  const categoryList: Category[] = [
    {
      category: "Fruits",
      url: require("../../images/fruits.png"),
    },
    {
      category: "Vegetables",
      url: require("../../images/veggies.png"),
    },
    {
      category: "Chips",
      url: require("../../images/lays.png"),
    },
    {
      category: "Mobiles",
      url: require("../../images/iphone.png"),
    },
  ];

  const offerList: Offer[] = [
    {
      url: require("../../images/lays.png"),
      title: "Lay's",
      description: "Original Lays Potato Chip, 150g",
      cost: "$3.99",
    },
    {
      url: require("../../images/lays.png"),
      title: "Lay's",
      description: "Original Lays Potato Chip, 150g",
      cost: "$3.99",
    },
  ];

  return (
    <div>
      <div className="carousel__container">
        <p id="carousel__title">
          Fresh off the <span>farm! </span>{" "}
        </p>
        <img src={require("../../images/veggies.png")} id="carousel__image" />
      </div>
      <div className="carousel__dots">
        <div className="carousel__dot"></div>
        <div className="carousel__dot"></div>
        <div className="carousel__dot"></div>
      </div>
      <div className="container category__list">
        <p className="category__names">Products Category</p>
        <div id="category__container">
          {categoryList.map((category, index) => (
            <div key={index}>
              <div className="category">
                <img src={category.url} className="category__list__image" />
                <p className="category__name">{category.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="offers__container" className="container">
        <p className="offe">Supersaver | Up to 50% off</p>
        <div className="offers">
          {offerList.map((offer, index) => (
            <div key={index} className="offer">
              <img src={offer.url} className="offer__product__image" />
              <p className="offer__title">{offer.title}</p>
              <p className="offer__desc">{offer.description}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
