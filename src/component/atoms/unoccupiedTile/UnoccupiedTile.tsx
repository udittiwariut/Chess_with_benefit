// import { chessBoardPos } from "../../../store/chessBoardSlice/chessBoreSlice";
// import { useAppDispatch, useAppSelector } from "../../../store/typedHooks";

// interface props {
// 	rank: number;
// 	file: number;
// }

// const UnoccupiedTile = ({ rank, file }: props) => {
// 	const tileSize = parseInt(
// 		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
// 	);
// 	const moves = useAppSelector((state) => state.chess.moves);
// 	const isMovementPossible = () => {
// 		if (!moves[`${rank}${file}`]) return "";
// 		return true;
// 	};

// 	const dispatch = useAppDispatch();

// 	const ondrop = (e: React.DragEvent<HTMLDivElement>) => {
// 		//  @is !isMovementPossible Pause
// 		// if (!isMovementPossible()) return;
// 		const piceInfo = e.dataTransfer.getData("text");
// 		dispatch(chessBoardPos({ piceInfo, rank, file }));
// 	};

// 	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
// 		//@is !isMovementPossible Pause
// 		// if (!isMovementPossible()) return;
// 		e.preventDefault();
// 	};

// 	return (
// 		<div
// 			className={`h-tileHeight z-10 absolute w-tileWidth bg-contain`}
// 			style={{
// 				top: `${tileSize * rank}rem`,
// 				left: `${tileSize * file}rem`,
// 			}}
// 			onDrop={ondrop}
// 			onDragOver={ondragOver}
// 		></div>
// 	);
// };

// export default UnoccupiedTile;
