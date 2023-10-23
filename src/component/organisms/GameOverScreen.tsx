import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../atoms/Title/Title";
import "./../../icon.css";

const GameOverScreen = ({ winner }: { winner: string }) => {
	let player;
	winner === "w" ? (player = "White") : (player = "Black");
	return (
		<>
			<div className="bg-lightTile flex flex-col px-6 py-9 items-center justify-stretch relative">
				<div className="absolute top-2 right-2 cursor-pointer">
					<AiFillCloseCircle size={20} />
				</div>
				<div className="flex">
					<Title size={"lg"} className="text-center">
						Congratulations {player} for your victory !!
					</Title>
				</div>
				<div
					className={`w-[150px] h-[150px] bg-contain my-4 king-${winner}`}
				></div>
			</div>
		</>
	);
};

export default GameOverScreen;
