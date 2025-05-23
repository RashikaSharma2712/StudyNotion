import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/authSlice";
import { profileSlice } from "../slices/profileSlice";
import { cartSlice } from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    cart: cartSlice.reducer,
  },
}); 