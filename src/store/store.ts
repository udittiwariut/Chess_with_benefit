import { configureStore } from "@reduxjs/toolkit";
import chessBoreReducer from "./chessBoardSlice/chessBoreSlice";
import logger from "redux-logger";
// ...

const store = configureStore({
	reducer: { chess: chessBoreReducer },
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
