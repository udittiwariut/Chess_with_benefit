import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IvirtualChess from "../../utils/functions/getChessPieces";
import { CanMoveIn } from "../../utils/hooks/useGetMoves";

interface PieceInfo {
	piceInfo: string[];
	rank: number;
	file: number;
}
interface InitialState {
	currentPos: string[][];
	history: string[][][];
	turn: string;
	moves: CanMoveIn;
	retired: {
		w: string[];
		b: string[];
	};
}

const initialState: InitialState = {
	currentPos: IvirtualChess,
	history: [IvirtualChess],
	turn: "w",
	moves: {},
	retired: { w: [], b: [] },
};

const chessBoardSlice = createSlice({
	name: "chess",
	initialState,
	reducers: {
		chessBoardPos: (state, action: PayloadAction<string[][]>) => {
			state.currentPos = action.payload;
			state.history.push(action.payload);

			// @turn based stopper
			// if (state.turn === "w") state.turn = "b";
			// else {
			// 	state.turn = "w";
			// }

			state.moves = {};
		},
		possibleMoves: (state, action: PayloadAction<CanMoveIn>) => {
			state.moves = action.payload;
		},
		retirePiece: (state, action: PayloadAction<string>) => {
			state.retired[
				action.payload.slice(-1) as keyof typeof state.retired
			]?.push(action.payload);
		},
	},
});

export const { chessBoardPos, possibleMoves, retirePiece } =
	chessBoardSlice.actions;
export default chessBoardSlice.reducer;
