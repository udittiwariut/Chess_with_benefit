import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import useGetMoves, { piecesType } from "../../../utils/hooks/useGetMoves";
import { useEffect, useMemo } from "react";
import {
	isCheck as isCheckAction,
	enemyMoves as enemyMovesAction,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import isTargetGettingKilled from "../../../utils/functions/isTargetGettingKilled";
import { IsCheck } from "../../../store/chessBoardSlice/chessBoreSlice";

const ChessLogic = () => {
	const dispatch = useAppDispatch();
	const getMoves = useGetMoves();

	const isCheck = useAppSelector((state) => state.chess.isCheck.isCheck);
	const enemyMoves = useAppSelector((state) => state.chess.enemyMoves);

	const virtualChess = useAppSelector((state) => state.chess.currentPos);

	const turn = useAppSelector((state) => state.chess.turn);
	const enemy = turn === "w" ? "b" : "w";

	const kingPos = useAppSelector(
		(state) =>
			state.chess.kingPosition[turn as keyof typeof state.chess.kingPosition]
	);

	// useEffect(() => {
	// 	const moves = getMoves.enemyPossibleMoves();
	// 	dispatch(enemyMovesAction(moves));
	// }, [turn]);

	// useEffect(() => {
	// 	if (!Object.keys(enemyMoves).length) return;

	// 	const checkObj = isTargetGettingKilled(enemyMoves, kingPos);

	// 	if (checkObj.isCheck) dispatch(isCheckAction(checkObj));
	// 	if (!checkObj.isCheck) dispatch(isCheckAction(checkObj));
	// }, [enemyMoves, turn]);

	useEffect(() => {
		if (isCheck) {
			getMoves.checkCheckMate();
		}
	}, [isCheck]);

	return (
		<div className="absolute z-10 h-full w-full top-0">
			{virtualChess?.map((rankArray, rank) =>
				rankArray.map((piece, file) => (
					<Pieces
						key={uuid()}
						piece={piece ? piece : ""}
						rank={rank}
						file={file}
						check={kingPos === `${rank}${file}` && isCheck}
						kingPos={kingPos}
					/>
				))
			)}
		</div>
	);
};

export default ChessLogic;
