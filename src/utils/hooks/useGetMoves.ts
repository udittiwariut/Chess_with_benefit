import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import * as possibleMoves from "./../chess_moves/allpieces";
import {
	isCheckMate as isCheckMateAction,
	EnemyMove,
} from "../../store/chessBoardSlice/chessBoreSlice";
import legalMovesAfterCheckFn from "../functions/legalMovesAfterCheck";

export const movesType = {
	ATTACKING: "attacking",
	PASSING: "passing",
	PROMOTION: "promotion",
	SELF: "self",
};

export const piecesType = {
	KING: "king",
	PAWN: "pawn",
};
export interface CanMoveIn {
	[key: string]: string;
}

const useGetMoves = (
	kingPos: string,
	turn: string,
	isCheck: boolean,
	from: string[],
	_: string
) => {
	const dispatch = useAppDispatch();

	const isCheckMate = useAppSelector(
		(state) => state.chess.checkMate.isCheckMate
	);

	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const enemy = turn === "w" ? "b" : "w";

	const turnPossibleMoves = (
		piece: string,
		rank: number,
		file: number,
		enemyMoves: EnemyMove
	) => {
		piece = piece.slice(0, piece.length - 2);

		const moves = possibleMoves[piece as keyof typeof possibleMoves](
			virtualChess,
			turn,
			enemy,
			rank,
			file,
			enemyMoves
		);

		if (isCheck && piece != piecesType.KING) {
			const legalMovesAfterCheck = legalMovesAfterCheckFn(from, kingPos, moves);
			return legalMovesAfterCheck;
		}

		return moves;
	};

	const isCheckMateChecker = (enemyMoves: EnemyMove) => {
		if (!isCheck && !isCheckMate) return;

		const kingPosArray = kingPos
			.toString()
			.split("")
			.map((num) => parseInt(num));

		const kingMoves = possibleMoves.king(
			virtualChess,
			turn,
			enemy,
			kingPosArray[0],
			kingPosArray[1],
			enemyMoves
		);

		const isKingStuck = Object.keys(kingMoves).length;

		if (isKingStuck) return;

		if (from.length > 1) {
			dispatch(isCheckMateAction({ isCheckMate: true, winner: enemy }));
			return;
		}

		const playerMoves: string[] = [];

		virtualChess?.map((rankArray, rank) =>
			rankArray.map((piece, file) => {
				if (piece?.slice(-1) === turn) {
					const move = turnPossibleMoves(piece, rank, file, enemyMoves);
					playerMoves.push(...Object.keys(move!));
				}
			})
		);

		if (!playerMoves.length)
			dispatch(isCheckMateAction({ isCheckMate: true, winner: enemy }));
	};

	return { turnPossibleMoves, isCheckMateChecker };
};

export default useGetMoves;
