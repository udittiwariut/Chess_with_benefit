import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../atoms/Title/Title";
import Button from "../atoms/button/Button";

const GameOverScreen = ({ winner }: { winner: string }) => {
	let player;
	winner === "w" ? (player = "White") : (player = "Black");
	return (
		<>
			<div className="bg-lightTile flex flex-col px-6 py-9 items-center justify-stretch relative">
				<div className="flex">
					<Title size={"lg"} className="text-center">
						Congratulations {player} for your victory !!
					</Title>
				</div>
				<div className="w-fit my-4">
					<img
						src={`src/component/molecule/chessLogic/pieces-basic-svg/king-${winner}.svg`}
					/>
				</div>
				<Button className="bg-darkTile w-[30%]">New Game</Button>
				<div className="absolute top-2 right-2 cursor-pointer">
					<AiFillCloseCircle size={20} />
				</div>
			</div>
		</>
	);
};

export default GameOverScreen;
