import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import { useEffect, useRef } from "react";
import {
	kingPos as kingPosAction,
	EnemyMove as PiecesMove,
	isCheck as isCheckAction,
	chessBoardPos,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import isTargetGettingKilled from "../../../utils/functions/isTargetGettingKilled";
import useGetMoves from "../../../utils/hooks/useGetMoves";
import socket from "../../../utils/socket/socket";
import { UserObj } from "../../../store/user/userSlice";
import { InitialState } from "../../../store/chessBoardSlice/chessBoreSlice";

interface SocketObj extends InitialState {
	isPromotion: boolean;
	kingPosAction: any;
}

const ChessLogic = ({ player }: { player: UserObj }) => {
	const storeMovesEnemy = useRef<PiecesMove>({});
	const dispatch = useAppDispatch();
	const turn = useAppSelector((state) => state.chess.turn);

	const kingPos = useAppSelector(
		(state) =>
			state.chess.kingPosition[turn as keyof typeof state.chess.kingPosition]
	);
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const { isCheck, from } = useAppSelector((state) => state.chess.isCheck);
	const getMoves = useGetMoves(kingPos, turn, isCheck, from, player.piece);

	useEffect(() => {
		const handleUpdatePos = (newVirtualChess: SocketObj) => {
			dispatch(
				chessBoardPos({
					newPos: newVirtualChess.currentPos,
					isPromotion: newVirtualChess.isPromotion,
				})
			);
			if (Object.keys(newVirtualChess.kingPosAction).length) {
				dispatch(kingPosAction(newVirtualChess.kingPosAction));
			}
			storeMovesEnemy.current = {};
		};
		socket.on("updated-pos", handleUpdatePos);
	}, []);

	useEffect(() => {
		const checkObj = isTargetGettingKilled(storeMovesEnemy.current, kingPos);
		if (checkObj.isCheck) {
			dispatch(isCheckAction(checkObj));
			getMoves.isCheckMateChecker(storeMovesEnemy.current);
		}
		if (!checkObj.isCheck) dispatch(isCheckAction(checkObj));
	}, [turn]);

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
							player={player}
						/>
					))
				)}
			</div>
		</>
	);
};

export default ChessLogic;
