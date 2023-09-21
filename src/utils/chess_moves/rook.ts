import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const rooks = (
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
			if (
				rank + i * ele[0] > 7 ||
				rank + i * ele[0] < 0 ||
				file + i * ele[1] > 7 ||
				file + i * ele[1] < 0
			) {
				break;
			}

			if (
				virtualChess[rank + i * ele[0]]?.[file + i * ele[1]]?.slice(-1) === turn
			) {
				break;
			}

			if (
				virtualChess[rank + i * ele[0]]?.[file + i * ele[1]]?.slice(-1) ===
				enemy
			) {
				canMoveIn[`${rank + i * ele[0]}${file + i * ele[1]}`] =
					movesType.ATTACKING;
				break;
			}

			canMoveIn[`${rank + i * ele[0]}${file + i * ele[1]}`] = movesType.PASSING;
		}
	});

	return canMoveIn;
};

export default rooks;
