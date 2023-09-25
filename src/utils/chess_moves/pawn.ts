import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const pawn = (
	virtualChess: string[][],
	turn: string,
	enemy: string,
	rank: number,
	file: number
) => {
	let canMoveIn: CanMoveIn = {};

	const calculateMoves = (val: number) => {
		let nextPosRank = rank;
		let nextPosFile = file;

		if (nextPosRank + 1 * val > 7 || nextPosRank + 1 * val < 0) return;

		if (
			virtualChess[nextPosRank + 1 * val][nextPosFile - 1]?.slice(-1) === enemy
		) {
			canMoveIn[`${nextPosRank + 1 * val}${nextPosFile - 1}`] =
				movesType.ATTACKING;
		}
		if (
			virtualChess[nextPosRank + 1 * val][nextPosFile + 1]?.slice(-1) === enemy
		) {
			canMoveIn[`${nextPosRank + 1 * val}${nextPosFile + 1}`] =
				movesType.ATTACKING;
		}

		if (virtualChess[nextPosRank + 1 * val][nextPosFile] === "") {
			canMoveIn[`${nextPosRank + 1 * val}${nextPosFile}`] = movesType.PASSING;
			if (
				(turn === "w" &&
					rank === 6 &&
					virtualChess[nextPosRank - 2][nextPosFile] === "") ||
				(turn === "b" &&
					rank === 1 &&
					virtualChess[nextPosRank + 2][nextPosFile] === "")
			) {
				canMoveIn[`${nextPosRank + 2 * val}${nextPosFile}`] = movesType.PASSING;
			}
		}

		/// promotion
	};

	let num;
	if (turn === "w") {
		num = -1;
	}
	if (turn === "b") {
		num = 1;
	}
	calculateMoves(num!);

	return canMoveIn;
};

// const pawnPromotionOnDrop = (pieces: string, rank: number) => {
// 	if()
// };

export default pawn;
