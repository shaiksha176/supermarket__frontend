// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
  _id: any;
  name: string;
  cost: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Load cart from local storage
const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  
  return savedCart ? JSON.parse(savedCart) : initialState;
};
const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      console.log({ newItem });
      const existingItem = state.items.find(
        (item) => item["_id"] === newItem["_id"],
      );
      console.log({ existingItem });
      if (existingItem && existingItem.quantity >= 5) {
        toast.error("Cannot add more than 5 items of the same product 🤔");
      } else {
        const updatedItems = existingItem
          ? state.items.map((item) =>
              item["_id"] === newItem["_id"]
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.items, { ...newItem, quantity: 1 }];

        const updatedState = { ...state, items: updatedItems };

        // Save cart to local storage after modification
        localStorage.setItem("cart", JSON.stringify(updatedState));
        toast.success("Added to cart ✔");

        // Return the updated state
        return updatedState;
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      console.log(state);
      console.log(action);
      const itemId = action.payload;
      state.items = state.items.filter((item) => item["_id"] !== itemId);
      // Save cart to local storage after modification
      localStorage.setItem("cart", JSON.stringify(state));
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToIncrement = state.items.find(
        (item) => item["_id"] === itemId,
      );
      if (!itemToIncrement) {
        // If the item is not found, you might want to handle this case
        console.error("Item not found");
        return;
      }
      if (itemToIncrement?.quantity >= 5) {
        // alert("This product is only available in quantities of up to 5");
        toast.info("This product is only available in quantities of up to 5 🤔");
        return;
      }
      itemToIncrement.quantity += 1;
      saveCartToLocalStorage(state);
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToDecrement = state.items.find(
        (item) => item["_id"] === itemId,
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        saveCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      console.log("function called");
      state.items = [];
      // Save cart to local storage after modification
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
