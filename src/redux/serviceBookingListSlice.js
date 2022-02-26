
import { createSlice } from "@reduxjs/toolkit";
//import { locationList } from "../dataService";
const initialState = {
    bookingList: localStorage.getItem("booking") ? JSON.parse(localStorage.getItem("booking")) : [],
    branchList: localStorage.getItem("booking") ? JSON.parse(localStorage.getItem("booking"))[0]?.branchList : [],
    bookingConfirm: localStorage.getItem("booking_cart_corfirm") ? JSON.parse(localStorage.getItem("booking_cart_corfirm")) : {
        userInfo: {},
        time: null,
        branch: {},
        listService: []
    },
};
const ServiceBooking = createSlice({
    name: "serviceBooking",
    initialState,
    reducers: {
        addService: (state, action) => {
            state.bookingList = [];
            state.bookingList.push(...action.payload);
        },
        checkConfirmService: (state, action) => {
            var item = action.payload;
            state.bookingList.forEach(e => {
                if (e.id === item.id) {
                    e.isBooking = item.isBooking;
                }
            });
            localStorage.setItem('booking', JSON.stringify(state.bookingList));
        },
        checkBranch: (state, action) => {
            //console.log(action.payload);
            state.bookingConfirm.branch = action.payload;
            localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
        },
        setTimeCheckIn: (state, action) => {
            // eslint-disable-next-line no-useless-concat
            state.bookingConfirm.time = action.payload;
            localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
        },
        editCheckinInfor: (state, action) => {
            //console.log(action.payload);
            state.bookingConfirm.userInfo = action.payload;
            localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
        },
        setListBooking: (state, action) => {
            state.bookingConfirm.listService = action.payload;
            //console.log(action.payload);
            localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
        },
        getListBranch: ((state, action) => {
            state.branchList = action.payload;
        }),
        clearService: (state, action) => {
            localStorage.removeItem('booking_cart_corfirm');
            state.bookingConfirm=initialState.bookingConfirm;
        },
    }
});
const { reducer, actions } = ServiceBooking;
export const { addService, setListBooking, setTimeCheckIn, checkBranch, checkConfirmService, editCheckinInfor, clearService } = actions;
export default reducer;