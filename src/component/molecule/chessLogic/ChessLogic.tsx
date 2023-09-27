import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import useGetMoves from "../../../utils/hooks/useGetMoves";
import { useEffect, useMemo } from "react";
import { isCheck as isCheckAction } from "../../../store/chessBoardSlice/chessBoreSlice";

const ChessLogic = () => {
	const dispatch = useAppDispatch();
	const getMoves = useGetMoves();
	getMoves.enemyPossibleMoves();

	const check = useAppSelector((state) => state.chess.isCheck);
	const enemyMoves = useAppSelector((state) => state.chess.enemyMoves);

	const virtualChess = useAppSelector((state) => state.chess.currentPos);

	const turn = useAppSelector((state) => state.chess.turn);

	const kingPos = useAppSelector(
		(state) =>
			state.chess.kingPosition[turn as keyof typeof state.chess.kingPosition]
	);

	useEffect(() => {
		if (!Object.keys(enemyMoves).length) return;
		const allEnemyMoves: string[] = [];
		Object.values(enemyMoves).forEach((move) => {
			// @ts-ignore comment
			allEnemyMoves.push(...move);
		});
		const is = allEnemyMoves.find((val) => val === kingPos);
		if (is === undefined) dispatch(isCheckAction(false));
		if (is === kingPos) dispatch(isCheckAction(true));
	}, [enemyMoves, turn]);

	return (
		<div className="absolute z-10 h-full w-full top-0">
			{virtualChess?.map((rankArray, rank) =>
				rankArray.map((piece, file) => (
					<Pieces
						key={uuid()}
						piece={piece ? piece : ""}
						rank={rank}
						file={file}
						check={kingPos === `${rank}${file}` && check}
					/>
				))
			)}
		</div>
	);
};

export default ChessLogic;
