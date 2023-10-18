import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const initialState: any = {};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		socket: (state, action: PayloadAction<Socket<any, any>>) => {
			state.socket = action.payload;
		},
	},
});

export const { socket } = socketSlice.actions;

export default socketSlice.reducer;
