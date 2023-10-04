import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import { useEffect, useRef } from "react";
import {
	EnemyMove as PiecesMove,
	isCheck as isCheckAction,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import isTargetGettingKilled from "../../../utils/functions/isTargetGettingKilled";
import useGetMoves from "../../../utils/hooks/useGetMoves";

const ChessLogic = () => {
	const storeMovesEnemy = useRef<PiecesMove>({});
	const dispatch = useAppDispatch();
	const turn = useAppSelector((state) => state.chess.turn);
	const kingPos = useAppSelector(
		(state) =>
			state.chess.kingPosition[turn as keyof typeof state.chess.kingPosition]
	);
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const { isCheck, from } = useAppSelector((state) => state.chess.isCheck);
	const getMoves = useGetMoves(kingPos, turn, isCheck, from);

	useEffect(() => {
		const checkObj = isTargetGettingKilled(storeMovesEnemy.current, kingPos);
		if (checkObj.isCheck) dispatch(isCheckAction(checkObj));
		if (!checkObj.isCheck) dispatch(isCheckAction(checkObj));
	}, [turn]);

	useEffect(() => {
		getMoves.isCheckMateChecker(storeMovesEnemy.current);
	}, [isCheck]);

	return (
		<>
			<div className="absolute z-10 h-full w-full top-0">
				{virtualChess?.map((rankArray, rank) =>
					rankArray.map((piece, file) => (
						<Pieces
							key={uuid()}
							piece={piece ? piece : ""}
							rank={rank}
							file={file}
							storeMovesEnemy={storeMovesEnemy}
							virtualChess={virtualChess}
							isCheck={isCheck}
							turn={turn}
							kingPos={kingPos}
							turnPossibleMoves={getMoves.turnPossibleMoves}
						/>
					))
				)}
			</div>
		</>
	);
};

export default ChessLogic;
