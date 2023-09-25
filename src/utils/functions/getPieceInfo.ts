import { movesType } from "../hooks/useGetMoves";

function getPieceInfo(e: React.DragEvent<HTMLDivElement>, rank: number) {
	const piceInfo = e.dataTransfer.getData("text").split(",");

	if (
		piceInfo[0].slice(0, piceInfo[0].length - 2) === "pawn" &&
		rank % 7 === 0
	) {
		piceInfo[0] = movesType.PROMOTION;
	}

	return piceInfo;
}

export default getPieceInfo;
