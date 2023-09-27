import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import * as possibleMoves from "./../chess_moves/allpieces";
import {
	possibleMoves as possibleMovesAction,
	enemyMoves as enemyMovesAction,
} from "../../store/chessBoardSlice/chessBoreSlice";

export const movesType = {
	ATTACKING: "attacking",
	PASSING: "passing",
	PROMOTION: "promotion",
};

export const piecesType = {
	KING: "king",
};
export interface CanMoveIn {
	[key: string]: string;
}

const useGetMoves = () => {
	const dispatch = useAppDispatch();
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	let turn = useAppSelector((state) => state.chess.turn);
	let enemy = turn === "w" ? "b" : "w";

	const turnPossibleMoves = (piece: string, rank: number, file: number) => {
		piece = piece.slice(0, piece.length - 2);

		const moves = possibleMoves[piece as keyof typeof possibleMoves](
			virtualChess,
			turn,
			enemy,
			rank,
			file,
			dispatch
		);

		dispatch(possibleMovesAction(moves));
	};

	const enemyPossibleMoves = () => {
		useEffect(() => {
			const enemyMoves = virtualChess.reduce((acc, current, indexR) => {
				const moves: {
					[key: string]: string[];
				} = acc;
				current.forEach((piece, indexF) => {
					if (!(piece.slice(-1) === enemy)) return;

					const pieceWithoutPlayer = piece.slice(0, piece.length - 2);

					const move = possibleMoves[
						pieceWithoutPlayer as keyof typeof possibleMoves
					](virtualChess, enemy, turn, indexR, indexF, dispatch);

					moves[`${indexR}${indexF}` as keyof typeof moves] = [
						...Object.keys(move),
					];
				});
				return moves;
			}, {});

			dispatch(enemyMovesAction(enemyMoves));
		}, [turn]);
	};

	return { turnPossibleMoves, enemyPossibleMoves };
};

export default useGetMoves;
