import { configureStore } from "@reduxjs/toolkit";
import chessBoreReducer from "./chessBoardSlice/chessBoreSlice";
// ...

const store = configureStore({
	reducer: { chess: chessBoreReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
