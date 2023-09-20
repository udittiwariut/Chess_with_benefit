import { chessBoardPos } from "../../../store/chessBoardSlice/chessBoreSlice";
import { useAppDispatch } from "../../../store/typedHooks";

interface props {
	rank: number;
	file: number;
}

const UnoccupiedTile = ({ rank, file }: props) => {
	const tileSize = parseInt(
		getComputedStyle(document.body).getPropertyValue("--tileSize").charAt(0)
	);
	const dispatch = useAppDispatch();

	const ondrop = (e: React.DragEvent<HTMLDivElement>) => {
		const piceInfo = e.dataTransfer.getData("text");
		dispatch(chessBoardPos({ piceInfo, rank, file }));
	};

	const ondragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div
			className={`h-tileHeight z-10 absolute w-tileWidth bg-contain`}
			style={{
				top: `${tileSize * rank}rem`,
				left: `${tileSize * file}rem`,
			}}
			onDrop={ondrop}
			onDragOver={ondragOver}
		></div>
	);
};

export default UnoccupiedTile;
