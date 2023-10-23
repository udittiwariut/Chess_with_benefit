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
	isBothPlayerConnected: boolean;
	disConnectTimeOutId?: NodeJS.Timeout;
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
	isBothPlayerConnected: true,
	disConnectTimeOutId: undefined,
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
		isBothPlayerConnected: (state, action: PayloadAction<boolean>) => {
			state.isBothPlayerConnected = action.payload;
		},
		setDisConnectTimeOutId: (state, action: PayloadAction<NodeJS.Timeout>) => {
			state.disConnectTimeOutId = action.payload;
		},
	},
});

export const { user, opponent, isBothPlayerConnected, setDisConnectTimeOutId } =
	userSlice.actions;

export default userSlice.reducer;
