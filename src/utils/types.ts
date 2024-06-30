// Define the order type
export type Order = {
  customer: number | string;
  items: {
    product: number | string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
  address: {
    street?: string;
    city: string;
    postalCode?: string;
    state?: string;
  };
  paymentDetails: {
    paymentMethod: string;
  };
};

// Define the order state type
export type OrderState = {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasFetched: boolean;
};

export type CartItem = {
  _id: string;
  name: string;
  imageURL: string;
  price: string;
  quantity: number;
};

// Define the structure of Offer type

export type Offer = {
  url: string;
  title: string;
  description: string;
  cost: number;
  id: number | string;
};

export type Category = {
  _id: string;
  name: string;
  imageUrl: string;
  __v?: number;
};

export type Rating = {
  // Define properties for the rating object if any
};

export type Product = {
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

export type FormData = {
  email: string;
  password: string;
  username?: string;
};
