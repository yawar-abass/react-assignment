import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartProductT extends IProduct {
  count: number;
}

export interface CartState {
  items: CartProductT[];
}

const initialState: CartState = { items: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeProductFromCart(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((product) => product.id !== id);
    },
    decrementProduct(state, action) {
      const { id } = action.payload;
      if (state.items.length <= 0) {
        console.log("Cart is Empty");
        return;
      }
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.count == 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.count -= 1;
        }
      }
    },
  },
});
export const { addToCart, removeProductFromCart, decrementProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
