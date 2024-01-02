import React from "react";
import "./Page.css";

type Offer = {
  url: string;
  title: string;
  description: string;
  cost: string;
};

const Category = () => {
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
  );
};

export default Category;
