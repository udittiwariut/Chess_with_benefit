import { MutableRefObject } from "react";
import {
	EnemyMove,
	enemyMoves,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import { useAppDispatch } from "../../../store/typedHooks";
let count = 0;

const DispatchEnemyMove = ({
	storeMoves,
}: {
	storeMoves: MutableRefObject<EnemyMove>;
}) => {
	count++;

	const dispatch = useAppDispatch();
	dispatch(enemyMoves(storeMoves.current));

	return null;
};

export default DispatchEnemyMove;
