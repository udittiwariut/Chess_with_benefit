import { produce } from "immer";
import { CanMoveIn, movesType, piecesType } from "../hooks/useGetMoves";
import getArrayFromObjOfArray from "../functions/getArrayFromOnjOfArray";
import { EnemyMove } from "../../store/chessBoardSlice/chessBoreSlice";
import * as possibleMoves from "./allpieces";

const king = (
	virtualChess: string[][],
	turn: string,
	enemy: string,
	rank: number,
	file: number,
	enemyMoves: EnemyMove = {},
	inside: boolean = false
) => {
	const possibleSideToMove = [
		[1, 0],
		[-1, 0],
		[0, -1],
		[0, 1],
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	];
	const canMoveIn: CanMoveIn = {};

	const allEnemyMoves: string[] = getArrayFromObjOfArray(enemyMoves);

	possibleSideToMove.forEach((side) => {
		const nextRank = rank + side[0];
		const nextFile = file + side[1];

		if (nextRank > 7 || nextRank < 0 || nextFile > 7 || nextFile < 0) {
			return;
		}

		if (virtualChess[nextRank]?.[nextFile]?.slice(-1) === turn) {
			return;
		}

		if (virtualChess[nextRank]?.[nextFile]?.slice(-1) === enemy) {
			if (!inside) {
				const nextPos = produce(virtualChess, (draft) => {
					draft[nextRank][nextFile] = `${piecesType.KING}-${turn}`;
					draft[rank][file] = "";
				});

				const enemyMoves = nextPos.reduce((acc, current, indexR) => {
					const moves: {
						[key: string]: string[];
					} = acc;
					current.forEach((piece, indexF) => {
						if (!(piece.slice(-1) === enemy)) return;

						const pieceWithoutPlayer = piece.slice(0, piece.length - 2);

						const move = possibleMoves[
							pieceWithoutPlayer as keyof typeof possibleMoves
						](nextPos, enemy, turn, indexR, indexF, {}, true);

						moves[`${indexR}${indexF}` as keyof typeof moves] = [
							...Object.keys(move),
						];
					});
					return moves;
				}, {});

				const allEnemyMoves: string[] = getArrayFromObjOfArray(enemyMoves);

				const is = allEnemyMoves.find(
					(val) => val === `${nextRank}${nextFile}`
				);
				if (is === `${nextRank}${nextFile}`) return;
			}

			canMoveIn[`${nextRank}${nextFile}`] = movesType.ATTACKING;
			return;
		}

		canMoveIn[`${nextRank}${nextFile}`] = movesType.PASSING;
	});

	Object.keys(canMoveIn).forEach((ele) => {
		if (allEnemyMoves.includes(ele)) delete canMoveIn[ele];
	});

	return canMoveIn;
};

export default king;
