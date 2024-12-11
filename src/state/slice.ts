import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient.ts';
import { useNavigate } from 'react-router-dom';

const initialState = {
  loading: false,
  transactions:[],
  filteredTransactions:[],
  barChartDetails: [],
  isFilterOn: false
}

const transactionSlice = createSlice({
  name:'transac',
  initialState,
  reducers:{
    fetchHistoryList : (state) => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if(savedTransactions){
      state.transactions = savedTransactions || [];
    }
    state.filteredTransactions = [];
    state.isFilterOn = false;
    },
    addTransactions : (state, action) => {
      localStorage.setItem('transactions', JSON.stringify(action.payload));
      state.filteredTransactions = [];
    },
    fetchByFilter : (state, action) => {
      let container = state.filteredTransactions
      const items = JSON.parse(localStorage.getItem('transactions'));
      
      if(action.payload.type.length > 0 && action.payload.tags.length > 0){
        container = items.filter(item => 
        item.type === action.payload.type && 
        item.tags.some(tag => action.payload.tags.includes(tag))
        );
      }else if(action.payload.type.length > 0){
        container = items.filter(item => 
        item.type === action.payload.type)
      }else{
         container = items.filter(item => 
        item.tags.some(tag => action.payload.tags.includes(tag)))
      }
      state.filteredTransactions = container || []
      state.isFilterOn = true
    },
    fetchToday : (state, action) => {
      const today = new Date();
      
      const savedItems = JSON.parse(localStorage.getItem('transactions'));
      
      if(!savedItems){
        return;
      }
      
      const todayItems = savedItems.filter(item => item.date === `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
      
      state.barChartDetails = todayItems;
    },
    fetchThisMonth : (state) => {
      const today = new Date();
      
      const savedItems = JSON.parse(localStorage.getItem('transactions'));
      if(!savedItems){
        return;
      }else{
        const thisMonthItems = savedItems.filter(item => {
          const [year, month, date] = item.date.split("-").map(Number);
          return year === today.getFullYear() && month === today.getMonth() + 1;
        })
        state.barChartDetails = thisMonthItems;
        console.log({thisMonthItems});
      }
    },
    fetchAllTime: (state) => {
      const savedItems = JSON.parse(localStorage.getItem('transactions'));
      state.barChartDetails = savedItems;
    },
    fetchThisWeek : (state) => {
      const today = new Date()
      const savedItems = JSON.parse(localStorage.getItem('transactions'));
      if(savedItems.length > 0){
        const itemsThisWeek = savedItems.filter(item => {
          const [year, month, date] = item.date.split("-").map(Number);
          const startOfWeek = today.getDate() - today.getDay();
          const endOfWeek = (today.getDate() - today.getDay()) + 6;
          console.log({startOfWeek, endOfWeek});
          return year === today.getFullYear() && month === today.getMonth() + 1 && date <= endOfWeek && date >= startOfWeek
        })
        state.barChartDetails = itemsThisWeek;
        console.log({itemsThisWeek})
      }else{
        return;
      }
    },
    removeFilter : (state) => {
      state.filteredTransactions = [];
      state.isFilterOn = false;
      
    }
  }
})

export default transactionSlice.reducer;
export const { fetchHistoryList, addTransactions, fetchByFilter, fetchToday, fetchThisMonth, fetchAllTime, fetchThisWeek, removeFilter } = transactionSlice.actions;

