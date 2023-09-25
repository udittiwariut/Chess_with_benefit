import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import { produce } from "immer";
import useGetMoves, { movesType } from "../../../utils/hooks/useGetMoves";
import {
	chessBoardPos,
	possibleMoves,
	retirePiece,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import AttackCircle from "../attackCircle/AttackCircle";
import PassingCircle from "../passingCircle/PassingCircle";
import PromotionTab from "../promotionTab/PromotionTab";
import getPieceInfo from "../../../utils/functions/getPieceInfo";
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
	const virtualChess = useAppSelector((state) => state.chess.currentPos);
	const moves = useAppSelector((state) => state.chess.moves);
	const turn = useAppSelector((state) => state.chess.turn);

	const isMovementPossible = () => {
		if (moves[`${rank}${file}`] === movesType.ATTACKING)
			return movesType.ATTACKING;

		if (moves[`${rank}${file}`] === movesType.PASSING) return movesType.PASSING;

		if (moves[`${rank}${file}`] === movesType.PROMOTION)
			return movesType.PROMOTION;
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
		//  @is !isMovementPossible Pause
		// if (!isMovementPossible()) return;
		e.dataTransfer.setData(
			"text/plain",
			`${movesType.PROMOTION}, ${rank}, ${file}`
		);
		const piceInfo = getPieceInfo(e, rank);

		const [piece, pieceRank, pieceFile] = piceInfo;

		const newPos = produce(virtualChess, (draft) => {
			draft[rank][file] = piece;
			draft[parseInt(pieceRank)][parseInt(pieceFile)] = "";
		});

		dispatch(chessBoardPos(newPos));
	};

	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
		//  @is !isMovementPossible Pause
		// if (!isMovementPossible()) return;
		e.preventDefault();
	};

	return (
		<>
			<div ///////////////////////////////////////////////////////////////@ add isTurn here
				className={`h-tileHeight z-20 absolute w-tileWidth bg-contain ${"cursor-pointer"}`}
				style={{
					top: `${tileSize * rank}rem`,
					left: `${tileSize * file}rem`,
					backgroundImage:
						pieces && pieces != movesType.PROMOTION
							? `url(src/component/molecule/chessLogic/pieces-basic-svg/${pieces}.svg)`
							: undefined,
				}}
				draggable={true} // @replace true with is turn
				onDragStart={(e) => ondragStart(e, rank, file)}
				onDragEnd={(e) => ondragEnd(e)}
				onDrop={ondrop}
				onDragOver={ondragOver}
			></div>
			{isMovementPossible() === movesType.ATTACKING && (
				<AttackCircle rank={rank} file={file} />
			)}
			{isMovementPossible() === movesType.PASSING && (
				<PassingCircle rank={rank} file={file} />
			)}
			{pieces === movesType.PROMOTION && (
				<PromotionTab rank={rank} file={file} />
			)}
		</>
	);
};

export default Pieces;
