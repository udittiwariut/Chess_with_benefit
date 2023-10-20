import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	message: "",
	isTostActionNeeded: false,
	isPermissionGranted: false,
};

const tostSlice = createSlice({
	name: "tost",
	initialState,
	reducers: {
		tost: (
			state,
			action: PayloadAction<{
				isOpen: boolean;
				message: string;
				isTostActionNeeded?: boolean;
			}>
		) => {
			state.isOpen = action.payload.isOpen;
			state.message = action.payload.message;
			if (action.payload.isTostActionNeeded) state.isTostActionNeeded = true;
			else state.isTostActionNeeded = false;
		},
		tostPermission: (state, action: PayloadAction<boolean>) => {
			state.isPermissionGranted = action.payload;
		},
	},
});

export const { tost, tostPermission } = tostSlice.actions;

export default tostSlice.reducer;
