import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import useGetMoves from "../../../utils/hooks/useGetMoves";

import {
	chessBoardPos,
	possibleMoves,
	retirePiece,
} from "../../../store/chessBoardSlice/chessBoreSlice";
interface props {
	pieces: string;
	rank: number;
	file: number;
}

const Pieces = ({ pieces, rank, file }: props) => {
	const dispatch = useAppDispatch();
	const getMove = useGetMoves(pieces);
	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);

	const moves = useAppSelector((state) => state.chess.moves);
	const turn = useAppSelector((state) => state.chess.turn);

	const isMovementPossible = () => {
		if (!moves[`${rank}${file}`]) return "";

		return true;
	};
	const isTurn = turn === pieces.charAt(pieces.length - 1);

	const ondragStart = (
		e: React.DragEvent<HTMLDivElement>,
		rank: number,
		file: number
	) => {
		// @turn based stopper
		// if (!isTurn) {
		// 	e.preventDefault();
		// 	return;
		// }
		getMove(rank, file);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", `${pieces}, ${rank}, ${file}`);
		setTimeout(() => {
			// @ts-ignore
			e.target.style.display = "none";
		}, 0);
	};
	const ondragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		// @ts-ignore
		e.target.style.display = "block";
		dispatch(possibleMoves({}));
	};

	const ondrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (!isMovementPossible()) return;
		const piceInfo = e.dataTransfer.getData("text");
		dispatch(retirePiece(pieces));
		dispatch(chessBoardPos({ piceInfo, rank, file }));
	};

	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
		if (!isMovementPossible()) return;
		e.preventDefault();
	};

	return (
		<>
			<div ///////////////////////////////////////////////////////////////@ add isTurn here
				className={`h-tileHeight z-20 absolute w-tileWidth bg-contain ${"cursor-pointer"}`}
				style={{
					top: `${tileSize * rank}rem`,
					left: `${tileSize * file}rem`,
					backgroundImage: `url(src/component/molecule/chessLogic/pieces-basic-svg/${pieces}.svg)`,
				}}
				draggable={true} // @replace true with is turn
				onDragStart={(e) => ondragStart(e, rank, file)}
				onDragEnd={(e) => ondragEnd(e)}
				onDrop={ondrop}
				onDragOver={ondragOver}
			></div>
			{isMovementPossible() && (
				<div
					className={`h-tileHeight z-10 absolute w-tileWidth rounded-full border-[6px] border-rose-500 `}
					style={{
						top: `${tileSize * rank}rem`,
						left: `${tileSize * file}rem`,
					}}
					draggable={true} // @replace true with is turn
					onDragStart={(e) => ondragStart(e, rank, file)}
					onDragEnd={(e) => ondragEnd(e)}
				></div>
			)}
		</>
	);
};

export default Pieces;
