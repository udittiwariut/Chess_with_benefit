import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const rook = (
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
	];
	const canMoveIn: CanMoveIn = {};

	possibleSideToMove.forEach((ele) => {
		for (let i = 1; i < 8; i++) {
			const nextRank = rank + i * ele[0];
			const nextFile = file + i * ele[1];

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

export default rook;
