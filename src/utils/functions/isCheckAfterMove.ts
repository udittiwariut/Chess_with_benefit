import { produce } from "immer";
import { EnemyMove, IsCheck } from "../../store/chessBoardSlice/chessBoreSlice";
import isTargetGettingKilled from "./isTargetGettingKilled";

const isCheckAfterMove = (
	isCheck: boolean,
	enemyMoves: EnemyMove,
	turn: string,
	virtualChess: string[][],
	possibleMoves: any,
	rank: number,
	file: number,
	kingPos: string
) => {
	const checkObj = isTargetGettingKilled(enemyMoves, `${rank}${file}`);

	if (!isCheck && checkObj.isCheck) {
		const enemy = turn === "w" ? "b" : "w";

		const enemyPiecePos = checkObj.from[0].split("");

		const newVirtualChess = produce(virtualChess, (draft) => {
			// @ts-ignore
			draft[rank][file] = "";
		});

		let enemyPiece =
			newVirtualChess[parseInt(enemyPiecePos[0])][parseInt(enemyPiecePos[1])];

		enemyPiece = enemyPiece.slice(0, enemyPiece.length - 2);

		const moves = possibleMoves[enemyPiece as keyof typeof possibleMoves](
			newVirtualChess,
			enemy,
			turn,
			rank,
			file
		);
		if (moves[kingPos]) {
			return true;
		}

		return false;
	}
};

export default isCheckAfterMove;
