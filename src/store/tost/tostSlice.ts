import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	message: "",
	isPermissionGranted: false,
};

const tostSlice = createSlice({
	name: "tost",
	initialState,
	reducers: {
		tost: (
			state,
			action: PayloadAction<{ isOpen: boolean; message: string }>
		) => {
			state.isOpen = action.payload.isOpen;
			state.message = action.payload.message;
		},
		tostPermission: (state, action: PayloadAction<boolean>) => {
			state.isPermissionGranted = action.payload;
		},
	},
});

export const { tost, tostPermission } = tostSlice.actions;

export default tostSlice.reducer;
