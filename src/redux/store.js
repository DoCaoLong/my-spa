import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import accReducer from "./accountSlice";
import serviceBookingReducer from "./serviceBookingListSlice";
import serviceCartReducer from "./serviceCartSlice";
import discountReducer from "./discountSlice";
const rootReducer={
      carts: cartReducer,
      serviceBooking: serviceBookingReducer,
      serviceCart: serviceCartReducer,
      discounts:discountReducer,
      account: accReducer
};
const store = configureStore({
      reducer: rootReducer
});
export default store;