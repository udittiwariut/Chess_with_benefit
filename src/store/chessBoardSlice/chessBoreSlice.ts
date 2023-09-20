import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IvirtualChess from "../../utils/functions/getChessPieces";

interface PAYLOAD {
	piceInfo: string;
	rank: number;
	file: number;
}

const initialState = {
	currentPos: IvirtualChess,
	history: [IvirtualChess],
	turn: "w",
};

const chessBoardSlice = createSlice({
	name: "chess",
	initialState,
	reducers: {
		chessBoardPos: (state, action: PayloadAction<PAYLOAD>) => {
			const [piece, pieceRank, pieceFile] = action.payload.piceInfo.split(",");
			const { rank, file } = action.payload;
			state.currentPos[rank][file] = piece;
			state.currentPos[parseInt(pieceRank)][parseInt(pieceFile)] = "";
			state.history.push(state.currentPos);
			if (state.turn === "w") state.turn = "b";
			else {
				state.turn = "w";
			}
		},
	},
});

export const { chessBoardPos } = chessBoardSlice.actions;
export default chessBoardSlice.reducer;
