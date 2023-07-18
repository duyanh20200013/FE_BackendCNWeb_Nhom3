import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: {
      provinceCode: null,
      provinceName: null,
      districtCode: null,
      districtName: null,
      checkIn: null,
      checkOut: null,
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      },
    },
    searchUrlParams: null, // String
    isSearch: false,
    isUpdated: false, // Flag to check if data is updated completely or not
  },
  reducers: {
    setSearchUrlParams: (state, action) => {
      state.data.searchUrlParams = action.payload;
    },
    setProvinceCode: (state, action) => {
      state.data.provinceCode = action.payload;
    },
    setProvinceName: (state, action) => {
      state.data.provinceName = action.payload;
    },
    setDistrictCode: (state, action) => {
      state.data.districtCode = action.payload;
    },
    setDistrictName: (state, action) => {
      state.data.districtName = action.payload;
    },
    setCheckInDate: (state, action) => {
      state.data.checkIn = action.payload;
    },
    setCheckOutDate: (state, action) => {
      state.data.checkOut = action.payload;
    },
    increaseAdults: state => {
      state.data.guests.adults += 1;
    },
    decreaseAdults: state => {
      if (state.data.guests.adults === 0) return;
      state.data.guests.adults -= 1;
    },
    increaseChildren: state => {
      state.data.guests.children += 1;
    },
    decreaseChildren: state => {
      if (state.data.guests.children === 0) return;
      state.data.guests.children -= 1;
    },
    increaseInfants: state => {
      state.data.guests.infants += 1;
    },
    decreaseInfants: state => {
      if (state.data.guests.infants === 0) return;
      state.data.guests.infants -= 1;
    },
    increasePets: state => {
      state.data.guests.pets += 1;
    },
    decreasePets: state => {
      if (state.data.guests.pets === 0) return;
      state.data.guests.pets -= 1;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsUpdated: (state, action) => {
      state.isUpdated = action.payload;
    },
  },
});

export default searchSlice;
