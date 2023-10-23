import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../atoms/Title/Title";
import Button from "../atoms/button/Button";
import "./../../icon.css";

const GameOverScreen = ({ winner }: { winner: string }) => {
	let player;
	winner === "w" ? (player = "White") : (player = "Black");
	const handleNewGame = () => {};
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
				<Button className="bg-darkTile w-[30%]" onClick={handleNewGame}>
					New Game
				</Button>
			</div>
		</>
	);
};

export default GameOverScreen;
