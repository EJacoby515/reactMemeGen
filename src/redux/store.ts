import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/RootSlices";

const store = configureStore({
    reducer,
    devTools: true,
});


export default store;