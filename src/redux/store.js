import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./slices/currencySlice";

// Q1. 리덕스로 어떤 정보까지
const store = configureStore({
  reducer: {
    currencySlice: currencySlice.reducer,
  },
});

export default store;
