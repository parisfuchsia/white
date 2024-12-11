import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: "theme",
  initialState :{ theme: "light" },
  reducers:{
    changeTheme : (state, action) => {
     state.theme = action.payload;
    },
    getTheme : (state) => {
  const savedTheme = localStorage?.getItem('theme');
      if(savedTheme){
        state.theme = savedTheme;
      }
    }
  }
})

export default themeSlice.reducer;
export const { changeTheme, getTheme } = themeSlice.actions;