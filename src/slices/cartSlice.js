import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
  totalItems: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // Course already in cart
        return;
      } else {
        // Add course to cart
        state.cart.push(course);
        state.totalItems++;
        state.total += course.price;
      }
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;