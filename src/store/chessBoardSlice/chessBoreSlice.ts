import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IvirtualChess from "../../utils/functions/getChessPieces";
import { CanMoveIn } from "../../utils/hooks/useGetMoves";

interface ChessBoardPos {
	newPos: string[][];
	isPromotion: boolean;
	piece?: string;
}
interface KingPos {
	newKingPos: string;
	pieceType: string;
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
	kingPosition: {
		w: string;
		b: string;
	};
	enemyMoves: {};
	isCheck: boolean;
}

const initialState: InitialState = {
	currentPos: IvirtualChess,
	history: [IvirtualChess],
	turn: "w",
	moves: {},
	retired: { w: [], b: [] },
	kingPosition: { b: "04", w: "74" },
	enemyMoves: {},
	isCheck: false,
};

const chessBoardSlice = createSlice({
	name: "chess",
	initialState,
	reducers: {
		chessBoardPos: (state, action: PayloadAction<ChessBoardPos>) => {
			state.currentPos = action.payload.newPos;
			state.history.push(action.payload.newPos);
			if (!action.payload.isPromotion) {
				if (state.turn === "w") state.turn = "b";
				else state.turn = "w";
			}
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
		kingPos: (state, action: PayloadAction<KingPos>) => {
			const player = action.payload.pieceType.slice(-1);

			state.kingPosition[player as keyof typeof state.kingPosition] =
				action.payload.newKingPos;
		},
		enemyMoves: (state, action: PayloadAction<CanMoveIn>) => {
			state.enemyMoves = action.payload;
		},
		isCheck: (state, action: PayloadAction<boolean>) => {
			state.isCheck = action.payload;
		},
	},
});

export const {
	chessBoardPos,
	possibleMoves,
	retirePiece,
	kingPos,
	enemyMoves,
	isCheck,
} = chessBoardSlice.actions;
export default chessBoardSlice.reducer;
