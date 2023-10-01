import { MutableRefObject, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import { produce } from "immer";
import useGetMoves, {
	CanMoveIn,
	movesType,
	piecesType,
} from "../../../utils/hooks/useGetMoves";
import {
	EnemyMove,
	chessBoardPos,
	enemyMoves,
	enemyMoves as enemyMovesAction,
	kingPos as kingPosAction,
	possibleMoves as possibleMovesAction,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import AttackCircle from "../attackCircle/AttackCircle";
import PassingCircle from "../passingCircle/PassingCircle";
import PromotionTab from "../promotionTab/PromotionTab";
import getPieceInfo from "../../../utils/functions/getPieceInfo";
import isTargetGettingKilled from "../../../utils/functions/isTargetGettingKilled";
import * as possibleMoves from "./../../../utils/chess_moves/allpieces";
import isCheckAfterMove from "../../../utils/functions/isCheckAfterMove";
import DispatchEnemyMove from "../dispatchEnemyMove/DispatchEnemyMove";

interface props {
	piece: string;
	rank: number;
	file: number;
	check: boolean;
	kingPos: string;
	storeMoves: MutableRefObject<EnemyMove>;
}

const Pieces = ({ piece, rank, file, check, kingPos, storeMoves }: props) => {
	const dispatch = useAppDispatch();
	const getMoves = useGetMoves();

	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);

	const isCheck = useAppSelector((state) => state.chess.isCheck.isCheck);

	// const enemyMoves = useAppSelector((state) => state.chess.enemyMoves);

	const turn = useAppSelector((state) => state.chess.turn);
	const enemy = turn === "w" ? "b" : "w";

	const virtualChess = useAppSelector((state) => state.chess.currentPos);

	const moves = useAppSelector((state) => state.chess.moves);

	const isMovementPossible = () => {
		if (moves[`${rank}${file}`] === movesType.ATTACKING)
			return movesType.ATTACKING;

		if (moves[`${rank}${file}`] === movesType.PASSING) return movesType.PASSING;
	};
	const isTurn = turn === piece.charAt(piece.length - 1);

	useEffect(() => {
		const getMove = () => {
			if (!(piece.slice(-1) === enemy)) return;
			const pieceWithoutPlayer = piece.slice(0, piece.length - 2);
			const kingPosition = kingPos.split("");
			const virtualChessWithoutKing = produce(virtualChess, (draft) => {
				// @ts-ignore
				draft[kingPosition[0]][kingPosition[1]] = "";
			});

			let move;

			if (pieceWithoutPlayer === piecesType.PAWN) {
				move = possibleMoves[pieceWithoutPlayer as keyof typeof possibleMoves](
					virtualChess,
					enemy,
					turn,
					rank,
					file
				);
			}

			if (!(pieceWithoutPlayer === piecesType.PAWN)) {
				move = possibleMoves[pieceWithoutPlayer as keyof typeof possibleMoves](
					virtualChessWithoutKing,
					enemy,
					turn,
					rank,
					file
				);
			}
			const previousMove = { ...storeMoves.current };
			previousMove[`${rank}${file}`] = [...Object.keys(move!)];
			storeMoves.current = previousMove;
		};

		getMove();

		if (rank * file === 49) {
			console.log(storeMoves.current);
		}
	}, [turn]);

	const ondragStart = (
		e: React.DragEvent<HTMLDivElement>,
		rank: number,
		file: number
	) => {
		if (!isTurn) {
			e.preventDefault();
			return;
		}

		if (
			!isCheckAfterMove(
				isCheck,
				storeMoves.current,
				turn,
				virtualChess,
				possibleMoves,
				rank,
				file,
				kingPos
			)
		) {
			getMoves.turnPossibleMoves(piece, rank, file, storeMoves.current);
		}
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", `${piece}, ${rank}, ${file}`);
		setTimeout(() => {
			// @ts-ignore
			e.target.style.display = "none";
		}, 0);
	};
	const ondragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		// @ts-ignore

		e.target.style.display = "block";
		storeMoves.current = {};
	};

	const ondrop = (e: React.DragEvent<HTMLDivElement>) => {
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

		const payload = {
			newPos,
			isPromotion: piece === movesType.PROMOTION ? true : false,
		};

		dispatch(chessBoardPos(payload));

		const currentPiecesType = piceInfo[0].slice(0, piceInfo[0].length - 2);

		if (currentPiecesType === piecesType.KING) {
			dispatch(
				kingPosAction({ newKingPos: `${rank}${file}`, pieceType: piece })
			);
		}

		storeMoves.current = {};
	};

	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
		//  @is !isMovementPossible Pause
		// if (!isMovementPossible()) return;
		e.preventDefault();
	};

	return (
		<>
			<div /* ////////////////////////////////////////////////////////// add is drag here */
				className={`h-tileHeight z-20 absolute w-tileWidth bg-contain  ${
					isTurn && "cursor-pointer"
				} ${check && "bg-red-500"}`}
				style={{
					top: `${tileSize * rank}rem`,
					left: `${tileSize * file}rem`,
					backgroundImage:
						piece && piece != movesType.PROMOTION
							? `url(src/component/molecule/chessLogic/pieces-basic-svg/${piece}.svg)`
							: undefined,
				}}
				draggable={isTurn} /*  add is Turn here drag here*/
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
			{piece === movesType.PROMOTION && (
				<PromotionTab rank={rank} file={file} />
			)}
		</>
	);
};

export default Pieces;
