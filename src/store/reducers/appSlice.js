import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    navHeight: 80,
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default appSlice;
