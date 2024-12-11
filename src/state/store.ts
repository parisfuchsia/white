import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slice.ts';
import themeReducer from './themeSlice.ts';

const store = configureStore({
  reducer:{
    transac: transactionReducer,
    theme: themeReducer,
  }
})

export default store;
