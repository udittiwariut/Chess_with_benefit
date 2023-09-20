import { v4 as uuidv4 } from "uuid";
import BoardTile from "../../atoms/bordtile/BordTile";

interface props {
	ranks: string[];
	files: string[];
}

const ChessBoard = ({ ranks, files }: props) => {
	return (
		<div className="inline-grid grid-cols-8 w-[calc(8*6rem)]">
			{files.map((_, filesIndex) =>
				ranks.map((_, ranksIndex) => {
					return (
						<BoardTile
							key={uuidv4()}
							variant={
								(filesIndex + 1 + (ranksIndex + 1)) % 2 != 0 ? "dark" : "light"
							}
						/>
					);
				})
			)}
		</div>
	);
};

export default ChessBoard;
