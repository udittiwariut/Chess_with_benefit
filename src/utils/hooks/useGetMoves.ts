import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/typedHooks";
import * as possibleMoves from "./../chess_moves/allpieces";
import {
	possibleMoves as possibleMovesAction,
	enemyMoves as enemyMovesAction,
	isCheckMate as isCheckMateAction,
	EnemyMove,
} from "../../store/chessBoardSlice/chessBoreSlice";
import legalMovesAfterCheckFn from "../functions/legalMovesAfterCheck";
import { produce } from "immer";

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

const useGetMoves = () => {
	const dispatch = useAppDispatch();
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const turn = useAppSelector((state) => state.chess.turn);
	const kingPos = useAppSelector(
		(state) =>
			state.chess.kingPosition[turn as keyof typeof state.chess.kingPosition]
	);
	const enemy = turn === "w" ? "b" : "w";
	const { isCheck, from } = useAppSelector((state) => state.chess.isCheck);

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

		if (isCheck && from.length === 1 && piece != piecesType.KING) {
			const legalMovesAfterCheck = legalMovesAfterCheckFn(
				from,
				kingPos,
				enemyMoves,
				moves
			);

			dispatch(possibleMovesAction(legalMovesAfterCheck));
			return;
		}

		dispatch(possibleMovesAction(moves));
	};

	const enemyPossibleMoves = () => {
		const kingPosition = kingPos.split("");
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
					let move;

					const pieceWithoutPlayer = piece.slice(0, piece.length - 2);

					if (pieceWithoutPlayer === piecesType.PAWN) {
						move = possibleMoves[
							pieceWithoutPlayer as keyof typeof possibleMoves
						](virtualChess, enemy, turn, indexR, indexF);
					}

					if (!(pieceWithoutPlayer === piecesType.PAWN)) {
						move = possibleMoves[
							pieceWithoutPlayer as keyof typeof possibleMoves
						](virtualChessWithoutKing, enemy, turn, indexR, indexF);
					}

					moves[`${indexR}${indexF}` as keyof typeof moves] = [
						...Object.keys(move!),
					];
				});
				return moves;
			},
			{}
		);

		return enemyMoves;
	};

	const checkCheckMate = () => {
		const [rank, file] = kingPos.split("");

		const kingsMoves = possibleMoves.king(
			virtualChess,
			turn,
			enemy,
			parseInt(rank),
			parseInt(file),
			enemyMoves
		);

		if (Object.keys(kingsMoves).length) return;
		if (from.length > 1) {
			dispatch(isCheckMateAction(true));
		}

		// const turnMove = virtualChess.reduce((acc, current, indexR) => {
		// 	const moves: {
		// 		[key: string]: string[];
		// 	} = acc;
		// 	current.forEach((piece, indexF) => {
		// 		let move;

		// 		const pieceWithoutPlayer = piece.slice(0, piece.length - 2);

		// 		if (pieceWithoutPlayer === piecesType.PAWN) {
		// 			move = possibleMoves[
		// 				pieceWithoutPlayer as keyof typeof possibleMoves
		// 			](virtualChess, enemy, turn, indexR, indexF);
		// 		}

		// 		if (!(pieceWithoutPlayer === piecesType.PAWN)) {
		// 			move = possibleMoves[
		// 				pieceWithoutPlayer as keyof typeof possibleMoves
		// 			](virtualChess, enemy, turn, indexR, indexF);
		// 		}

		// 		moves[`${indexR}${indexF}` as keyof typeof moves] = [
		// 			...Object.keys(move!),
		// 		];
		// 	});
		// 	return moves;
		// }, {});
	};

	return { turnPossibleMoves, enemyPossibleMoves, checkCheckMate };
};

export default useGetMoves;
