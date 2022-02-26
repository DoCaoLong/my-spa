
import {createSlice} from "@reduxjs/toolkit";
import {locationList} from "../dataService";
const initialState={
    bookingList : localStorage.getItem("booking_cart") ? JSON.parse(localStorage.getItem("booking_cart")) : [],
    branchList: locationList.find(item => item.id === 1).branchList,
    bookingConfirm :localStorage.getItem("booking_cart_corfirm") ? JSON.parse(localStorage.getItem("booking_cart_corfirm")) :  {
        userInfo:{},
        time: null,
        branch:{},
        listService:[]
    },
};
const serviceCart = createSlice({
      name:"serviceCart",
      initialState,
      reducers:{
            addService:(state, action)=>{
                state.bookingList = [];
                state.bookingList.push(...action.payload);
            },
            checkConfirmService:(state,action) =>{
                var item = action.payload;
                //console.log(item)
                state.bookingList.forEach(e => {
                    if(e.id === item.id){
                        e.isBooking = item.isBooking;
                    }
                });
                localStorage.setItem('booking_cart', JSON.stringify(state.bookingList))

                // //console.log(item)
                //console.log(state.bookingList);
            },
            checkBranch:(state,action) =>{
                //console.log(action.payload);
                state.bookingConfirm.branch = action.payload;
                localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
            },
            setTimeCheckIn:(state,action)=>{
                // eslint-disable-next-line no-useless-concat
                //console.log(action.payload.format("HH:mm,"+" Ngày "+"D-M-YYYY"));
                // eslint-disable-next-line no-useless-concat
                state.bookingConfirm.time = action.payload.format("HH:mm,"+" Ngày "+"D-M-YYYY");
                localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
            },
            editCheckinInfor:(state,action)=>{
                //console.log(action.payload);
                state.bookingConfirm.userInfo = action.payload;
                localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
            },
            setListBooking:(state,action)=>{
                state.bookingConfirm.listService = action.payload;
                //console.log(action.payload);
                localStorage.setItem('booking_cart_corfirm', JSON.stringify(state.bookingConfirm))
            },
            getListBranch:((state,action)=>{
                state.branchList = action.payload;
            })
      }
});
const {reducer, actions} = serviceCart;
export const {addService,setListBooking,setTimeCheckIn,checkBranch,checkConfirmService,editCheckinInfor} = actions;
export default reducer;