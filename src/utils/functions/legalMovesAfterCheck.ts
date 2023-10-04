import { EnemyMove } from "../../store/chessBoardSlice/chessBoreSlice";
import { CanMoveIn } from "../hooks/useGetMoves";

const legalMovesAfterCheck = (
	from: string[],
	kingPos: string,
	moves: CanMoveIn
) => {
	const enemyPos = parseInt(from[0]);
	const kingPosNum = parseInt(kingPos);
	const newMove: CanMoveIn = {};

	const lineOfAttack: string[] = [enemyPos.toString()];

	const start = enemyPos < kingPosNum ? enemyPos : kingPosNum;
	const end = enemyPos > kingPosNum ? enemyPos : kingPosNum;

	const startArray = start
		.toString()
		.split("")
		.map((num) => parseInt(num));

	const endArray = end
		.toString()
		.split("")
		.map((num) => parseInt(num));

	let startRank = startArray[0];
	let startFile = startArray[1];

	let endRank = endArray[0];
	let endFile = endArray[1];

	while (startRank != endRank || startFile != endFile) {
		if (startRank != endRank && startRank != 7) {
			startRank++;
		}
		if (startFile > endFile) {
			startFile--;
		}
		if (startFile < endFile) {
			startFile++;
		}
		lineOfAttack.push(`${startRank}${startFile}`);
	}

	lineOfAttack.forEach((move) => {
		if (!moves[move]) return;
		newMove[move] = moves[move];
	});

	return newMove;
};

export default legalMovesAfterCheck;
