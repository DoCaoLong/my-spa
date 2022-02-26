import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userInfo: (sessionStorage.getItem('userToken'))&&((JSON.parse(sessionStorage.getItem('userToken'))).context),
    avatar: null
};
const Account = createSlice({
      name:"account",
      initialState,
      reducers:{
            editAcc:(state, action)=>{
                const templeCart = { ...action.payload };
                //console.log("------- temple");
                //console.log(templeCart);
                state.userInfo = templeCart;
                //console.log("-----state");
                //console.log(state);
            },
            getAcc:(state, action)=>{
                //console.log("----- action");
                //console.log(action);
                //console.log("-----state");
                //console.log(state.Name);
            },
            // updateAvatar:(state, action)=>{
            //     var x = {...action.payload};
            //     //console.log("image");
            //     //console.log(x);
            // },
            login:(state, action)=>{
                //console.log('login');
                //console.log(action);
                state.userInfo = action.payload.context
            },
      }
});
const {reducer, actions} = Account;
export const {getAcc,editAcc,updateAvatar,login} = actions;
export default reducer;