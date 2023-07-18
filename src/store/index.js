import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/searchSlice';
import authSlice from './reducers/authSlice';
import appSlice from './reducers/appSlice';
import reservationSlice from './reducers/reservationSlice';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    app: appSlice.reducer,
    reservation: reservationSlice.reducer,
  },
});

export default store;
