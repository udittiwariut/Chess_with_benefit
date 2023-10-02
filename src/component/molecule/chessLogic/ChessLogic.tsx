import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import { useEffect, useRef } from "react";
import {
	EnemyMove as PiecesMove,
	kingPos,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import isTargetGettingKilled from "../../../utils/functions/isTargetGettingKilled";
import useGetMoves from "../../../utils/hooks/useGetMoves";

const ChessLogic = () => {
	const storeMovesEnemy = useRef<PiecesMove>({});

	const virtualChess = useAppSelector((state) => state.chess.currentPos);

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
						/>
					))
				)}
			</div>
		</>
	);
};

export default ChessLogic;
