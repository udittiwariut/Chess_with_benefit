import { useAppSelector } from "../../../store/typedHooks";
interface props {
	pieces: string;
	rank: number;
	file: number;
}

const Pieces = ({ pieces, rank, file }: props) => {
	const turn = useAppSelector((state) => state.chess.turn);

	const isTurn = turn === pieces.charAt(pieces.length - 1);

	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);
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
	};

	return (
		<div ///////////////////////////////////////////////////////////////@ add isTurn here
			className={`h-tileHeight z-10 absolute w-tileWidth bg-contain ${"cursor-pointer"}`}
			style={{
				top: `${tileSize * rank}rem`,
				left: `${tileSize * file}rem`,
				backgroundImage: `url(src/component/molecule/chessLogic/pieces-basic-svg/${pieces}.svg)`,
			}}
			draggable={true} // @replace true with is turn
			onDragStart={(e) => ondragStart(e, rank, file)}
			onDragEnd={(e) => ondragEnd(e)}
		></div>
	);
};

export default Pieces;
