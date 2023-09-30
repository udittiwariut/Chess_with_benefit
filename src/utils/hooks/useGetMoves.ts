import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import * as possibleMoves from "./../chess_moves/allpieces";
import {
	possibleMoves as possibleMovesAction,
	enemyMoves as enemyMovesAction,
} from "../../store/chessBoardSlice/chessBoreSlice";
import { produce } from "immer";

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
	const kingPos = useAppSelector((state) => state.chess.kingPosition);
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	let turn = useAppSelector((state) => state.chess.turn);
	let enemy = turn === "w" ? "b" : "w";
	const isCheck = useAppSelector((state) => state.chess.isCheck);
	const enemyMoves = useAppSelector((state) => state.chess.enemyMoves);

	const turnPossibleMoves = (piece: string, rank: number, file: number) => {
		piece = piece.slice(0, piece.length - 2);

		const moves = possibleMoves[piece as keyof typeof possibleMoves](
			virtualChess,
			turn,
			enemy,
			rank,
			file,
			isCheck,
			enemyMoves
		);
		dispatch(possibleMovesAction(moves));
	};

	const enemyPossibleMoves = () => {
		useEffect(() => {
			const kingPosition = kingPos[turn as keyof typeof kingPos].split("");
			const virtualChessWithoutKing = produce(virtualChess, (draft) => {
				// @ts-ignore
				draft[kingPosition[0]][kingPosition[1]] = "";
			});

			const enemyMoves = virtualChessWithoutKing.reduce(
				(acc, current, indexR) => {
					const moves: {
						[key: string]: string[];
					} = acc;
					current.forEach((piece, indexF) => {
						if (!(piece.slice(-1) === enemy)) return;

						const pieceWithoutPlayer = piece.slice(0, piece.length - 2);

						const move = possibleMoves[
							pieceWithoutPlayer as keyof typeof possibleMoves
						](virtualChessWithoutKing, enemy, turn, indexR, indexF);

						moves[`${indexR}${indexF}` as keyof typeof moves] = [
							...Object.keys(move),
						];
					});
					return moves;
				},
				{}
			);

			console.log(enemyMoves);

			dispatch(enemyMovesAction(enemyMoves));
		}, [turn]);
	};

	return { turnPossibleMoves, enemyPossibleMoves };
};

export default useGetMoves;
