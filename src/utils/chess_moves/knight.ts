import { CanMoveIn, movesType } from "../hooks/useGetMoves";

const knight = (
	virtualChess: string[][],
	turn: string,
	enemy: string,
	rank: number,
	file: number
) => {
	const canMoveIn: CanMoveIn = {};

	const sideMoveVertical = (sign: number, move: number) => {
		const sideMove = file + sign;

		if (sideMove > 7 || sideMove < 0) return;

		if (virtualChess[move][sideMove].slice(-1) === turn) return;
		if (virtualChess[move][sideMove].slice(-1) === enemy) {
			canMoveIn[`${move}${sideMove}`] = movesType.ATTACKING;
			return;
		}
		canMoveIn[`${move}${sideMove}`] = movesType.PASSING;
	};

	const sideMoveHorizontal = (sign: number, move: number) => {
		const sideMove = rank + sign;
		if (sideMove > 7 || sideMove < 0) return;

		if (virtualChess[sideMove][move].slice(-1) === turn) return;
		if (virtualChess[sideMove][move].slice(-1) === enemy) {
			canMoveIn[`${sideMove}${move}`] = movesType.ATTACKING;
			return;
		}
		canMoveIn[`${sideMove}${move}`] = movesType.PASSING;
	};

	//// Forward
	const forwardMove = rank + 2;

	if (!(forwardMove > 7)) {
		sideMoveVertical(+1, forwardMove);
		sideMoveVertical(-1, forwardMove);
	}

	//// Right
	const rightMove = file + 2;

	if (!(rightMove > 7)) {
		sideMoveHorizontal(+1, rightMove);
		sideMoveHorizontal(-1, rightMove);
	}

	//// Backward
	const backwardMove = rank - 2;

	if (!(backwardMove < 0)) {
		sideMoveVertical(+1, backwardMove);
		sideMoveVertical(-1, backwardMove);
	}

	/// Left

	let leftMove = file - 2;

	if (!(leftMove < 0)) {
		sideMoveHorizontal(+1, leftMove);
		sideMoveHorizontal(-1, leftMove);
	}

	return canMoveIn;
};

export default knight;
