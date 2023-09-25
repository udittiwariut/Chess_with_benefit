import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import { chessBoardPos } from "../../../store/chessBoardSlice/chessBoreSlice";

const pieces = ["queen", "rook", "bishop", "knight"];

const PromotionTab = ({ file, rank }: { file: number; rank: number }) => {
	const dispatch = useAppDispatch();
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);

	const turn = useAppSelector((state) => state.chess.turn);

	const promotionHandler = (piece: string) => {
		const newPos = produce(virtualChess, (draft) => {
			draft[rank][file] = piece + "-" + turn;
		});

		dispatch(chessBoardPos(newPos));
	};

	return (
		<div
			className="z-30 absolute bg-lightTile shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
			style={{
				bottom: turn === "b" ? 0 : undefined,
				top: turn === "w" ? 0 : undefined,
				left: `${tileSize * file}rem`,
				height: `${tileSize * 4}rem`,
			}}
		>
			{pieces.map((piece) => (
				<button
					key={uuid()}
					className="h-tileHeight w-tileWidth cursor-pointer bg-contain block"
					onClick={() => promotionHandler(piece)}
					style={{
						backgroundImage: `url(src/component/molecule/chessLogic/pieces-basic-svg/${piece}-${turn}.svg)`,
					}}
				></button>
			))}
		</div>
	);
};

export default PromotionTab;
