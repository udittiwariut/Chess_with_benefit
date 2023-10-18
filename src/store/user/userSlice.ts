import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserObj {
	roomId?: string;
	userName: string;
	piece: string;
	socketId?: string;
}
interface InitialState {
	user: UserObj;
	opponent: UserObj;
}
const initialState: InitialState = {
	user: {
		userName: "",
		piece: "",
		socketId: "",
	},
	opponent: {
		userName: "",
		piece: "",
		socketId: "",
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		user: (state, action: PayloadAction<UserObj>) => {
			state.user.roomId = action.payload.roomId;
			state.user.userName = action.payload.userName;
			state.user.piece = action.payload.piece;
		},
		opponent: (state, action: PayloadAction<UserObj>) => {
			state.opponent.userName = action.payload.userName;
			state.opponent.piece = action.payload.piece;
			state.opponent.socketId = action.payload.socketId;
		},
	},
});

export const { user, opponent } = userSlice.actions;

export default userSlice.reducer;
