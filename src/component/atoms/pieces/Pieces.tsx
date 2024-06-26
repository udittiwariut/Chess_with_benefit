import { MutableRefObject, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/typedHooks";
import { produce } from "immer";
import { movesType, piecesType } from "../../../utils/hooks/useGetMoves";
import {
	EnemyMove,
	chessBoardPos,
	kingPos as kingPosAction,
	possibleMoves as possibleMovesAction,
} from "../../../store/chessBoardSlice/chessBoreSlice";
import AttackCircle from "../attackCircle/AttackCircle";
import PassingCircle from "../passingCircle/PassingCircle";
import PromotionTab from "../promotionTab/PromotionTab";
import getPieceInfo from "../../../utils/functions/getPieceInfo";
import * as possibleMoves from "./../../../utils/chess_moves/allpieces";
import isCheckAfterMove from "../../../utils/functions/isCheckAfterMove";
import socket from "../../../utils/socket/socket";
import { UserObj } from "../../../store/user/userSlice";
import store from "../../../store/store";
import "./../../../icon.css";
import { tost } from "../../../store/tost/tostSlice";

interface props {
	piece: string;
	rank: number;
	file: number;
	storeMovesEnemy: MutableRefObject<EnemyMove>;
	virtualChess: string[][];
	isCheck: any;
	kingPos: any;
	turn: any;
	turnPossibleMoves: any;
	player: UserObj;
}

const Pieces = ({
	piece,
	rank,
	file,
	storeMovesEnemy,
	virtualChess,
	isCheck,
	kingPos,
	turn,
	turnPossibleMoves,
	player,
}: props) => {
	let listener: any;
	const dispatch = useAppDispatch();
	const isBothPlayerConnected = useAppSelector(
		(state) => state.user.isBothPlayerConnected
	);

	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);

	const enemy = turn === "w" ? "b" : "w";

	const moves = useAppSelector((state) => state.chess.moves);

	const isMovementPossible = () => {
		if (moves[`${rank}${file}`] === movesType.ATTACKING)
			return movesType.ATTACKING;

		if (moves[`${rank}${file}`] === movesType.PASSING) return movesType.PASSING;
	};

	const isTurn =
		turn === piece.charAt(piece.length - 1) &&
		player.piece === piece.charAt(piece.length - 1);

	useEffect(() => {
		const getMove = () => {
			if (!(piece.slice(-1) === enemy)) {
				return;
			}

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
					file,
					{},
					true
				);
			}

			if (!(pieceWithoutPlayer === piecesType.PAWN)) {
				move = possibleMoves[pieceWithoutPlayer as keyof typeof possibleMoves](
					virtualChessWithoutKing,
					enemy,
					turn,
					rank,
					file,
					{}
				);
			}
			const previousMove = { ...storeMovesEnemy.current };
			previousMove[`${rank}${file}`] = [...Object.keys(move!)];
			storeMovesEnemy.current = previousMove;
		};

		getMove();
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

		if (!isBothPlayerConnected)
			dispatch(
				tost({ isOpen: true, message: "Wait for other player to join" })
			);

		if (
			!isCheckAfterMove(
				isCheck,
				storeMovesEnemy.current,
				turn,
				virtualChess,
				possibleMoves,
				rank,
				file,
				kingPos,
				player.piece
			)
		) {
			const moves = turnPossibleMoves(
				piece,
				rank,
				file,
				storeMovesEnemy.current
			);

			dispatch(possibleMovesAction(moves));
		}

		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", `${piece}, ${rank}, ${file}`);
		listener = setTimeout(() => {
			// @ts-ignore
			e.target.style.display = "none";
		}, 0);
	};
	const ondragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		// @ts-ignore

		e.target.style.display = "block";
		dispatch(possibleMovesAction({}));

		clearTimeout(listener);
	};

	const ondrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (!isMovementPossible()) return;
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

		const socketPayload = {
			...store.getState().chess,
			isPromotion: payload.isPromotion,
			kingPosAction: {},
		};

		const currentPiecesType = piceInfo[0].slice(0, piceInfo[0].length - 2);

		if (currentPiecesType === piecesType.KING) {
			dispatch(
				kingPosAction({ newKingPos: `${rank}${file}`, pieceType: piece })
			);
			socketPayload.kingPosAction = {
				newKingPos: `${rank}${file}`,
				pieceType: piece,
			};
		}

		socket.emit("new-pos", socketPayload, player.roomId);

		storeMovesEnemy.current = {};
	};

	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
		//  @is !isMovementPossible Pause
		if (!isMovementPossible()) return;
		e.preventDefault();
	};

	return (
		<>
			<div
				className={`h-tileHeight z-20 absolute w-tileWidth  bg-contain  ${
					isTurn && "cursor-pointer"
				} ${
					piece === piecesType.KING + "-" + turn && isCheck && "bg-red-500"
				} ${piece && piece != movesType.PROMOTION && piece}`}
				style={{
					top: `${tileSize * rank}rem`,
					left: `${tileSize * file}rem`,
				}}
				draggable={isTurn}
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
			{piece === movesType.PROMOTION && player.piece === turn && (
				<PromotionTab rank={rank} file={file} />
			)}
		</>
	);
};

export default Pieces;
