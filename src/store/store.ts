import { configureStore } from "@reduxjs/toolkit";
import chessBoreReducer from "./chessBoardSlice/chessBoreSlice";
import userReducer from "./user/userSlice";
import tostReducer from "./tost/tostSlice";
// import logger from "redux-logger";
// ...

const store = configureStore({
	reducer: {
		chess: chessBoreReducer,
		user: userReducer,
		tost: tostReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
