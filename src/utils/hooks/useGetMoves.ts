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

const useGetMoves = (piece: string) => {
	const dispatch = useAppDispatch();
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const turn = useAppSelector((state) => state.chess.turn);
	const enemy = turn === "w" ? "b" : "w";
	piece = piece.slice(0, piece.length - 2);

	return (rank: number, file: number) => {
		const moves = possibleMoves[piece as keyof typeof possibleMoves](
			virtualChess,
			turn,
			enemy,
			rank,
			file
		);

		dispatch(possibleMovesAction(moves));
	};
};

export default useGetMoves;
