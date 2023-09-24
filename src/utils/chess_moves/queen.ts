import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const queen = (
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
		for (let i = 1; i < 8; i++) {
			const nextRank = rank + side[0] * i;
			const nextFile = file + side[1] * i;

			if (nextRank > 7 || nextRank < 0 || nextFile > 7 || nextFile < 0) {
				break;
			}

			if (virtualChess[nextRank]?.[nextFile]?.slice(-1) === turn) {
				break;
			}

			if (virtualChess[nextRank]?.[nextFile]?.slice(-1) === enemy) {
				canMoveIn[`${nextRank}${nextFile}`] = movesType.ATTACKING;
				break;
			}

			canMoveIn[`${nextRank}${nextFile}`] = movesType.PASSING;
		}
	});

	return canMoveIn;
};

export default queen;
