import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import { possibleMoves as possibleMovesAction } from "../../store/chessBoardSlice/chessBoreSlice";
import * as possibleMoves from "./../chess_moves/allpieces";

export const movesType = {
	ATTACKING: "attacking",
	PASSING: "passing",
};
export interface CanMoveIn {
	[key: string]: string;
}

const PIECES = {
	ROOK: "rook",
	KNIGHT_WHITE: "Knight",
	BISHOP: "bishop",
	QUEEN: "queen",
	KING: "king",
	PAWN: "pawn",
	//
	// ROOK_w: "rook-w",
	// KNIGHT_WHITE_w: "knight-w",
	// BISHOP_w: "bishop-w",
	// QUEEN_w: "queen-w",
	// KING_w: "king-w",
	// PAWN_w: "pawn-w",
};

const useGetMoves = (piece: string) => {
	const dispatch = useAppDispatch();
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const turn = useAppSelector((state) => state.chess.turn);
	const enemy = turn === "w" ? "b" : "w";
	piece = piece.slice(0, piece.length - 2);

	return (rank: number, file: number) => {
		console.log(piece);

		switch (piece) {
			case PIECES.PAWN:
				const moves = possibleMoves.rooks(
					virtualChess,
					turn,
					enemy,
					rank,
					file
				);
				dispatch(possibleMovesAction(moves));
				break;

			default:
				break;
		}
	};
};

export default useGetMoves;
