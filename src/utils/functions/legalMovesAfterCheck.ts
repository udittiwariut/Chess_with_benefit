import { EnemyMove } from "../../store/chessBoardSlice/chessBoreSlice";
import { CanMoveIn } from "../hooks/useGetMoves";

const legalMovesAfterCheck = (
	from: string[],
	kingPos: string,
	enemyMoves: EnemyMove,
	moves: CanMoveIn
) => {
	const enemyPos = from[0];

	const start = parseInt(enemyPos) < parseInt(kingPos) ? enemyPos : kingPos;
	const end = parseInt(enemyPos) > parseInt(kingPos) ? enemyPos : kingPos;

	const attackLineStart = enemyMoves[enemyPos].indexOf(start);
	const attackLineEnd = enemyMoves[enemyPos].indexOf(end);

	const lineOfAttack = enemyMoves[enemyPos].slice(
		attackLineStart,
		attackLineEnd
	);

	const legalMovesAfterCheck: CanMoveIn = {};

	Object.keys(moves)
		.filter((key) => lineOfAttack.includes(key))
		.forEach(
			(remainingMove) =>
				(legalMovesAfterCheck[remainingMove] = moves[remainingMove])
		);

	return legalMovesAfterCheck;
};

export default legalMovesAfterCheck;
