import { useAppSelector } from "../../../store/typedHooks";
import { v4 as uuid } from "uuid";
import Pieces from "../../atoms/pieces/Pieces";
import UnoccupiedTile from "../../atoms/unoccupiedTile/UnoccupiedTile";

const ChessLogic = () => {
	const virtualChess = useAppSelector((state) => state.chess.currentPos);

	return (
		<div className="absolute z-10 h-full w-full top-0">
			{virtualChess?.map((rankArray, rank) =>
				rankArray.map((pieces, file) =>
					pieces ? (
						<Pieces key={uuid()} pieces={pieces} rank={rank} file={file} />
					) : (
						<UnoccupiedTile key={uuid()} rank={rank} file={file} />
					)
				)
			)}
		</div>
	);
};

export default ChessLogic;
