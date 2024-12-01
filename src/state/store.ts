import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice.ts';

const store = configureStore({
  reducer:{
    cart: cartReducer,
  }
})

export default store;
