import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
    name: 'reservation',
    initialState: {
        data: {
            maxGuests: 6,
            isPet: 0,
            //   districtCode: null,
            //   districtName: null,
            //   checkIn: null,
            //   checkOut: null,
            guests: {
                adults: 1,
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
        setMaxGuests: (state, action) => {
            state.data.maxGuests = action.payload;
        },
        setIsPet: (state, action) => {
            state.data.isPet = action.payload;
        },
        increaseAdults: state => {
            if (state.data.guests.adults === state.data.maxGuests - state.data.guests.children) return;
            state.data.guests.adults += 1;
        },
        decreaseAdults: state => {
            if (state.data.guests.adults === 0) return;
            state.data.guests.adults -= 1;
        },
        increaseChildren: state => {
            if (state.data.guests.children === state.data.maxGuests - state.data.guests.adults) return;
            state.data.guests.children += 1;
        },
        decreaseChildren: state => {
            if (state.data.guests.children === 0) return;
            state.data.guests.children -= 1;
        },
        increaseInfants: state => {
            if (state.data.guests.infants === 5) return;
            state.data.guests.infants += 1;
        },
        decreaseInfants: state => {
            if (state.data.guests.infants === 0) return;
            state.data.guests.infants -= 1;
        },
        increasePets: state => {
            if (state.data.guests.pets >= state.data.isPet) return;
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

export default reservationSlice;