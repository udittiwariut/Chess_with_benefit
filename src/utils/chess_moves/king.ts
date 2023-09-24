import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const king = (
	virtualChess: string[][],
	turn: string,
	enemy: string,
	rank: number,
	file: number
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
			canMoveIn[`${nextRank}${nextFile}`] = movesType.ATTACKING;
			return;
		}

		canMoveIn[`${nextRank}${nextFile}`] = movesType.PASSING;
	});

	return canMoveIn;
};

export default king;
