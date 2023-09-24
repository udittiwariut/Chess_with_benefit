import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const bishop = (
	virtualChess: string[][],
	turn: string,
	enemy: string,
	rank: number,
	file: number
) => {
	const canMoveIn: CanMoveIn = {};

	const possibleSideToMove = [
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	];

	possibleSideToMove.forEach((side) => {
		for (let i = 1; i < 8; i++) {
			const nextPosRank = rank + side[0] * i;
			const nextPosFile = file + side[1] * i;

			if (
				nextPosRank > 7 ||
				nextPosFile > 7 ||
				nextPosFile < 0 ||
				nextPosRank < 0
			)
				break;
			if (virtualChess[nextPosRank]?.[nextPosFile]?.slice(-1) === turn) {
				break;
			}

			if (virtualChess[nextPosRank]?.[nextPosFile]?.slice(-1) === enemy) {
				canMoveIn[`${nextPosRank}${nextPosFile}`] = movesType.ATTACKING;
				break;
			}

			canMoveIn[`${nextPosRank}${nextPosFile}`] = movesType.PASSING;
		}
	});
	return canMoveIn;
};

export default bishop;
