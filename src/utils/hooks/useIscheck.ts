import { useEffect } from "react";
import { useAppSelector } from "../../store/typedHooks";
import { CanMoveIn } from "./useGetMoves";
interface kingPosition {
	w: string;
	b: string;
}
interface Moves {
	[key: string]: CanMoveIn;
}
let enemyMoves: Moves = {};

const useIsCheck = (
	getMoves: (
		piece: string,
		rank: number,
		file: number,
		check: boolean
	) => CanMoveIn,
	piece: string,
	rank: number,
	file: number,
	turn: string
) => {
	const enemy = turn === "w" ? "b" : "w";
	const kingPos = useAppSelector(
		(state) => state.chess.kingPosition[turn as keyof kingPosition] // current player king pos
	);

	useEffect(() => {
		if (piece.slice(-1) === enemy) {
			const move = getMoves(piece, rank, file, true); /// enemy moves
			enemyMoves[piece] = move;
			console.log(enemyMoves);
		}
	}, [turn]);

	// return moves;
};

//   return ()

export default useIsCheck;
