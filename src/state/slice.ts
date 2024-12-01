import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient.ts';
import { useNavigate } from 'react-router-dom';
const initialState = {
  loading: false,
  cart: [],
  checkoutDetail: {},
  success: false,
  products: [],
  byDefault: false
}

export const fetchCart = createAsyncThunk('fetchSession', async() => {
  const { data } = await supabase
  .from('cart')
  .select('*');
 console.log({data});
 return data;
})

export const addToCart = createAsyncThunk('addToCart', async(getData) => {
  await supabase
  .from('cart')
  .insert({
    title: getData.title,
    thumbnail: getData.thumbnail,
    quantity: getData.quantity,
    price: getData.price,
    brand: getData.brand,
    description: getData.description,
    id: getData.id,
    stock: getData.stock,
    orderPlaced: getData.orderPlaced || false
  })
})

export const fetchProducts = createAsyncThunk('fetchProducts', async(getSkip) => {
   const respo = await fetch(`https://dummyjson.com/products?limit=10&skip=${getSkip === 0 ? 0 : getSkip*10}`);
   const data = await respo.json();
      return data;
})

export const searchProducts = createAsyncThunk('searchProducts', async(getQuery) => {
  const respo = await fetch(`https://dummyjson.com/products/search?q=${getQuery}`);
      const data = await respo.json();
 return data;
})

export const updateCart = createAsyncThunk('updateCart', async(getData) => {
  await supabase
  .from('cart')
  .update({orderPlaced: true})
  .eq('uuid', getData.uuid)
})

export const getProductsByCategory = createAsyncThunk('getProductsByCategory', async(getCategory) => {
  const respo = await fetch(`https://dummyjson.com/products/category/${getCategory.toLowerCase()}`);
  const data = await respo.json();
  return data;
})

export const removeFromCart = createAsyncThunk('removeFromCart', async(getInfo) => {
  await supabase
  .from('cart')
  .delete()
  .eq(getInfo.type, getInfo.value);
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    Checkout : (state, action) => {
      state.checkoutDetail = action.payload
    },
    Reset : (state) => {
      state.checkoutDetail = {}
    },
    setSuccess : (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload || []
      state.loading = false;
    })
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload || [];
      state.byDefault = true;
      state.loading = false;
    })
    builder.addCase(searchProducts.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload || [];
      state.byDefault = false;
      state.loading = false;
    })
    builder.addCase(getProductsByCategory.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.products = action.payload || [];
      state.byDefault = false;
      state.loading = false;
    })
  }
})

export default cartSlice.reducer;
export const { Checkout, Reset, setSuccess } = cartSlice.actions;
