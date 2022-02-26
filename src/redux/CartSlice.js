import {createSlice} from '@reduxjs/toolkit';

const initialState={
      cartItems:localStorage.getItem("myspa-cart") ? JSON.parse(localStorage.getItem("myspa-cart")) : [],
      cartTotalQuantity:0,
      cartTotalAmount:0,
      branchList:[]
}
const cart = createSlice({
      name: "carts",
      initialState,
      reducers: {
            addCart: (state, action) => {
                  const itemIndex = state.cartItems.findIndex((item) =>
                        item.cartItemID === action.payload.cartItemID
                  );
                  if (itemIndex >= 0) {
                        state.cartItems[itemIndex].isConfirm = true;
                        state.cartItems[itemIndex].quantity += action.payload.quantity;
                  } else {
                        const templeCart = { ...action.payload, quantity: action.payload.quantity };
                        state.cartItems.push(templeCart);
                  }
                  localStorage.setItem('myspa-cart', JSON.stringify(state.cartItems))
            },
            removeCartItem: (state, action) => {
                  const nextItem = state.cartItems.filter((item) =>
                        item.cartItemID !== action.payload.cartItemID
                  )
                  state.cartItems = nextItem;
                  localStorage.setItem('myspa-cart', JSON.stringify(nextItem))
            },
            ascCart: (state, action) => {
                  const itemIndex = state.cartItems.findIndex(
                        item => item.cartItemID === action.payload.cartItemID
                  )
                  if (state.cartItems[itemIndex].quantity >= 1) {
                        state.cartItems[itemIndex].quantity += 1;
                  }
                  localStorage.setItem('myspa-cart', JSON.stringify(state.cartItems))
            },
            descCart: (state, action) => {
                  const itemIndex = state.cartItems.findIndex(
                        item => item.cartItemID === action.payload.cartItemID
                  )
                  if (state.cartItems[itemIndex].quantity > 1) {
                        state.cartItems[itemIndex].quantity -= 1;
                  }
                  localStorage.setItem('myspa-cart', JSON.stringify(state.cartItems))
            },
            checkConfirmCart:(state, action)=>{
                  const itemIndex = state.cartItems.findIndex(
                        item => item.id === action.payload.id
                  );
                  if(state.cartItems[itemIndex].isConfirm === false){
                        state.cartItems[itemIndex].isConfirm = true;
                  }else{
                        state.cartItems[itemIndex].isConfirm = false;
                  }
                  localStorage.setItem("myspa-cart", JSON.stringify(state.cartItems));
            },
            getTotal:(state, action)=>{
                  let{total, quantity} = state.cartItems.reduce(
                        (cartTotal, cartItem )=>{
                              const {quantity, price, isConfirm} = cartItem;
                              if (isConfirm === true) {
                                    const itemTotal = price * quantity;
                                    cartTotal.total += itemTotal;
                                    cartTotal.quantity += quantity;
                              }
                              return cartTotal;
                        },
                        {
                              total:0, quantity: 0
                        }
                  );
                  state.cartTotalQuantity = quantity;
                  state.cartTotalAmount = total;
            },
            //Test clear all carts
            clearAllCarts:(state, action)=>{
                  state.cartItems=[];
                  localStorage.setItem('myspa-cart', JSON.stringify(state.cartItems))
            },
            clearByCheck: (state, action) => {
                  state.cartItems = action.payload
                  localStorage.setItem('myspa-cart', JSON.stringify(state.cartItems))
            }

            //include branch list
      }
});
const {reducer, actions} = cart;
export const {addCart, descCart,ascCart, checkConfirmCart, getTotal, clearAllCarts, removeCartItem, clearByCheck} = actions;
export default reducer;