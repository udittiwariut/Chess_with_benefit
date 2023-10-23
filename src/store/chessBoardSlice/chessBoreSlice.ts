import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CanMoveIn } from "../../utils/hooks/useGetMoves";

export interface EnemyMove {
	[key: string | number]: string[];
}

interface CheckMate {
	isCheckMate: boolean;
	winner: string;
}
interface ChessBoardPos {
	newPos: string[][];
	isPromotion: boolean;
	piece?: string;
}
interface KingPos {
	newKingPos: string;
	pieceType: string;
}

export interface IsCheck {
	isCheck: boolean;
	from: string[];
}

export interface InitialState {
	currentPos: string[][];
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
	isCheck: IsCheck;
	checkMate: CheckMate;
}

export interface SessionObj {
	w?: string;
	b?: string;
	state?: InitialState;
	session_expired: boolean;
	redirect: boolean;
}

const initialState: InitialState = {
	currentPos: [],
	turn: "w",
	moves: {},
	retired: { w: [], b: [] },
	kingPosition: { b: "04", w: "74" },
	isCheck: { isCheck: false, from: [] },
	checkMate: { isCheckMate: false, winner: "" },
};

const chessBoardSlice = createSlice({
	name: "chess",
	initialState,
	reducers: {
		chessBoardPos: (state, action: PayloadAction<ChessBoardPos>) => {
			state.currentPos = action.payload.newPos;
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

		isCheck: (state, action: PayloadAction<IsCheck>) => {
			state.isCheck = {
				isCheck: action.payload.isCheck,
				from: action.payload.from,
			};
		},
		isCheckMate: (state, action: PayloadAction<CheckMate>) => {
			state.checkMate = action.payload;
		},
		setBingingState: (state, action: PayloadAction<InitialState>) => {
			state.checkMate = action.payload.checkMate;
			state.currentPos = action.payload.currentPos;
			state.isCheck = action.payload.isCheck;
			state.kingPosition = action.payload.kingPosition;
			state.moves = action.payload.moves;
			state.retired = action.payload.retired;
			state.turn = action.payload.turn;
		},
	},
});

export const {
	chessBoardPos,
	possibleMoves,
	retirePiece,
	kingPos,
	isCheck,
	isCheckMate,
	setBingingState,
} = chessBoardSlice.actions;
export default chessBoardSlice.reducer;
