import { EnemyMove, IsCheck } from "../../store/chessBoardSlice/chessBoreSlice";

const isTargetGettingKilled = (
	enemyMoves: EnemyMove,
	targetCoordinate: string
) => {
	const checkObj: IsCheck = {
		isCheck: false,
		from: [],
	};

	Object.keys(enemyMoves).forEach((piecePos) => {
		// @ts-ignore comment
		enemyMoves[piecePos].forEach((val) => {
			if (val === targetCoordinate) {
				checkObj.isCheck = true;
				checkObj.from.push(piecePos);
			}
		});
	});

	return checkObj;
};

export default isTargetGettingKilled;
